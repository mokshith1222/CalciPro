const fs = require('fs');
const path = require('path');

const projectRoot = __dirname;
const appDir = path.join(projectRoot, 'src', 'app');

function walk(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      walk(filePath);
    } else if (file === 'page.tsx') {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Calculate canonical path
      const relativePath = path.relative(appDir, dir);
      const canonicalPath = relativePath ? '/' + relativePath.replace(/\\/g, '/') : '';
      const canonicalUrl = `\${process.env.NEXT_PUBLIC_APP_URL || 'https://calcipro-phi.vercel.app'}${canonicalPath}`;

      if (content.includes('constructMetadata(')) {
        if (!content.includes('canonical:')) {
          const pattern = /export\s+const\s+metadata\s*=\s*constructMetadata\(\{\s*/;
          if (pattern.test(content)) {
            const replacement = `export const metadata = constructMetadata({\n  canonical: "${canonicalUrl}",\n  `;
            content = content.replace(pattern, replacement);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Injected canonical to: ${relativePath || '(root)'} -> ${canonicalUrl}`);
          }
        }
      }
    }
  });
}

walk(appDir);
console.log("Finished injecting canonical tags.");
