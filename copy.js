import puppeteer from 'puppeteer';
import fs from 'fs';
import americaFirstShareSavings1 from './products/AmericaFirst/americaFirstShareSavings1.js';


/* Todos:
Next: 
- 100 Largest CUs
- Bank Rate, nerdwallet, motley fool, etc forbes top banks
- Add "isCU" flag
- trim textContent with https://stackoverflow.com/questions/42920985/textcontent-without-spaces-from-formatting-text
Then:
https://en.wikipedia.org/wiki/List_of_largest_banks_in_the_United_States

https://pptr.dev/api/puppeteer.keyboard.press
- Try catch everything to skip/log
- abstract away common logic
- Typescript

https://www.wealthfront.com/blog/why-is-wealthfront-cash-account-apy-so-high
*/

/* Issues:
- interacting with shadow dom https://github.com/puppeteer/puppeteer/issues/858
	- https://www.regions.com/personal-banking/savings#savingsaccount

	- Banks have rates and balance details on separate pages
		- https://www.fultonbank.com/Personal/Banking/Savings/Savings-and-Money-Markets/Statement-Savings
		- https://www.firstrepublic.com/personal/passbook-savings?gnav=globalheader;personal-savings
		- https://www.amegybank.com/personal/savings/savings/
*/

/* Newsletter criteria
- Able to open and transact online (no call us, no visit a local branch)
- APY available directly on the web site (no download, no email, no contact)
- Unlimited Withdrawls/transfers from savings to external accounts
- No monthly/recurring fees, or if so, they are waiveable with a minimum balance
- No other accounts are required to obtain the listed APY
- No activity requirements (minimum transactions, direct deposits)

TL;DR: I should be able to go to a site, see the APY, open the account, and not have any fees as long as i maintain the minimum balance.

- If u would like to propose a bank, send us a link. As a reward, we'll credit your account with 1 month of any current and future premium services we provide.

*/

/* Ideas
- Partner with CUs to keep min balance and waive the membership fee w/ signed up account & MFA
- Podcast
		- why do banks make it so hard to see rates?
		- CU non profit status = tax %
		- CU executive Comp per AUM versus Bank comp per AUM
- Informational Websites (to compete with investopedia)

*/
const launchSettings = {
  // headless: false,
  headless: 'new',
}
const viewPort = {
  width: 1280,
  height: 750,
};

const pncStandardSavings2 = async () => {
    console.log('browser')
    const browser = await puppeteer.launch(launchSettings);
    const context = await browser.createIncognitoBrowserContext();
    console.log('page')
    const page = await context.newPage();
    
    page.setViewport(viewPort);
    console.log('goto')
    await page.goto('https://www.pnc.com/en/rates/savings/94507/NA');

    await page.waitForNetworkIdle()
    console.log('page loaded')
    
    // Fill out form
    // try {
    //     console.log('Wait')
    //     await page.waitForSelector('#zipCode', { timeout: 5000 });
    //     await page.type('#zipCode', '94507');
    //     await page.keyboard.press('Enter');
    // } catch (err) {
    //     console.log('error waiting for selector. Keep going')
    // }

    console.log('submit')
    
    const apySelector = '#print-section > swiper > div > div.swiper-wrapper > div.swiper-slide.swiper-slide-next > div.col-lg-12.col-md-12.col-sm-12.content > div:nth-child(5) > rate-terms > table > tbody > tr:nth-child(2) > td:nth-child(3)';
    const apyElement = await page.waitForSelector(apySelector);
    const apy = await apyElement.evaluate(el => el.textContent.trim());

    const minBalanceSelector = '#print-section > swiper > div > div.swiper-wrapper > div.swiper-slide.swiper-slide-next > div.col-lg-12.col-md-12.col-sm-12.content > div:nth-child(5) > rate-terms > table > tbody > tr:nth-child(2) > td:nth-child(1)';
    const minBalanceElement = await page.waitForSelector(minBalanceSelector);
    const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

    const maxBalanceSelector = '#print-section > swiper > div > div.swiper-wrapper > div.swiper-slide.swiper-slide-next > div.col-lg-12.col-md-12.col-sm-12.content > div:nth-child(5) > rate-terms > table > tbody > tr:nth-child(2) > td:nth-child(1)';
    const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
    const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
    
    const productNameSelector = '#print-section > swiper > div > div.swiper-wrapper > div.swiper-slide.swiper-slide-next > div.col-lg-12.col-md-12.col-sm-12.rate-information > div > h5';
    const productNameElement = await page.waitForSelector(productNameSelector);
    const productName = await productNameElement.evaluate(el => el.textContent.trim());
    
    console.log('productName: ', productName);
    console.log('apy: ', apy);
    console.log('minBalance: ', minBalance);
    console.log('maxBalance: ', maxBalance);

    await browser.close();

    return {
        apy,
        productName: productName,
        script: 'pncStandardSavings1'
    };
};

const pncStandardSavings1 = async () => {
    console.log('browser')
    const browser = await puppeteer.launch(launchSettings);
    const context = await browser.createIncognitoBrowserContext();
    console.log('page')
    const page = await context.newPage();
    
    page.setViewport(viewPort);
    console.log('goto')
    await page.goto('https://www.pnc.com/en/rates/savings/94507/NA');

    await page.waitForNetworkIdle()
    console.log('page loaded')
    
    // Fill out form
    // try {
    //     console.log('Wait')
    //     await page.waitForSelector('#zipCode', { timeout: 5000 });
    //     await page.type('#zipCode', '94507');
    //     await page.keyboard.press('Enter');
    // } catch (err) {
    //     console.log('error waiting for selector. Keep going')
    // }

    console.log('submit')
    
    const apySelector = '#print-section > swiper > div > div.swiper-wrapper > div.swiper-slide.swiper-slide-next > div.col-lg-12.col-md-12.col-sm-12.content > div:nth-child(5) > rate-terms > table > tbody > tr:nth-child(1) > td:nth-child(3)';
    const apyElement = await page.waitForSelector(apySelector);
    const apy = await apyElement.evaluate(el => el.textContent.trim());

    const minBalanceSelector = '#print-section > swiper > div > div.swiper-wrapper > div.swiper-slide.swiper-slide-next > div.col-lg-12.col-md-12.col-sm-12.content > div:nth-child(5) > rate-terms > table > tbody > tr:nth-child(1) > td:nth-child(1)';
    const minBalanceElement = await page.waitForSelector(minBalanceSelector);
    const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

    const maxBalanceSelector = '#print-section > swiper > div > div.swiper-wrapper > div.swiper-slide.swiper-slide-next > div.col-lg-12.col-md-12.col-sm-12.content > div:nth-child(5) > rate-terms > table > tbody > tr:nth-child(1) > td:nth-child(1)';
    const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
    const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
    
    const productNameSelector = '#print-section > swiper > div > div.swiper-wrapper > div.swiper-slide.swiper-slide-next > div.col-lg-12.col-md-12.col-sm-12.rate-information > div > h5';
    const productNameElement = await page.waitForSelector(productNameSelector);
    const productName = await productNameElement.evaluate(el => el.textContent.trim());
    
    console.log('productName: ', productName);
    console.log('apy: ', apy);
    console.log('minBalance: ', minBalance);
    console.log('maxBalance: ', maxBalance);

    await browser.close();

    return {
        apy,
        productName: productName,
        script: 'pncStandardSavings1'
    };
};

const pncHighYieldSavings = async () => {
    console.log('browser')
    const browser = await puppeteer.launch(launchSettings);
    const context = await browser.createIncognitoBrowserContext();
    console.log('page')
    const page = await context.newPage();
    
    page.setViewport(viewPort);
    console.log('goto')
    await page.goto('https://www.pnc.com/en/rates/savings/94507/NA');

    await page.waitForNetworkIdle()
    console.log('page loaded')

    console.log('submit')
    
    const apySelector = '#print-section > swiper > div > div.swiper-wrapper > div.swiper-slide.swiper-slide-active > div.col-lg-12.col-md-12.col-sm-12.content > div > rate-terms > table > tbody > tr > td:nth-child(3)';
    const apyElement = await page.waitForSelector(apySelector);
    const apy = await apyElement.evaluate(el => el.textContent.trim());

    const minBalanceSelector = '#print-section > swiper > div > div.swiper-wrapper > div.swiper-slide.swiper-slide-active > div.col-lg-12.col-md-12.col-sm-12.content > div > rate-terms > table > tbody > tr > td:nth-child(1)';
    const minBalanceElement = await page.waitForSelector(minBalanceSelector);
    const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

    const maxBalanceSelector = '#print-section > swiper > div > div.swiper-wrapper > div.swiper-slide.swiper-slide-active > div.col-lg-12.col-md-12.col-sm-12.content > div > rate-terms > table > tbody > tr > td:nth-child(1)';
    const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
    const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
    
    const productNameSelector = '#print-section > swiper > div > div.swiper-wrapper > div.swiper-slide.swiper-slide-active > div.col-lg-12.col-md-12.col-sm-12.rate-information > div > h5';
    const productNameElement = await page.waitForSelector(productNameSelector);
    const productName = await productNameElement.evaluate(el => el.textContent.trim().slice(26));
    
    console.log('productName: ', productName);
    console.log('apy: ', apy);
    console.log('minBalance: ', minBalance);
    console.log('maxBalance: ', maxBalance);

    await browser.close();

    return {
        apy,
        productName,
        minBalance,
        maxBalance,
        script: 'pncHighYieldSavings'
    };
};

const goldmanSachsMarcusSavings = async () => {
    console.log('browser')
    const browser = await puppeteer.launch(launchSettings);
    const context = await browser.createIncognitoBrowserContext();
    console.log('page')
    const page = await context.newPage();
    
    page.setViewport(viewPort);
    console.log('goto')
    await page.goto('https://www.marcus.com/us/en/savings/high-yield-savings');

    await page.waitForNetworkIdle()
    console.log('page loaded')

    console.log('submit')
    
    const apySelector = '#text-21874edce3 > h3 > span:nth-child(1)';
    const apyElement = await page.waitForSelector(apySelector);
    const apy = await apyElement.evaluate(el => el.textContent.trim());
    
    const productNameSelector = '#text-b2bf1c8e2a > h1 > span';
    const productNameElement = await page.waitForSelector(productNameSelector);
    const productName = await productNameElement.evaluate(el => el.textContent.trim().slice(26));
    
    console.log('productName: ', productName);
    console.log('apy: ', apy);

    await browser.close();

    return {
        apy,
        productName: productName,
        script: 'goldmanSachsMarcusSavings'
    };
};

const tdSavings = async () => {
    console.log('browser')
    const browser = await puppeteer.launch(launchSettings);
    const context = await browser.createIncognitoBrowserContext();
    console.log('page')
    const page = await context.newPage();
    
    page.setViewport(viewPort);
    console.log('goto')
    await page.goto('https://www.td.com/us/en/personal-banking/savings-accounts/rates');

    await page.waitForNetworkIdle()
    console.log('page loaded')
    
    // Fill out location form
    try {
        console.log('Wait')
        await page.waitForSelector('#dropdownState', { timeout: 5000 });

        await page.click('#dropdownState');
        await page.waitForSelector('#dropdownState > option:nth-child(1)', { timeout: 3000 });
        await page.type('#dropdownState > option:nth-child(1)', 'c');
        await page.keyboard.press('Enter');
        
        await page.waitForSelector('#dropdownCity', { timeout: 3000 });
        await page.click('#dropdownCity');
        await page.waitForSelector('#dropdownCity > option:nth-child(1)', { timeout: 1000 });
        await page.type('#dropdownCity > option:nth-child(1)', 'a');
        await page.keyboard.press('Enter');
        const submitButton = '#cmp-region-selector-modal > div.cmp-dialog__details.cmp-region-selector-modal__main-modal > div.cmp-dialog__body.cmp-region-selector-modal__main-modal__body > div.cmp-region-selector-modal__main-modal__dropdown-section > div.cmp-region-selector-modal__main-modal__dropdown-action-button.cmp-region-selector-modal__main-modal__withOut-location-button';
        await page.click(submitButton);
    } catch (err) {
        console.log('error waiting for selector. Keep going')
    }

    console.log('submit')
    
    const apySelector = '#\\31  > table > tbody > tr.newRowAdded > td';
    const apyElement = await page.waitForSelector(apySelector);
    const apy = await apyElement.evaluate(el => el.textContent);
    
    const productNameSelector = '#tab1 > div.cmp-tabs__tab--content.cmp-text > p';
    const productNameElement = await page.waitForSelector(productNameSelector);
    const productName = await productNameElement.evaluate(el => el.textContent);
    
    console.log('productName: ', productName.trim());
    console.log('apy: ', apy.trim());

    await browser.close();

    return {
        apy,
        productName: productName,
        script: 'tdSavings'
    };
};

const wfSavings = async () => {
    console.log('browser')
    const browser = await puppeteer.launch(launchSettings);
    const context = await browser.createIncognitoBrowserContext();
    console.log('page')
    const page = await context.newPage();
    
    page.setViewport(viewPort);
    console.log('goto')
    await page.goto('https://www.wellsfargo.com/savings-cds/rates/');

    await page.waitForNetworkIdle()
    console.log('page loaded')
    
    try {
        console.log('Wait')
        await page.waitForSelector('#zipcode', { timeout: 5000 });
        console.log('Attempt Type')
        await page.type('#zipcode', '94507');
        const submitButton = '#zipStateForm > div > input.zipStateSubmit';
        await page.click(submitButton);
    } catch (err) {
        console.log('error waiting for selector #zipcode. Keep going')
    }

    // await page.waitForNetworkIdle()
    console.log('submit')
    
    const apySelector = '#contentBody > table:nth-child(9) > tbody > tr > td:nth-child(3)';
    const apyElement = await page.waitForSelector(apySelector);
    const apy = await apyElement.evaluate(el => el.textContent);
    
    const productNameSelector = '#contentBody > h3:nth-child(5)';
    const productNameElement = await page.waitForSelector(productNameSelector);
    const productName = await productNameElement.evaluate(el => el.textContent);
    
    console.log('productName: ', productName.trim());
    console.log('apy: ', apy.trim());

    await browser.close();
    return {
        apy,
        productName,
        script: 'wfSavings'
    };
};

const citiSavings = async () => {
    console.log('browser')
    const browser = await puppeteer.launch(launchSettings);

    console.log('page')
    const page = await browser.newPage();
    
    console.log('goto')
    await page.goto('https://online.citi.com/US/ag/current-interest-rates/savings-accounts');

    console.log('loading')
    await page.waitForNetworkIdle()
    console.log('page loaded')

    console.log('Type')
    await page.type('#zipcode', '94507');

    const submitButton = '#zipcode-modal > div > div.modal-content > div.modal-footer > div > div > citi-cta.modal-primary-btn.btnclassTest.ng-star-inserted';

    await page.click(submitButton);
    await page.waitForNetworkIdle()
    console.log('submit')
    
    const productNameSelector = '#checkingSavingsAATable > app-accordian-table > x-citi-expandables-table > section.expandableModule.browserVersion > div > table > tbody.addTopBorder.ng-star-inserted > tr > td.firstColumnFont > span';
    const productNameElement = await page.waitForSelector(productNameSelector);
    const productName = await productNameElement.evaluate(el => el.textContent);
    const apySelector = '#checkingSavingsBBTable > app-accordian-table > x-citi-expandables-table > section.expandableModule.browserVersion > div > table > tbody.addTopBorder.ng-star-inserted > tr > td:nth-child(2)';
    const apyElement = await page.waitForSelector(apySelector);
    const apy = await apyElement.evaluate(el => el.textContent);
    
    console.log('productName: ', productName.trim().slice(0,12));
    console.log('apy: ', apy.trim());
    
    await browser.close();
    return {
        apy,
        productName,
        script: 'citiSavings'
    };
};

const truistOneSavings = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.truist.com/savings/truist-one-savings/disclosures-and-fees');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
  //     console.log('Wait')
  //     await page.waitForSelector('#zipCode', { timeout: 5000 });
  //     await page.type('#zipCode', '94507');
  //     await page.keyboard.press('Enter');
  // } catch (err) {
  //     console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#deposit-rates-990821443 > div > div > table > tbody > tr > td.deposit-dynamic-rates-table__content-cell.deposit-rate--apy-cell';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#deposit-rates-990821443 > div > div > table > tbody > tr > td.deposit-dynamic-rates-table__content-cell.deposit-rate--tier-cell';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#deposit-rates-990821443 > div > div > table > tbody > tr > td.deposit-dynamic-rates-table__content-cell.deposit-rate--tier-cell';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#gridLayout-181121306 > div > div.text.text__color--midnight-purple.text__weight--semibold.text__align--left--mobile.text__align--center.aem-GridColumn--default--none.aem-GridColumn.aem-GridColumn--default--24.aem-GridColumn--offset--default--0 > div > p';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
      apy,
      productName,
      minBalance,
      maxBalance,
      script: 'truistOneSavings'
  };
};

const capitalOne360PerformanceSavings = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.capitalone.com/bank/savings-accounts/online-performance-savings-account/');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
  //     console.log('Wait')
  //     await page.waitForSelector('#zipCode', { timeout: 5000 });
  //     await page.type('#zipCode', '94507');
  //     await page.keyboard.press('Enter');
  // } catch (err) {
  //     console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#rate > div > div.grv-row.ng-star-inserted > div > slot > div > table > tbody > tr > td:nth-child(2) > rates-inline';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#rate > div > div.grv-row.ng-star-inserted > div > slot > div > table > tbody > tr > td:nth-child(1)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#rate > div > div.grv-row.ng-star-inserted > div > slot > div > table > tbody > tr > td:nth-child(1)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = 'body > content-wrapper > enterprise-root > bank-entry-page > div > bre-render-cms-component > bre-cms-component > bre-container:nth-child(2) > bre-base-component:nth-child(1) > shared-hero-banner > div > shared-hero-lifestyle > section > div > div > div > div > div > shared-hero-card > div > h2';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
      apy,
      productName,
      minBalance,
      maxBalance,
      script: 'capitalOne360PerformanceSavings'
  };
};

const amexHighYieldSavings = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.americanexpress.com/en-us/banking/online-savings/account/');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
  //     console.log('Wait')
  //     await page.waitForSelector('#zipCode', { timeout: 5000 });
  //     await page.type('#zipCode', '94507');
  //     await page.keyboard.press('Enter');
  // } catch (err) {
  //     console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#hysa-apy-2';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = 'body > div.container-fluid.pad-0-lr > div > div > div:nth-child(4) > div > div.container > div > div > div > div:nth-child(2) > div > div.container > div > div:nth-child(1) > div > div:nth-child(2) > div > p > b > span';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = 'body > div.container-fluid.pad-0-lr > div > div > div:nth-child(4) > div > div.container > div > div > div > div:nth-child(2) > div > div.container > div > div:nth-child(1) > div > div:nth-child(2) > div > p > b > span';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = 'body > div.container-fluid.pad-0-lr > div > div > div:nth-child(3) > div > div.container > div > div:nth-child(1) > div > div.account-card > div > div > div > div > div.col-xl-8.col-lg-12.col-md-12 > div > p > b';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
      apy,
      productName,
      minBalance,
      maxBalance,
      script: 'amexHYSA'
  };
};

const usaaSavings1 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.usaa.com/inet/wc/bank-savings?wa_ref=pub_global_banking_savings');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  try {
      console.log('Wait')
      const ratesLink = '#flowWrapper > div.page-wrapper.site-content.yui3-g > div.main-content.yui3-u > div.page-content > div > div:nth-child(9) > section > div.lower-link > a';
      await page.waitForSelector(ratesLink);
      await page.click(ratesLink);
  } catch (err) {
      console.log('error waiting for selector. Keep going')
  }

  console.log('submit')
  
  const apySelector = '#savings-rate-modal > div > div.modal-body > div:nth-child(2) > table > tbody > tr:nth-child(1) > td.table-td.text-right';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#savings-rate-modal > div > div.modal-body > div:nth-child(2) > table > tbody > tr:nth-child(1) > td.table-td.text-left';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#savings-rate-modal > div > div.modal-body > div:nth-child(2) > table > tbody > tr:nth-child(1) > td.table-td.text-left';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#savings-rate-modal > div > div.modal-body > div.tableheading > div.tableheading-left';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
      apy,
      productName,
      minBalance,
      maxBalance,
      script: 'usaaSavings1'
  };
};

const usaaSavings2 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.usaa.com/inet/wc/bank-savings?wa_ref=pub_global_banking_savings');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  try {
      console.log('Wait')
      const ratesLink = '#flowWrapper > div.page-wrapper.site-content.yui3-g > div.main-content.yui3-u > div.page-content > div > div:nth-child(9) > section > div.lower-link > a';
      await page.waitForSelector(ratesLink);
      await page.click(ratesLink);
  } catch (err) {
      console.log('error waiting for selector. Keep going')
  }

  console.log('submit')
  
  const apySelector = '#savings-rate-modal > div > div.modal-body > div:nth-child(2) > table > tbody > tr:nth-child(2) > td.table-td.text-right';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#savings-rate-modal > div > div.modal-body > div:nth-child(2) > table > tbody > tr:nth-child(2) > td.table-td.text-left';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#savings-rate-modal > div > div.modal-body > div:nth-child(2) > table > tbody > tr:nth-child(2) > td.table-td.text-left';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#savings-rate-modal > div > div.modal-body > div.tableheading > div.tableheading-left';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
      apy,
      productName,
      minBalance,
      maxBalance,
      script: 'usaaSavings2'
  };
};

const usaaSavings3 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.usaa.com/inet/wc/bank-savings?wa_ref=pub_global_banking_savings');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  try {
      console.log('Wait')
      const ratesLink = '#flowWrapper > div.page-wrapper.site-content.yui3-g > div.main-content.yui3-u > div.page-content > div > div:nth-child(9) > section > div.lower-link > a';
      await page.waitForSelector(ratesLink);
      await page.click(ratesLink);
  } catch (err) {
      console.log('error waiting for selector. Keep going')
  }

  console.log('submit')
  
  const apySelector = '#savings-rate-modal > div > div.modal-body > div:nth-child(2) > table > tbody > tr:nth-child(3) > td.table-td.text-right';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#savings-rate-modal > div > div.modal-body > div:nth-child(2) > table > tbody > tr:nth-child(3) > td.table-td.text-left';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#savings-rate-modal > div > div.modal-body > div:nth-child(2) > table > tbody > tr:nth-child(3) > td.table-td.text-left';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#savings-rate-modal > div > div.modal-body > div.tableheading > div.tableheading-left';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
      apy,
      productName,
      minBalance,
      maxBalance,
      script: 'usaaSavings3'
  };
};

