const fs = require('fs');
const path = require('path');

// Scans public/projects/<slug>/ and builds a JSON manifest mapping project slugs to image paths
// Example output path: src/data/projectImages.json

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const PROJECTS_DIR = path.join(PUBLIC_DIR, 'projects');
const OUT_DIR = path.join(__dirname, '..', 'src', 'data');
const OUT_FILE = path.join(OUT_DIR, 'projectImages.json');

function isImageFile(name) {
  return /\.(jpe?g|png|webp|gif|avif|svg)$/i.test(name);
}

if (!fs.existsSync(PROJECTS_DIR)) {
  console.warn('No public/projects directory found. Creating empty manifest.');
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify({}, null, 2));
  process.exit(0);
}

const slugs = fs.readdirSync(PROJECTS_DIR, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

const manifest = {};

slugs.forEach(slug => {
  const dir = path.join(PROJECTS_DIR, slug);
  const files = fs.readdirSync(dir).filter(isImageFile).sort();
  // Map to web paths starting with /
  manifest[slug] = files.map(f => `/projects/${slug}/${f}`);
});

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT_FILE, JSON.stringify(manifest, null, 2));
console.log('Wrote project manifest to', OUT_FILE);
