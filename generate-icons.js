const fs = require('fs');
const path = require('path');

// Simple PNG icon placeholders (base64 encoded 1x1 pixel images with proper colors)
const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Base64 encoded PNG with ResetPath branding colors
const createIconContent = (size) => {
  // This is a simple placeholder - in production you'd use a proper icon generator
  return `data:image/svg+xml;base64,${Buffer.from(`
    <svg width="${size}" height="${size}" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0f1419;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1a2332;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#4a9eff;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#0066cc;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" rx="80" fill="url(#bg)"/>
      <g transform="translate(256,256)">
        <path d="M-60,-90 L60,-90 L60,40 Q60,70 30,85 L0,100 L-30,85 Q-60,70 -60,40 Z" fill="url(#accent)"/>
        <g fill="white">
          <path d="M-20,-40 L0,-60 L20,-40 L10,-40 L10,20 L-10,20 L-10,-40 Z"/>
          <rect x="-30" y="30" width="60" height="8" rx="4"/>
        </g>
      </g>
    </svg>
  `).toString('base64')}`;
};

// Create icons directory if it doesn't exist
const iconsDir = path.join(__dirname, 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Generate placeholder icon files
iconSizes.forEach(size => {
  const iconPath = path.join(iconsDir, `icon-${size}x${size}.png`);
  const svgContent = createIconContent(size);
  
  // For now, we'll create SVG files that can be converted later
  const svgPath = path.join(iconsDir, `icon-${size}x${size}.svg`);
  const svgData = `<svg width="${size}" height="${size}" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#0f1419;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#1a2332;stop-opacity:1" />
      </linearGradient>
      <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#4a9eff;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#0066cc;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="512" height="512" rx="80" fill="url(#bg)"/>
    <g transform="translate(256,256)">
      <path d="M-60,-90 L60,-90 L60,40 Q60,70 30,85 L0,100 L-30,85 Q-60,70 -60,40 Z" fill="url(#accent)"/>
      <g fill="white">
        <path d="M-20,-40 L0,-60 L20,-40 L10,-40 L10,20 L-10,20 L-10,-40 Z"/>
        <rect x="-30" y="30" width="60" height="8" rx="4"/>
      </g>
    </g>
  </svg>`;
  
  fs.writeFileSync(svgPath, svgData);
  console.log(`Created ${svgPath}`);
});

console.log('Icon generation complete! Convert SVG files to PNG using an online converter or tool.');
