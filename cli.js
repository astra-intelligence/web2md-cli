#!/usr/bin/env node
const https = require('https');
const http = require('http');

const API_URL = 'http://localhost:9999/api/convert';
const PREMIUM_URL = 'https://grantshatz.gumroad.com/l/mpkqyq';

const url = process.argv[2];
const usePremium = process.argv.includes('--premium');

if (!url) {
  console.error('Usage: npx web2md-cli <url> [--premium]');
  console.error('  --premium  Use premium API (higher rate limits, $1/month)');
  console.error('  Get premium: ' + PREMIUM_URL);
  process.exit(1);
}

if (usePremium) {
  console.log('❌ Premium requires a license key. Get it at: ' + PREMIUM_URL);
  console.log('Falling back to free tier...');
}

const apiUrl = `${API_URL}?url=${encodeURIComponent(url)}`;

const client = apiUrl.startsWith('https') ? https : http;
client.get(apiUrl, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const parsed = JSON.parse(data);
      if (parsed.success) {
        console.log(parsed.markdown);
      } else {
        console.error('Error:', parsed.error || 'Unknown error');
        process.exit(1);
      }
    } catch (e) {
      console.log(data);
    }
  });
}).on('error', (e) => {
  console.error('Request failed:', e.message);
  process.exit(1);
});