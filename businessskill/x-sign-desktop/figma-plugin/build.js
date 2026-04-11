const esbuild = require('esbuild');
const fs = require('fs');

esbuild.buildSync({
  entryPoints: ['src/code.ts'],
  bundle: true,
  outfile: 'dist/code.js',
  target: 'es6',
});

esbuild.buildSync({
  entryPoints: ['src/ui.ts'],
  bundle: true,
  outfile: 'dist/ui.js',
  target: 'es6',
});

const uiJs = fs.readFileSync('dist/ui.js', 'utf8');
const uiHtml = `<!DOCTYPE html><html><body><script>${uiJs}</script></body></html>`;
fs.writeFileSync('dist/ui.html', uiHtml);
console.log('Figma Plugin Build Successful!');
