# Table of Contents
- [Background](#background)
- [Project Bank Rank](#project-bankrank)
- [Architecture & Logic Flow](#logic-flow)
- [Getting Started Locally](#getting-started)
- [Contribution Guide](#contributing)

# Background <a name="background"></a>
There are approximately 4,136 [banks](https://banks.data.fdic.gov/explore/historical/?displayFields=STNAME%2CTOTAL%2CBRANCHES%2CNew_Char%2COFFICES%2CUNIT%2CBRANCHIN&selectedEndDate=2022&selectedReport=CBS&selectedStartDate=1934&selectedStates=0&sortField=YEAR&sortOrder=desc) and 4,645 [credit unions](https://ncua.gov/analysis/credit-union-corporate-call-report-data/quarterly-data-summary-reports) in the United States. These institutions offer [deposit accounts](https://en.wikipedia.org/wiki/Deposit_account), and most commonly offer at least one of the following: [Savings](https://en.wikipedia.org/wiki/Savings_account), [Checking](https://en.wikipedia.org/wiki/Transaction_account), [Money Market](https://en.wikipedia.org/wiki/Money_market_account), or [Certificate of Deposit](https://en.wikipedia.org/wiki/Time_deposit). The primary difference between banks and credit unions is that banks are for-profit institutions whereas credit unions are [not-for-profit, cooperative, tax-exempt organizations](https://en.wikipedia.org/wiki/Credit_unions_in_the_United_States).

> Within the scope of this project, we use the term `bank` to refer to all institutions offering federally insured deposit accounts available in the United States, including credit unions and savings and loan institutions. We also use the term `bank account` to refer to any type of deposit account offered by a bank.

It is common for banks to offer multiple tiers of an account in order to incentivize customers to deposit more money with the bank. To give an approximation of how large the deposit account marketplace is: if each bank were to offer 2 tiers of each type of bank account, there would be ~64,000 accounts in the United States, each with different rates and fees which can change at any time, for any reason.

Because these accounts are regulated and federally insured, they are effectively risk-free financial commodities, which compete primarily on fees and interest rates. With the technological advancements in mobile technology, banks are no longer tied to geographic regions, and can compete nationally for deposits. This has dramatically increased competition.

Despite the increased competition, the top banks offer some of the worst interest rates, highest fees, and tightest restrictions, compared to [national averages](https://www.fdic.gov/resources/bankers/national-rates/index.html). This is partially due to the [billions](https://www.google.com/search?hl=en&q=how%20much%20do%20banks%20spend%20on%20advertising) that large banks invest in advertising and marketing. Because they spend less on marketing and advertising, smaller banks are able to offer better rates, lower fees, and more accessible products. But due to the tens of thousands of products to compare, it is infeasible for an individual to monitor changes across the marketplace without assistance. Bank Rank seeks to provide a comprehensive solution to help consumers identify the best financial products for their personal financial situation. 

## Problems with Existing Solutions<a name="existing-problems"></a>
There are many tools and services available which attempt to improve transparency in deposit account rates and fees, but all struggle from one or more of the following limitations:
- Closed source/methodologies: Many bank aggregation sites do not disclose how they rank or rate bank accounts. Bank Rank seeks to aggregate as much data as possible so users can make an informed decision
- Conflicts of interest: many bank review sites will receive referral bonuses for referring people to certain accounts. This creates a conflict of interest, since these sites ultimately serve the banks that pay them, not the consumers doing research
- Pay-to-win features: Some sites will aggregate products, but provide premium placement for sponsored products, putting them ahead of products which are objectively better
- Incomplete data sets: Other tools may have incomplete data or allow banks to pay for exclusivity, recommending users towards an inferior product

# Project Bank Rank <a name="project-bankrank"></a>

Bank Rank is made up of 2 main components: A web automation tool and product scripts. The Bank Rank engine leverages [Playwright](https://playwright.dev/) for web automation, which reads the scripts contained from the `productScripts` directory. These scripts tell the Bank Rank engine how to navigate across the web and where to extract information about various financial products. 

By maintaining an open list of product scripts, regulators, researchers, and consumers can have access to the entire market of financial products, while avoiding all of the [existing problems](#existing-problems) with current solutions. While bank rates and terms update quite often, banks don't change their website layout as frequently, making it trivial for the Bank Rank community to update the product scripts as needed.

# Contributing <a name="contributing"></a>

Thank you for your interest in contributing! This project is dependent on the contributions of volunteers like you. No matter how technical you are, there are plenty of ways to get involved. 

## Ways to Contribute
1. [Submit New Product Scripts (Technical)](#submitting)
2. [Validate Existing Product Scripts (Non-Technical)](#validating)
3. [Engine Enhancements (Technical)](#engine)
4. [Improving Test Coverage (Technical)](#test)
4. [Backlog "Todos" (Technical)](#todos)

### Submit New Product Scripts (Technical)<a name="submitting"></a>
The best way to contribute to the project is to identify product offerings which are not currently scraped by Bank Rank, and submit them to the project. This process involves recording the steps you would take to normally look up the details about an account using a tool called playwright codegen.

First, identify a product offering which is not included in this listing. You can search for `false` to find products which are not currently being scraped. 

Next, install [playwright](https://playwright.dev/docs/intro#installing-playwright) which will come with a tool called `codegen`.
- `npm init playwright@latest`  

Once installed, plan out the steps involved with loading the web page that has the information for the product. When we run codegen, it will record every URL we visit and every interaction with the browser. For instance, your plan may involve the following steps:
1. Navigate to www.wellsFargo.com
2. Select the `bank` tab and click `savings accounts` from the dropdown
3. Enter a zip code and click the submit button
4. Scroll down to the second row of the third table to find the APY

Once you've got your flow prepared, load codegen with `npx playwright codegen`. This will open a new web browser and an "inspector" which will track your flow and automatically write the code needed. 

When you are ready to begin, verify that it is recording by checking whether the recording button is red (recording) or gray (not recording). You can click this at any point to pause your recording flow. Start recording and navigate to the page you want. Navigate to the page containing the product information. At a minimum, try to obtain the following pieces of information:
- Name of the product
- Name of the financial institution
- minimum account balance to open the account `AND` earn interest `AND` not pay a monthly fee
- maximum account balance to earn interest
- Annual Percentage Yield value (not the interest rate)

Stop the recording, and export the script as `Target > NodeJS > Library`.

Go to your editor and create a new file or open the existing file where you will place this script.

Click into the inspector. Highlight everything and copy it, then paste everything in the file. 

### Clean Up Phase


<!-- ### Validate Existing Product Scripts (Less-Technical) <a name="validating"></a>
### Engine Enhancements (Technical) <a name="engine"></a>
### Improving Test Coverage (Technical) <a name="tests"></a>
### Backlog "Todos" (Technical) <a name="todos"></a>
productScripts
Typescript
Prettier/Linter
Unit Tests
Engine Improvements -->

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
The `package.json` file contains a script called `engine` which can be executed with  `npm run engine`. This runs 4 sub-scripts which: compile the Typescript code; copy the packages to the compiled directory; install missing package dependencies; and executes the scraping engine `scrapingEngine.js`. This engine reads the instructions for scraping product information from each `productScript` exported from `productScripts/productScripts.js`. 

The `productScripts` directory contains subdirectories for each bank. Each subdirectory contains a file for each product offered by the bank, such as `Savings`, `Checking` or `Time Deposit`, as well as an `index.js` file to make exporting the `productScripts` more organized. The naming convention for these files is `{institutionName}{brandedProductName}.js`. Occasionally, a bank will offer multiple types of the same product, such as a `regular savings` and a `high-yield savings`. Each product offering has its own file, so in this case there would be two different files: `{institutionName}{regularSavings}.js` and `{institutionName}{highYieldSavings}.js`. 

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