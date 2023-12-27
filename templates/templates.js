/* 
This is the primary import/export file which is used to consolidate the various template imports into a single location

Each directory within /templates is a financial institution such as a Bank or Credit Union. For instance, /templates/BankOfAmerica or /templates/WellsFargo

Each of these institution-directories contains at least 1 file. Each file represents a template for scraping a specific product and tier. Most instituions have at least 2 products (checking and savings accounts), but many also have money market accounts and certificates of depoits. Each of these products are usually offered at multiple tiers, to incentivze customers to put more of their funds into the bank. As a result, it is common to find a single bank with dozens of product-tier offerings.

For instance, a bank may have the following 4 products: Savings, Checking, MMA, CD. Each product could have 3 tiers: $0-$1,000; $1,000-$100,000; $100,000+, for a total of 12 distinct offerings, each requiring their own file. To make organizing imports/exports more efficient, each institution has an `index.js` file which acts as the consolidator of imports and provides a single export to the template engine. As a result, the file structure for this bank could look like this:
  - /templates/exampleBank/index.js
  - /templates/exampleBank/checkingTier1.js
  - /templates/exampleBank/checkingTier2.js
  - /templates/exampleBank/checkingTier3.js
  - /templates/exampleBank/SavingsTier1.js
  - /templates/exampleBank/SavingsTier2.js
  - /templates/exampleBank/SavingsTier3.js
  - /templates/exampleBank/mmaTier1.js
  - /templates/exampleBank/mmaTier2.js
  - /templates/exampleBank/mmaTier3.js
  - /templates/exampleBank/cdTier1.js
  - /templates/exampleBank/cdTier2.js
  - /templates/exampleBank/cdTier3.js
*/

import americaFirst from './AmericaFirst/index.js';

export default [
  ...Object.values(americaFirst)
]