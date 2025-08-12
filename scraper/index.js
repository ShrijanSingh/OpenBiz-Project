// scraper/index.js
// Scrapes the first two steps of the Udyam registration form for fields, labels, and validation rules


import puppeteer from 'puppeteer';
import fs from 'fs';


import { execSync } from 'child_process';

async function getChromePath() {
  // Try to find Chrome/Chromium on Windows
  const winPaths = [
    process.env.PROGRAMFILES + '\\Google\\Chrome\\Application\\chrome.exe',
    process.env['PROGRAMFILES(X86)'] + '\\Google\\Chrome\\Application\\chrome.exe',
    process.env.LOCALAPPDATA + '\\Google\\Chrome\\Application\\chrome.exe',
  ];
  for (const p of winPaths) {
    try { if (p && fs.existsSync(p)) return p; } catch {}
  }
  // Try 'where chrome'
  try {
    const chromePath = execSync('where chrome').toString().split('\n')[0].trim();
    if (chromePath) return chromePath;
  } catch {}
  return null;
}

(async () => {
  let browser;
  try {
    browser = await puppeteer.launch({ headless: true });
  } catch (err) {
    console.warn('Default Chromium failed, trying system Chrome...');
    const chromePath = await getChromePath();
    if (!chromePath) throw new Error('Could not find Chrome/Chromium on this system.');
    browser = await puppeteer.launch({ headless: true, executablePath: chromePath });
  }
  const page = await browser.newPage();

  await page.goto('https://udyamregistration.gov.in/UdyamRegistration.aspx', { waitUntil: 'networkidle2' });

  // Wait for a broader form container (or body) and try to find Aadhaar input
  let step1 = [];
  try {
    await page.waitForSelector('form', { timeout: 30000 });
    // Try to find Aadhaar input after form is loaded
    step1 = await page.evaluate(() => {
      const fields = [];
      const aadhaarInput = document.querySelector('#txtAadhar');
      if (aadhaarInput) {
        fields.push({
          name: 'aadhaar',
          label: 'Aadhaar Number',
          type: 'text',
          required: true,
          validation: { pattern: '^\\d{12}$', message: 'Enter a valid 12-digit Aadhaar number' }
        });
      }
      const nameInput = document.querySelector('#txtName');
      if (nameInput) {
        fields.push({
          name: 'aadhaar_name',
          label: 'Name as per Aadhaar',
          type: 'text',
          required: true
        });
      }
      const otpInput = document.querySelector('#txtOTP');
      if (otpInput) {
        fields.push({
          name: 'otp',
          label: 'OTP',
          type: 'text',
          required: true,
          validation: { pattern: '^\\d{6}$', message: 'Enter a valid 6-digit OTP' }
        });
      }
      return fields;
    });
  } catch (e) {
    // If still not found, log HTML for debugging
    const html = await page.content();
    fs.writeFileSync('debug-form.html', html);
    console.error('Aadhaar input not found. Saved page HTML to debug-form.html');
  }

  // Try to reveal step 2 (PAN) by simulating a click if possible
  // This is a placeholder: actual navigation may require valid Aadhaar/OTP
  let step2 = [];
  try {
    await page.waitForSelector('#txtPan', { timeout: 5000 });
    step2 = await page.evaluate(() => {
      const fields = [];
      const panInput = document.querySelector('#txtPan');
      if (panInput) {
        fields.push({
          name: 'pan',
          label: 'PAN Number',
          type: 'text',
          required: true,
          validation: { pattern: '^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$', message: 'Enter a valid PAN (e.g., ABCDE1234F)' }
        });
      }
      return fields;
    });
  } catch (e) {
    // PAN field not visible without valid Aadhaar/OTP
    step2 = [];
  }

  const scrapedData = {
    step1,
    step2
  };

  fs.writeFileSync('scraped-form.json', JSON.stringify(scrapedData, null, 2));
  await browser.close();
  console.log('Scraping complete. Data saved to scraped-form.json');
})();
