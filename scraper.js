import templatesToScrape from './templates/templates.js'

console.log(`=== Preparing Scraping Engine. ===`);
console.log(`=== Will scrape ${templatesToScrape.length} products. === \n`);

try {
  // Todo: This may not actually be async since it's in a foreach.
  templatesToScrape.forEach(template => template());
} catch (e) {
  console.log("\n === We encountered an error. See below: === \n", e);
}