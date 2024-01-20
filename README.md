# Table of Contents
- [Project Background](#background)
- [Roadmap](#project-roadmap)
- [Contribution Guide](#contributing)
- [Getting Started](#getting-started)
- [Architecture & Logic Flow](#logic-flow)

# Background <a name="background"></a>
There are approximately 4,136 [banks](https://banks.data.fdic.gov/explore/historical/?displayFields=STNAME%2CTOTAL%2CBRANCHES%2CNew_Char%2COFFICES%2CUNIT%2CBRANCHIN&selectedEndDate=2022&selectedReport=CBS&selectedStartDate=1934&selectedStates=0&sortField=YEAR&sortOrder=desc) and 4,645 [credit unions](https://ncua.gov/analysis/credit-union-corporate-call-report-data/quarterly-data-summary-reports) in the United States. These institutions offer [deposit accounts](https://en.wikipedia.org/wiki/Deposit_account), and most commonly offer at least one of the following: [Savings](https://en.wikipedia.org/wiki/Savings_account), [Checking](https://en.wikipedia.org/wiki/Transaction_account), [Money Market](https://en.wikipedia.org/wiki/Money_market_account), or [Certificate of Deposit](https://en.wikipedia.org/wiki/Time_deposit). The primary difference between banks and credit unions is that banks are for-profit institutions whereas credit unions are [not-for-profit, cooperative, tax-exempt organizations](https://en.wikipedia.org/wiki/Credit_unions_in_the_United_States).

> Within the scope of this project, we use the term `bank` to refer to all institutions offering federally insured deposit accounts available in the United States, including credit unions and savings and loan institutions. We also use the term `bank account` to refer to any type of deposit account offered by a bank.

It is common for banks to offer multiple tiers of an account in order to incentivize customers to deposit more money with the bank. To give an approximation of how large the deposit account marketplace is: if each bank were to offer 2 tiers of each type of bank account, there would be ~64,000 accounts in the United States, each with different rates and fees which can change at any time, for any reason.

Because these accounts are regulated and federally insured, they are effectively risk-free financial commodities, which compete primarily on fees and interest rates. With the technological advancements in mobile technology, banks are no longer tied to geographic regions, and can compete nationally for deposits. This has dramatically increased competition.

Despite the increased competition, the top banks offer some of the worst interest rates, highest fees, and tightest restrictions, compared to [national averages](https://www.fdic.gov/resources/bankers/national-rates/index.html). This is partially due to the [billions](https://www.google.com/search?hl=en&q=how%20much%20do%20banks%20spend%20on%20advertising) that large banks invest in advertising and marketing. Because they spend less on marketing and advertising, smaller banks are able to offer better rates, lower fees, and more accessible products. But due to the tens of thousands of products to compare, it is infeasible for an individual to monitor changes across the marketplace without assistance. Bank Rank seeks to provide a comprehensive solution to help consumers identify the best financial products for their personal financial situation. 

## Problems with Existing Solutions
There are many tools and services available which attempt to improve transparency in deposit account rates and fees, but all struggle from one or more of the following limitations:
- Closed source/methodologies: Many bank aggregation sites do not disclose how they rank or rate bank accounts. Bank Rank seeks to aggregate as much data as possible so users can make an informed decision
- Conflicts of interest: many bank review sites will receive referral bonuses for referring people to certain accounts. This creates a conflict of interest, since these sites ultimately serve the banks that pay them, not the consumers doing research
- Pay-to-win features: Some sites will aggregate products, but provide premium placement for sponsored products, putting them ahead of products which are objectively better
- Incomplete data sets: Other tools may have incomplete data or allow banks to pay for exclusivity, recommending users towards an inferior product

# Project Roadmap <a name="project-roadmap"></a>

## Phase 1 [In Progress]: Scraping Engine & productScripts
The initial phase requires developing the infrastructure to monitor financial data. Most banks publish their product information on their websites, so by creating a `scraping engine`, Bank Rank can monitor changes in product information. The engine utilizes reads `template files`, which tell the engine how to navigate to the web pages and extract information about a deposit account. 

Banks tend to change their websites infrequently, so once a template is created, it can be used repeatedly to monitor changes in a given product. 

## Phase 2: Backend API & Database
As the engine and productScripts are developed, work can begin on an API and database to provide a method for saving results and querying data. The engine will continue to output results in a `csv` file, but maintaining a historical record of rate changes can provide additional benefit to regulators, researchers, and consumers. 

## Phase 3: Consumer Tools 
Once the backend services are developed, there is an opportunity to provide additional tools to automate workflows a user may encounter when shopping for deposit accounts. For example:  
- A web application which allows researchers to query bank account data based on certain parameters
- A mobile app to customize a search based on a consumer's specific preferences, and get notified when a better product becomes available
- A tool to automate the process of opening new accounts and transferring funds

# Contributing <a name="contributing"></a>

This project is dependent on the contributions of volunteers like you. Thank you for your interest. No matter how technical you are, there are plenty of ways to get involved. 

#@ Contributor Priorities
1. The most valuable way you can contribute is to provide new productScripts or scripts
#### 
productScripts
Typescript
Prettier/Linter
Unit Tests
Engine Improvements

# Getting Started <a name="getting-started"></a>
1. Clone the repository locally with `git clone https://github.com/project-bankrank/bankrank.git`
2. Ensure that you have `npm` version 10.2.3+ and `node` version 20.10.0+ installed locally by verifying the versions with the following commands:
- `npm -v`
- `node -v`
3. Install necessary dependencies with `npm i`
4. Run `npm run engine` to execute the scraping engine on all the productScripts
5. Successful results are output to `outputs/bank-data.csv`
- Note that this file is cleared after every execution
6. Errors are output to `outputs/errors.txt`
- This file retains all errors, with each execution block starting with `==== START OF LOGS FROM EXECUTION AT {DATE}` and ending with `==== END OF LOGS FROM EXECUTION AT {DATE}`

# Architecture & Logic Flow <a name="logic-flow"></a> 
The `package.json` file contains a single program which can be run with `npm run engine`. This runs the scraping engine located in `scrapingEngine.js`, which reads each instructions for scraping the product information from each `productScript` exported from `productScripts/productScripts.js`. 

The `productScripts` directory contains subdirectories for each bank. Each subdirectory contains a file for each product offered by the bank, such as `Savings`, `Checking` or `Certificates of Deposit`, as well as an `index.js` file to make exporting the `productScripts` more organized. The naming convention for these files is `{institutionName}{brandedProductName}.js`. Occasionally, a bank will offer multiple types of the same product, such as a `regular savings` and a `high-yield savings`. Each product offering has its own file, so in this case there would be two different files: `{institutionName}{regularSavings}.js` and `{institutionName}{highYieldSavings}.js`. 

Each product file contains functions to scrape the various tiers of the product offering. Some banks only offer 1 tier for a product, in which case, there would only be one function exported from that product file. Others offer multiple tiers, which will be captured in separate functions, following the naming convention `{institutionName}{productName}{productTier}`. For example, `bankOfAmericaBasicSavings.js` may export 2 functions: `bankOfAmericaBasicSavings1`  and `bankOfAmericaBasicSavings2` in order to capture the 2 tiers of offerings for the `Basic Savings` account offered by `Bank of America`.

When executed, the scraping engine will scrape every product tier and output the results in `outputs/bank-data.csv`. Informational messages will be logged to your console, and any error logs will be captured in `outputs/errors.txt`.

### Conventions
- variable, function, and file names use `camelCase`
- attributes which correspond with a database field use `lower_case_with_underscores`
- Template Directories use `PascalCase` 
- Template files follow the pattern `{institutionName}{productName}.js`
- Template function names follow the pattern `{institutionName}{productName}{tier}`

### List of Zip Codes
94507 - Alamo, CA  
Chicago, IL  
New York, New York,  
Atlanta, GA,  
Fort Worth, TX  
Boston, MA  
Las Vegas, NV  


### List of Institutions
| Financial Institution          | Checking | Savings | Money Market | Certificate of Deposit | 
|--------------------------------|----------|---------|--------------|------------------------|
| America First                  |  -       |   Yes   |       -      |          -             |
| PNC                            |  -       |   Yes   |       -      |          -             |