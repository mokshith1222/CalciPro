const fs = require('fs');
const path = require('path');

/**
 * Converts slug-case (e.g., 'sip-calculator') to Title Case (e.g., 'SIP Calculator').
 * Handles common financial acronyms.
 */
function formatToolName(slug) {
  const acronyms = ['sip', 'emi', 'fd', 'rd', 'gst', 'ppf', 'nps', 'roi', 'cagr'];
  return slug
    .split('-')
    .map(word => {
      if (acronyms.includes(word.toLowerCase())) {
        return word.toUpperCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

function updateMetadata() {
  // Next.js projects usually have 'src/app' or just 'app'
  const projectRoot = __dirname;
  const appDir = fs.existsSync(path.join(projectRoot, 'src', 'app')) 
    ? path.join(projectRoot, 'src', 'app', 'calculators')
    : path.join(projectRoot, 'app', 'calculators');

  if (!fs.existsSync(appDir)) {
    console.error(`Error: Could not find calculators directory at ${appDir}`);
    return;
  }

  console.log(`Searching for page.tsx files in: ${appDir}...`);

  // Recursive function to find page.tsx
  const walk = (dir) => {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        walk(filePath);
      } else if (file === 'page.tsx') {
        let content = fs.readFileSync(filePath, 'utf8');
        const incorrectTitle = 'title: "CalciPro | CalciPro"';
        
        if (content.includes(incorrectTitle)) {
          // Get the name of the folder the page.tsx is in
          const folderName = path.basename(dir);
          const toolName = formatToolName(folderName);
          const newTitle = `title: "${toolName} | CalciPro"`;

          const updatedContent = content.replace(incorrectTitle, newTitle);
          fs.writeFileSync(filePath, updatedContent, 'utf8');
          console.log(`✅ Updated: ${folderName} -> "${toolName}"`);
        }
      }
    });
  };

  walk(appDir);
  console.log('Finished updating titles.');
}

updateMetadata();