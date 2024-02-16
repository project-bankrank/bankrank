/* 
  This is the primary import/export file which is used to consolidate
  the various template scripts into a single location, so the scrapingEngine
  only has a single import.

  Each directory within /productScripts is a financial institution such
  as a Bank or Credit Union, such as /productScripts/BankOfAmerica or
  /productScripts/NavyFederal.

  Each of these institution's directory contains a file for each product
  offering (savings, checking, etc). The file for each product offering 
  contians at least 1 function which is a playwright script for
  scraping a specified tier of the product. Some banks offer multiple 
  tiers of a product offering, so it is Bank Rank's objective to monitor
  every tier, for every product.

  All product offerings are imported into an index.ts file in each institution
  directory (productScripts/BankOfAmerica/index.ts). That index is imported at
  the top of this file, where its contents are spread out using the Object.values
  pattern below
*/

import americaFirst from "./AmericaFirst/index.js";
import pncStandardSavings from "./PNC/index.js";

export default [
  ...Object.values(americaFirst),
  ...Object.values(pncStandardSavings),
];
