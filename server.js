const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;
const SITE_URL = process.env.SITE_URL || `http://localhost:${PORT}`;

function serveHtml(filePath, res) {
  fs.readFile(filePath, 'utf8', (err, html) => {
    if (err) return res.status(404).send('Not Found');
    html = html.replace(/\{\{SITE_URL\}\}/g, SITE_URL);
    const ext = path.extname(filePath).toLowerCase();
    const contentTypes = { '.html': 'text/html', '.xml': 'application/xml', '.txt': 'text/plain' };
    res.set('Content-Type', contentTypes[ext] || 'text/html').send(html);
  });
}

app.use(express.static(path.join(__dirname, 'public'), {
  extensions: false, index: false,
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.css')) res.set('Content-Type', 'text/css');
    if (filePath.endsWith('.js')) res.set('Content-Type', 'application/javascript');
  }
}));

app.get('/', (req, res) => serveHtml(path.join(__dirname, 'public', 'index.html'), res));
app.get('/sitemap.xml', (req, res) => serveHtml(path.join(__dirname, 'public', 'sitemap.xml'), res));
app.get('/robots.txt', (req, res) => serveHtml(path.join(__dirname, 'public', 'robots.txt'), res));

app.get('/:page', (req, res, next) => {
  const filePath = path.join(__dirname, 'public', req.params.page + '.html');
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) return next();
    serveHtml(filePath, res);
  });
});

app.use((req, res) => {
  const notFound = path.join(__dirname, 'public', '404.html');
  fs.access(notFound, fs.constants.F_OK, (err) => {
    if (err) return res.status(404).send('Not Found');
    serveHtml(notFound, res.status(404));
  });
});

app.listen(PORT, () => console.log(`Server running on ${SITE_URL}`));