const usaaSavings4 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.usaa.com/inet/wc/bank-savings?wa_ref=pub_global_banking_savings');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  try {
      console.log('Wait')
      const ratesLink = '#flowWrapper > div.page-wrapper.site-content.yui3-g > div.main-content.yui3-u > div.page-content > div > div:nth-child(9) > section > div.lower-link > a';
      await page.waitForSelector(ratesLink);
      await page.click(ratesLink);
  } catch (err) {
      console.log('error waiting for selector. Keep going')
  }

  console.log('submit')
  
  const apySelector = '#savings-rate-modal > div > div.modal-body > div:nth-child(2) > table > tbody > tr:nth-child(4) > td.table-td.text-right';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#savings-rate-modal > div > div.modal-body > div:nth-child(2) > table > tbody > tr:nth-child(4) > td.table-td.text-left';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#savings-rate-modal > div > div.modal-body > div:nth-child(2) > table > tbody > tr:nth-child(4) > td.table-td.text-left';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#savings-rate-modal > div > div.modal-body > div.tableheading > div.tableheading-left';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
      apy,
      productName,
      minBalance,
      maxBalance,
      script: 'usaaSavings4'
  };
};

const usaaPerformanceFirstSavings1 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.usaa.com/inet/wc/bank-savings?wa_ref=pub_global_banking_savings');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  try {
      console.log('Wait')
      const ratesLink = '#flowWrapper > div.page-wrapper.site-content.yui3-g > div.main-content.yui3-u > div.page-content > div > div:nth-child(9) > section > div.lower-link > a';
      await page.waitForSelector(ratesLink);
      await page.click(ratesLink);
  } catch (err) {
      console.log('error waiting for selector. Keep going')
  }

  console.log('submit')
  
  const apySelector = '#savings-rate-modal > div > div.modal-body > div:nth-child(3) > table > tbody > tr:nth-child(1) > td.table-td.text-right';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#savings-rate-modal > div > div.modal-body > div:nth-child(3) > table > tbody > tr:nth-child(1) > td.table-td.text-left';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#savings-rate-modal > div > div.modal-body > div:nth-child(3) > table > tbody > tr:nth-child(1) > td.table-td.text-left';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#savings-rate-modal > div > div.modal-body > div:nth-child(2) > div > div.tableheading-left';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
      apy,
      productName,
      minBalance,
      maxBalance,
      script: 'usaaPerformanceFirstSavings1'
  };
};

const usaaPerformanceFirstSavings2 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.usaa.com/inet/wc/bank-savings?wa_ref=pub_global_banking_savings');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  try {
      console.log('Wait')
      const ratesLink = '#flowWrapper > div.page-wrapper.site-content.yui3-g > div.main-content.yui3-u > div.page-content > div > div:nth-child(9) > section > div.lower-link > a';
      await page.waitForSelector(ratesLink);
      await page.click(ratesLink);
  } catch (err) {
      console.log('error waiting for selector. Keep going')
  }

  console.log('submit')
  
  const apySelector = '#savings-rate-modal > div > div.modal-body > div:nth-child(3) > table > tbody > tr:nth-child(2) > td.table-td.text-right';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#savings-rate-modal > div > div.modal-body > div:nth-child(3) > table > tbody > tr:nth-child(2) > td.table-td.text-left';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#savings-rate-modal > div > div.modal-body > div:nth-child(3) > table > tbody > tr:nth-child(2) > td.table-td.text-left';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#savings-rate-modal > div > div.modal-body > div:nth-child(2) > div > div.tableheading-left';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
      apy,
      productName,
      minBalance,
      maxBalance,
      script: 'usaaPerformanceFirstSavings2'
  };
};

const usaaPerformanceFirstSavings3 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.usaa.com/inet/wc/bank-savings?wa_ref=pub_global_banking_savings');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  try {
      console.log('Wait')
      const ratesLink = '#flowWrapper > div.page-wrapper.site-content.yui3-g > div.main-content.yui3-u > div.page-content > div > div:nth-child(9) > section > div.lower-link > a';
      await page.waitForSelector(ratesLink);
      await page.click(ratesLink);
  } catch (err) {
      console.log('error waiting for selector. Keep going')
  }

  console.log('submit')
  
  const apySelector = '#savings-rate-modal > div > div.modal-body > div:nth-child(3) > table > tbody > tr:nth-child(3) > td.table-td.text-right';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#savings-rate-modal > div > div.modal-body > div:nth-child(3) > table > tbody > tr:nth-child(3) > td.table-td.text-left';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#savings-rate-modal > div > div.modal-body > div:nth-child(3) > table > tbody > tr:nth-child(3) > td.table-td.text-left';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#savings-rate-modal > div > div.modal-body > div:nth-child(2) > div > div.tableheading-left';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
      apy,
      productName,
      minBalance,
      maxBalance,
      script: 'usaaPerformanceFirstSavings3'
  };
};

const usaaPerformanceFirstSavings4 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.usaa.com/inet/wc/bank-savings?wa_ref=pub_global_banking_savings');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  try {
      console.log('Wait')
      const ratesLink = '#flowWrapper > div.page-wrapper.site-content.yui3-g > div.main-content.yui3-u > div.page-content > div > div:nth-child(9) > section > div.lower-link > a';
      await page.waitForSelector(ratesLink);
      await page.click(ratesLink);
  } catch (err) {
      console.log('error waiting for selector. Keep going')
  }

  console.log('submit')
  
  const apySelector = '#savings-rate-modal > div > div.modal-body > div:nth-child(3) > table > tbody > tr:nth-child(4) > td.table-td.text-right';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#savings-rate-modal > div > div.modal-body > div:nth-child(3) > table > tbody > tr:nth-child(4) > td.table-td.text-left';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#savings-rate-modal > div > div.modal-body > div:nth-child(3) > table > tbody > tr:nth-child(4) > td.table-td.text-left';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#savings-rate-modal > div > div.modal-body > div:nth-child(2) > div > div.tableheading-left';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
      apy,
      productName,
      minBalance,
      maxBalance,
      script: 'usaaPerformanceFirstSavings4'
  };
};

const usaaPerformanceFirstSavings5 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.usaa.com/inet/wc/bank-savings?wa_ref=pub_global_banking_savings');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  try {
      console.log('Wait')
      const ratesLink = '#flowWrapper > div.page-wrapper.site-content.yui3-g > div.main-content.yui3-u > div.page-content > div > div:nth-child(9) > section > div.lower-link > a';
      await page.waitForSelector(ratesLink);
      await page.click(ratesLink);
  } catch (err) {
      console.log('error waiting for selector. Keep going')
  }

  console.log('submit')
  
  const apySelector = '#savings-rate-modal > div > div.modal-body > div:nth-child(3) > table > tbody > tr:nth-child(5) > td.table-td.text-right';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#savings-rate-modal > div > div.modal-body > div:nth-child(3) > table > tbody > tr:nth-child(5) > td.table-td.text-left';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#savings-rate-modal > div > div.modal-body > div:nth-child(3) > table > tbody > tr:nth-child(5) > td.table-td.text-left';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#savings-rate-modal > div > div.modal-body > div:nth-child(2) > div > div.tableheading-left';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
      apy,
      productName,
      minBalance,
      maxBalance,
      script: 'usaaPerformanceFirstSavings5'
  };
};

const usaaPerformanceFirstSavings6 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.usaa.com/inet/wc/bank-savings?wa_ref=pub_global_banking_savings');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  try {
      console.log('Wait')
      const ratesLink = '#flowWrapper > div.page-wrapper.site-content.yui3-g > div.main-content.yui3-u > div.page-content > div > div:nth-child(9) > section > div.lower-link > a';
      await page.waitForSelector(ratesLink);
      await page.click(ratesLink);
  } catch (err) {
      console.log('error waiting for selector. Keep going')
  }

  console.log('submit')
  
  const apySelector = '#savings-rate-modal > div > div.modal-body > div:nth-child(3) > table > tbody > tr:nth-child(6) > td.table-td.text-right';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#savings-rate-modal > div > div.modal-body > div:nth-child(3) > table > tbody > tr:nth-child(6) > td.table-td.text-left';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#savings-rate-modal > div > div.modal-body > div:nth-child(3) > table > tbody > tr:nth-child(6) > td.table-td.text-left';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#savings-rate-modal > div > div.modal-body > div:nth-child(2) > div > div.tableheading-left';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
      apy,
      productName,
      minBalance,
      maxBalance,
      script: 'usaaPerformanceFirstSavings6'
  };
};

const usaaPerformanceFirstSavings7 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.usaa.com/inet/wc/bank-savings?wa_ref=pub_global_banking_savings');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  try {
      console.log('Wait')
      const ratesLink = '#flowWrapper > div.page-wrapper.site-content.yui3-g > div.main-content.yui3-u > div.page-content > div > div:nth-child(9) > section > div.lower-link > a';
      await page.waitForSelector(ratesLink);
      await page.click(ratesLink);
  } catch (err) {
      console.log('error waiting for selector. Keep going')
  }

  console.log('submit')
  
  const apySelector = '#savings-rate-modal > div > div.modal-body > div:nth-child(3) > table > tbody > tr:nth-child(7) > td.table-td.text-right';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#savings-rate-modal > div > div.modal-body > div:nth-child(3) > table > tbody > tr:nth-child(7) > td.table-td.text-left';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#savings-rate-modal > div > div.modal-body > div:nth-child(3) > table > tbody > tr:nth-child(7) > td.table-td.text-left';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#savings-rate-modal > div > div.modal-body > div:nth-child(2) > div > div.tableheading-left';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
      apy,
      productName,
      minBalance,
      maxBalance,
      script: 'usaaPerformanceFirstSavings7'
  };
};

const usaaPerformanceFirstSavings8 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.usaa.com/inet/wc/bank-savings?wa_ref=pub_global_banking_savings');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  try {
      console.log('Wait')
      const ratesLink = '#flowWrapper > div.page-wrapper.site-content.yui3-g > div.main-content.yui3-u > div.page-content > div > div:nth-child(9) > section > div.lower-link > a';
      await page.waitForSelector(ratesLink);
      await page.click(ratesLink);
  } catch (err) {
      console.log('error waiting for selector. Keep going')
  }

  console.log('submit')
  
  const apySelector = '#savings-rate-modal > div > div.modal-body > div:nth-child(3) > table > tbody > tr:nth-child(8) > td.table-td.text-right';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#savings-rate-modal > div > div.modal-body > div:nth-child(3) > table > tbody > tr:nth-child(8) > td.table-td.text-left';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#savings-rate-modal > div > div.modal-body > div:nth-child(3) > table > tbody > tr:nth-child(8) > td.table-td.text-left';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#savings-rate-modal > div > div.modal-body > div:nth-child(2) > div > div.tableheading-left';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
      apy,
      productName,
      minBalance,
      maxBalance,
      script: 'usaaPerformanceFirstSavings8'
  };
};

const citizensQuestSavings1 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.citizensbank.com/savings/savings-accounts/quest.aspx#');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  try {
    console.log('Wait')
    const ratesLink = '#modal1';
    await page.waitForSelector(ratesLink);
    await page.click(ratesLink);
  } catch (err) {
    console.log('error waiting for selector. Keep going')
  }

  console.log('submit')
  
  const apySelector = '#\\31 650952907344 > section > div > div > div:nth-child(3) > div > div.dcom-c-featureGrid__item-content > div.repaymemt_modal.hls_reveal-modal-bg.modal1.active > div > div > div.hls_modal_content > table > tbody > tr:nth-child(1) > td:nth-child(2) > span';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#\\31 650952907344 > section > div > div > div:nth-child(3) > div > div.dcom-c-featureGrid__item-content > div.repaymemt_modal.hls_reveal-modal-bg.modal1.active > div > div > div.hls_modal_content > table > tbody > tr:nth-child(1) > td:nth-child(1)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#\\31 650952907344 > section > div > div > div:nth-child(3) > div > div.dcom-c-featureGrid__item-content > div.repaymemt_modal.hls_reveal-modal-bg.modal1.active > div > div > div.hls_modal_content > table > tbody > tr:nth-child(1) > td:nth-child(1)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());

  const productNameSelector = '#\\31 650952907344 > section > div > div > div:nth-child(3) > div > div.dcom-c-featureGrid__item-content > div.repaymemt_modal.hls_reveal-modal-bg.modal1.active > div > div > div.hls_modal_header > h2';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());

  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
      apy,
      productName,
      minBalance,
      maxBalance,
      script: 'citizensQuestSavings1'
  };
};

const citizensQuestSavings2 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.citizensbank.com/savings/savings-accounts/quest.aspx#');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  try {
      console.log('Wait')
      const ratesLink = '#modal1';
      await page.waitForSelector(ratesLink);
      await page.click(ratesLink);
  } catch (err) {
      console.log('error waiting for selector. Keep going')
  }

  console.log('submit')
  
  const apySelector = '#\\31 650952907344 > section > div > div > div:nth-child(3) > div > div.dcom-c-featureGrid__item-content > div.repaymemt_modal.hls_reveal-modal-bg.modal1.active > div > div > div.hls_modal_content > table > tbody > tr:nth-child(2) > td:nth-child(2) > span';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#\\31 650952907344 > section > div > div > div:nth-child(3) > div > div.dcom-c-featureGrid__item-content > div.repaymemt_modal.hls_reveal-modal-bg.modal1.active > div > div > div.hls_modal_content > table > tbody > tr:nth-child(2) > td:nth-child(1)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#\\31 650952907344 > section > div > div > div:nth-child(3) > div > div.dcom-c-featureGrid__item-content > div.repaymemt_modal.hls_reveal-modal-bg.modal1.active > div > div > div.hls_modal_content > table > tbody > tr:nth-child(2) > td:nth-child(1)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#\\31 650952907344 > section > div > div > div:nth-child(3) > div > div.dcom-c-featureGrid__item-content > div.repaymemt_modal.hls_reveal-modal-bg.modal1.active > div > div > div.hls_modal_header > h2';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
      apy,
      productName,
      minBalance,
      maxBalance,
      script: 'citizensQuestSavings2'
  };
};

const citizensQuestSavings3 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.citizensbank.com/savings/savings-accounts/quest.aspx#');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  try {
      console.log('Wait')
      const ratesLink = '#modal1';
      await page.waitForSelector(ratesLink);
      await page.click(ratesLink);
  } catch (err) {
      console.log('error waiting for selector. Keep going')
  }

  console.log('submit')
  
  const apySelector = '#\\31 650952907344 > section > div > div > div:nth-child(3) > div > div.dcom-c-featureGrid__item-content > div.repaymemt_modal.hls_reveal-modal-bg.modal1.active > div > div > div.hls_modal_content > table > tbody > tr:nth-child(3) > td:nth-child(2) > span';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#\\31 650952907344 > section > div > div > div:nth-child(3) > div > div.dcom-c-featureGrid__item-content > div.repaymemt_modal.hls_reveal-modal-bg.modal1.active > div > div > div.hls_modal_content > table > tbody > tr:nth-child(3) > td:nth-child(1)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#\\31 650952907344 > section > div > div > div:nth-child(3) > div > div.dcom-c-featureGrid__item-content > div.repaymemt_modal.hls_reveal-modal-bg.modal1.active > div > div > div.hls_modal_content > table > tbody > tr:nth-child(3) > td:nth-child(1)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#\\31 650952907344 > section > div > div > div:nth-child(3) > div > div.dcom-c-featureGrid__item-content > div.repaymemt_modal.hls_reveal-modal-bg.modal1.active > div > div > div.hls_modal_header > h2';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
      apy,
      productName,
      minBalance,
      maxBalance,
      script: 'citizensQuestSavings3'
  };
};

const citizensQuestSavings4 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.citizensbank.com/savings/savings-accounts/quest.aspx#');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  try {
      console.log('Wait')
      const ratesLink = '#modal1';
      await page.waitForSelector(ratesLink);
      await page.click(ratesLink);
  } catch (err) {
      console.log('error waiting for selector. Keep going')
  }

  console.log('submit')
  
  const apySelector = '#\\31 650952907344 > section > div > div > div:nth-child(3) > div > div.dcom-c-featureGrid__item-content > div.repaymemt_modal.hls_reveal-modal-bg.modal1.active > div > div > div.hls_modal_content > table > tbody > tr:nth-child(4) > td:nth-child(2) > span';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#\\31 650952907344 > section > div > div > div:nth-child(3) > div > div.dcom-c-featureGrid__item-content > div.repaymemt_modal.hls_reveal-modal-bg.modal1.active > div > div > div.hls_modal_content > table > tbody > tr:nth-child(4) > td:nth-child(1)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#\\31 650952907344 > section > div > div > div:nth-child(3) > div > div.dcom-c-featureGrid__item-content > div.repaymemt_modal.hls_reveal-modal-bg.modal1.active > div > div > div.hls_modal_content > table > tbody > tr:nth-child(4) > td:nth-child(1)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#\\31 650952907344 > section > div > div > div:nth-child(3) > div > div.dcom-c-featureGrid__item-content > div.repaymemt_modal.hls_reveal-modal-bg.modal1.active > div > div > div.hls_modal_header > h2';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
      apy,
      productName,
      minBalance,
      maxBalance,
      script: 'citizensQuestSavings4'
  };
};

const citizensQuestSavings5 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.citizensbank.com/savings/savings-accounts/quest.aspx#');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  try {
      console.log('Wait')
      const ratesLink = '#modal1';
      await page.waitForSelector(ratesLink);
      await page.click(ratesLink);
  } catch (err) {
      console.log('error waiting for selector. Keep going')
  }

  console.log('submit')
  
  const apySelector = '#\\31 650952907344 > section > div > div > div:nth-child(3) > div > div.dcom-c-featureGrid__item-content > div.repaymemt_modal.hls_reveal-modal-bg.modal1.active > div > div > div.hls_modal_content > table > tbody > tr:nth-child(5) > td:nth-child(2) > span';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#\\31 650952907344 > section > div > div > div:nth-child(3) > div > div.dcom-c-featureGrid__item-content > div.repaymemt_modal.hls_reveal-modal-bg.modal1.active > div > div > div.hls_modal_content > table > tbody > tr:nth-child(5) > td:nth-child(1)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#\\31 650952907344 > section > div > div > div:nth-child(3) > div > div.dcom-c-featureGrid__item-content > div.repaymemt_modal.hls_reveal-modal-bg.modal1.active > div > div > div.hls_modal_content > table > tbody > tr:nth-child(5) > td:nth-child(1)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#\\31 650952907344 > section > div > div > div:nth-child(3) > div > div.dcom-c-featureGrid__item-content > div.repaymemt_modal.hls_reveal-modal-bg.modal1.active > div > div > div.hls_modal_header > h2';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
      apy,
      productName,
      minBalance,
      maxBalance,
      script: 'citizensQuestSavings5'
  };
};

const citizensQuestSavings6 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.citizensbank.com/savings/savings-accounts/quest.aspx#');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  try {
      console.log('Wait')
      const ratesLink = '#modal1';
      await page.waitForSelector(ratesLink);
      await page.click(ratesLink);
  } catch (err) {
      console.log('error waiting for selector. Keep going')
  }

  console.log('submit')
  
  const apySelector = '#\\31 650952907344 > section > div > div > div:nth-child(3) > div > div.dcom-c-featureGrid__item-content > div.repaymemt_modal.hls_reveal-modal-bg.modal1.active > div > div > div.hls_modal_content > table > tbody > tr:nth-child(6) > td:nth-child(2) > span';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#\\31 650952907344 > section > div > div > div:nth-child(3) > div > div.dcom-c-featureGrid__item-content > div.repaymemt_modal.hls_reveal-modal-bg.modal1.active > div > div > div.hls_modal_content > table > tbody > tr:nth-child(6) > td:nth-child(1)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#\\31 650952907344 > section > div > div > div:nth-child(3) > div > div.dcom-c-featureGrid__item-content > div.repaymemt_modal.hls_reveal-modal-bg.modal1.active > div > div > div.hls_modal_content > table > tbody > tr:nth-child(6) > td:nth-child(1)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#\\31 650952907344 > section > div > div > div:nth-child(3) > div > div.dcom-c-featureGrid__item-content > div.repaymemt_modal.hls_reveal-modal-bg.modal1.active > div > div > div.hls_modal_header > h2';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
      apy,
      productName,
      minBalance,
      maxBalance,
      script: 'citizensQuestSavings6'
  };
};

const citizensQuestSavings7 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.citizensbank.com/savings/savings-accounts/quest.aspx#');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  try {
      console.log('Wait')
      const ratesLink = '#modal1';
      await page.waitForSelector(ratesLink);
      await page.click(ratesLink);
  } catch (err) {
      console.log('error waiting for selector. Keep going')
  }

  console.log('submit')
  
  const apySelector = '#\\31 650952907344 > section > div > div > div:nth-child(3) > div > div.dcom-c-featureGrid__item-content > div.repaymemt_modal.hls_reveal-modal-bg.modal1.active > div > div > div.hls_modal_content > table > tbody > tr:nth-child(7) > td:nth-child(2) > span';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#\\31 650952907344 > section > div > div > div:nth-child(3) > div > div.dcom-c-featureGrid__item-content > div.repaymemt_modal.hls_reveal-modal-bg.modal1.active > div > div > div.hls_modal_content > table > tbody > tr:nth-child(7) > td:nth-child(1)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#\\31 650952907344 > section > div > div > div:nth-child(3) > div > div.dcom-c-featureGrid__item-content > div.repaymemt_modal.hls_reveal-modal-bg.modal1.active > div > div > div.hls_modal_content > table > tbody > tr:nth-child(7) > td:nth-child(1)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#\\31 650952907344 > section > div > div > div:nth-child(3) > div > div.dcom-c-featureGrid__item-content > div.repaymemt_modal.hls_reveal-modal-bg.modal1.active > div > div > div.hls_modal_header > h2';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
      apy,
      productName,
      minBalance,
      maxBalance,
      script: 'citizensQuestSavings7'
  };
};

