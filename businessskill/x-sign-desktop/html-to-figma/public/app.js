document.addEventListener('DOMContentLoaded', () => {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const convertBtn = document.getElementById('convertBtn');
    const statusBox = document.getElementById('status');
    const successBox = document.getElementById('successUi');
    const zipInput = document.getElementById('zipInput');
    const fileNameDisplay = document.getElementById('fileNameDisplay');
    
    let currentTab = 'zip';
    let selectedFile = null;

    // Handle Zip input
    zipInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            selectedFile = e.target.files[0];
            fileNameDisplay.textContent = `Selected: ${selectedFile.name}`;
        }
    });
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            currentTab = btn.getAttribute('data-tab');
            document.getElementById(`tab-${currentTab}`).classList.add('active');
            
            successBox.classList.add('hidden');
            statusBox.classList.add('hidden');
        });
    });

    convertBtn.addEventListener('click', async () => {
        const urlInput = document.getElementById('urlInput').value.trim();
        const codeInput = document.getElementById('codeInput').value.trim();
        
        const formData = new FormData();
        let isUpload = false;

        if (currentTab === 'zip') {
            if (!selectedFile) return alert('Please upload a ZIP file first');
            formData.append('projectZip', selectedFile);
            isUpload = true;
        } else if (currentTab === 'url') {
            if (!urlInput) return alert('Please enter a URL');
            formData.append('url', urlInput);
        } else {
            if (!codeInput) return alert('Please paste source code');
            formData.append('sourceCode', codeInput);
        }

        convertBtn.disabled = true;
        successBox.classList.add('hidden');
        statusBox.classList.remove('hidden');
        statusBox.textContent = isUpload 
            ? 'Processing zip file... If it is a React app, this might take 30-90s (npm install & dev server)' 
            : 'Processing... (Puppeteer & API)';

        try {
            let response;
            if (isUpload) {
                response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData // No Content-Type header so browser boundary works
                });
            } else {
                response = await fetch('/api/convert', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        url: currentTab === 'url' ? urlInput : undefined,
                        sourceCode: currentTab === 'code' ? codeInput : undefined
                    })
                });
            }

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Unknown error');
            }

            const data = await response.json();
            
            statusBox.classList.add('hidden');
            successBox.innerHTML = `<span>✅ Success!</span><p>${data.message} It should instantly appear in Figma!</p>`;
            successBox.classList.remove('hidden');
        } catch (error) {
            statusBox.textContent = `Error: ${error.message}`;
        } finally {
            convertBtn.disabled = false;
        }
    });
});
