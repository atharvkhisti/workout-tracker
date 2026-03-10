const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgBuffer = fs.readFileSync(path.join(__dirname, 'public', 'icon.svg'));

// Generate 192x192 icon
sharp(svgBuffer)
  .resize(192, 192)
  .png()
  .toFile(path.join(__dirname, 'public', 'icon-192.png'))
  .then(() => console.log('Created icon-192.png'))
  .catch(err => console.error('Error creating 192:', err));

// Generate 512x512 icon
sharp(svgBuffer)
  .resize(512, 512)
  .png()
  .toFile(path.join(__dirname, 'public', 'icon-512.png'))
  .then(() => console.log('Created icon-512.png'))
  .catch(err => console.error('Error creating 512:', err));
