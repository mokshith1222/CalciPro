const fs = require('fs');
const path = require('path');

/**
 * This script automates:
 * 1. Replacing "$" with "₹"
 * 2. Updating numeric labels and placeholders
 * 3. Ensuring en-IN formatting is applied to components
 */

const targetDirs = [
  path.join(__dirname, 'src/components/calculators/finance'),
  path.join(__dirname, 'src/app/calculators/finance')
];

function updateFinanceFiles(dir) {
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      updateFinanceFiles(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      let content = fs.readFileSync(filePath, 'utf8');
      let originalContent = content;

      // 1. Replace hardcoded dollar signs in strings and labels
      content = content.replace(/\$/g, '₹');

      // 2. Look for .toLocaleString() and ensure it uses 'en-IN'
      // This fixes cases where it might be toLocaleString('en-US') or empty
      content = content.replace(/\.toLocaleString\((['"])en-US\1\)/g, ".toLocaleString('en-IN')");
      content = content.replace(/\.toLocaleString\(\)/g, ".toLocaleString('en-IN')");

      // 3. Inject the formatter import if we find output values that need it
      // (Note: This is a safe check to see if the file likely displays currency)
      if (content.includes('₹') && !content.includes('formatCurrency')) {
        const importStatement = `import { formatCurrency } from "@/lib/formatters";\n`;
        content = importStatement + content;
      }

      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Formatted: ${path.relative(__dirname, filePath)}`);
      }
    }
  });
}

console.log("Starting Indian ₹ Formatting update...");
targetDirs.forEach(dir => updateFinanceFiles(dir));
console.log("Update complete. Check your components for logic consistency.");