const citizensQuestSavings8 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.citizensbank.com/savings/savings-accounts/quest.aspx#');
  
  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  try {
      console.log('Wait')
      const ratesLink = '#modal1';
      await page.waitForSelector(ratesLink);
      await page.click(ratesLink);
    } catch (err) {
      console.log('error waiting for selector. Keep going')
    }
    
    console.log('submit')
    
    const apySelector = '#\\31 650952907344 > section > div > div > div:nth-child(3) > div > div.dcom-c-featureGrid__item-content > div.repaymemt_modal.hls_reveal-modal-bg.modal1.active > div > div > div.hls_modal_content > table > tbody > tr:nth-child(8) > td:nth-child(2) > span';
    const apyElement = await page.waitForSelector(apySelector);
    const apy = await apyElement.evaluate(el => el.textContent.trim());
    
    const minBalanceSelector = '#\\31 650952907344 > section > div > div > div:nth-child(3) > div > div.dcom-c-featureGrid__item-content > div.repaymemt_modal.hls_reveal-modal-bg.modal1.active > div > div > div.hls_modal_content > table > tbody > tr:nth-child(8) > td:nth-child(1)';
    const minBalanceElement = await page.waitForSelector(minBalanceSelector);
    const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());
    
    const maxBalanceSelector = '#\\31 650952907344 > section > div > div > div:nth-child(3) > div > div.dcom-c-featureGrid__item-content > div.repaymemt_modal.hls_reveal-modal-bg.modal1.active > div > div > div.hls_modal_content > table > tbody > tr:nth-child(8) > td:nth-child(1)';
    const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
    const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
    
    const productNameSelector = '#\\31 650952907344 > section > div > div > div:nth-child(3) > div > div.dcom-c-featureGrid__item-content > div.repaymemt_modal.hls_reveal-modal-bg.modal1.active > div > div > div.hls_modal_header > h2';
    const productNameElement = await page.waitForSelector(productNameSelector);
    const productName = await productNameElement.evaluate(el => el.textContent.trim());
    
    console.log('productName: ', productName);
    console.log('apy: ', apy);
    console.log('minBalance: ', minBalance);
    console.log('maxBalance: ', maxBalance);
    
    await browser.close();
    
    return {
      apy,
      productName,
      minBalance,
      maxBalance,
      script: 'citizensQuestSavings8'
    };
};
  
const bettermentSavings = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.betterment.com/cash-reserve');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
  //     console.log('Wait')
  //     const ratesLink = '#modal1';
  //     await page.waitForSelector(ratesLink);
  //     await page.click(ratesLink);
  // } catch (err) {
  //     console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#hs_cos_wrapper_module_16301570831873 > div > div:nth-child(2) > p:nth-child(1)';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#hs_cos_wrapper_module_16301570831873 > div > div:nth-child(2) > p:nth-child(1)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#hs_cos_wrapper_module_16301570831873 > div > div:nth-child(2) > p:nth-child(1)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#hs_cos_wrapper_module_16301570831873 > div > div:nth-child(2) > p:nth-child(1)';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'bettermentSavings'
  };
};
  
const wealthfrontSavings = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.wealthfront.com/cash');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
  //     console.log('Wait')
  //     const ratesLink = '#modal1';
  //     await page.waitForSelector(ratesLink);
  //     await page.click(ratesLink);
  // } catch (err) {
  //     console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#__next > div.min-h-screen.bg-gradient-to-b.from-ambient-peach.to-light-slate.bg-fixed.text-eggplant > main > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div > div > div:nth-child(1)';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#__next > div.min-h-screen.bg-gradient-to-b.from-ambient-peach.to-light-slate.bg-fixed.text-eggplant > main > div:nth-child(2) > div > div:nth-child(2) > div > div:nth-child(2)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#__next > div.min-h-screen.bg-gradient-to-b.from-ambient-peach.to-light-slate.bg-fixed.text-eggplant > main > div:nth-child(2) > div > div:nth-child(2) > div > div:nth-child(2)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#__next > div.min-h-screen.bg-gradient-to-b.from-ambient-peach.to-light-slate.bg-fixed.text-eggplant > main > div.bg-white > div > div > div > div:nth-child(2)';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'wealthfrontSavingsCash'
  };
};
  
const bmoSavingsBuilder = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.bmo.com/en-us/main/personal/savings-and-cds/savings-builder/?zipcode=60603#savings-builder-rates');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  try {
      console.log('Wait')
      const inputElement = '#standard-cd-zipcode-value-mobile-2';
      await page.waitForSelector(inputElement);
      await page.type(inputElement, '94507');
      await page.keyboard.press('Enter');
  } catch (err) {
      console.log('error waiting for selector. Keep going')
  }

  console.log('submit')
  
  const apySelector = '#persAnnualPerventageYield > span';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#persMinimumBalance';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#persMinimumBalance';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#persSavingsBuilderRates > div.heebo.font-weight--bold.sm-font-size--22.md-font-size--28.sm-line-height--2.sm-mb--1';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'bmoSavings'
  };
};
  
const mtRelationshipSavings = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www3.mtb.com/personal/personal-banking/savings-and-certificate-of-deposit-cds/savings-account-and-cd-options/open-a-relationship-savings-account');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
  //     console.log('Wait')
  //     const inputElement = '#standard-cd-zipcode-value-mobile-2';
  //     await page.waitForSelector(inputElement);
  //     await page.type(inputElement, '94507');
  //     await page.keyboard.press('Enter');
  // } catch (err) {
  //     console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#skiptomaincontent > div > div > div.responsivegrid.aem-GridColumn--default--none.aem-GridColumn.aem-GridColumn--default--11.aem-GridColumn--offset--default--1 > div > div.columns.aem-GridColumn.aem-GridColumn--default--11 > div > div > div > div > div.raw-html.section > div > table > tbody > tr > td:nth-child(3) > p';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#skiptomaincontent > div > div > div.responsivegrid.aem-GridColumn--default--none.aem-GridColumn.aem-GridColumn--default--11.aem-GridColumn--offset--default--1 > div > div.columns.aem-GridColumn.aem-GridColumn--default--11 > div > div > div > div > div.richtext.text.section > div > table > tbody > tr:nth-child(2) > td:nth-child(2)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#skiptomaincontent > div > div > div.responsivegrid.aem-GridColumn--default--none.aem-GridColumn.aem-GridColumn--default--11.aem-GridColumn--offset--default--1 > div > div.columns.aem-GridColumn.aem-GridColumn--default--11 > div > div > div > div > div.raw-html.section > div > table > tbody > tr > td:nth-child(1) > p';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#skiptomaincontent > div > div > div.responsivegrid.aem-GridColumn--default--none.aem-GridColumn.aem-GridColumn--default--11.aem-GridColumn--offset--default--1 > div > div.hero.aem-GridColumn.aem-GridColumn--default--11 > section > div > div > div.hero-title > h1';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'm&t relationship savings'
  };
};

const keyBankActiveSaver1 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://onlinea.key.com/uap/SvltKdd?mode=3&id=KCOCHT-WALT');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  try {
		console.log('Wait')
		const inputElement = '#txtZip';
		await page.waitForSelector(inputElement);
		await page.type(inputElement, '10451'); // NY
		await page.keyboard.press('Enter');
  } catch (err) {
		console.log('error waiting for selector. Keep going')
  }

  console.log('submit')
  
  const apySelector = 'body > main > article > div.page__content > div:nth-child(4) > div > div > div:nth-child(1) > table > tbody > tr:nth-child(2) > td';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = 'body > main > article > div.page__content > div:nth-child(4) > div > div > div:nth-child(1) > h3';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = 'body > main > article > div.page__content > div:nth-child(4) > div > div > div:nth-child(1) > h3';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = 'body > main > article > div.page__header > h1 > p';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'key active saver 1'
  };
};

const keyBankActiveSaver2 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://onlinea.key.com/uap/SvltKdd?mode=3&id=KCOCHT-WALT');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  try {
		console.log('Wait')
		const inputElement = '#txtZip';
		await page.waitForSelector(inputElement);
		await page.type(inputElement, '10451'); // NY
		await page.keyboard.press('Enter');
  } catch (err) {
		console.log('error waiting for selector. Keep going')
  }

  console.log('submit')
  
  const apySelector = 'body > main > article > div.page__content > div:nth-child(4) > div > div > div:nth-child(2) > table > tbody > tr:nth-child(2) > td';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = 'body > main > article > div.page__content > div:nth-child(4) > div > div > div:nth-child(2) > h3';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = 'body > main > article > div.page__content > div:nth-child(4) > div > div > div:nth-child(2) > h3';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = 'body > main > article > div.page__header > h1 > p';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'key active saver 2'
  };
};

const keyBankActiveSaver3 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://onlinea.key.com/uap/SvltKdd?mode=3&id=KCOCHT-WALT');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  try {
		console.log('Wait')
		const inputElement = '#txtZip';
		await page.waitForSelector(inputElement);
		await page.type(inputElement, '10451'); // NY
		await page.keyboard.press('Enter');
  } catch (err) {
		console.log('error waiting for selector. Keep going')
  }

  console.log('submit')
  
  const apySelector = 'body > main > article > div.page__content > div:nth-child(4) > div > div > div:nth-child(3) > table > tbody > tr:nth-child(2) > td';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = 'body > main > article > div.page__content > div:nth-child(4) > div > div > div:nth-child(3) > h3';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = 'body > main > article > div.page__content > div:nth-child(4) > div > div > div:nth-child(3) > h3';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = 'body > main > article > div.page__header > h1 > p';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'key active saver 3'
  };
};

const keyBankActiveSaver4 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://onlinea.key.com/uap/SvltKdd?mode=3&id=KCOCHT-WALT');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  try {
		console.log('Wait')
		const inputElement = '#txtZip';
		await page.waitForSelector(inputElement);
		await page.type(inputElement, '10451'); // NY
		await page.keyboard.press('Enter');
  } catch (err) {
		console.log('error waiting for selector. Keep going')
  }

  console.log('submit')
  
  const apySelector = 'body > main > article > div.page__content > div:nth-child(4) > div > div > div:nth-child(4) > table > tbody > tr:nth-child(2) > td';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = 'body > main > article > div.page__content > div:nth-child(4) > div > div > div:nth-child(4) > h3';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = 'body > main > article > div.page__content > div:nth-child(4) > div > div > div:nth-child(4) > h3';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = 'body > main > article > div.page__header > h1 > p';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'key active saver 4'
  };
};

const keyBankActiveSaver5 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://onlinea.key.com/uap/SvltKdd?mode=3&id=KCOCHT-WALT');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  try {
		console.log('Wait')
		const inputElement = '#txtZip';
		await page.waitForSelector(inputElement);
		await page.type(inputElement, '10451'); // NY
		await page.keyboard.press('Enter');
  } catch (err) {
		console.log('error waiting for selector. Keep going')
  }

  console.log('submit')
  
  const apySelector = 'body > main > article > div.page__content > div:nth-child(4) > div > div > div:nth-child(5) > table > tbody > tr:nth-child(2) > td';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = 'body > main > article > div.page__content > div:nth-child(4) > div > div > div:nth-child(5) > h3';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = 'body > main > article > div.page__content > div:nth-child(4) > div > div > div:nth-child(5) > h3';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = 'body > main > article > div.page__header > h1 > p';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'key active saver 5'
  };
};

const keyBankActiveSaver6 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://onlinea.key.com/uap/SvltKdd?mode=3&id=KCOCHT-WALT');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  try {
		console.log('Wait')
		const inputElement = '#txtZip';
		await page.waitForSelector(inputElement);
		await page.type(inputElement, '10451'); // NY
		await page.keyboard.press('Enter');
  } catch (err) {
		console.log('error waiting for selector. Keep going')
  }

  console.log('submit')
  
  const apySelector = 'body > main > article > div.page__content > div:nth-child(4) > div > div > div:nth-child(6) > table > tbody > tr:nth-child(2) > td';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = 'body > main > article > div.page__content > div:nth-child(4) > div > div > div:nth-child(6) > h3';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = 'body > main > article > div.page__content > div:nth-child(4) > div > div > div:nth-child(6) > h3';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = 'body > main > article > div.page__header > h1 > p';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'key active saver 6'
  };
};

const keyBankActiveSaver7 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://onlinea.key.com/uap/SvltKdd?mode=3&id=KCOCHT-WALT');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  try {
		console.log('Wait')
		const inputElement = '#txtZip';
		await page.waitForSelector(inputElement);
		await page.type(inputElement, '10451'); // NY
		await page.keyboard.press('Enter');
  } catch (err) {
		console.log('error waiting for selector. Keep going')
  }

  console.log('submit')
  
  const apySelector = 'body > main > article > div.page__content > div:nth-child(4) > div > div > div:nth-child(7) > table > tbody > tr:nth-child(2) > td';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = 'body > main > article > div.page__content > div:nth-child(4) > div > div > div:nth-child(7) > h3';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = 'body > main > article > div.page__content > div:nth-child(4) > div > div > div:nth-child(7) > h3';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = 'body > main > article > div.page__header > h1 > p';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'key active saver 7'
  };
};

const keyBankActiveSaver8 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://onlinea.key.com/uap/SvltKdd?mode=3&id=KCOCHT-WALT');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  try {
		console.log('Wait')
		const inputElement = '#txtZip';
		await page.waitForSelector(inputElement);
		await page.type(inputElement, '10451'); // NY
		await page.keyboard.press('Enter');
  } catch (err) {
		console.log('error waiting for selector. Keep going')
  }

  console.log('submit')
  
  const apySelector = 'body > main > article > div.page__content > div:nth-child(4) > div > div > div:nth-child(8) > table > tbody > tr:nth-child(2) > td';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = 'body > main > article > div.page__content > div:nth-child(4) > div > div > div:nth-child(8) > h3';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = 'body > main > article > div.page__content > div:nth-child(4) > div > div > div:nth-child(8) > h3';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = 'body > main > article > div.page__header > h1 > p';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'key active saver 3'
  };
};

const keyBankActiveSaver9 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://onlinea.key.com/uap/SvltKdd?mode=3&id=KCOCHT-WALT');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  try {
		console.log('Wait')
		const inputElement = '#txtZip';
		await page.waitForSelector(inputElement);
		await page.type(inputElement, '10451'); // NY
		await page.keyboard.press('Enter');
  } catch (err) {
		console.log('error waiting for selector. Keep going')
  }

  console.log('submit')
  
  const apySelector = 'body > main > article > div.page__content > div:nth-child(4) > div > div > div:nth-child(9) > table > tbody > tr:nth-child(2) > td';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = 'body > main > article > div.page__content > div:nth-child(4) > div > div > div:nth-child(9) > h3';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = 'body > main > article > div.page__content > div:nth-child(4) > div > div > div:nth-child(9) > h3';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = 'body > main > article > div.page__header > h1 > p';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'key active saver 9'
  };
};

const keyBankActiveSaver10 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://onlinea.key.com/uap/SvltKdd?mode=3&id=KCOCHT-WALT');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  try {
		console.log('Wait')
		const inputElement = '#txtZip';
		await page.waitForSelector(inputElement);
		await page.type(inputElement, '10451'); // NY
		await page.keyboard.press('Enter');
  } catch (err) {
		console.log('error waiting for selector. Keep going')
  }

  console.log('submit')
  
  const apySelector = 'body > main > article > div.page__content > div:nth-child(4) > div > div > div:nth-child(10) > table > tbody > tr:nth-child(2) > td';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = 'body > main > article > div.page__content > div:nth-child(4) > div > div > div:nth-child(10) > h3';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = 'body > main > article > div.page__content > div:nth-child(4) > div > div > div:nth-child(10) > h3';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = 'body > main > article > div.page__header > h1 > p';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'key active saver 10'
  };
};

const allySavings = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.ally.com/bank/online-savings-account/');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const inputElement = '#txtZip';
	// 	await page.waitForSelector(inputElement);
	// 	await page.type(inputElement, '10451'); // NY
	// 	await page.keyboard.press('Enter');
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#b25b6f1bddfd12df6268ca89a9775cca > div.allysf-rates-v1.-txt-brand-plum-700.-txt-size-60.-tiers-3 > div > p > span > span';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#b25b6f1bddfd12df6268ca89a9775cca > div.allysf-text-v1.-pad-bottom-25 > p > span';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#b25b6f1bddfd12df6268ca89a9775cca > div.allysf-text-v1.-pad-bottom-25 > p > span';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#b25b6f1bddfd12df6268ca89a9775cca > div.allysf-heading-v1.-pad-bottom-10 > h1 > span';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'ally savings'
  };
};

const santanderSavings = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.santanderbank.com/personal/savings/savings');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const inputElement = '#txtZip';
	// 	await page.waitForSelector(inputElement);
	// 	await page.type(inputElement, '10451'); // NY
	// 	await page.keyboard.press('Enter');
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#fragment-0-yfth > div > div > div > span';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#fragment-0-qbae > div > div > div > span';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#fragment-0-qbae > div > div > div > span';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#fragment-8793393-epuo > div > div > div > div.col2frag-txt > div.headtxt > div > h1';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'santander savings'
  };
};

const discoverOnlineSavings = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.discover.com/online-banking/savings-account/?ICMPGN=PUB_HNAV_BANK_SAVINGS');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const inputElement = '#txtZip';
	// 	await page.waitForSelector(inputElement);
	// 	await page.type(inputElement, '10451'); // NY
	// 	await page.keyboard.press('Enter');
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#main-content-rwd > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div > div.reskin-banner-infobar > div > div > div.product-introduction > div > span.apy';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#main-content-rwd > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div > div.reskin-banner-infobar > div > div > div.prod-saving-cash-back-content';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#main-content-rwd > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div > div.reskin-banner-infobar > div > div > div.prod-saving-cash-back-content';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#main-content-rwd > div.aem-Grid.aem-Grid--12.aem-Grid--default--12 > div > div.reskin-banner-infobar > div > div > div.prod-saving-cash-back-content';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'discover online savings'
  };
};

const firstCitizensSavings = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://firstcitizens.com/personal/savings/online-savings-account');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const inputElement = '#txtZip';
	// 	await page.waitForSelector(inputElement);
	// 	await page.type(inputElement, '10451'); // NY
	// 	await page.keyboard.press('Enter');
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#fcbMainContent > article > section > article > section > article > section.fcb-lc.fcb-lc--white > article > div.fcb-list > div > div:nth-child(2) > div.fcb-list__content-main > div > p';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#fcb-collapse__content--9 > div > div:nth-child(2) > div:nth-child(1)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#fcb-collapse__content--9 > div > div:nth-child(2) > div:nth-child(1)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#fcbMainContent > article > div.fcb-hero > div > h1';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'first citizen online savings'
  };
};

const firstHorizonSavings = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.firsthorizon.com/Personal/Products-and-Services/Banking/Savings-and-CDs/Traditional-Savings');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const inputElement = '#txtZip';
	// 	await page.waitForSelector(inputElement);
	// 	await page.type(inputElement, '10451'); // NY
	// 	await page.keyboard.press('Enter');
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#main > section.right-rail__block > div > div > div.col-md-8 > div > ul:nth-child(11) > li';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#main > section.right-rail__block > div > div > div.col-md-8 > div > ul:nth-child(2) > li:nth-child(2)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#main > section.right-rail__block > div > div > div.col-md-8 > div > ul:nth-child(2) > li:nth-child(2)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#main > section.subpage-hero.d-flex.align-items-center.subpage-hero--dark > div > div > div > h1';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'first horizon traditional savings'
  };
};

const synchronySavings1 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.synchronybank.com/banking/high-yield-savings/?UISCode=0000000');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const inputElement = '#txtZip';
	// 	await page.waitForSelector(inputElement);
	// 	await page.type(inputElement, '10451'); // NY
	// 	await page.keyboard.press('Enter');
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#rate-table-new-wrapper > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(2) > td > div';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#rate-table-new-wrapper > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(1) > td > div';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#rate-table-new-wrapper > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(1) > td > div';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#rate-table-hys > div.rate-table-new-header > h2';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'synchrony savings 1'
  };
};

const synchronySavings2 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.synchronybank.com/banking/high-yield-savings/?UISCode=0000000');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const inputElement = '#txtZip';
	// 	await page.waitForSelector(inputElement);
	// 	await page.type(inputElement, '10451'); // NY
	// 	await page.keyboard.press('Enter');
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#rate-table-new-wrapper > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > div';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#rate-table-new-wrapper > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(1) > td > div';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#rate-table-new-wrapper > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(1) > td > div';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#rate-table-hys > div.rate-table-new-header > h2';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'synchrony savings 2'
  };
};

const synchronySavings3 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.synchronybank.com/banking/high-yield-savings/?UISCode=0000000');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const inputElement = '#txtZip';
	// 	await page.waitForSelector(inputElement);
	// 	await page.type(inputElement, '10451'); // NY
	// 	await page.keyboard.press('Enter');
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#rate-table-new-wrapper > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(2) > td > div';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#rate-table-new-wrapper > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(1) > td > div';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#rate-table-new-wrapper > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(1) > td > div';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#rate-table-hys > div.rate-table-new-header > h2';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'synchrony savings 3'
  };
};

const citPlatinumSavings2 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.cit.com/cit-bank/bank/savings/platinum-savings-account');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const inputElement = '#txtZip';
	// 	await page.waitForSelector(inputElement);
	// 	await page.type(inputElement, '10451'); // NY
	// 	await page.keyboard.press('Enter');
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#content > app-layout:nth-child(1) > section:nth-child(2) > div > app-flex-column > div > div:nth-child(4)';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#content > app-layout:nth-child(1) > section:nth-child(2) > div > app-flex-column > div > div:nth-child(4)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#content > app-layout:nth-child(1) > section:nth-child(2) > div > app-flex-column > div > div:nth-child(4)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#content > app-layout:nth-child(1) > section.CIT-section.CIT-background--gray-l.CIT-hero--condensed > div.CIT-container > app-hero > div > div.CIT-hero-content--main.CIT-text--align-center > h1';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'cit platinum savings 2'
  };
};

const citPlatinumSavings1 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.cit.com/cit-bank/bank/savings/platinum-savings-account');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const inputElement = '#txtZip';
	// 	await page.waitForSelector(inputElement);
	// 	await page.type(inputElement, '10451'); // NY
	// 	await page.keyboard.press('Enter');
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#content > app-layout:nth-child(1) > section:nth-child(2) > div > app-flex-column > div > div';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#content > app-layout:nth-child(1) > section:nth-child(2) > div > app-flex-column > div > div';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#content > app-layout:nth-child(1) > section:nth-child(2) > div > app-flex-column > div > div';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#content > app-layout:nth-child(1) > section.CIT-section.CIT-background--gray-l.CIT-hero--condensed > div.CIT-container > app-hero > div > div.CIT-hero-content--main.CIT-text--align-center > h1';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'cit platinum savings 1'
  };
};

