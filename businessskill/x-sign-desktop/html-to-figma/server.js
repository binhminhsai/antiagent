require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const puppeteer = require('puppeteer');
const path = require('path');
const WebSocket = require('ws');
const http = require('http');
const multer = require('multer');
const AdmZip = require('adm-zip');
const fs = require('fs');
const { spawn } = require('child_process');
const treeKill = require('tree-kill');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server, path: '/ws' });

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static('public'));

const upload = multer({ dest: 'uploads/' });
const API_KEY = process.env.TO_DESIGN_API_KEY;

// Keep track of connected plugins
const clients = new Set();
wss.on('connection', ws => {
    console.log('✅ New Figma Plugin connected via WebSocket!');
    clients.add(ws);
    ws.on('close', () => {
        console.log('❌ Figma Plugin disconnected');
        clients.delete(ws);
    });
});

async function runFigmaConversion(htmlToConvert, res) {
    if (clients.size === 0) {
        return res.status(400).json({ error: 'Figma Plugin is not connected! Please open Figma and start the "ToDesign Auto" plugin first.' });
    }

    try {
        const response = await axios.post(
            'https://api.to.design/html',
            { html: htmlToConvert, clip: false },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`
                },
                maxContentLength: Infinity,
                maxBodyLength: Infinity
            }
        );

        const { model, images } = response.data;
        const payload = JSON.stringify({ type: 'START_RENDER', payload: { model, images } });
        clients.forEach(ws => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(payload);
            }
        });

        res.json({ success: true, message: 'Successfully sent to Figma Plugin!' });
    } catch (error) {
        console.error('API error:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to convert to Figma via API. ' + (error.response?.data?.title || '') });
    }
}

// Convert from URL or Raw Code
app.post('/api/convert', async (req, res) => {
    const { url, sourceCode } = req.body;
    let htmlToConvert = sourceCode;

    if (url) {
        let browser;
        try {
            browser = await puppeteer.launch({ headless: 'new' });
            const page = await browser.newPage();
            await page.setViewport({ width: 1440, height: 900 });
            await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
            
            await page.evaluate((baseUrl) => {
                let base = document.querySelector('base');
                if (!base) {
                    base = document.createElement('base');
                    document.head.prepend(base);
                }
                base.href = baseUrl;
            }, url);

            htmlToConvert = await page.evaluate(() => document.documentElement.outerHTML);
        } catch (error) {
            console.error('Puppeteer error:', error);
            return res.status(500).json({ error: 'Failed to fetch the URL content' });
        } finally {
            if (browser) await browser.close();
        }
    }

    if (!htmlToConvert) return res.status(400).json({ error: 'No URL or source code provided' });
    await runFigmaConversion(htmlToConvert, res);
});

// Helper to run a shell command and return promise
const execPromise = (cmd, args, options) => {
    return new Promise((resolve, reject) => {
        const child = spawn(cmd, args, { shell: true, ...options });
        child.on('close', code => {
            if (code === 0) resolve();
            else reject(new Error(`Command failed with code ${code}`));
        });
    });
};

// Convert from ZIP Upload
app.post('/api/upload', upload.single('projectZip'), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No zip file uploaded' });

    const extractPath = path.join(__dirname, 'uploads', `extracted_${Date.now()}`);
    let devServerChild = null;

    try {
        const zip = new AdmZip(req.file.path);
        zip.extractAllTo(extractPath, true);
        fs.unlinkSync(req.file.path);

        const packageJsonPath = path.join(extractPath, 'package.json');
        let htmlToConvert = '';
        let browser;

        if (fs.existsSync(packageJsonPath)) {
            console.log('React/Node project detected. Installing dependencies...');
            await execPromise('npm', ['install'], { cwd: extractPath });
            
            console.log('Starting dev server...');
            
            const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
            const devCmd = pkg.scripts && pkg.scripts.dev ? 'dev' : 'start';
            
            devServerChild = spawn('npm', ['run', devCmd], { cwd: extractPath, shell: true });
            
            let devUrl = '';
            devServerChild.stdout.on('data', data => {
                const str = data.toString();
                console.log('DEV OUT:', str);
                const match = str.match(/(http:\/\/(localhost|127\.0\.0\.1):\d+\/?)/);
                if (match && !devUrl) {
                    devUrl = match[1];
                    console.log('Detected Dev URL:', devUrl);
                }
            });
            devServerChild.stderr.on('data', data => console.log('DEV ERR:', data.toString()));

            for (let i = 0; i < 40; i++) {
                if (devUrl) break;
                await new Promise(r => setTimeout(r, 500));
            }

            if (!devUrl) {
                devUrl = 'http://localhost:3000';
            }

            console.log('Waiting 5 seconds for Webpack/Vite to fully initialize the bundle...');
            await new Promise(r => setTimeout(r, 5000));

            browser = await puppeteer.launch({ headless: 'new' });
            const page = await browser.newPage();
            await page.setViewport({ width: 1440, height: 900 });
            
            console.log(`Puppeteer navigating to ${devUrl}...`);
            await page.goto(devUrl, { waitUntil: 'networkidle0', timeout: 45000 });
            
            await page.evaluate((baseUrl) => {
                let base = document.querySelector('base');
                if (!base) {
                    base = document.createElement('base');
                    document.head.prepend(base);
                }
                base.href = baseUrl;
            }, devUrl);

            htmlToConvert = await page.evaluate(() => document.documentElement.outerHTML);
            await browser.close();
            
        } else {
            console.log('Static project detected. Using file serving...');
            const appStatic = express();
            appStatic.use(express.static(extractPath));
            const staticServer = appStatic.listen(0, async () => {
                const port = staticServer.address().port;
                const localUrl = `http://localhost:${port}/index.html`;
                
                browser = await puppeteer.launch({ headless: 'new' });
                const page = await browser.newPage();
                await page.setViewport({ width: 1440, height: 900 });
                await page.goto(localUrl, { waitUntil: 'networkidle0', timeout: 10000 });
                
                await page.evaluate((baseUrl) => {
                    let base = document.querySelector('base');
                    if (!base) {
                        base = document.createElement('base');
                        document.head.prepend(base);
                    }
                    base.href = baseUrl;
                }, `http://localhost:${port}/`);
                htmlToConvert = await page.evaluate(() => document.documentElement.outerHTML);
                await browser.close();
                staticServer.close();
                
                try { fs.rmSync(extractPath, { recursive: true, force: true }); } catch (e) {}
                await runFigmaConversion(htmlToConvert, res);
            });
            return; 
        }

        if (devServerChild) {
            treeKill(devServerChild.pid, 'SIGKILL');
        }

        try { fs.rmSync(extractPath, { recursive: true, force: true }); } catch (e) {}
        
        await runFigmaConversion(htmlToConvert, res);

    } catch (error) {
        if (devServerChild) treeKill(devServerChild.pid, 'SIGKILL');
        try { fs.rmSync(extractPath, { recursive: true, force: true }); } catch (e) {}
        console.error('Upload Error:', error);
        res.status(500).json({ error: 'Failed to process ZIP file' });
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server and WebSocket running on http://localhost:${PORT}`);
});
