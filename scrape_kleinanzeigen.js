const fs = require('fs');
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Lépj be a "Zu verschenken" kategóriába
  await page.goto('https://www.kleinanzeigen.de/s-zu-verschenken/c192', { waitUntil: 'domcontentloaded' });

  // Görgess lassan, hogy betöltsd az összes hirdetést
  let previousHeight = 0;
  while (true) {
    const currentHeight = await page.evaluate(() => document.body.scrollHeight);
    if (currentHeight === previousHeight) break;
    previousHeight = currentHeight;
    await page.evaluate(() => window.scrollBy(0, window.innerHeight));
    await page.waitForTimeout(1000);
  }

  // Hirdetések begyűjtése
  const ads = await page.$$eval('.aditem', (ads) => {
    return ads.map((ad) => {
      const title = ad.querySelector('.aditem-main > a')?.textContent?.trim() || 'N/A';
      const location = ad.querySelector('.aditem-details > .aditem-details-singleline')?.textContent?.trim() || 'N/A';
      const url = ad.querySelector('.aditem-main > a')?.href || 'N/A';
      const image = ad.querySelector('.aditem-image > img')?.getAttribute('src') || 'N/A';
      const lazyImage = ad.querySelector('.aditem-image > img')?.getAttribute('data-src') || null;

      return {
        title,
        location,
        url,
        image: lazyImage || image,
      };
    });
  });

  console.log('Hirdetések begyűjtve:', ads.length);

  // Adatok mentése JSON fájlba
  fs.writeFileSync('./public/data/scrapedAds.json', JSON.stringify(ads, null, 2), 'utf-8');

  await browser.close();
})();