const citSavingsConnect = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.cit.com/cit-bank/bank/savings/savings-connect-account');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const inputElement = '#txtZip';
	// 	await page.waitForSelector(inputElement);
	// 	await page.type(inputElement, '10451'); // NY
	// 	await page.keyboard.press('Enter');
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#content > app-layout:nth-child(1) > section.CIT-section.CIT-background--gray-l.CIT-hero--condensed > div.CIT-container > app-hero > div > div.CIT-hero-content--main.CIT-text--align-center > div.CIT-rate.CIT-typography--font-weight-bold > div.CIT-rate__value.CIT-typography--font-weight-bold';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#content > app-layout:nth-child(1) > section.CIT-section.CIT-background--gray-l.CIT-hero--condensed > div.CIT-container > app-hero > div > div.CIT-hero-content--main.CIT-text--align-center > p > p';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#content > app-layout:nth-child(1) > section.CIT-section.CIT-background--gray-l.CIT-hero--condensed > div.CIT-container > app-hero > div > div.CIT-hero-content--main.CIT-text--align-center > p > p';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#content > app-layout:nth-child(1) > section.CIT-section.CIT-background--gray-l.CIT-hero--condensed > div.CIT-container > app-hero > div > div.CIT-hero-content--main.CIT-text--align-center > h1';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'cit savings connect'
  };
};

const citSavingsBuilder = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.cit.com/cit-bank/bank/savings/savings-builder-account');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const inputElement = '#txtZip';
	// 	await page.waitForSelector(inputElement);
	// 	await page.type(inputElement, '10451'); // NY
	// 	await page.keyboard.press('Enter');
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#content > app-layout:nth-child(1) > section.CIT-section.CIT-background--gray-l.CIT-hero--condensed > div.CIT-container > app-hero > div > div.CIT-hero-content--main.CIT-text--align-center > div.CIT-rate.CIT-typography--font-weight-bold > div.CIT-rate__value.CIT-typography--font-weight-bold > span';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#content > app-layout:nth-child(1) > section.CIT-section.CIT-background--gray-l.CIT-hero--condensed > div.CIT-container > app-hero > div > div.CIT-hero-content--main.CIT-text--align-center > p > p';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#content > app-layout:nth-child(1) > section.CIT-section.CIT-background--gray-l.CIT-hero--condensed > div.CIT-container > app-hero > div > div.CIT-hero-content--main.CIT-text--align-center > p > p';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#content > app-layout:nth-child(1) > section.CIT-section.CIT-background--gray-l.CIT-hero--condensed > div.CIT-container > app-hero > div > div.CIT-hero-content--main.CIT-text--align-center > h1';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'cit savings builder'
  };
};

const comericaStatementSavings = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.comerica.com/personal-finance/banking/savings/statement-savings.html');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  try {
		console.log('Wait')
		const inputElement = '#zipcode';
		await page.waitForSelector(inputElement);
		await page.type(inputElement, '94507'); // Alamo, CA
		await page.keyboard.press('Enter');
  } catch (err) {
		console.log('error waiting for selector. Keep going')
  }

  console.log('submit')
  
  const apySelector = 'body > div.par.responsivegrid > div > div:nth-child(4) > div > div > div > div > div:nth-child(2) > div > table > tbody > tr:nth-child(2) > td:nth-child(3)';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = 'body > div.par.responsivegrid > div > div:nth-child(4) > div > div > div > div > div:nth-child(3) > div > div > div:nth-child(13) > ul > li > span';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = 'body > div.par.responsivegrid > div > div:nth-child(4) > div > div > div > div > div:nth-child(3) > div > div > div:nth-child(13) > ul > li > span';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#herobanner-0332ba0651884b35a9b31bf23e1fef5c > div > div > h1';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'comerica statement savings'
  };
};

const usBankStandardSavings = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.usbank.com/bank-accounts/savings-accounts/standard-savings-account.html');

  await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  try {
		console.log('Wait')
		const modalElement = '#editZipBtn';
		await page.waitForSelector(modalElement);
		await page.click(modalElement);
		const inputElement = '#zipcode_entry';
		await page.waitForSelector(inputElement);
		await page.type(inputElement, '94507'); // Alamo, CA
		await page.keyboard.press('Enter');
		await page.waitForNetworkIdle()
  } catch (err) {
		console.log('error waiting for selector. Keep going')
  }

  console.log('submit')
  
  const apySelector = '#page-80dff77dd6 > div.bodyContent.container-fluid > div > div > div > div:nth-child(4) > div > div:nth-child(5) > section > div > div > div > div.savingRates.DRS > div > table > tbody > tr > td:nth-child(2) > div > p';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#page-80dff77dd6 > div.bodyContent.container-fluid > div > div > div > div:nth-child(4) > div > div:nth-child(5) > section > div > div > div > div.savingRates.DRS > div > table > tbody > tr > td:nth-child(1) > div > p > span';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#page-80dff77dd6 > div.bodyContent.container-fluid > div > div > div > div:nth-child(4) > div > div:nth-child(5) > section > div > div > div > div.savingRates.DRS > div > table > tbody > tr > td:nth-child(1) > div > p > span';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#page-80dff77dd6 > div.bodyContent.container-fluid > div > div > div > div:nth-child(4) > div > div:nth-child(5) > section > div > div > div > div.savingRates.DRS > div > div.body > h3';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'us bank standard savings'
  };
};

const valleyAllAccessSavings = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.valley.com/personal/banking/savings/all-access-savings');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  try {
		console.log('Wait')
		// const modalElement = '#editZipBtn';
		// await page.waitForSelector(modalElement);
		// await page.click(modalElement);
		const inputElement = '#ctl00_ctl00_cphMain_cpMain_ucProductDetailPage_ChangeLocation';
		await page.waitForSelector(inputElement);
		await page.type(inputElement, '94507'); // Alamo, CA
		await page.keyboard.press('Enter');
		await page.waitForNetworkIdle()
  } catch (err) {
		console.log('error waiting for selector. Keep going')
  }

  console.log('submit')
  
  const apySelector = '#ctl00_ctl00_cphMain_cpMain_ucProductDetailPage_KeyBenefits > div > ul > li > div > div > div > ul > li:nth-child(1)';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#ctl00_ctl00_cphMain_cpMain_ucProductDetailPage_KeyBenefits > div > ul > li > div > div > div > ul > li:nth-child(3)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#ctl00_ctl00_cphMain_cpMain_ucProductDetailPage_KeyBenefits > div > ul > li > div > div > div > ul > li:nth-child(3)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#aspnetForm > div.off-canvas-wrapper > div.main-content > div > div.row.icon--button_section > div.columns.small-12.medium-8 > h2';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'valley all access savings'
  };
};

const frostSavings = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.frostbank.com/personal/banking/savings-options/savings-account');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	// const modalElement = '#editZipBtn';
	// 	// await page.waitForSelector(modalElement);
	// 	// await page.click(modalElement);
	// 	const inputElement = '#ctl00_ctl00_cphMain_cpMain_ucProductDetailPage_ChangeLocation';
	// 	await page.waitForSelector(inputElement);
	// 	await page.type(inputElement, '94507'); // Alamo, CA
	// 	await page.keyboard.press('Enter');
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#savings-rates > div > table > tbody > tr > td:nth-child(2) > div';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#content > article > div.wrapping-container.container-fluid.pb-64 > div > div > div > div.row.p-16 > div.col-12.col-md-6.unset.default.default > div > div > div:nth-child(3) > ul > li:nth-child(1)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#content > article > div.wrapping-container.container-fluid.pb-64 > div > div > div > div.row.p-16 > div.col-12.col-md-6.unset.default.default > div > div > div:nth-child(3) > ul > li:nth-child(1)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#content > article > div.wrapping-container.container-fluid.pb-64 > div > div > div > div.row.p-16 > div.col-12.col-md-5.offset-md-1.pb-64.text-left.d-flex.flex-column.justify-content-center.default.default > div > div > h1 > strong';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'frost savings'
  };
};

const popularSavings1 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.popularbank.com/savings/popular-savings-new-york/');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	// const modalElement = '#editZipBtn';
	// 	// await page.waitForSelector(modalElement);
	// 	// await page.click(modalElement);
	// 	const inputElement = '#ctl00_ctl00_cphMain_cpMain_ucProductDetailPage_ChangeLocation';
	// 	await page.waitForSelector(inputElement);
	// 	await page.type(inputElement, '94507'); // Alamo, CA
	// 	await page.keyboard.press('Enter');
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#main_content > div:nth-child(2) > div > div > div > div.table-wrapper > table > tbody > tr:nth-child(2) > td:nth-child(3)';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#main_content > div:nth-child(2) > div > div > div > div.table-wrapper > table > tbody > tr:nth-child(2) > td:nth-child(1)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#main_content > div:nth-child(2) > div > div > div > div.table-wrapper > table > tbody > tr:nth-child(2) > td:nth-child(1)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#sec-title-1 > div > div.col-md-10 > div > h1';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'popular savings 1'
  };
};

const popularSavings2 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.popularbank.com/savings/popular-savings-new-york/');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	// const modalElement = '#editZipBtn';
	// 	// await page.waitForSelector(modalElement);
	// 	// await page.click(modalElement);
	// 	const inputElement = '#ctl00_ctl00_cphMain_cpMain_ucProductDetailPage_ChangeLocation';
	// 	await page.waitForSelector(inputElement);
	// 	await page.type(inputElement, '94507'); // Alamo, CA
	// 	await page.keyboard.press('Enter');
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#main_content > div:nth-child(2) > div > div > div > div.table-wrapper > table > tbody > tr:nth-child(3) > td:nth-child(3)';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#main_content > div:nth-child(2) > div > div > div > div.table-wrapper > table > tbody > tr:nth-child(3) > td:nth-child(1)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#main_content > div:nth-child(2) > div > div > div > div.table-wrapper > table > tbody > tr:nth-child(3) > td:nth-child(1)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#sec-title-1 > div > div.col-md-10 > div > h1';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'popular savings 2'
  };
};

const popularSavings3 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.popularbank.com/savings/popular-savings-new-york/');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	// const modalElement = '#editZipBtn';
	// 	// await page.waitForSelector(modalElement);
	// 	// await page.click(modalElement);
	// 	const inputElement = '#ctl00_ctl00_cphMain_cpMain_ucProductDetailPage_ChangeLocation';
	// 	await page.waitForSelector(inputElement);
	// 	await page.type(inputElement, '94507'); // Alamo, CA
	// 	await page.keyboard.press('Enter');
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#main_content > div:nth-child(2) > div > div > div > div.table-wrapper > table > tbody > tr:nth-child(4) > td:nth-child(3)';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#main_content > div:nth-child(2) > div > div > div > div.table-wrapper > table > tbody > tr:nth-child(4) > td:nth-child(1)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#main_content > div:nth-child(2) > div > div > div > div.table-wrapper > table > tbody > tr:nth-child(4) > td:nth-child(1)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#sec-title-1 > div > div.col-md-10 > div > h1';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'popular savings 3'
  };
};

const popularSavings4 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.popularbank.com/savings/popular-savings-new-york/');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	// const modalElement = '#editZipBtn';
	// 	// await page.waitForSelector(modalElement);
	// 	// await page.click(modalElement);
	// 	const inputElement = '#ctl00_ctl00_cphMain_cpMain_ucProductDetailPage_ChangeLocation';
	// 	await page.waitForSelector(inputElement);
	// 	await page.type(inputElement, '94507'); // Alamo, CA
	// 	await page.keyboard.press('Enter');
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#main_content > div:nth-child(2) > div > div > div > div.table-wrapper > table > tbody > tr:nth-child(5) > td:nth-child(3)';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#main_content > div:nth-child(2) > div > div > div > div.table-wrapper > table > tbody > tr:nth-child(5) > td:nth-child(1)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#main_content > div:nth-child(2) > div > div > div > div.table-wrapper > table > tbody > tr:nth-child(5) > td:nth-child(1)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#sec-title-1 > div > div.col-md-10 > div > h1';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'popular savings 4'
  };
};

const popularSavings5 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.popularbank.com/savings/popular-savings-new-york/');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	// const modalElement = '#editZipBtn';
	// 	// await page.waitForSelector(modalElement);
	// 	// await page.click(modalElement);
	// 	const inputElement = '#ctl00_ctl00_cphMain_cpMain_ucProductDetailPage_ChangeLocation';
	// 	await page.waitForSelector(inputElement);
	// 	await page.type(inputElement, '94507'); // Alamo, CA
	// 	await page.keyboard.press('Enter');
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#main_content > div:nth-child(2) > div > div > div > div.table-wrapper > table > tbody > tr:nth-child(6) > td:nth-child(3)';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#main_content > div:nth-child(2) > div > div > div > div.table-wrapper > table > tbody > tr:nth-child(6) > td:nth-child(1)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#main_content > div:nth-child(2) > div > div > div > div.table-wrapper > table > tbody > tr:nth-child(6) > td:nth-child(1)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#sec-title-1 > div > div.col-md-10 > div > h1';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'popular savings 5'
  };
};

const southStatePersonalSavings = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.southstatebank.com/personal/bank/interest-rates-for-personal-checking-and-savings');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	// const modalElement = '#editZipBtn';
	// 	// await page.waitForSelector(modalElement);
	// 	// await page.click(modalElement);
	// 	const inputElement = '#ctl00_ctl00_cphMain_cpMain_ucProductDetailPage_ChangeLocation';
	// 	await page.waitForSelector(inputElement);
	// 	await page.type(inputElement, '94507'); // Alamo, CA
	// 	await page.keyboard.press('Enter');
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = 'body > div > div.border-container > main > section > div.bottom > section > div > table:nth-child(6) > tbody > tr:nth-child(2) > td:nth-child(4)';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = 'body > div > div.border-container > main > section > div.bottom > section > div > table:nth-child(6) > tbody > tr:nth-child(2) > td:nth-child(2)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = 'body > div > div.border-container > main > section > div.bottom > section > div > table:nth-child(6) > tbody > tr:nth-child(2) > td:nth-child(2)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = 'body > div > div.border-container > main > section > div.bottom > section > div > table:nth-child(6) > tbody > tr:nth-child(2) > td:nth-child(1) > strong';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'south state personal savings'
  };
};

const southStateGoldSavings1 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.southstatebank.com/personal/bank/interest-rates-for-personal-checking-and-savings');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	// const modalElement = '#editZipBtn';
	// 	// await page.waitForSelector(modalElement);
	// 	// await page.click(modalElement);
	// 	const inputElement = '#ctl00_ctl00_cphMain_cpMain_ucProductDetailPage_ChangeLocation';
	// 	await page.waitForSelector(inputElement);
	// 	await page.type(inputElement, '94507'); // Alamo, CA
	// 	await page.keyboard.press('Enter');
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = 'body > div > div.border-container > main > section > div.bottom > section > div > table:nth-child(6) > tbody > tr:nth-child(3) > td:nth-child(4)';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = 'body > div > div.border-container > main > section > div.bottom > section > div > table:nth-child(6) > tbody > tr:nth-child(3) > td:nth-child(2)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = 'body > div > div.border-container > main > section > div.bottom > section > div > table:nth-child(6) > tbody > tr:nth-child(3) > td:nth-child(2)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = 'body > div > div.border-container > main > section > div.bottom > section > div > table:nth-child(6) > tbody > tr:nth-child(3) > td:nth-child(1) > strong';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'south state gold savings 1'
  };
};

const southStateGoldSavings2 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.southstatebank.com/personal/bank/interest-rates-for-personal-checking-and-savings');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	// const modalElement = '#editZipBtn';
	// 	// await page.waitForSelector(modalElement);
	// 	// await page.click(modalElement);
	// 	const inputElement = '#ctl00_ctl00_cphMain_cpMain_ucProductDetailPage_ChangeLocation';
	// 	await page.waitForSelector(inputElement);
	// 	await page.type(inputElement, '94507'); // Alamo, CA
	// 	await page.keyboard.press('Enter');
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = 'body > div > div.border-container > main > section > div.bottom > section > div > table:nth-child(6) > tbody > tr:nth-child(3) > td:nth-child(4)';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = 'body > div > div.border-container > main > section > div.bottom > section > div > table:nth-child(6) > tbody > tr:nth-child(4) > td:nth-child(1)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = 'body > div > div.border-container > main > section > div.bottom > section > div > table:nth-child(6) > tbody > tr:nth-child(4) > td:nth-child(1)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = 'body > div > div.border-container > main > section > div.bottom > section > div > table:nth-child(6) > tbody > tr:nth-child(3) > td:nth-child(1) > strong';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'south state personal savings 2'
  };
};

const southStateGoldSavings3 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.southstatebank.com/personal/bank/interest-rates-for-personal-checking-and-savings');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	// const modalElement = '#editZipBtn';
	// 	// await page.waitForSelector(modalElement);
	// 	// await page.click(modalElement);
	// 	const inputElement = '#ctl00_ctl00_cphMain_cpMain_ucProductDetailPage_ChangeLocation';
	// 	await page.waitForSelector(inputElement);
	// 	await page.type(inputElement, '94507'); // Alamo, CA
	// 	await page.keyboard.press('Enter');
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = 'body > div > div.border-container > main > section > div.bottom > section > div > table:nth-child(6) > tbody > tr:nth-child(5) > td:nth-child(3)';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = 'body > div > div.border-container > main > section > div.bottom > section > div > table:nth-child(6) > tbody > tr:nth-child(5) > td:nth-child(1)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = 'body > div > div.border-container > main > section > div.bottom > section > div > table:nth-child(6) > tbody > tr:nth-child(5) > td:nth-child(1)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = 'body > div > div.border-container > main > section > div.bottom > section > div > table:nth-child(6) > tbody > tr:nth-child(3) > td:nth-child(1) > strong';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'south state personal savings 3'
  };
};

const southStateGoldSavings4 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.southstatebank.com/personal/bank/interest-rates-for-personal-checking-and-savings');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	// const modalElement = '#editZipBtn';
	// 	// await page.waitForSelector(modalElement);
	// 	// await page.click(modalElement);
	// 	const inputElement = '#ctl00_ctl00_cphMain_cpMain_ucProductDetailPage_ChangeLocation';
	// 	await page.waitForSelector(inputElement);
	// 	await page.type(inputElement, '94507'); // Alamo, CA
	// 	await page.keyboard.press('Enter');
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = 'body > div > div.border-container > main > section > div.bottom > section > div > table:nth-child(6) > tbody > tr:nth-child(6) > td:nth-child(3)';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = 'body > div > div.border-container > main > section > div.bottom > section > div > table:nth-child(6) > tbody > tr:nth-child(6) > td:nth-child(1)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = 'body > div > div.border-container > main > section > div.bottom > section > div > table:nth-child(6) > tbody > tr:nth-child(6) > td:nth-child(1)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = 'body > div > div.border-container > main > section > div.bottom > section > div > table:nth-child(6) > tbody > tr:nth-child(3) > td:nth-child(1) > strong';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'south state personal savings 4'
  };
};

const southStateGoldSavings5 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.southstatebank.com/personal/bank/interest-rates-for-personal-checking-and-savings');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	// const modalElement = '#editZipBtn';
	// 	// await page.waitForSelector(modalElement);
	// 	// await page.click(modalElement);
	// 	const inputElement = '#ctl00_ctl00_cphMain_cpMain_ucProductDetailPage_ChangeLocation';
	// 	await page.waitForSelector(inputElement);
	// 	await page.type(inputElement, '94507'); // Alamo, CA
	// 	await page.keyboard.press('Enter');
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = 'body > div > div.border-container > main > section > div.bottom > section > div > table:nth-child(6) > tbody > tr:nth-child(7) > td:nth-child(3)';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = 'body > div > div.border-container > main > section > div.bottom > section > div > table:nth-child(6) > tbody > tr:nth-child(7) > td:nth-child(1)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = 'body > div > div.border-container > main > section > div.bottom > section > div > table:nth-child(6) > tbody > tr:nth-child(7) > td:nth-child(1)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = 'body > div > div.border-container > main > section > div.bottom > section > div > table:nth-child(6) > tbody > tr:nth-child(3) > td:nth-child(1) > strong';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'south state personal savings 5'
  };
};

const southStateGoldSavings6 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.southstatebank.com/personal/bank/interest-rates-for-personal-checking-and-savings');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	// const modalElement = '#editZipBtn';
	// 	// await page.waitForSelector(modalElement);
	// 	// await page.click(modalElement);
	// 	const inputElement = '#ctl00_ctl00_cphMain_cpMain_ucProductDetailPage_ChangeLocation';
	// 	await page.waitForSelector(inputElement);
	// 	await page.type(inputElement, '94507'); // Alamo, CA
	// 	await page.keyboard.press('Enter');
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = 'body > div > div.border-container > main > section > div.bottom > section > div > table:nth-child(6) > tbody > tr:nth-child(8) > td:nth-child(3)';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = 'body > div > div.border-container > main > section > div.bottom > section > div > table:nth-child(6) > tbody > tr:nth-child(8) > td:nth-child(1)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = 'body > div > div.border-container > main > section > div.bottom > section > div > table:nth-child(6) > tbody > tr:nth-child(8) > td:nth-child(1)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = 'body > div > div.border-container > main > section > div.bottom > section > div > table:nth-child(6) > tbody > tr:nth-child(3) > td:nth-child(1) > strong';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'south state personal savings 6'
  };
};

const firstNationalBankFirstRateSavings1 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.fnb-online.com/personal/checking-savings/regional-rates');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  try {
		console.log('Wait')
		// const modalElement = '#editZipBtn';
		// await page.waitForSelector(modalElement);
		// await page.click(modalElement);
		const inputElement = '#zip';
		await page.waitForSelector(inputElement);
		await page.type(inputElement, '15201'); // Pittsburg, PA
		await page.keyboard.press('Enter');
		await page.waitForNetworkIdle()
  } catch (err) {
		console.log('error waiting for selector. Keep going')
  }

  console.log('submit')
  
  const apySelector = '#main > div:nth-child(2) > div > div > div > div.regional-rate__table-wrap > div:nth-child(4) > table > tbody > tr:nth-child(1) > td:nth-child(3)';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#main > div:nth-child(2) > div > div > div > div.regional-rate__table-wrap > div:nth-child(4) > table > tbody > tr:nth-child(1) > td:nth-child(2)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#main > div:nth-child(2) > div > div > div > div.regional-rate__table-wrap > div:nth-child(4) > table > tbody > tr:nth-child(1) > td:nth-child(2)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#main > div:nth-child(2) > div > div > div > div.regional-rate__table-wrap > div:nth-child(4) > h2';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'first national bank first rate savings 1'
  };
};

