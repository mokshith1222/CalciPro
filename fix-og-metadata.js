const fs = require('fs');
const path = require('path');

/**
 * Automates fixing OG and Twitter image metadata across the project.
 * Replaces hardcoded absolute URLs with structured image objects.
 */

const targetDirs = [
  path.join(__dirname, 'src'),
  path.join(__dirname, 'app')
];

function updateMetadataFiles(dir) {
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      updateMetadataFiles(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.js')) {
      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;

      // Regex matches images: "URL" or images: ["URL"]
      const pattern = /images:\s*(\[\s*)?["']https:\/\/calcverse\.com\/og-image\.jpg["'](\s*\])?/g;
      const replacement = "images: [{ url: '/og-image.jpg', width: 1200, height: 630 }]";

      content = content.replace(pattern, replacement);

      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Updated metadata in: ${path.relative(__dirname, filePath)}`);
      }
    }
  });
}

console.log("Searching for legacy OG/Twitter image URLs...");
targetDirs.forEach(dir => updateMetadataFiles(dir));
console.log("Fix complete.");