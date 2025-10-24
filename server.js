const http = require('http');
const fs = require('fs');
const url = require('url');

const existingUsers = ['john', 'mary', 'sahana', 'admin']; // sample usernames

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  // Serve index.html
  if (req.url === '/' && req.method === 'GET') {
    fs.readFile('./public/index.html', (err, data) => {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  }

  // Serve CSS
  else if (req.url === '/style.css') {
    fs.readFile('./public/style.css', (err, data) => {
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.end(data);
    });
  }

  // Serve JS
  else if (req.url === '/script.js') {
    fs.readFile('./public/script.js', (err, data) => {
      res.writeHead(200, { 'Content-Type': 'application/javascript' });
      res.end(data);
    });
  }

  // Check username availability
  else if (parsedUrl.pathname === '/check' && req.method === 'GET') {
    const username = parsedUrl.query.username.toLowerCase();
    const available = existingUsers.includes(username) ? 'Taken' : 'Available';

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: available }));
  }

  // 404 fallback
  else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(5050, () => console.log('Server running at http://localhost:5050'));