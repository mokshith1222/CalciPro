const fs = require('fs');
const path = require('path');
const http = require('https');

const host = 'calcipro-phi.vercel.app';
const key = '3a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d';
const keyFile = path.join(__dirname, 'public', `${key}.txt`);

// 1. Ensure IndexNow verification key file exists in public/
if (!fs.existsSync(path.dirname(keyFile))) {
  fs.mkdirSync(path.dirname(keyFile), { recursive: true });
}
fs.writeFileSync(keyFile, key, 'utf8');
console.log(`✅ IndexNow verification key file written to: public/${key}.txt`);

// 2. Compile list of URLs
const urls = [
  `https://${host}/`,
  `https://${host}/about`,
  `https://${host}/blog`,
  `https://${host}/contact`,
  `https://${host}/cookies`,
  `https://${host}/privacy-policy`,
  `https://${host}/terms`,
  `https://${host}/calculators`
];

const appDir = path.join(__dirname, 'src', 'app', 'calculators');
const categories = ['education', 'finance', 'health', 'tech', 'utility'];

categories.forEach(category => {
  const catPath = path.join(appDir, category);
  if (!fs.existsSync(catPath)) return;

  const slugs = fs.readdirSync(catPath);
  slugs.forEach(slug => {
    const slugPath = path.join(catPath, slug);
    if (fs.statSync(slugPath).isDirectory()) {
      urls.push(`https://${host}/calculators/${category}/${slug}`);
    }
  });
});

console.log(`Found ${urls.length} URLs to submit to IndexNow.`);

// 3. Submit to IndexNow API
const data = JSON.stringify({
  host: host,
  key: key,
  keyLocation: `https://${host}/${key}.txt`,
  urlList: urls
});

const options = {
  hostname: 'api.indexnow.org',
  port: 443,
  path: '/indexnow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  console.log(`IndexNow Submission Response Status Code: ${res.statusCode}`);
  let responseBody = '';
  res.on('data', (chunk) => { responseBody += chunk; });
  res.on('end', () => {
    if ([200, 202, 204].includes(res.statusCode)) {
      console.log('🎉 URLs submitted successfully to IndexNow!');
    } else {
      console.error(`❌ Failed to submit URLs to IndexNow: ${responseBody}`);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Error during IndexNow submission request:', error);
});

req.write(data);
req.end();
