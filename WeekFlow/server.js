const http  = require('http');
const https = require('https');
const fs    = require('fs');
const path  = require('path');

const PORT    = 3000;
const API_KEY = process.env.ANTHROPIC_API_KEY;

if (!API_KEY) {
  console.error('Error: ANTHROPIC_API_KEY environment variable is not set.');
  process.exit(1);
}

function setCORS(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

const server = http.createServer((req, res) => {
  setCORS(res);

  // Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Serve weekflow.html
  if (req.method === 'GET' && req.url === '/') {
    const filePath = path.join(__dirname, 'weekflow.html');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('weekflow.html not found');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    });
    return;
  }

  // Proxy to Anthropic API
  if (req.method === 'POST' && req.url === '/api/chat') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      const options = {
        hostname: 'api.anthropic.com',
        path:     '/v1/messages',
        method:   'POST',
        headers: {
          'Content-Type':      'application/json',
          'x-api-key':         API_KEY,
          'anthropic-version': '2023-06-01',
          'Content-Length':    Buffer.byteLength(body),
        },
      };

      const proxyReq = https.request(options, proxyRes => {
        let responseBody = '';
        proxyRes.on('data', chunk => { responseBody += chunk; });
        proxyRes.on('end', () => {
          res.writeHead(proxyRes.statusCode, { 'Content-Type': 'application/json' });
          res.end(responseBody);
        });
      });

      proxyReq.on('error', err => {
        console.error('Proxy error:', err.message);
        res.writeHead(502);
        res.end(JSON.stringify({ error: { message: 'Proxy error: ' + err.message } }));
      });

      proxyReq.write(body);
      proxyReq.end();
    });
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`WeekFlow server running at http://localhost:${PORT}`);
});
