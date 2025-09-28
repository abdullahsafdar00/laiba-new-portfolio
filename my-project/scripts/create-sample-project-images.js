const fs = require('fs');
const path = require('path');

const projects = {
  'Pink Lacto Ampoule Listing': 8,
  'A Mental Health Web App': 7,
  'E-Commerce App': 5,
  'A Notes Hub Web App': 4,
  'Chat App': 6,
  'NearBuy': 8,
  'ReDesigned Digital Agency Website': 7,
  'Portfolio': 4,
  'Currency Converter': 2,
  'Simple Calculator': 3,
  'Tic Tac Toe': 4,
  'Stone Paper Scissor Game': 3,
};

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const PROJECTS_DIR = path.join(PUBLIC_DIR, 'projects');

function slugify(str = '') {
  return str
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

ensureDir(PROJECTS_DIR);

Object.entries(projects).forEach(([title, count]) => {
  const slug = slugify(title);
  const dir = path.join(PROJECTS_DIR, slug);
  ensureDir(dir);

  for (let i = 1; i <= count; i++) {
    const filename = `${i}.svg`;
    const filepath = path.join(dir, filename);
    const svg = `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<svg xmlns="http://www.w3.org/2000/svg" width="1500" height="1500" viewBox="0 0 1500 1500">\n` +
      `  <rect width="100%" height="100%" fill="#f8f5f9"/>\n` +
      `  <text x="50%" y="45%" font-family="Arial, Helvetica, sans-serif" font-size="48" fill="#e11d48" text-anchor="middle">${title.replace(/&/g,'&amp;')}</text>\n` +
      `  <text x="50%" y="55%" font-family="Arial, Helvetica, sans-serif" font-size="36" fill="#334155" text-anchor="middle">Image ${i} of ${count}</text>\n` +
      `</svg>`;

    fs.writeFileSync(filepath, svg);
  }

  console.log(`Created ${count} sample images for ${title} -> public/projects/${slug}/`);
});

console.log('Sample image generation complete.');
