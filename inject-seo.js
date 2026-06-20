const fs = require('fs');
const path = require('path');

function processFiles(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processFiles(fullPath);
    } else if (file === 'page.tsx') {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // We only care about calculator pages that have a calculator component
      if (!content.includes('constructMetadata')) continue;
      if (fullPath.includes('[...slug]') || fullPath.includes('[category]')) continue;
      
      const titleMatch = content.match(/title:\s*"([^"]+)"/);
      const descMatch = content.match(/description:\s*"([^"]+)"/);
      
      if (titleMatch && descMatch) {
        const title = titleMatch[1];
        const desc = descMatch[1];
        
        if (!content.includes('ToolDescription')) {
          content = 'import { ToolDescription } from "@/components/seo/ToolDescription";\n' + content;
        }
        
        if (!content.includes('<ToolDescription')) {
          const componentStr = `<ToolDescription title="${title}" description="${desc}" />`;
          
          if (content.includes('<FAQSection')) {
            content = content.replace(/<FAQSection/g, componentStr + '\n      <FAQSection');
            fs.writeFileSync(fullPath, content);
            console.log('Updated (FAQ):', fullPath);
          } else {
            // Find the last </div> before the final ); }
            const regex = /(<\/div>\s*)\);?\s*}\s*$/;
            if (regex.test(content)) {
                content = content.replace(regex, `  ${componentStr}\n    $1);\n}\n`);
                fs.writeFileSync(fullPath, content);
                console.log('Updated (No FAQ):', fullPath);
            }
          }
        }
      }
    }
  }
}

processFiles('src/app/calculators');
