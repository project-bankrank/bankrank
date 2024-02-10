import { chromium } from "playwright";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const pncStandardSavings = async (headless = true, throwError = false) => {
  // Throw Error is a variable used to test the error handling.
  if (throwError) throw new Error("Some error");
  const browser = await chromium.launch({ headless }); // Or 'firefox' or 'webkit'.
  try {
    // const context = await browser.createIncognitoBrowserContext();
    const page = await browser.newPage();

    // Todo: Iterate over multiple zip codes
    await page.goto("https://www.pnc.com/en/rates/savings/94507/NA");

    const apySelector =
      "#print-section > swiper > div > div.swiper-wrapper > div.swiper-slide.swiper-slide-next > div.col-lg-12.col-md-12.col-sm-12.content > div:nth-child(5) > rate-terms > table > tbody > tr:nth-child(1) > td:nth-child(3)";
    const apyElement = await page.waitForSelector(apySelector);
    const apy = await apyElement.evaluate((el) => el.textContent.trim());

    const minBalanceSelector =
      "#print-section > swiper > div > div.swiper-wrapper > div.swiper-slide.swiper-slide-next > div.col-lg-12.col-md-12.col-sm-12.content > div:nth-child(5) > rate-terms > table > tbody > tr:nth-child(1) > td:nth-child(1)";
    const minBalanceElement = await page.waitForSelector(minBalanceSelector);
    const minimum_balance = await minBalanceElement.evaluate((el) =>
      el.textContent.trim(),
    );

    const maxBalanceSelector =
      "#print-section > swiper > div > div.swiper-wrapper > div.swiper-slide.swiper-slide-next > div.col-lg-12.col-md-12.col-sm-12.content > div:nth-child(5) > rate-terms > table > tbody > tr:nth-child(1) > td:nth-child(1)";
    const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
    const maximum_balance = await maxBalanceElement.evaluate((el) =>
      el.textContent.trim(),
    );

    const productNameSelector =
      "#print-section > swiper > div > div.swiper-wrapper > div.swiper-slide.swiper-slide-next > div.col-lg-12.col-md-12.col-sm-12.rate-information > div > h5";
    const productNameElement = await page.waitForSelector(productNameSelector);
    const product_name = await productNameElement.evaluate((el) =>
      el.textContent.trim(),
    );

    await browser.close();

    return {
      institution_name: "PNC",
      account_type: "Savings",
      success: true,
      error: false,
      path: __filename,
      apy,
      product_name,
      minimum_balance,
      maximum_balance,
    };
  } catch (e) {
    // Do not include any console logs of errors. Those are handled in the scraper.js file.
    // Errors encountered in this script should not break, but should log to the .txt file
    return {
      success: false,
      error: e.stack,
      path: __filename,
    };
  } finally {
    console.log("closing ");
    await browser.close();
  }
};

const pncStandardSavings2 = async () => {
  console.log("browser");
  // const browser = await puppeteer.launch(launchSettings);
  // const context = await browser.createIncognitoBrowserContext();
  // console.log('page')
  // const page = await context.newPage();

  // page.setViewport(viewPort);
  // console.log('goto')
  // await page.goto('https://www.pnc.com/en/rates/savings/94507/NA');

  // await page.waitForNetworkIdle()
  // console.log('page loaded')

  // // Fill out form
  // // try {
  // //     console.log('Wait')
  // //     await page.waitForSelector('#zipCode', { timeout: 5000 });
  // //     await page.type('#zipCode', '94507');
  // //     await page.keyboard.press('Enter');
  // // } catch (err) {
  // //     console.log('error waiting for selector. Keep going')
  // // }

  // console.log('submit')

  // const apySelector = '#print-section > swiper > div > div.swiper-wrapper > div.swiper-slide.swiper-slide-next > div.col-lg-12.col-md-12.col-sm-12.content > div:nth-child(5) > rate-terms > table > tbody > tr:nth-child(2) > td:nth-child(3)';
  // const apyElement = await page.waitForSelector(apySelector);
  // const apy = await apyElement.evaluate(el => el.textContent.trim());

  // const minBalanceSelector = '#print-section > swiper > div > div.swiper-wrapper > div.swiper-slide.swiper-slide-next > div.col-lg-12.col-md-12.col-sm-12.content > div:nth-child(5) > rate-terms > table > tbody > tr:nth-child(2) > td:nth-child(1)';
  // const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  // const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  // const maxBalanceSelector = '#print-section > swiper > div > div.swiper-wrapper > div.swiper-slide.swiper-slide-next > div.col-lg-12.col-md-12.col-sm-12.content > div:nth-child(5) > rate-terms > table > tbody > tr:nth-child(2) > td:nth-child(1)';
  // const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  // const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());

  // const productNameSelector = '#print-section > swiper > div > div.swiper-wrapper > div.swiper-slide.swiper-slide-next > div.col-lg-12.col-md-12.col-sm-12.rate-information > div > h5';
  // const productNameElement = await page.waitForSelector(productNameSelector);
  // const productName = await productNameElement.evaluate(el => el.textContent.trim());

  // console.log('productName: ', productName);
  // console.log('apy: ', apy);
  // console.log('minBalance: ', minBalance);
  // console.log('maxBalance: ', maxBalance);

  // await browser.close();

  // return {
  //     apy,
  //     productName: productName,
  //     script: 'pncStandardSavings1'
  // };
};
export default pncStandardSavings;