const firstNationalBankFirstRateSavings2 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.fnb-online.com/personal/checking-savings/regional-rates');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  try {
		console.log('Wait')
		// const modalElement = '#editZipBtn';
		// await page.waitForSelector(modalElement);
		// await page.click(modalElement);
		const inputElement = '#zip';
		await page.waitForSelector(inputElement);
		await page.type(inputElement, '15201'); // Pittsburg, PA
		await page.keyboard.press('Enter');
		await page.waitForNetworkIdle()
  } catch (err) {
		console.log('error waiting for selector. Keep going')
  }

  console.log('submit')
  
  const apySelector = '#main > div:nth-child(2) > div > div > div > div.regional-rate__table-wrap > div:nth-child(4) > table > tbody > tr:nth-child(2) > td:nth-child(3)';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#main > div:nth-child(2) > div > div > div > div.regional-rate__table-wrap > div:nth-child(1) > table > tbody > tr:nth-child(2) > td:nth-child(2)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#main > div:nth-child(2) > div > div > div > div.regional-rate__table-wrap > div:nth-child(1) > table > tbody > tr:nth-child(2) > td:nth-child(2)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#main > div:nth-child(2) > div > div > div > div.regional-rate__table-wrap > div:nth-child(4) > h2';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'first national bank first rate savings 2'
  };
};

const firstNationalBankFirstRateSavings3 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.fnb-online.com/personal/checking-savings/regional-rates');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  try {
		console.log('Wait')
		// const modalElement = '#editZipBtn';
		// await page.waitForSelector(modalElement);
		// await page.click(modalElement);
		const inputElement = '#zip';
		await page.waitForSelector(inputElement);
		await page.type(inputElement, '15201'); // Pittsburg, PA
		await page.keyboard.press('Enter');
		await page.waitForNetworkIdle()
  } catch (err) {
		console.log('error waiting for selector. Keep going')
  }

  console.log('submit')
  
  const apySelector = '#main > div:nth-child(2) > div > div > div > div.regional-rate__table-wrap > div:nth-child(4) > table > tbody > tr:nth-child(3) > td:nth-child(3)';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#main > div:nth-child(2) > div > div > div > div.regional-rate__table-wrap > div:nth-child(1) > table > tbody > tr:nth-child(3) > td:nth-child(2)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#main > div:nth-child(2) > div > div > div > div.regional-rate__table-wrap > div:nth-child(1) > table > tbody > tr:nth-child(3) > td:nth-child(2)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#main > div:nth-child(2) > div > div > div > div.regional-rate__table-wrap > div:nth-child(4) > h2';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'first national bank first rate savings 3'
  };
};

const firstNationalBankFirstRateSavings4 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.fnb-online.com/personal/checking-savings/regional-rates');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  try {
		console.log('Wait')
		// const modalElement = '#editZipBtn';
		// await page.waitForSelector(modalElement);
		// await page.click(modalElement);
		const inputElement = '#zip';
		await page.waitForSelector(inputElement);
		await page.type(inputElement, '15201'); // Pittsburg, PA
		await page.keyboard.press('Enter');
		await page.waitForNetworkIdle()
  } catch (err) {
		console.log('error waiting for selector. Keep going')
  }

  console.log('submit')
  
  const apySelector = '#main > div:nth-child(2) > div > div > div > div.regional-rate__table-wrap > div:nth-child(4) > table > tbody > tr:nth-child(4) > td:nth-child(3)';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#main > div:nth-child(2) > div > div > div > div.regional-rate__table-wrap > div:nth-child(1) > table > tbody > tr:nth-child(4) > td:nth-child(2)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#main > div:nth-child(2) > div > div > div > div.regional-rate__table-wrap > div:nth-child(1) > table > tbody > tr:nth-child(4) > td:nth-child(2)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#main > div:nth-child(2) > div > div > div > div.regional-rate__table-wrap > div:nth-child(4) > h2';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'first national bank first rate savings 4'
  };
};

const firstNationalBankFirstRateSavings5 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.fnb-online.com/personal/checking-savings/regional-rates');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  try {
		console.log('Wait')
		// const modalElement = '#editZipBtn';
		// await page.waitForSelector(modalElement);
		// await page.click(modalElement);
		const inputElement = '#zip';
		await page.waitForSelector(inputElement);
		await page.type(inputElement, '15201'); // Pittsburg, PA
		await page.keyboard.press('Enter');
		await page.waitForNetworkIdle()
  } catch (err) {
		console.log('error waiting for selector. Keep going')
  }

  console.log('submit')
  
  const apySelector = '#main > div:nth-child(2) > div > div > div > div.regional-rate__table-wrap > div:nth-child(4) > table > tbody > tr:nth-child(5) > td:nth-child(3)';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#main > div:nth-child(2) > div > div > div > div.regional-rate__table-wrap > div:nth-child(1) > table > tbody > tr:nth-child(5) > td:nth-child(2)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#main > div:nth-child(2) > div > div > div > div.regional-rate__table-wrap > div:nth-child(1) > table > tbody > tr:nth-child(5) > td:nth-child(2)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#main > div:nth-child(2) > div > div > div > div.regional-rate__table-wrap > div:nth-child(4) > h2';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'first national bank first rate savings 5'
  };
};

const firstNationalBankFirstRateSavings6 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.fnb-online.com/personal/checking-savings/regional-rates');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  try {
		console.log('Wait')
		// const modalElement = '#editZipBtn';
		// await page.waitForSelector(modalElement);
		// await page.click(modalElement);
		const inputElement = '#zip';
		await page.waitForSelector(inputElement);
		await page.type(inputElement, '15201'); // Pittsburg, PA
		await page.keyboard.press('Enter');
		await page.waitForNetworkIdle()
  } catch (err) {
		console.log('error waiting for selector. Keep going')
  }

  console.log('submit')
  
  const apySelector = '#main > div:nth-child(2) > div > div > div > div.regional-rate__table-wrap > div:nth-child(4) > table > tbody > tr:nth-child(6) > td:nth-child(3)';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#main > div:nth-child(2) > div > div > div > div.regional-rate__table-wrap > div:nth-child(1) > table > tbody > tr:nth-child(6) > td:nth-child(2)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#main > div:nth-child(2) > div > div > div > div.regional-rate__table-wrap > div:nth-child(1) > table > tbody > tr:nth-child(6) > td:nth-child(2)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#main > div:nth-child(2) > div > div > div > div.regional-rate__table-wrap > div:nth-child(4) > h2';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'first national bank first rate savings 6'
  };
};

const tiaaYieldPledgeOnlineSavings = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.tiaabank.com/banking/online-savings');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  try {
		console.log('Wait')
		const modalElement = '#main > div:nth-child(3) > div:nth-child(2) > section > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > tb-interest-calc-v2 > div > div:nth-child(2) > div:nth-child(2) > p > a';
		await page.waitForSelector(modalElement);
		await page.click(modalElement);
		// const inputElement = '#zip';
		// await page.waitForSelector(inputElement);
		// await page.type(inputElement, '15201'); // Pittsburg, PA
		// await page.keyboard.press('Enter');
		await page.waitForNetworkIdle()
  } catch (err) {
		console.log('error waiting for selector. Keep going')
  }

  console.log('submit')
  
  const apySelector = '#yield-pledge-rates > div > div.modal__scroll > div > div > div > table > tbody > tr > td.table__cell.table__cell_bold.table__cell_ctr';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#yield-pledge-rates > div > div.modal__scroll > div > div > div > table > tbody > tr > td:nth-child(1)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#yield-pledge-rates > div > div.modal__scroll > div > div > div > table > tbody > tr > td:nth-child(1)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#hero-section > div > div > div.hero__main.hero__main_narrow > h1';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'tiaaYieldPledgeOnlineSavings'
  };
};

const commerceRewardsSavings = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://transact.commercebank.com/retail/servlet/SmartForm.html?formCode=unauthenticated&prodtype=DEPOSIT_SAV&prodID=9546');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  try {
		console.log('Wait')
		// const modalElement = '#main > div:nth-child(3) > div:nth-child(2) > section > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > tb-interest-calc-v2 > div > div:nth-child(2) > div:nth-child(2) > p > a';
		// await page.waitForSelector(modalElement);
		// await page.click(modalElement);
		const inputElement = '#zipCode';
		await page.waitForSelector(inputElement);
		await page.type(inputElement, '22180'); // Vienna, VA
		const submitButton = 'body > div.av-dialog-mask.ng-scope > div > form > div > div:nth-child(3) > div > div > div > div > div > button';
		await page.waitForSelector(submitButton);
		await page.click(submitButton)
		// await page.keyboard.press('Enter');
		await page.waitForNetworkIdle()
  } catch (err) {
		console.log('error waiting for selector. Keep going')
  }

  console.log('submit')
  
  const apySelector = '#savingsRates > div > div > div.wdg-section-1-body.vertical-bottom.container-fluid > div:nth-child(1) > div > div:nth-child(3) > div > div > div:nth-child(3) > fieldset > div > div > div > div > div:nth-child(6)';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#savingsRates > div > div > div.wdg-section-1-body.vertical-bottom.container-fluid > div:nth-child(1) > div > div:nth-child(3) > div > div > div:nth-child(3) > fieldset > div > div > div > div > div:nth-child(7)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#savingsRates > div > div > div.wdg-section-1-body.vertical-bottom.container-fluid > div:nth-child(1) > div > div:nth-child(3) > div > div > div:nth-child(3) > fieldset > div > div > div > div > div:nth-child(7)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#savingsRates > div > div > div.wdg-section-1-body.vertical-bottom.container-fluid > div:nth-child(1) > div > div:nth-child(3) > div > div > div:nth-child(3) > fieldset > div > div > div > div > div:nth-child(1)';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'commerce rewards savings'
  };
};

const eFirstRegularSavings = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.efirstbank.com/products/rates/personal-account-rates.htm');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const modalElement = '#state-submit';
	// 	await page.waitForSelector(modalElement);
	// 	await page.click(modalElement);
	// 	// const inputElement = '#zipCode';
	// 	// await page.waitForSelector(inputElement);
	// 	// await page.type(inputElement, '22180'); // Vienna, VA
	// 	// const submitButton = 'body > div.av-dialog-mask.ng-scope > div > form > div > div:nth-child(3) > div > div > div > div > div > button';
	// 	// await page.waitForSelector(submitButton);
	// 	// await page.click(submitButton)
	// 	// await page.keyboard.press('Enter');
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = 'body > div > main > div.background-color-casper-small > div:nth-child(3) > div > div:nth-child(2) > div.column.medium-7 > div > div.small-12.column.overflow-x > div > table > tbody > tr:nth-child(2) > td:nth-child(3)';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = 'body > div > main > div.background-color-casper-small > div:nth-child(3) > div > div:nth-child(2) > div.column.medium-7 > div > div.small-12.column.overflow-x > div > table > tbody > tr:nth-child(2) > td:nth-child(1)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = 'body > div > main > div.background-color-casper-small > div:nth-child(3) > div > div:nth-child(2) > div.column.medium-7 > div > div.small-12.column.overflow-x > div > table > tbody > tr:nth-child(2) > td:nth-child(1)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#rs';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'eFirstRegularSavings'
  };
};

const texasCapitalStarSavings = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.texascapitalbank.com/personal-banking/star-savings');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const modalElement = '#state-submit';
	// 	await page.waitForSelector(modalElement);
	// 	await page.click(modalElement);
	// 	// const inputElement = '#zipCode';
	// 	// await page.waitForSelector(inputElement);
	// 	// await page.type(inputElement, '22180'); // Vienna, VA
	// 	// const submitButton = 'body > div.av-dialog-mask.ng-scope > div > form > div > div:nth-child(3) > div > div > div > div > div > button';
	// 	// await page.waitForSelector(submitButton);
	// 	// await page.click(submitButton)
	// 	// await page.keyboard.press('Enter');
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#block-tcbdotcom-content > article > div > div.coh-container.ssa-component.coh-component.ssa-component-instance-d4921737-0ceb-4f7e-aca6-8ad263297d68.coh-component-instance-d4921737-0ceb-4f7e-aca6-8ad263297d68.ssa-instance-2311316863.coh-ce-c6f467b4-e2cfe7a8 > div > div > div > div.coh-column.column-1.coh-ce-c6f467b4-fba3494.coh-visible-ps.coh-col-ps-12.coh-visible-xl.coh-col-xl-6 > div > div > p:nth-child(3)';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#block-tcbdotcom-content > article > div > div.coh-container.ssa-component.coh-component.ssa-component-instance-d4921737-0ceb-4f7e-aca6-8ad263297d68.coh-component-instance-d4921737-0ceb-4f7e-aca6-8ad263297d68.ssa-instance-2311316863.coh-ce-c6f467b4-e2cfe7a8 > div > div > div > div.coh-column.column-1.coh-ce-c6f467b4-fba3494.coh-visible-ps.coh-col-ps-12.coh-visible-xl.coh-col-xl-6 > div > div > p:nth-child(1)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#block-tcbdotcom-content > article > div > div.coh-container.ssa-component.coh-component.ssa-component-instance-d4921737-0ceb-4f7e-aca6-8ad263297d68.coh-component-instance-d4921737-0ceb-4f7e-aca6-8ad263297d68.ssa-instance-2311316863.coh-ce-c6f467b4-e2cfe7a8 > div > div > div > div.coh-column.column-1.coh-ce-c6f467b4-fba3494.coh-visible-ps.coh-col-ps-12.coh-visible-xl.coh-col-xl-6 > div > div > p:nth-child(1)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#block-tcbdotcom-content > article > div > div.coh-container.ssa-component.coh-component.ssa-component-instance-d4921737-0ceb-4f7e-aca6-8ad263297d68.coh-component-instance-d4921737-0ceb-4f7e-aca6-8ad263297d68.ssa-instance-2311316863.coh-ce-c6f467b4-e2cfe7a8 > div > div > div > div.coh-column.column-1.coh-ce-c6f467b4-fba3494.coh-visible-ps.coh-col-ps-12.coh-visible-xl.coh-col-xl-6 > div > h3';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'texasCapital'
  };
};

const arvestSavings = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.arvest.com/rates');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	// const modalElement = '#state-submit';
	// 	// await page.waitForSelector(modalElement);
	// 	// await page.click(modalElement);

	// 	const inputElement = '#p_lt_ctl01_pageplaceholder_p_lt_ctl00_WebPartZone_plcUp_WebPartZone_zone_FindRates_zipCodeInput';
	// 	await page.waitForSelector(inputElement);
	// 	await page.type(inputElement, '22180'); // Vienna, VA
	// 	await page.keyboard.press('Enter');
		
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = 'body > main > div.row > div.col-main-right > div:nth-child(2) > table.savings-table.rates-table > tbody > tr > td:nth-child(3)';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = 'body > main > div.row > div.col-main-right > div:nth-child(2) > table.savings-table.rates-table > tbody > tr > td.text-right';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = 'body > main > div.row > div.col-main-right > div:nth-child(2) > table.savings-table.rates-table > tbody > tr > td.text-right';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = 'body > main > div.row > div.col-main-right > div:nth-child(2) > table.savings-table.rates-table > tbody > tr > td:nth-child(1)';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'texasCapital'
  };
};

const unitedCommunityBankSavings1 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.ucbi.com/support/rates/');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	// const modalElement = '#state-submit';
	// 	// await page.waitForSelector(modalElement);
	// 	// await page.click(modalElement);

	// 	const inputElement = '#p_lt_ctl01_pageplaceholder_p_lt_ctl00_WebPartZone_plcUp_WebPartZone_zone_FindRates_zipCodeInput';
	// 	await page.waitForSelector(inputElement);
	// 	await page.type(inputElement, '22180'); // Vienna, VA
	// 	await page.keyboard.press('Enter');
		
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#DataTables_Table_2 > tbody > tr.odd > td:nth-child(3) > span';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#DataTables_Table_2 > tbody > tr.odd > td:nth-child(1) > span';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#DataTables_Table_2 > tbody > tr.odd > td:nth-child(3) > span';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#ratesTable > div > div.title > h3';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'united community bank savings 1'
  };
};

const unitedCommunityBankSavings2 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.ucbi.com/support/rates/');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	// const modalElement = '#state-submit';
	// 	// await page.waitForSelector(modalElement);
	// 	// await page.click(modalElement);

	// 	const inputElement = '#p_lt_ctl01_pageplaceholder_p_lt_ctl00_WebPartZone_plcUp_WebPartZone_zone_FindRates_zipCodeInput';
	// 	await page.waitForSelector(inputElement);
	// 	await page.type(inputElement, '22180'); // Vienna, VA
	// 	await page.keyboard.press('Enter');
		
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#DataTables_Table_2 > tbody > tr.even > td:nth-child(3) > span';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#DataTables_Table_2 > tbody > tr.even > td:nth-child(1)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#DataTables_Table_2 > tbody > tr.even > td:nth-child(2) > span';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#ratesTable > div > div.title > h3';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'united community bank savings 2'
  };
};

const easternBankStatementSavings = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.easternbank.com/investment-banking/retirement-center/rate-center');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  try {
		console.log('Wait')
		const modalElement = '#main-content > article > div > div > div > div > section > div > div > span.accordion-block__toggler.active';
		await page.waitForSelector(modalElement);
		await page.click(modalElement);

	// 	const inputElement = '#p_lt_ctl01_pageplaceholder_p_lt_ctl00_WebPartZone_plcUp_WebPartZone_zone_FindRates_zipCodeInput';
	// 	await page.waitForSelector(inputElement);
	// 	await page.type(inputElement, '22180'); // Vienna, VA
	// 	await page.keyboard.press('Enter');
		
	// 	await page.waitForNetworkIdle()
  } catch (err) {
		console.log('error waiting for selector. Keep going')
  }

  console.log('submit')
  
  const apySelector = '#paragraph-931 > div > div > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(2) > p';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#paragraph-931 > div > div > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(1)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#paragraph-931 > div > div > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(1)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#paragraph-931 > div > div > h2:nth-child(1)';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'eastern bank statement savings'
  };
};

const washingtonFederalSavings = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.wafdbank.com/personal-banking/interest-rates#savings');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const modalElement = '#main-content > article > div > div > div > div > section > div > div > span.accordion-block__toggler.active';
	// 	await page.waitForSelector(modalElement);
	// 	await page.click(modalElement);

	// // 	const inputElement = '#p_lt_ctl01_pageplaceholder_p_lt_ctl00_WebPartZone_plcUp_WebPartZone_zone_FindRates_zipCodeInput';
	// // 	await page.waitForSelector(inputElement);
	// // 	await page.type(inputElement, '22180'); // Vienna, VA
	// // 	await page.keyboard.press('Enter');
		
	// // 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#savings-interest-rate';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#savings-minimum-to-earn-interest';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#savings-minimum-to-earn-interest';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#savings > div.bg-light.card-body.border-radius-top-12 > h2';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'washington federal savings'
  };
};

const wsfsBankCoreSavings1 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.wsfsbank.com/banking/checking-savings/personal-savings/core-savings');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  try {
		console.log('Wait')
		const modalElement = '#rate-table-state';
		await page.waitForSelector(modalElement);
		await page.click(modalElement);
		const dropdownSelect = '#rate-table-state > option:nth-child(2)';
		await page.waitForSelector(dropdownSelect);
		await page.click(dropdownSelect);

	// 	const inputElement = '#p_lt_ctl01_pageplaceholder_p_lt_ctl00_WebPartZone_plcUp_WebPartZone_zone_FindRates_zipCodeInput';
	// 	await page.waitForSelector(inputElement);
	// 	await page.type(inputElement, '22180'); // Vienna, VA
	// 	await page.keyboard.press('Enter');
		
		await page.waitForNetworkIdle()
  } catch (err) {
		console.log('error waiting for selector. Keep going')
  }

  console.log('submit')
  
  const apySelector = '#two-cols > div > div > div.subpage-body.col-lg-10.col-md-10.col-sm-12.col-xs-12 > div.panel.panel-normal > div.panel-body > div.desktop-de-content > table > tbody > tr:nth-child(1) > td:nth-child(3)';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#two-cols > div > div > div.subpage-body.col-lg-10.col-md-10.col-sm-12.col-xs-12 > div.panel.panel-normal > div.panel-body > div.desktop-de-content > table > tbody > tr:nth-child(1) > td:nth-child(1)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#two-cols > div > div > div.subpage-body.col-lg-10.col-md-10.col-sm-12.col-xs-12 > div.panel.panel-normal > div.panel-body > div.desktop-de-content > table > tbody > tr:nth-child(1) > td:nth-child(1)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#two-cols > div > div > div.subpage-body.col-lg-10.col-md-10.col-sm-12.col-xs-12 > div.intro > div > div > h2';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'wsfs core savings 1'
  };
};

const wsfsBankCoreSavings2 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.wsfsbank.com/banking/checking-savings/personal-savings/core-savings');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  try {
		console.log('Wait')
		const modalElement = '#rate-table-state';
		await page.waitForSelector(modalElement);
		await page.click(modalElement);
		const dropdownSelect = '#rate-table-state > option:nth-child(2)';
		await page.waitForSelector(dropdownSelect);
		await page.click(dropdownSelect);

	// 	const inputElement = '#p_lt_ctl01_pageplaceholder_p_lt_ctl00_WebPartZone_plcUp_WebPartZone_zone_FindRates_zipCodeInput';
	// 	await page.waitForSelector(inputElement);
	// 	await page.type(inputElement, '22180'); // Vienna, VA
	// 	await page.keyboard.press('Enter');
		
		await page.waitForNetworkIdle()
  } catch (err) {
		console.log('error waiting for selector. Keep going')
  }

  console.log('submit')
  
  const apySelector = '#two-cols > div > div > div.subpage-body.col-lg-10.col-md-10.col-sm-12.col-xs-12 > div.panel.panel-normal > div.panel-body > div.desktop-de-content > table > tbody > tr:nth-child(2) > td:nth-child(3)';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#two-cols > div > div > div.subpage-body.col-lg-10.col-md-10.col-sm-12.col-xs-12 > div.panel.panel-normal > div.panel-body > div.desktop-de-content > table > tbody > tr:nth-child(2) > td:nth-child(1)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#two-cols > div > div > div.subpage-body.col-lg-10.col-md-10.col-sm-12.col-xs-12 > div.panel.panel-normal > div.panel-body > div.desktop-de-content > table > tbody > tr:nth-child(2) > td:nth-child(1)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#two-cols > div > div > div.subpage-body.col-lg-10.col-md-10.col-sm-12.col-xs-12 > div.intro > div > div > h2';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'wsfs core savings 2'
  };
};

