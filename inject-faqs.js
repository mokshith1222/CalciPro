const fs = require('fs');
const path = require('path');

const projectRoot = __dirname;
const appDir = path.join(projectRoot, 'src', 'app', 'calculators');

const categories = ['education', 'finance', 'health', 'tech', 'utility'];
const customFaqFiles = [
  'finance/compound-interest',
  'finance/simple-interest',
  'health/bmi'
];

categories.forEach(category => {
  const catPath = path.join(appDir, category);
  if (!fs.existsSync(catPath)) return;

  const slugs = fs.readdirSync(catPath);
  slugs.forEach(slug => {
    const slugPath = path.join(catPath, slug);
    if (!fs.statSync(slugPath).isDirectory()) return;

    const pageFile = path.join(slugPath, 'page.tsx');
    if (!fs.existsSync(pageFile)) return;

    let content = fs.readFileSync(pageFile, 'utf8');
    const relativeKey = `${category}/${slug}`;
    const pathname = `/calculators/${category}/${slug}`;

    if (!content.includes('FAQSection')) {
      // 1. Add import
      const importLine = 'import { FAQSection } from "@/components/platform/FAQSection";\n';
      content = importLine + content;

      // 2. Inject FAQSection before the last </div> in the return statement
      const isCustomFaq = customFaqFiles.includes(relativeKey);
      const injectTag = isCustomFaq 
        ? `<FAQSection pathname="${pathname}" showFaqs={false} />`
        : `<FAQSection pathname="${pathname}" />`;

      // Find the last </div>
      const lastDivIndex = content.lastIndexOf('</div>');
      if (lastDivIndex !== -1) {
        content = content.substring(0, lastDivIndex) + `  ${injectTag}\n    ` + content.substring(lastDivIndex);
      }

      // 3. For custom FAQ files, clean up manual schemas
      if (isCustomFaq) {
        content = content.replace(/<script[^>]*dangerouslySetInnerHTML=\{\{\s*__html:\s*JSON\.stringify\(calculatorSchema\)\s*\}\}[^>]*\/>/g, '');
        content = content.replace(/<script[^>]*dangerouslySetInnerHTML=\{\{\s*__html:\s*JSON\.stringify\(breadcrumbSchema\)\s*\}\}[^>]*\/>/g, '');
        content = content.replace(/<script[^>]*dangerouslySetInnerHTML=\{\{\s*__html:\s*JSON\.stringify\(faqSchema\)\s*\}\}[^>]*\/>/g, '');
      }

      fs.writeFileSync(pageFile, content, 'utf8');
      console.log(`✅ Injected FAQSection to: ${relativeKey} (customFaq=${isCustomFaq})`);
    }
  });
});

console.log("Finished inject-faqs script.");
