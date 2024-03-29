import * as chromeLauncher from 'chrome-launcher';
import fs from 'fs';

async function runLighthouse(url) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
//   const options = { logLevel: 'info', output: 'html', onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'], port: chrome.port };

  const lighthouse = (await import('lighthouse')).default;

  const options = {
    logLevel: 'info',
    output: 'html',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    port: chrome.port
  };

  // Lighthouse configuration for desktop
  const config = {
    extends: 'lighthouse:default',
    formFactor: 'desktop',
    screenEmulation: {
      mobile: false,
      width: 1350,
      height: 940,
      deviceScaleFactor: 1,
      disabled: false
    },
    throttling: {
      rttMs: 40,
      throughputKbps: 10240,
      cpuSlowdownMultiplier: 1,
      requestLatencyMs: 0, // 0 means unset
      downloadThroughputKbps: 0,
      uploadThroughputKbps: 0
    }
  };

  const runnerResult = await lighthouse(url, options, config);

  const reportHtml = runnerResult.report;
  fs.writeFileSync('BEFORE/lighthouse-report.html', reportHtml);

  console.log('Report is written to lighthouse-report.html');

  await chrome.kill();
}

const ULR_SERVER = 'http://localhost:5173';

runLighthouse(ULR_SERVER).catch(console.error);