import { chromium } from 'playwright';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const americaFirstShareSavings1 = async (launchSettings, viewPort, throwError = false) => {
  throwError = true;
  try {

    if (throwError) throw new Error("Some error");
    const browser = await chromium.launch({ headless: true });  // Or 'firefox' or 'webkit'.
    // const context = await browser.createIncognitoBrowserContext();
    const page = await browser.newPage();
    
    // page.setViewport(viewPort);
    await page.goto('https://www.americafirst.com/rates/account-rates.html#Savings-Account-Rates');
    
    const apySelector = '#Savings-Account-Rates-modelContent > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(3)';
    const apyElement = await page.waitForSelector(apySelector);
    const apy = await apyElement.evaluate(el => el.textContent.trim());
  
    const minBalanceSelector = '#Savings-Account-Rates-modelContent > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(4)';
    const minBalanceElement = await page.waitForSelector(minBalanceSelector);
    const minBalance1 = await minBalanceElement.evaluate(el => el.textContent.trim());
    const minBalanceSelector2 = '#Savings-Account-Rates-modelContent > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(5)';
    const minBalanceElement2 = await page.waitForSelector(minBalanceSelector2);
    const minBalance2 = await minBalanceElement2.evaluate(el => el.textContent.trim());
    const minBalance = Math.max(Number(minBalance1.slice(1)), Number(minBalance2.slice(1)))
  
    const maxBalanceSelector = '#Savings-Account-Rates-modelContent > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(5)';
    const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
    const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
    
    const productNameSelector = '#Savings-Account-Rates-modelContent > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(1)';
    const productNameElement = await page.waitForSelector(productNameSelector);
    const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
    await browser.close();
  
    return {
      apy,
      productName,
      minBalance,
      maxBalance,
      success: false,
      error: '',
      path: __filename
    };
  } catch (e) {
    // Do not include any console logs of errors. Those are handled in the scraper.js file.
    // Errors encountered in this script should not break, but should log to the .txt file
    return {
      success: false,
      error: e.stack,
      path: __filename
    }
  }
};

export default americaFirstShareSavings1;