const wsfsBankCoreSavings3 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.wsfsbank.com/banking/checking-savings/personal-savings/core-savings');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  try {
		console.log('Wait')
		const modalElement = '#rate-table-state';
		await page.waitForSelector(modalElement);
		await page.click(modalElement);
		const dropdownSelect = '#rate-table-state > option:nth-child(2)';
		await page.waitForSelector(dropdownSelect);
		await page.click(dropdownSelect);

	// 	const inputElement = '#p_lt_ctl01_pageplaceholder_p_lt_ctl00_WebPartZone_plcUp_WebPartZone_zone_FindRates_zipCodeInput';
	// 	await page.waitForSelector(inputElement);
	// 	await page.type(inputElement, '22180'); // Vienna, VA
	// 	await page.keyboard.press('Enter');
		
		await page.waitForNetworkIdle()
  } catch (err) {
		console.log('error waiting for selector. Keep going')
  }

  console.log('submit')
  
  const apySelector = '#two-cols > div > div > div.subpage-body.col-lg-10.col-md-10.col-sm-12.col-xs-12 > div.panel.panel-normal > div.panel-body > div.desktop-de-content > table > tbody > tr:nth-child(3) > td:nth-child(3)';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#two-cols > div > div > div.subpage-body.col-lg-10.col-md-10.col-sm-12.col-xs-12 > div.panel.panel-normal > div.panel-body > div.desktop-de-content > table > tbody > tr:nth-child(3) > td:nth-child(1)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#two-cols > div > div > div.subpage-body.col-lg-10.col-md-10.col-sm-12.col-xs-12 > div.panel.panel-normal > div.panel-body > div.desktop-de-content > table > tbody > tr:nth-child(3) > td:nth-child(1)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#two-cols > div > div > div.subpage-body.col-lg-10.col-md-10.col-sm-12.col-xs-12 > div.intro > div > div > h2';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'wsfs core savings 3'
  };
};

const independentBankEagleSavings1 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.independentbank.com/information-center/current-rates/');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const modalElement = '#rate-table-state';
	// 	await page.waitForSelector(modalElement);
	// 	await page.click(modalElement);
	// 	const dropdownSelect = '#rate-table-state > option:nth-child(2)';
	// 	await page.waitForSelector(dropdownSelect);
	// 	await page.click(dropdownSelect);

	// // 	const inputElement = '#p_lt_ctl01_pageplaceholder_p_lt_ctl00_WebPartZone_plcUp_WebPartZone_zone_FindRates_zipCodeInput';
	// // 	await page.waitForSelector(inputElement);
	// // 	await page.type(inputElement, '22180'); // Vienna, VA
	// // 	await page.keyboard.press('Enter');
		
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#hs_cos_wrapper_widget_1546458757482 > div > table > tbody > tr:nth-child(6) > td:nth-child(4) > span';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#hs_cos_wrapper_widget_1546458757482 > div > table > tbody > tr:nth-child(6) > td:nth-child(2)'; // 500 min https://www.independentbank.com/personal/savings/
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#hs_cos_wrapper_widget_1546458757482 > div > table > tbody > tr:nth-child(6) > td:nth-child(2)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#hs_cos_wrapper_widget_1546458757482 > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > h3';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'independent bank eagle savings 1'
  };
};

const independentBankEagleSavings2 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.independentbank.com/information-center/current-rates/');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const modalElement = '#rate-table-state';
	// 	await page.waitForSelector(modalElement);
	// 	await page.click(modalElement);
	// 	const dropdownSelect = '#rate-table-state > option:nth-child(2)';
	// 	await page.waitForSelector(dropdownSelect);
	// 	await page.click(dropdownSelect);

	// // 	const inputElement = '#p_lt_ctl01_pageplaceholder_p_lt_ctl00_WebPartZone_plcUp_WebPartZone_zone_FindRates_zipCodeInput';
	// // 	await page.waitForSelector(inputElement);
	// // 	await page.type(inputElement, '22180'); // Vienna, VA
	// // 	await page.keyboard.press('Enter');
		
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#hs_cos_wrapper_widget_1546458757482 > div > table > tbody > tr:nth-child(5) > td:nth-child(4) > span';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#hs_cos_wrapper_widget_1546458757482 > div > table > tbody > tr:nth-child(5) > td:nth-child(2)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#hs_cos_wrapper_widget_1546458757482 > div > table > tbody > tr:nth-child(5) > td:nth-child(2)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#hs_cos_wrapper_widget_1546458757482 > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > h3';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'independent bank eagle savings 2'
  };
};

const independentBankEagleSavings3 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.independentbank.com/information-center/current-rates/');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const modalElement = '#rate-table-state';
	// 	await page.waitForSelector(modalElement);
	// 	await page.click(modalElement);
	// 	const dropdownSelect = '#rate-table-state > option:nth-child(2)';
	// 	await page.waitForSelector(dropdownSelect);
	// 	await page.click(dropdownSelect);

	// // 	const inputElement = '#p_lt_ctl01_pageplaceholder_p_lt_ctl00_WebPartZone_plcUp_WebPartZone_zone_FindRates_zipCodeInput';
	// // 	await page.waitForSelector(inputElement);
	// // 	await page.type(inputElement, '22180'); // Vienna, VA
	// // 	await page.keyboard.press('Enter');
		
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#hs_cos_wrapper_widget_1546458757482 > div > table > tbody > tr:nth-child(4) > td:nth-child(4) > span';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#hs_cos_wrapper_widget_1546458757482 > div > table > tbody > tr:nth-child(4) > td:nth-child(2)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#hs_cos_wrapper_widget_1546458757482 > div > table > tbody > tr:nth-child(4) > td:nth-child(2)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#hs_cos_wrapper_widget_1546458757482 > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > h3';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'independent bank eagle savings 3'
  };
};

const independentBankEagleSavings4 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.independentbank.com/information-center/current-rates/');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const modalElement = '#rate-table-state';
	// 	await page.waitForSelector(modalElement);
	// 	await page.click(modalElement);
	// 	const dropdownSelect = '#rate-table-state > option:nth-child(2)';
	// 	await page.waitForSelector(dropdownSelect);
	// 	await page.click(dropdownSelect);

	// // 	const inputElement = '#p_lt_ctl01_pageplaceholder_p_lt_ctl00_WebPartZone_plcUp_WebPartZone_zone_FindRates_zipCodeInput';
	// // 	await page.waitForSelector(inputElement);
	// // 	await page.type(inputElement, '22180'); // Vienna, VA
	// // 	await page.keyboard.press('Enter');
		
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#hs_cos_wrapper_widget_1546458757482 > div > table > tbody > tr:nth-child(3) > td:nth-child(4) > span';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#hs_cos_wrapper_widget_1546458757482 > div > table > tbody > tr:nth-child(3) > td:nth-child(2)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#hs_cos_wrapper_widget_1546458757482 > div > table > tbody > tr:nth-child(3) > td:nth-child(2)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#hs_cos_wrapper_widget_1546458757482 > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > h3';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'independent bank eagle savings 4'
  };
};

const independentBankEagleSavings5 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.independentbank.com/information-center/current-rates/');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const modalElement = '#rate-table-state';
	// 	await page.waitForSelector(modalElement);
	// 	await page.click(modalElement);
	// 	const dropdownSelect = '#rate-table-state > option:nth-child(2)';
	// 	await page.waitForSelector(dropdownSelect);
	// 	await page.click(dropdownSelect);

	// // 	const inputElement = '#p_lt_ctl01_pageplaceholder_p_lt_ctl00_WebPartZone_plcUp_WebPartZone_zone_FindRates_zipCodeInput';
	// // 	await page.waitForSelector(inputElement);
	// // 	await page.type(inputElement, '22180'); // Vienna, VA
	// // 	await page.keyboard.press('Enter');
		
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#hs_cos_wrapper_widget_1546458757482 > div > table > tbody > tr:nth-child(2) > td:nth-child(4) > span';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#hs_cos_wrapper_widget_1546458757482 > div > table > tbody > tr:nth-child(2) > td:nth-child(2)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#hs_cos_wrapper_widget_1546458757482 > div > table > tbody > tr:nth-child(2) > td:nth-child(2)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#hs_cos_wrapper_widget_1546458757482 > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > h3';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'independent bank eagle savings 5'
  };
};

const independentBankEagleSavings6 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.independentbank.com/information-center/current-rates/');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const modalElement = '#rate-table-state';
	// 	await page.waitForSelector(modalElement);
	// 	await page.click(modalElement);
	// 	const dropdownSelect = '#rate-table-state > option:nth-child(2)';
	// 	await page.waitForSelector(dropdownSelect);
	// 	await page.click(dropdownSelect);

	// // 	const inputElement = '#p_lt_ctl01_pageplaceholder_p_lt_ctl00_WebPartZone_plcUp_WebPartZone_zone_FindRates_zipCodeInput';
	// // 	await page.waitForSelector(inputElement);
	// // 	await page.type(inputElement, '22180'); // Vienna, VA
	// // 	await page.keyboard.press('Enter');
		
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#hs_cos_wrapper_widget_1546458757482 > div > table > tbody > tr:nth-child(1) > td:nth-child(4) > span';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#hs_cos_wrapper_widget_1546458757482 > div > table > tbody > tr:nth-child(1) > td:nth-child(2)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#hs_cos_wrapper_widget_1546458757482 > div > table > tbody > tr:nth-child(1) > td:nth-child(2)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#hs_cos_wrapper_widget_1546458757482 > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > h3';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'independent bank eagle savings 6'
  };
};

// Credit Unions
const penFedOnlineSavings1 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.penfed.org/savings/premium');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const modalElement = '#rate-table-state';
	// 	await page.waitForSelector(modalElement);
	// 	await page.click(modalElement);
	// 	const dropdownSelect = '#rate-table-state > option:nth-child(2)';
	// 	await page.waitForSelector(dropdownSelect);
	// 	await page.click(dropdownSelect);

	// // 	const inputElement = '#p_lt_ctl01_pageplaceholder_p_lt_ctl00_WebPartZone_plcUp_WebPartZone_zone_FindRates_zipCodeInput';
	// // 	await page.waitForSelector(inputElement);
	// // 	await page.type(inputElement, '22180'); // Vienna, VA
	// // 	await page.keyboard.press('Enter');
		
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#text-750264a9f9 > p';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#master-page-6fb3174794 > div > div > div > div:nth-child(3) > div > div.billboard-component.promo-md-style.bg-color-light-gray.aem-GridColumn.aem-GridColumn--default--12 > section > div.billboard__text.grid__container > div > div > div > div:nth-child(4) > div > div > div > ul > li:nth-child(2) > span';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#master-page-6fb3174794 > div > div > div > div:nth-child(3) > div > div.billboard-component.promo-md-style.bg-color-light-gray.aem-GridColumn.aem-GridColumn--default--12 > section > div.billboard__text.grid__container > div > div > div > div:nth-child(4) > div > div > div > ul > li:nth-child(2) > span';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#text-ed0572128c';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'penfed online savings 1'
  };
};

const penFedRegularSavings1 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.penfed.org/savings/regular');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const modalElement = '#rate-table-state';
	// 	await page.waitForSelector(modalElement);
	// 	await page.click(modalElement);
	// 	const dropdownSelect = '#rate-table-state > option:nth-child(2)';
	// 	await page.waitForSelector(dropdownSelect);
	// 	await page.click(dropdownSelect);

	// // 	const inputElement = '#p_lt_ctl01_pageplaceholder_p_lt_ctl00_WebPartZone_plcUp_WebPartZone_zone_FindRates_zipCodeInput';
	// // 	await page.waitForSelector(inputElement);
	// // 	await page.type(inputElement, '22180'); // Vienna, VA
	// // 	await page.keyboard.press('Enter');
		
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#penfed-container-2f33f68cb4 > div > div > div.row.display-horizontal-card.aem-GridColumn.aem-GridColumn--default--12 > div > div:nth-child(2) > div > div > div.pfui-rates-container > div:nth-child(3) > div.pfui-text-content > p:nth-child(2)';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#penfed-container-2f33f68cb4 > div > div > div.row.display-horizontal-card.aem-GridColumn.aem-GridColumn--default--12 > div > div:nth-child(2) > div > div > div.pfui-rates-container > div:nth-child(2) > div.pfui-text-content > p > span';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#penfed-container-2f33f68cb4 > div > div > div.row.display-horizontal-card.aem-GridColumn.aem-GridColumn--default--12 > div > div:nth-child(2) > div > div > div.pfui-rates-container > div:nth-child(3) > div.pfui-text-content > p:nth-child(3) > span';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#penfed-container-2f33f68cb4 > div > div > div.row.display-horizontal-card.aem-GridColumn.aem-GridColumn--default--12 > div > div.col-sm-12.col-md-12.col-lg-4.advanced-column.light-text.padding-extra-large > div > div.detail-page-text.section > div.pfui-text-content > h1 > span';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'penfed regular savings 1'
  };
};

const alliantHighYieldSavings1 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.alliantcreditunion.org/bank/high-yield-savings');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const modalElement = '#rate-table-state';
	// 	await page.waitForSelector(modalElement);
	// 	await page.click(modalElement);
	// 	const dropdownSelect = '#rate-table-state > option:nth-child(2)';
	// 	await page.waitForSelector(dropdownSelect);
	// 	await page.click(dropdownSelect);

	// // 	const inputElement = '#p_lt_ctl01_pageplaceholder_p_lt_ctl00_WebPartZone_plcUp_WebPartZone_zone_FindRates_zipCodeInput';
	// // 	await page.waitForSelector(inputElement);
	// // 	await page.type(inputElement, '22180'); // Vienna, VA
	// // 	await page.keyboard.press('Enter');
		
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#features > div > div:nth-child(2) > div.ratePill > div > div:nth-child(1) > span.ratePill-number.ratePill-number-blue';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#features > div > div:nth-child(2) > div.text-center > p';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#features > div > div:nth-child(2) > div.text-center > p';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#main > div > nav > span';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'alliant high yield savings 1'
  };
};

// const americaFirstShareSavings1 = async () => {
//   console.log('browser')
//   const browser = await puppeteer.launch(launchSettings);
//   const context = await browser.createIncognitoBrowserContext();
//   console.log('page')
//   const page = await context.newPage();
  
//   page.setViewport(viewPort);
//   console.log('goto')
//   await page.goto('https://www.americafirst.com/rates/account-rates.html#Savings-Account-Rates');

//   // await page.waitForNetworkIdle()
//   console.log('page loaded')
  
//   // Fill out form
//   // try {
// 	// 	console.log('Wait')
// 	// 	const modalElement = '#rate-table-state';
// 	// 	await page.waitForSelector(modalElement);
// 	// 	await page.click(modalElement);
// 	// 	const dropdownSelect = '#rate-table-state > option:nth-child(2)';
// 	// 	await page.waitForSelector(dropdownSelect);
// 	// 	await page.click(dropdownSelect);

// 	// // 	const inputElement = '#p_lt_ctl01_pageplaceholder_p_lt_ctl00_WebPartZone_plcUp_WebPartZone_zone_FindRates_zipCodeInput';
// 	// // 	await page.waitForSelector(inputElement);
// 	// // 	await page.type(inputElement, '22180'); // Vienna, VA
// 	// // 	await page.keyboard.press('Enter');
		
// 	// 	await page.waitForNetworkIdle()
//   // } catch (err) {
// 	// 	console.log('error waiting for selector. Keep going')
//   // }

//   console.log('submit')
  
//   const apySelector = '#Savings-Account-Rates-modelContent > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(3)';
//   const apyElement = await page.waitForSelector(apySelector);
//   const apy = await apyElement.evaluate(el => el.textContent.trim());

//   const minBalanceSelector = '#Savings-Account-Rates-modelContent > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(4)';
//   const minBalanceElement = await page.waitForSelector(minBalanceSelector);
//   const minBalance1 = await minBalanceElement.evaluate(el => el.textContent.trim());
//   const minBalanceSelector2 = '#Savings-Account-Rates-modelContent > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(5)';
//   const minBalanceElement2 = await page.waitForSelector(minBalanceSelector2);
//   const minBalance2 = await minBalanceElement2.evaluate(el => el.textContent.trim());
//   const minBalance = Math.max(Number(minBalance1.slice(1)), Number(minBalance2.slice(1)))

//   const maxBalanceSelector = '#Savings-Account-Rates-modelContent > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(5)';
//   const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
//   const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
//   const productNameSelector = '#Savings-Account-Rates-modelContent > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(1)';
//   const productNameElement = await page.waitForSelector(productNameSelector);
//   const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
//   console.log('productName: ', productName);
//   console.log('apy: ', apy);
//   console.log('minBalance: ', minBalance);
//   console.log('maxBalance: ', maxBalance);

//   await browser.close();

//   return {
//     apy,
//     productName,
//     minBalance,
//     maxBalance,
//     script: 'america first share savings 1'
//   };
// };

const boeingEmployeeMemberSavings1 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.becu.org/everyday-banking/Savings');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const modalElement = '#rate-table-state';
	// 	await page.waitForSelector(modalElement);
	// 	await page.click(modalElement);
	// 	const dropdownSelect = '#rate-table-state > option:nth-child(2)';
	// 	await page.waitForSelector(dropdownSelect);
	// 	await page.click(dropdownSelect);

	// // 	const inputElement = '#p_lt_ctl01_pageplaceholder_p_lt_ctl00_WebPartZone_plcUp_WebPartZone_zone_FindRates_zipCodeInput';
	// // 	await page.waitForSelector(inputElement);
	// // 	await page.type(inputElement, '22180'); // Vienna, VA
	// // 	await page.keyboard.press('Enter');
		
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#maincontent > article > div > div.col-lg-4 > div:nth-child(3) > h3';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => el.textContent.trim());

  const minBalanceSelector = '#maincontent > article > div > div.col-lg-8 > div:nth-child(1) > ul > li:nth-child(1)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#maincontent > article > div > div.col-lg-4 > div:nth-child(3) > h5';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  
  const productNameSelector = '#maincontent > article > div > div.col-lg-4 > div:nth-child(3) > h4';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'boeing employee Member savings 1'
  };
};

const boeingEmployeeMemberSavings2 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.becu.org/everyday-banking/Savings');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const modalElement = '#rate-table-state';
	// 	await page.waitForSelector(modalElement);
	// 	await page.click(modalElement);
	// 	const dropdownSelect = '#rate-table-state > option:nth-child(2)';
	// 	await page.waitForSelector(dropdownSelect);
	// 	await page.click(dropdownSelect);

	// // 	const inputElement = '#p_lt_ctl01_pageplaceholder_p_lt_ctl00_WebPartZone_plcUp_WebPartZone_zone_FindRates_zipCodeInput';
	// // 	await page.waitForSelector(inputElement);
	// // 	await page.type(inputElement, '22180'); // Vienna, VA
	// // 	await page.keyboard.press('Enter');
		
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#maincontent > article > div > div.col-lg-4 > div:nth-child(4) > h3';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => JSON.stringify(el.textContent.trim()));

  const minBalanceSelector = '#maincontent > article > div > div.col-lg-4 > div:nth-child(3) > h5';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  // const maxBalanceSelector = '#maincontent > article > div > div.col-lg-4 > div:nth-child(3) > h5';
  // const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  // const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  const maxBalance = null;
  
  const productNameSelector = '#maincontent > article > div > div.col-lg-4 > div:nth-child(4) > h4';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'boeing employee advantage savings 2'
  };
};

const firstTechMemberSavings1 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://firsttechfed.com/rates');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const modalElement = '#rate-table-state';
	// 	await page.waitForSelector(modalElement);
	// 	await page.click(modalElement);
	// 	const dropdownSelect = '#rate-table-state > option:nth-child(2)';
	// 	await page.waitForSelector(dropdownSelect);
	// 	await page.click(dropdownSelect);

	// // 	const inputElement = '#p_lt_ctl01_pageplaceholder_p_lt_ctl00_WebPartZone_plcUp_WebPartZone_zone_FindRates_zipCodeInput';
	// // 	await page.waitForSelector(inputElement);
	// // 	await page.type(inputElement, '22180'); // Vienna, VA
	// // 	await page.keyboard.press('Enter');
		
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#default-main-section > div:nth-child(2) > div > form > div.global-rates-table__table.global-rates-table__table-Savings > div > div.global-table-wrapper > div > table > tbody > tr:nth-child(1) > td:nth-child(5)';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => JSON.stringify(el.textContent.trim()));

  const minBalanceSelector = '#default-main-section > div:nth-child(2) > div > form > div.global-rates-table__table.global-rates-table__table-Savings > div > div.global-table-wrapper > div > table > tbody > tr:nth-child(1) > td:nth-child(3)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  // const maxBalanceSelector = '#maincontent > article > div > div.col-lg-4 > div:nth-child(3) > h5';
  // const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  // const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  const maxBalance = null;
  
  const productNameSelector = '#main-36383da1-83a4-4694-827a-19f9fa0565f3 > a';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'first tech member savings 1'
  };
};

const firstTechCarefreeSavings1 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://firsttechfed.com/rates');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const modalElement = '#rate-table-state';
	// 	await page.waitForSelector(modalElement);
	// 	await page.click(modalElement);
	// 	const dropdownSelect = '#rate-table-state > option:nth-child(2)';
	// 	await page.waitForSelector(dropdownSelect);
	// 	await page.click(dropdownSelect);

	// // 	const inputElement = '#p_lt_ctl01_pageplaceholder_p_lt_ctl00_WebPartZone_plcUp_WebPartZone_zone_FindRates_zipCodeInput';
	// // 	await page.waitForSelector(inputElement);
	// // 	await page.type(inputElement, '22180'); // Vienna, VA
	// // 	await page.keyboard.press('Enter');
		
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#default-main-section > div:nth-child(2) > div > form > div.global-rates-table__table.global-rates-table__table-Savings > div > div.global-table-wrapper > div > table > tbody > tr:nth-child(1) > td:nth-child(5)';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => JSON.stringify(el.textContent.trim()));

  const minBalanceSelector = '#default-main-section > div:nth-child(2) > div > form > div.global-rates-table__table.global-rates-table__table-Savings > div > div.global-table-wrapper > div > table > tbody > tr:nth-child(3) > td:nth-child(3)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  // const maxBalanceSelector = '#maincontent > article > div > div.col-lg-4 > div:nth-child(3) > h5';
  // const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  // const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  const maxBalance = null;
  
  const productNameSelector = '#main-58f26bc2-5716-4436-8454-dd8e4e3be5dd > a';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'first tech carefree savings 1'
  };
};

