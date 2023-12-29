import templatesToScrape from './templates/templates.js';
import {
  writeBeginningOrEndingErrorLogMessage,
  writeErrorLog,
  createNewBankDataCsv,
  writeDataToBankDataCsv
} from './utils.js';

console.log(`=== Preparing Scraping Engine. ===`);
console.log(`\n=== Found ${templatesToScrape.length} products to look up. ===`);

try {
  createNewBankDataCsv();
  // Todo: This may not actually be async since it's in a foreach.
  Promise.all(templatesToScrape.map(template => template()))
    .then(responseFromAllTemplates => {
      const errorLogTimestamp = new Date().toString();
      writeBeginningOrEndingErrorLogMessage(errorLogTimestamp, true);

      let errorLogCount = 0;
      let successfulLogCount = 0;

      responseFromAllTemplates.forEach((response, index) => {
        if (response.success) {
          successfulLogCount++;
          writeDataToBankDataCsv(response)
        } else {
          errorLogCount++;
          writeErrorLog(response);
        }

      })
      writeBeginningOrEndingErrorLogMessage(errorLogTimestamp, false);
      if (errorLogCount > 0) {
        console.log(`\n${errorLogCount} errors were logged to /logFiles/errors.txt. You may want to look into them.`)
      }
      console.log(`\nFinished Sourcing Data. Successfully obtained data for ${successfulLogCount} product(s).`)
      return;
    }).catch(e => console.log('eee: ', e))
} catch (e) {
  console.log("\n === We encountered an error. See below: === \n", e);
}