import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

// Lấy __dirname trong ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.resolve(__dirname, '../dist/index.html');
const nonce = crypto.randomBytes(16).toString('base64');

let html = fs.readFileSync(filePath, 'utf-8');

// Replace CSP tag
html = html.replace(/Content-Security-Policy" content="(.*?)"/, (match, oldPolicy) => {
  const newPolicy = oldPolicy.replace(/'nonce-[^']*'/g, '') + ` 'nonce-${nonce}'`;
  return `Content-Security-Policy" content="${newPolicy.trim()}"`;
});

// Inject nonce into <script>
html = html.replace(/<script(.*?)>/g, (match, attrs) => {
  if (attrs.includes('nonce=')) return match;
  return `<script nonce="${nonce}"${attrs}>`;
});

fs.writeFileSync(filePath, html);
console.log('CSP nonce injected.');