const bethpageSavings1 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.bethpagefcu.com/rates-calculators/#checking_and_savings');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  try {
		console.log('Wait')
		const modalElement = '#checking_and_savings > nav > div > ul > li.\\31 .current > a';
		await page.waitForSelector(modalElement);
		await page.click(modalElement);
		// const dropdownSelect = '#rate-table-state > option:nth-child(2)';
		// await page.waitForSelector(dropdownSelect);
		// await page.click(dropdownSelect);

	// 	const inputElement = '#p_lt_ctl01_pageplaceholder_p_lt_ctl00_WebPartZone_plcUp_WebPartZone_zone_FindRates_zipCodeInput';
	// 	await page.waitForSelector(inputElement);
	// 	await page.type(inputElement, '22180'); // Vienna, VA
	// 	await page.keyboard.press('Enter');
		
		await page.waitForNetworkIdle()
  } catch (err) {
		console.log('error waiting for selector. Keep going')
  }

  console.log('submit')
  
  const apySelector = '#table-savings > tbody > tr:nth-child(3) > td:nth-child(2)';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => JSON.stringify(el.textContent.trim()));

  const minBalanceSelector = '#savings > div > div > div > div > p:nth-child(2)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  // const maxBalanceSelector = '#maincontent > article > div > div.col-lg-4 > div:nth-child(3) > h5';
  // const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  // const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  const maxBalance = null;
  
  const productNameSelector = '#table-savings > tbody > tr:nth-child(3) > td:nth-child(1)';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'bethpage savings 1'
  };
};

const mountainAmericaPersonalSavings1 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.macu.com/accounts/savings/personal-savings-account');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const modalElement = '#checking_and_savings > nav > div > ul > li.\\31 .current > a';
	// 	await page.waitForSelector(modalElement);
	// 	await page.click(modalElement);
	// 	// const dropdownSelect = '#rate-table-state > option:nth-child(2)';
	// 	// await page.waitForSelector(dropdownSelect);
	// 	// await page.click(dropdownSelect);

	// // 	const inputElement = '#p_lt_ctl01_pageplaceholder_p_lt_ctl00_WebPartZone_plcUp_WebPartZone_zone_FindRates_zipCodeInput';
	// // 	await page.waitForSelector(inputElement);
	// // 	await page.type(inputElement, '22180'); // Vienna, VA
	// // 	await page.keyboard.press('Enter');
		
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#gatsby-focus-wrapper > div > div.page-content.sc-14k9m8x-0.iBrZWr > div.container.content.sc-14fyy24-0.hIuqyY.py-6.underhang.bg-white > div:nth-child(1) > div:nth-child(1) > div > div > ul > li:nth-child(4)';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => JSON.stringify(el.textContent.trim()));

  const minBalanceSelector = '#gatsby-focus-wrapper > div > div.page-content.sc-14k9m8x-0.iBrZWr > div.container.content.sc-14fyy24-0.hIuqyY.py-6.underhang.bg-white > div:nth-child(1) > div:nth-child(2) > div > div > ul:nth-child(2) > li:nth-child(4)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  // const maxBalanceSelector = '#maincontent > article > div > div.col-lg-4 > div:nth-child(3) > h5';
  // const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  // const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  const maxBalance = null;
  
  const productNameSelector = '#primary-savings-account-details';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'mountain america personal savings 1'
  };
};

const digitalPrimarySavings1 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.dcu.org/bank/savings/primary-savings.html');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const modalElement = '#checking_and_savings > nav > div > ul > li.\\31 .current > a';
	// 	await page.waitForSelector(modalElement);
	// 	await page.click(modalElement);
	// 	// const dropdownSelect = '#rate-table-state > option:nth-child(2)';
	// 	// await page.waitForSelector(dropdownSelect);
	// 	// await page.click(dropdownSelect);

	// // 	const inputElement = '#p_lt_ctl01_pageplaceholder_p_lt_ctl00_WebPartZone_plcUp_WebPartZone_zone_FindRates_zipCodeInput';
	// // 	await page.waitForSelector(inputElement);
	// // 	await page.type(inputElement, '22180'); // Vienna, VA
	// // 	await page.keyboard.press('Enter');
		
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#\\31 0 > div > div:nth-child(2) > div.product-overview--offer.col-sm-12.col-md-4 > article > div.product-overview__offer__rate > span.product-overview__offer--rate';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => JSON.stringify(el.textContent.trim()));

  const minBalanceSelector = '#\\31 0 > div > div:nth-child(2) > div.product-overview--offer.col-sm-12.col-md-4 > article > div:nth-child(5) > span.product-overview__offer__specification--bold';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#\\31 0 > div > div:nth-child(2) > div.product-overview--offer.col-sm-12.col-md-4 > article > div:nth-child(4) > span.product-overview__offer__specification--bold';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  // const maxBalance = null;
  
  const productNameSelector = '#dcu-content > div > div > div.responsivegrid.aem-GridColumn.aem-GridColumn--default--12 > div > div.breadcrumb.aem-GridColumn.aem-GridColumn--default--12 > section > div > nav > ol > li.breadcrumb-item.active';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'digital credit union personal savings 1'
  };
};

const teachersPrimaryShareSavings1 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.tcunet.com/Bank/Savings-Dividend-Rates#accordion-d7c9c87e-a955-4621-a47d-d249ca47b9d6-heading-0');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const modalElement = '#checking_and_savings > nav > div > ul > li.\\31 .current > a';
	// 	await page.waitForSelector(modalElement);
	// 	await page.click(modalElement);
	// 	// const dropdownSelect = '#rate-table-state > option:nth-child(2)';
	// 	// await page.waitForSelector(dropdownSelect);
	// 	// await page.click(dropdownSelect);

	// // 	const inputElement = '#p_lt_ctl01_pageplaceholder_p_lt_ctl00_WebPartZone_plcUp_WebPartZone_zone_FindRates_zipCodeInput';
	// // 	await page.waitForSelector(inputElement);
	// // 	await page.type(inputElement, '22180'); // Vienna, VA
	// // 	await page.keyboard.press('Enter');
		
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#accordion-d7c9c87e-a955-4621-a47d-d249ca47b9d6-panel-0 > div > div:nth-child(3) > div.cmswp-custom-table-scroll > table > tbody > tr:nth-child(2) > td:nth-child(3)';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => JSON.stringify(el.textContent.trim()));

  const minBalanceSelector = '#accordion-d7c9c87e-a955-4621-a47d-d249ca47b9d6-panel-0 > div > div:nth-child(3) > div.cmswp-custom-table-scroll > table > tbody > tr:nth-child(2) > td:nth-child(1)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#accordion-d7c9c87e-a955-4621-a47d-d249ca47b9d6-panel-0 > div > div:nth-child(3) > div.cmswp-custom-table-scroll > table > tbody > tr:nth-child(2) > td:nth-child(1)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  // const maxBalance = null;
  
  const productNameSelector = '#accordion-d7c9c87e-a955-4621-a47d-d249ca47b9d6-panel-0 > div > h3:nth-child(1)';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'teachers Primary Share savings 1'
  };
};

const teachersPrimaryShareSavings2 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.tcunet.com/Bank/Savings-Dividend-Rates#accordion-d7c9c87e-a955-4621-a47d-d249ca47b9d6-heading-0');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const modalElement = '#checking_and_savings > nav > div > ul > li.\\31 .current > a';
	// 	await page.waitForSelector(modalElement);
	// 	await page.click(modalElement);
	// 	// const dropdownSelect = '#rate-table-state > option:nth-child(2)';
	// 	// await page.waitForSelector(dropdownSelect);
	// 	// await page.click(dropdownSelect);

	// // 	const inputElement = '#p_lt_ctl01_pageplaceholder_p_lt_ctl00_WebPartZone_plcUp_WebPartZone_zone_FindRates_zipCodeInput';
	// // 	await page.waitForSelector(inputElement);
	// // 	await page.type(inputElement, '22180'); // Vienna, VA
	// // 	await page.keyboard.press('Enter');
		
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#accordion-d7c9c87e-a955-4621-a47d-d249ca47b9d6-panel-0 > div > div:nth-child(3) > div.cmswp-custom-table-scroll > table > tbody > tr:nth-child(3) > td:nth-child(3)';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => JSON.stringify(el.textContent.trim()));

  const minBalanceSelector = '#accordion-d7c9c87e-a955-4621-a47d-d249ca47b9d6-panel-0 > div > div:nth-child(3) > div.cmswp-custom-table-scroll > table > tbody > tr:nth-child(3) > td:nth-child(1)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#accordion-d7c9c87e-a955-4621-a47d-d249ca47b9d6-panel-0 > div > div:nth-child(3) > div.cmswp-custom-table-scroll > table > tbody > tr:nth-child(3) > td:nth-child(1)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  // const maxBalance = null;
  
  const productNameSelector = '#accordion-d7c9c87e-a955-4621-a47d-d249ca47b9d6-panel-0 > div > h3:nth-child(1)';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'teachers Primary Share savings 2'
  };
};

const teachersPrimaryShareSavings3 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.tcunet.com/Bank/Savings-Dividend-Rates#accordion-d7c9c87e-a955-4621-a47d-d249ca47b9d6-heading-0');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const modalElement = '#checking_and_savings > nav > div > ul > li.\\31 .current > a';
	// 	await page.waitForSelector(modalElement);
	// 	await page.click(modalElement);
	// 	// const dropdownSelect = '#rate-table-state > option:nth-child(2)';
	// 	// await page.waitForSelector(dropdownSelect);
	// 	// await page.click(dropdownSelect);

	// // 	const inputElement = '#p_lt_ctl01_pageplaceholder_p_lt_ctl00_WebPartZone_plcUp_WebPartZone_zone_FindRates_zipCodeInput';
	// // 	await page.waitForSelector(inputElement);
	// // 	await page.type(inputElement, '22180'); // Vienna, VA
	// // 	await page.keyboard.press('Enter');
		
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#accordion-d7c9c87e-a955-4621-a47d-d249ca47b9d6-panel-0 > div > div:nth-child(3) > div.cmswp-custom-table-scroll > table > tbody > tr:nth-child(4) > td:nth-child(3)';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => JSON.stringify(el.textContent.trim()));

  const minBalanceSelector = '#accordion-d7c9c87e-a955-4621-a47d-d249ca47b9d6-panel-0 > div > div:nth-child(3) > div.cmswp-custom-table-scroll > table > tbody > tr:nth-child(4) > td:nth-child(1)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#accordion-d7c9c87e-a955-4621-a47d-d249ca47b9d6-panel-0 > div > div:nth-child(3) > div.cmswp-custom-table-scroll > table > tbody > tr:nth-child(4) > td:nth-child(1)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  // const maxBalance = null;
  
  const productNameSelector = '#accordion-d7c9c87e-a955-4621-a47d-d249ca47b9d6-panel-0 > div > h3:nth-child(1)';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'teachers Primary Share savings 3'
  };
};

const teachersPrimaryShareSavings4 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.tcunet.com/Bank/Savings-Dividend-Rates#accordion-d7c9c87e-a955-4621-a47d-d249ca47b9d6-heading-0');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const modalElement = '#checking_and_savings > nav > div > ul > li.\\31 .current > a';
	// 	await page.waitForSelector(modalElement);
	// 	await page.click(modalElement);
	// 	// const dropdownSelect = '#rate-table-state > option:nth-child(2)';
	// 	// await page.waitForSelector(dropdownSelect);
	// 	// await page.click(dropdownSelect);

	// // 	const inputElement = '#p_lt_ctl01_pageplaceholder_p_lt_ctl00_WebPartZone_plcUp_WebPartZone_zone_FindRates_zipCodeInput';
	// // 	await page.waitForSelector(inputElement);
	// // 	await page.type(inputElement, '22180'); // Vienna, VA
	// // 	await page.keyboard.press('Enter');
		
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#accordion-d7c9c87e-a955-4621-a47d-d249ca47b9d6-panel-0 > div > div:nth-child(3) > div.cmswp-custom-table-scroll > table > tbody > tr:nth-child(5) > td:nth-child(3)';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => JSON.stringify(el.textContent.trim()));

  const minBalanceSelector = '#accordion-d7c9c87e-a955-4621-a47d-d249ca47b9d6-panel-0 > div > div:nth-child(3) > div.cmswp-custom-table-scroll > table > tbody > tr:nth-child(5) > td:nth-child(1)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#accordion-d7c9c87e-a955-4621-a47d-d249ca47b9d6-panel-0 > div > div:nth-child(3) > div.cmswp-custom-table-scroll > table > tbody > tr:nth-child(5) > td:nth-child(1)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  // const maxBalance = null;
  
  const productNameSelector = '#accordion-d7c9c87e-a955-4621-a47d-d249ca47b9d6-panel-0 > div > h3:nth-child(1)';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'teachers Primary Share savings 4'
  };
};

const sanDiegoCountySavings1 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.sdccu.com/rates/consumer-deposit-rates/');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const modalElement = '#checking_and_savings > nav > div > ul > li.\\31 .current > a';
	// 	await page.waitForSelector(modalElement);
	// 	await page.click(modalElement);
	// 	// const dropdownSelect = '#rate-table-state > option:nth-child(2)';
	// 	// await page.waitForSelector(dropdownSelect);
	// 	// await page.click(dropdownSelect);

	// // 	const inputElement = '#p_lt_ctl01_pageplaceholder_p_lt_ctl00_WebPartZone_plcUp_WebPartZone_zone_FindRates_zipCodeInput';
	// // 	await page.waitForSelector(inputElement);
	// // 	await page.type(inputElement, '22180'); // Vienna, VA
	// // 	await page.keyboard.press('Enter');
		
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#MenuItem4 > div > div.column.generic-block_content > table > tbody > tr:nth-child(18) > td:nth-child(4)';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => JSON.stringify(el.textContent.trim()));

  const minBalanceSelector = '#MenuItem4 > div > div.column.generic-block_content > table > tbody > tr:nth-child(18) > td:nth-child(2)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  // const maxBalanceSelector = '#accordion-d7c9c87e-a955-4621-a47d-d249ca47b9d6-panel-0 > div > div:nth-child(3) > div.cmswp-custom-table-scroll > table > tbody > tr:nth-child(5) > td:nth-child(1)';
  // const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  // const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  const maxBalance = null;
  
  const productNameSelector = '#MenuItem4 > div > div.column.generic-block_content > table > tbody > tr:nth-child(18) > td:nth-child(1)';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'San Diego County savings 1'
  };
};

const sanDiegoCountyHighYieldSavings1 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.sdccu.com/rates/consumer-deposit-rates/');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const modalElement = '#checking_and_savings > nav > div > ul > li.\\31 .current > a';
	// 	await page.waitForSelector(modalElement);
	// 	await page.click(modalElement);
	// 	// const dropdownSelect = '#rate-table-state > option:nth-child(2)';
	// 	// await page.waitForSelector(dropdownSelect);
	// 	// await page.click(dropdownSelect);

	// // 	const inputElement = '#p_lt_ctl01_pageplaceholder_p_lt_ctl00_WebPartZone_plcUp_WebPartZone_zone_FindRates_zipCodeInput';
	// // 	await page.waitForSelector(inputElement);
	// // 	await page.type(inputElement, '22180'); // Vienna, VA
	// // 	await page.keyboard.press('Enter');
		
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#MenuItem3 > div > div.column.generic-block_content > table > tbody > tr:nth-child(7) > td:nth-child(3)';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => JSON.stringify(el.textContent.trim()));

  const minBalanceSelector = '#MenuItem3 > div > div.column.generic-block_content > p';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#MenuItem3 > div > div.column.generic-block_content > table > tbody > tr:nth-child(7) > td:nth-child(1)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  // const maxBalance = null;
  
  const productNameSelector = '#MenuItem3 > div > div:nth-child(1) > h2';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'San Diego County high yield savings 1'
  };
};

const sanDiegoCountyHighYieldSavings2 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.sdccu.com/rates/consumer-deposit-rates/');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const modalElement = '#checking_and_savings > nav > div > ul > li.\\31 .current > a';
	// 	await page.waitForSelector(modalElement);
	// 	await page.click(modalElement);
	// 	// const dropdownSelect = '#rate-table-state > option:nth-child(2)';
	// 	// await page.waitForSelector(dropdownSelect);
	// 	// await page.click(dropdownSelect);

	// // 	const inputElement = '#p_lt_ctl01_pageplaceholder_p_lt_ctl00_WebPartZone_plcUp_WebPartZone_zone_FindRates_zipCodeInput';
	// // 	await page.waitForSelector(inputElement);
	// // 	await page.type(inputElement, '22180'); // Vienna, VA
	// // 	await page.keyboard.press('Enter');
		
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#MenuItem3 > div > div.column.generic-block_content > table > tbody > tr:nth-child(6) > td:nth-child(3)';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => JSON.stringify(el.textContent.trim()));

  const minBalanceSelector = '#MenuItem3 > div > div.column.generic-block_content > table > tbody > tr:nth-child(6) > td:nth-child(1)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#MenuItem3 > div > div.column.generic-block_content > table > tbody > tr:nth-child(6) > td:nth-child(1)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  // const maxBalance = null;
  
  const productNameSelector = '#MenuItem3 > div > div:nth-child(1) > h2';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'San Diego County high yield savings 2'
  };
};

const sanDiegoCountyHighYieldSavings3 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.sdccu.com/rates/consumer-deposit-rates/');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const modalElement = '#checking_and_savings > nav > div > ul > li.\\31 .current > a';
	// 	await page.waitForSelector(modalElement);
	// 	await page.click(modalElement);
	// 	// const dropdownSelect = '#rate-table-state > option:nth-child(2)';
	// 	// await page.waitForSelector(dropdownSelect);
	// 	// await page.click(dropdownSelect);

	// // 	const inputElement = '#p_lt_ctl01_pageplaceholder_p_lt_ctl00_WebPartZone_plcUp_WebPartZone_zone_FindRates_zipCodeInput';
	// // 	await page.waitForSelector(inputElement);
	// // 	await page.type(inputElement, '22180'); // Vienna, VA
	// // 	await page.keyboard.press('Enter');
		
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#MenuItem3 > div > div.column.generic-block_content > table > tbody > tr:nth-child(5) > td:nth-child(3)';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => JSON.stringify(el.textContent.trim()));

  const minBalanceSelector = '#MenuItem3 > div > div.column.generic-block_content > table > tbody > tr:nth-child(5) > td:nth-child(1)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#MenuItem3 > div > div.column.generic-block_content > table > tbody > tr:nth-child(5) > td:nth-child(1)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  // const maxBalance = null;
  
  const productNameSelector = '#MenuItem3 > div > div:nth-child(1) > h2';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'San Diego County high yield savings 3'
  };
};

const sanDiegoCountyHighYieldSavings4 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.sdccu.com/rates/consumer-deposit-rates/');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const modalElement = '#checking_and_savings > nav > div > ul > li.\\31 .current > a';
	// 	await page.waitForSelector(modalElement);
	// 	await page.click(modalElement);
	// 	// const dropdownSelect = '#rate-table-state > option:nth-child(2)';
	// 	// await page.waitForSelector(dropdownSelect);
	// 	// await page.click(dropdownSelect);

	// // 	const inputElement = '#p_lt_ctl01_pageplaceholder_p_lt_ctl00_WebPartZone_plcUp_WebPartZone_zone_FindRates_zipCodeInput';
	// // 	await page.waitForSelector(inputElement);
	// // 	await page.type(inputElement, '22180'); // Vienna, VA
	// // 	await page.keyboard.press('Enter');
		
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#MenuItem3 > div > div.column.generic-block_content > table > tbody > tr:nth-child(4) > td:nth-child(3)';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => JSON.stringify(el.textContent.trim()));

  const minBalanceSelector = '#MenuItem3 > div > div.column.generic-block_content > table > tbody > tr:nth-child(4) > td:nth-child(1)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#MenuItem3 > div > div.column.generic-block_content > table > tbody > tr:nth-child(4) > td:nth-child(1)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  // const maxBalance = null;
  
  const productNameSelector = '#MenuItem3 > div > div:nth-child(1) > h2';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'San Diego County high yield savings 4'
  };
};

const sanDiegoCountyHighYieldSavings5 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.sdccu.com/rates/consumer-deposit-rates/');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const modalElement = '#checking_and_savings > nav > div > ul > li.\\31 .current > a';
	// 	await page.waitForSelector(modalElement);
	// 	await page.click(modalElement);
	// 	// const dropdownSelect = '#rate-table-state > option:nth-child(2)';
	// 	// await page.waitForSelector(dropdownSelect);
	// 	// await page.click(dropdownSelect);

	// // 	const inputElement = '#p_lt_ctl01_pageplaceholder_p_lt_ctl00_WebPartZone_plcUp_WebPartZone_zone_FindRates_zipCodeInput';
	// // 	await page.waitForSelector(inputElement);
	// // 	await page.type(inputElement, '22180'); // Vienna, VA
	// // 	await page.keyboard.press('Enter');
		
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#MenuItem3 > div > div.column.generic-block_content > table > tbody > tr:nth-child(3) > td:nth-child(3)';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => JSON.stringify(el.textContent.trim()));

  const minBalanceSelector = '#MenuItem3 > div > div.column.generic-block_content > table > tbody > tr:nth-child(3) > td:nth-child(1)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#MenuItem3 > div > div.column.generic-block_content > table > tbody > tr:nth-child(3) > td:nth-child(1)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  // const maxBalance = null;
  
  const productNameSelector = '#MenuItem3 > div > div:nth-child(1) > h2';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'San Diego County high yield savings 5'
  };
};

const sanDiegoCountyHighYieldSavings6 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.sdccu.com/rates/consumer-deposit-rates/');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const modalElement = '#checking_and_savings > nav > div > ul > li.\\31 .current > a';
	// 	await page.waitForSelector(modalElement);
	// 	await page.click(modalElement);
	// 	// const dropdownSelect = '#rate-table-state > option:nth-child(2)';
	// 	// await page.waitForSelector(dropdownSelect);
	// 	// await page.click(dropdownSelect);

	// // 	const inputElement = '#p_lt_ctl01_pageplaceholder_p_lt_ctl00_WebPartZone_plcUp_WebPartZone_zone_FindRates_zipCodeInput';
	// // 	await page.waitForSelector(inputElement);
	// // 	await page.type(inputElement, '22180'); // Vienna, VA
	// // 	await page.keyboard.press('Enter');
		
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#MenuItem3 > div > div.column.generic-block_content > table > tbody > tr:nth-child(2) > td:nth-child(3)';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => JSON.stringify(el.textContent.trim()));

  const minBalanceSelector = '#MenuItem3 > div > div.column.generic-block_content > table > tbody > tr:nth-child(2) > td:nth-child(1)';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#MenuItem3 > div > div.column.generic-block_content > table > tbody > tr:nth-child(2) > td:nth-child(1)';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  // const maxBalance = null;
  
  const productNameSelector = '#MenuItem3 > div > div:nth-child(1) > h2';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'San Diego County high yield savings 6'
  };
};

const sanDiegoCountyGreatRateSavings1 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.sdccu.com/rates/consumer-deposit-rates/');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const modalElement = '#checking_and_savings > nav > div > ul > li.\\31 .current > a';
	// 	await page.waitForSelector(modalElement);
	// 	await page.click(modalElement);
	// 	// const dropdownSelect = '#rate-table-state > option:nth-child(2)';
	// 	// await page.waitForSelector(dropdownSelect);
	// 	// await page.click(dropdownSelect);

	// // 	const inputElement = '#p_lt_ctl01_pageplaceholder_p_lt_ctl00_WebPartZone_plcUp_WebPartZone_zone_FindRates_zipCodeInput';
	// // 	await page.waitForSelector(inputElement);
	// // 	await page.type(inputElement, '22180'); // Vienna, VA
	// // 	await page.keyboard.press('Enter');
		
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#MenuItem2 > div > div.column.generic-block_content > table > tbody > tr:nth-child(9) > td:nth-child(3) > div';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => JSON.stringify(el.textContent.trim()));

  const minBalanceSelector = '#MenuItem2 > div > div.column.generic-block_content > p';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#MenuItem2 > div > div.column.generic-block_content > table > tbody > tr:nth-child(9) > td:nth-child(1) > div';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  // const maxBalance = null;
  
  const productNameSelector = '#MenuItem2 > div > div:nth-child(1) > h2';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'San Diego County Great Rate savings 1'
  };
};

const sanDiegoCountyGreatRateSavings2 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.sdccu.com/rates/consumer-deposit-rates/');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const modalElement = '#checking_and_savings > nav > div > ul > li.\\31 .current > a';
	// 	await page.waitForSelector(modalElement);
	// 	await page.click(modalElement);
	// 	// const dropdownSelect = '#rate-table-state > option:nth-child(2)';
	// 	// await page.waitForSelector(dropdownSelect);
	// 	// await page.click(dropdownSelect);

	// // 	const inputElement = '#p_lt_ctl01_pageplaceholder_p_lt_ctl00_WebPartZone_plcUp_WebPartZone_zone_FindRates_zipCodeInput';
	// // 	await page.waitForSelector(inputElement);
	// // 	await page.type(inputElement, '22180'); // Vienna, VA
	// // 	await page.keyboard.press('Enter');
		
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#MenuItem2 > div > div.column.generic-block_content > table > tbody > tr:nth-child(8) > td:nth-child(3) > div';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => JSON.stringify(el.textContent.trim()));

  const minBalanceSelector = '#MenuItem2 > div > div.column.generic-block_content > p';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#MenuItem2 > div > div.column.generic-block_content > table > tbody > tr:nth-child(8) > td:nth-child(1) > div';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  // const maxBalance = null;
  
  const productNameSelector = '#MenuItem2 > div > div:nth-child(1) > h2';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'San Diego County Great Rate savings 2'
  };
};

const sanDiegoCountyGreatRateSavings3 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.sdccu.com/rates/consumer-deposit-rates/');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const modalElement = '#checking_and_savings > nav > div > ul > li.\\31 .current > a';
	// 	await page.waitForSelector(modalElement);
	// 	await page.click(modalElement);
	// 	// const dropdownSelect = '#rate-table-state > option:nth-child(2)';
	// 	// await page.waitForSelector(dropdownSelect);
	// 	// await page.click(dropdownSelect);

	// // 	const inputElement = '#p_lt_ctl01_pageplaceholder_p_lt_ctl00_WebPartZone_plcUp_WebPartZone_zone_FindRates_zipCodeInput';
	// // 	await page.waitForSelector(inputElement);
	// // 	await page.type(inputElement, '22180'); // Vienna, VA
	// // 	await page.keyboard.press('Enter');
		
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#MenuItem2 > div > div.column.generic-block_content > table > tbody > tr:nth-child(7) > td:nth-child(3) > div';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => JSON.stringify(el.textContent.trim()));

  const minBalanceSelector = '#MenuItem2 > div > div.column.generic-block_content > p';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#MenuItem2 > div > div.column.generic-block_content > table > tbody > tr:nth-child(7) > td:nth-child(1) > div';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  // const maxBalance = null;
  
  const productNameSelector = '#MenuItem2 > div > div:nth-child(1) > h2';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'San Diego County Great Rate savings 3'
  };
};

const sanDiegoCountyGreatRateSavings4 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.sdccu.com/rates/consumer-deposit-rates/');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const modalElement = '#checking_and_savings > nav > div > ul > li.\\31 .current > a';
	// 	await page.waitForSelector(modalElement);
	// 	await page.click(modalElement);
	// 	// const dropdownSelect = '#rate-table-state > option:nth-child(2)';
	// 	// await page.waitForSelector(dropdownSelect);
	// 	// await page.click(dropdownSelect);

	// // 	const inputElement = '#p_lt_ctl01_pageplaceholder_p_lt_ctl00_WebPartZone_plcUp_WebPartZone_zone_FindRates_zipCodeInput';
	// // 	await page.waitForSelector(inputElement);
	// // 	await page.type(inputElement, '22180'); // Vienna, VA
	// // 	await page.keyboard.press('Enter');
		
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#MenuItem2 > div > div.column.generic-block_content > table > tbody > tr:nth-child(6) > td:nth-child(3) > div';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => JSON.stringify(el.textContent.trim()));

  const minBalanceSelector = '#MenuItem2 > div > div.column.generic-block_content > p';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#MenuItem2 > div > div.column.generic-block_content > table > tbody > tr:nth-child(6) > td:nth-child(1) > div';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  // const maxBalance = null;
  
  const productNameSelector = '#MenuItem2 > div > div:nth-child(1) > h2';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'San Diego County Great Rate savings 4'
  };
};

const sanDiegoCountyGreatRateSavings5 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.sdccu.com/rates/consumer-deposit-rates/');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const modalElement = '#checking_and_savings > nav > div > ul > li.\\31 .current > a';
	// 	await page.waitForSelector(modalElement);
	// 	await page.click(modalElement);
	// 	// const dropdownSelect = '#rate-table-state > option:nth-child(2)';
	// 	// await page.waitForSelector(dropdownSelect);
	// 	// await page.click(dropdownSelect);

	// // 	const inputElement = '#p_lt_ctl01_pageplaceholder_p_lt_ctl00_WebPartZone_plcUp_WebPartZone_zone_FindRates_zipCodeInput';
	// // 	await page.waitForSelector(inputElement);
	// // 	await page.type(inputElement, '22180'); // Vienna, VA
	// // 	await page.keyboard.press('Enter');
		
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#MenuItem2 > div > div.column.generic-block_content > table > tbody > tr:nth-child(5) > td:nth-child(3) > div';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => JSON.stringify(el.textContent.trim()));

  const minBalanceSelector = '#MenuItem2 > div > div.column.generic-block_content > p';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#MenuItem2 > div > div.column.generic-block_content > table > tbody > tr:nth-child(5) > td:nth-child(1) > div';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  // const maxBalance = null;
  
  const productNameSelector = '#MenuItem2 > div > div:nth-child(1) > h2';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'San Diego County Great Rate savings 5'
  };
};

const sanDiegoCountyGreatRateSavings6 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.sdccu.com/rates/consumer-deposit-rates/');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const modalElement = '#checking_and_savings > nav > div > ul > li.\\31 .current > a';
	// 	await page.waitForSelector(modalElement);
	// 	await page.click(modalElement);
	// 	// const dropdownSelect = '#rate-table-state > option:nth-child(2)';
	// 	// await page.waitForSelector(dropdownSelect);
	// 	// await page.click(dropdownSelect);

	// // 	const inputElement = '#p_lt_ctl01_pageplaceholder_p_lt_ctl00_WebPartZone_plcUp_WebPartZone_zone_FindRates_zipCodeInput';
	// // 	await page.waitForSelector(inputElement);
	// // 	await page.type(inputElement, '22180'); // Vienna, VA
	// // 	await page.keyboard.press('Enter');
		
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#MenuItem2 > div > div.column.generic-block_content > table > tbody > tr:nth-child(4) > td:nth-child(3) > div';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => JSON.stringify(el.textContent.trim()));

  const minBalanceSelector = '#MenuItem2 > div > div.column.generic-block_content > p';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#MenuItem2 > div > div.column.generic-block_content > table > tbody > tr:nth-child(4) > td:nth-child(1) > div';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  // const maxBalance = null;
  
  const productNameSelector = '#MenuItem2 > div > div:nth-child(1) > h2';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'San Diego County Great Rate savings 6'
  };
};

const sanDiegoCountyGreatRateSavings7 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.sdccu.com/rates/consumer-deposit-rates/');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const modalElement = '#checking_and_savings > nav > div > ul > li.\\31 .current > a';
	// 	await page.waitForSelector(modalElement);
	// 	await page.click(modalElement);
	// 	// const dropdownSelect = '#rate-table-state > option:nth-child(2)';
	// 	// await page.waitForSelector(dropdownSelect);
	// 	// await page.click(dropdownSelect);

	// // 	const inputElement = '#p_lt_ctl01_pageplaceholder_p_lt_ctl00_WebPartZone_plcUp_WebPartZone_zone_FindRates_zipCodeInput';
	// // 	await page.waitForSelector(inputElement);
	// // 	await page.type(inputElement, '22180'); // Vienna, VA
	// // 	await page.keyboard.press('Enter');
		
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#MenuItem2 > div > div.column.generic-block_content > table > tbody > tr:nth-child(3) > td:nth-child(3) > div';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => JSON.stringify(el.textContent.trim()));

  const minBalanceSelector = '#MenuItem2 > div > div.column.generic-block_content > p';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#MenuItem2 > div > div.column.generic-block_content > table > tbody > tr:nth-child(3) > td:nth-child(1) > div';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  // const maxBalance = null;
  
  const productNameSelector = '#MenuItem2 > div > div:nth-child(1) > h2';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'San Diego County Great Rate savings 7'
  };
};

const sanDiegoCountyGreatRateSavings8 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.sdccu.com/rates/consumer-deposit-rates/');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const modalElement = '#checking_and_savings > nav > div > ul > li.\\31 .current > a';
	// 	await page.waitForSelector(modalElement);
	// 	await page.click(modalElement);
	// 	// const dropdownSelect = '#rate-table-state > option:nth-child(2)';
	// 	// await page.waitForSelector(dropdownSelect);
	// 	// await page.click(dropdownSelect);

	// // 	const inputElement = '#p_lt_ctl01_pageplaceholder_p_lt_ctl00_WebPartZone_plcUp_WebPartZone_zone_FindRates_zipCodeInput';
	// // 	await page.waitForSelector(inputElement);
	// // 	await page.type(inputElement, '22180'); // Vienna, VA
	// // 	await page.keyboard.press('Enter');
		
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#MenuItem2 > div > div.column.generic-block_content > table > tbody > tr:nth-child(2) > td:nth-child(3) > div';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => JSON.stringify(el.textContent.trim()));

  const minBalanceSelector = '#MenuItem2 > div > div.column.generic-block_content > p';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#MenuItem2 > div > div.column.generic-block_content > table > tbody > tr:nth-child(2) > td:nth-child(1) > div';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  // const maxBalance = null;
  
  const productNameSelector = '#MenuItem2 > div > div:nth-child(1) > h2';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'San Diego County Great Rate savings 8'
  };
};

const patelcoSavings1 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.patelco.org/checking-and-savings/savings-accounts/regular');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const modalElement = '#checking_and_savings > nav > div > ul > li.\\31 .current > a';
	// 	await page.waitForSelector(modalElement);
	// 	await page.click(modalElement);
	// 	// const dropdownSelect = '#rate-table-state > option:nth-child(2)';
	// 	// await page.waitForSelector(dropdownSelect);
	// 	// await page.click(dropdownSelect);

	// // 	const inputElement = '#p_lt_ctl01_pageplaceholder_p_lt_ctl00_WebPartZone_plcUp_WebPartZone_zone_FindRates_zipCodeInput';
	// // 	await page.waitForSelector(inputElement);
	// // 	await page.type(inputElement, '22180'); // Vienna, VA
	// // 	await page.keyboard.press('Enter');
		
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = 'body > div:nth-child(11) > div > div > div > div > div > div:nth-child(1) > div > p:nth-child(2) > span';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => JSON.stringify(el.textContent.trim()));

  const minBalanceSelector = 'body > div:nth-child(11) > div > div > div > div > div > div:nth-child(3) > div > p';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = 'body > div:nth-child(11) > div > div > div > div > div > div:nth-child(3) > div > p';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  // const maxBalance = null;
  
  const productNameSelector = 'body > div.m1.m1_large.m1_dtl.container.marque-med-cont > div.section-white-bg > div > div > div > h1';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'Patelco Savings 1'
  };
};

const pennsylvaniaStateEmployeesSavings1 = async () => {
  console.log('browser')
  const browser = await puppeteer.launch(launchSettings);
  const context = await browser.createIncognitoBrowserContext();
  console.log('page')
  const page = await context.newPage();
  
  page.setViewport(viewPort);
  console.log('goto')
  await page.goto('https://www.psecu.com/rates');

  // await page.waitForNetworkIdle()
  console.log('page loaded')
  
  // Fill out form
  // try {
	// 	console.log('Wait')
	// 	const modalElement = '#checking_and_savings > nav > div > ul > li.\\31 .current > a';
	// 	await page.waitForSelector(modalElement);
	// 	await page.click(modalElement);
	// 	// const dropdownSelect = '#rate-table-state > option:nth-child(2)';
	// 	// await page.waitForSelector(dropdownSelect);
	// 	// await page.click(dropdownSelect);

	// // 	const inputElement = '#p_lt_ctl01_pageplaceholder_p_lt_ctl00_WebPartZone_plcUp_WebPartZone_zone_FindRates_zipCodeInput';
	// // 	await page.waitForSelector(inputElement);
	// // 	await page.type(inputElement, '22180'); // Vienna, VA
	// // 	await page.keyboard.press('Enter');
		
	// 	await page.waitForNetworkIdle()
  // } catch (err) {
	// 	console.log('error waiting for selector. Keep going')
  // }

  console.log('submit')
  
  const apySelector = '#psmain > div > div:nth-child(2) > div > div > div > div.PSECU-Feature-ReusableContent-ThreeColumnTable > div > table > tbody > tr:nth-child(1) > td:nth-child(2)';
  const apyElement = await page.waitForSelector(apySelector);
  const apy = await apyElement.evaluate(el => JSON.stringify(el.textContent.trim()));

  const minBalanceSelector = '#psmain > div > div:nth-child(2) > div > div > div > div.PSECU-Feature-ReusableContent-ThreeColumnTable > div > p > small';
  const minBalanceElement = await page.waitForSelector(minBalanceSelector);
  const minBalance = await minBalanceElement.evaluate(el => el.textContent.trim());

  const maxBalanceSelector = '#psmain > div > div:nth-child(2) > div > div > div > div.PSECU-Feature-ReusableContent-ThreeColumnTable > div > p > small';
  const maxBalanceElement = await page.waitForSelector(maxBalanceSelector);
  const maxBalance = await maxBalanceElement.evaluate(el => el.textContent.trim());
  // const maxBalance = null;
  
  const productNameSelector = '#psmain > div > div:nth-child(2) > div > div > div > div.PSECU-Feature-ReusableContent-ThreeColumnTable > div > table > tbody > tr:nth-child(1) > th';
  const productNameElement = await page.waitForSelector(productNameSelector);
  const productName = await productNameElement.evaluate(el => el.textContent.trim());
  
  console.log('productName: ', productName);
  console.log('apy: ', apy);
  console.log('minBalance: ', minBalance);
  console.log('maxBalance: ', maxBalance);

  await browser.close();

  return {
    apy,
    productName,
    minBalance,
    maxBalance,
    script: 'Patelco Savings 1'
  };
};

  
console.log('starting');

Promise.all([
  americaFirstShareSavings1(launchSettings, viewPort),
  americaFirstShareSavings1(launchSettings, viewPort, true),
  // tdSavings(),
  // sanDiegoCountyGreatRateSavings1(),
]).then(res => {
  console.log('res: ', res);
  const writeStream = fs.createWriteStream("./newlyScrapedData.csv");
  writeStream.write(
    "Bank Name, Account Type, Account Name, APY, Minimum Balance, Maximum Balance, \n"
  );
  res.forEach(productData => {
    const { script, productName, apy } = productData;
    writeStream.write(
      `${script}, Account Type, ${productName}, ${apy}, Minimum Balance, Maximum Balance, \n`
    );
  })
  return ;
}).catch(e => {
  console.log("Keep going despite this error: ", e)
  const writeStream = fs.createWriteStream("./errors.txt");
  writeStream.write(
    `This is one of the errors we received, ${e} \n`
  );
});


// Write stream headers for primary scraper file.

// patelcoSavings1(),
// pennsylvaniaStateEmployeesSavings1(),
// sanDiegoCountyGreatRateSavings2(),
// sanDiegoCountyGreatRateSavings3(),
// sanDiegoCountyGreatRateSavings4(),
// sanDiegoCountyGreatRateSavings5(),
// sanDiegoCountyGreatRateSavings6(),
// sanDiegoCountyGreatRateSavings7(),
// sanDiegoCountyGreatRateSavings8(),
// sanDiegoCountySavings1(),
// sanDiegoCountyHighYieldSavings1(),
// sanDiegoCountyHighYieldSavings2(),
// sanDiegoCountyHighYieldSavings3(),
// sanDiegoCountyHighYieldSavings4(),
// sanDiegoCountyHighYieldSavings5(),
// sanDiegoCountyHighYieldSavings6(),
// teachersPrimaryShareSavings1(),
// teachersPrimaryShareSavings2(),
// teachersPrimaryShareSavings3(),
// teachersPrimaryShareSavings4(),
// digitalPrimarySavings1(),
// mountainAmericaPersonalSavings1(),
// bethpageSavings1(),
// firstTechMemberSavings1(),
// firstTechCarefreeSavings1(),
// boeingEmployeeMemberSavings1(),
// boeingEmployeeMemberSavings2(),

// alliantHighYieldSavings1(),
// penFedRegularSavings1(),
// penFedOnlineSavings1(),
// independentBankEagleSavings1(),
// independentBankEagleSavings2(),
// independentBankEagleSavings3(),
// independentBankEagleSavings4(),
// independentBankEagleSavings5(),
// independentBankEagleSavings6(),
// wsfsBankCoreSavings1(),
// wsfsBankCoreSavings2(),
// wsfsBankCoreSavings3(),
// washingtonFederalSavings(),
// easternBankStatementSavings()
// unitedCommunityBankSavings1(),
// unitedCommunityBankSavings2(),
// eFirstRegularSavings(),
// texasCapitalStarSavings(),
// tiaaYieldPledgeOnlineSavings(),
// commerceRewardsSavings(),
// firstNationalBankFirstRateSavings1(),
// firstNationalBankFirstRateSavings2(),
// firstNationalBankFirstRateSavings3(),
// firstNationalBankFirstRateSavings4(),
// firstNationalBankFirstRateSavings5(),
// firstNationalBankFirstRateSavings6(),
// southStatePersonalSavings(),
// southStateGoldSavings1(),
// southStateGoldSavings2(),
// southStateGoldSavings3(),
// southStateGoldSavings4(),
// southStateGoldSavings5(),
// southStateGoldSavings6(),
// popularSavings1(),
// popularSavings2(),
// popularSavings3(),
// popularSavings4(),
// popularSavings5(),
// valleyAllAccessSavings(),
// frostSavings()
// usBankStandardSavings(),
// comericaStatementSavings(),
// citSavingsConnect(),
// citSavingsBuilder(),
// citPlatinumSavings1(),	
// citPlatinumSavings2(),	
// synchronySavings1(),
// synchronySavings2(),
// synchronySavings3(),
// firstHorizonSavings(),
// discoverOnlineSavings(),
// firstCitizensSavings(),
// allySavings(),
// santanderSavings(),
// keyBankActiveSaver1(),
// keyBankActiveSaver2(),
// keyBankActiveSaver3(),
// keyBankActiveSaver4(),
// keyBankActiveSaver5(),
// keyBankActiveSaver6(),
// keyBankActiveSaver7(),
// keyBankActiveSaver8(),
// keyBankActiveSaver9(),
// keyBankActiveSaver10(),
// mtRelationshipSavings(),
// bmoSavingsBuilder(),
// bettermentSavings(),
// wealthfrontSavings(),
// citizensQuestSavings1(),
// citizensQuestSavings2(),
// citizensQuestSavings3(),
// citizensQuestSavings4(),
// citizensQuestSavings5(),
// citizensQuestSavings6(),
// citizensQuestSavings7(),
// citizensQuestSavings8(),
// usaaPerformanceFirstSavings1(),
// usaaPerformanceFirstSavings2(),
// usaaPerformanceFirstSavings3(),
// usaaPerformanceFirstSavings4(),
// usaaPerformanceFirstSavings5(),
// usaaPerformanceFirstSavings6(),
// usaaPerformanceFirstSavings7(),
// usaaPerformanceFirstSavings8(),
// usaaSavings1(),
// usaaSavings2(),
// usaaSavings3(),
// usaaSavings4(),
// amexHighYieldSavings(),
// capitalOne360PerformanceSavings(),
// truistOneSavings(),
// pncStandardSavings1(),
// pncStandardSavings2(),
// pncHighYieldSavings(),
// goldmanSachsMarcusSavings(),
// wfSavings(),
// citiSavings(),
