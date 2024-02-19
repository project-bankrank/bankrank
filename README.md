# Table of Contents

- [Background](#background)
- [About Bank Rank](#project-bankrank)
- [Architecture & Logic Flow](#logic-flow)
- [Getting Started Locally](#getting-started)
- [Contribution Guide](#contributing)
- [Products & Institutions Monitored](#tracking)

# Background <a name="background"></a>

There are approximately 4,600 [banks](https://www.fdic.gov/analysis/quarterly-banking-profile/fdic-quarterly/) and 4,600 [credit unions](https://ncua.gov/analysis/credit-union-corporate-call-report-data/quarterly-data-summary-reports) in the United States. These institutions offer [deposit accounts](https://en.wikipedia.org/wiki/Deposit_account), and most commonly offer at least one of the following: Savings, Checking, Money Market, or Time Deposits. The primary difference between banks and credit unions is that banks are for-profit institutions whereas credit unions are [not-for-profit](https://en.wikipedia.org/wiki/Credit_unions_in_the_United_States), cooperative, tax-exempt organizations.

> Within the scope of this project, we use the term `bank` to refer to all institutions offering federally insured deposit accounts available in the United States, including credit unions and savings and loan institutions. We also use the term `bank account` to refer to any type of deposit account offered by a bank.

It is common for banks to offer multiple tiers of an account in order to incentivize customers to deposit more money with the bank. To give an approximation of how large the deposit account marketplace is: if each bank were to offer 2 tiers of each type of bank account, there would be over 70,000 accounts in the United States, each with different rates and fees which can change at any time, for any reason.

Because these accounts are regulated and federally insured, they are effectively risk-free financial commodities, which compete primarily on fees and interest rates. With the technological advancements in mobile technology, banks are no longer tied to geographic regions and can compete nationally for deposits, which has dramatically increased competition.

Despite the increased competition, the largest banks offer some of the worst interest rates, highest fees, and tightest restrictions compared to [national averages](https://www.fdic.gov/resources/bankers/national-rates/index.html). This is partially due to the [billions](https://www.google.com/search?hl=en&q=how%20much%20do%20banks%20spend%20on%20advertising) that large banks invest in advertising and marketing. Because they spend less on marketing and advertising, smaller banks are able to offer better rates, lower fees, and more accessible products. But due to the tens of thousands of products to compare, it is infeasible for an individual to monitor changes across the marketplace without assistance. Bank Rank is a tool which enables consumers to keep tabs of various financial products, and identify the best financial product for their personal financial situation.

## Problems with Existing Solutions<a name="existing-problems"></a>

There are many tools and services available which attempt to improve transparency in deposit account rates and fees, but all struggle from one or more of the following limitations:

- Closed source/black-box methodologies: Many bank aggregation sites do not disclose how they rank or rate bank accounts. Bank Rank seeks to aggregate as much data as possible so users can make an informed decision, and because it is open source, consumers can see how many products are being compared and the methodologies involved in sourcing the data.
- Conflicts of interest: many bank review sites will receive referral bonuses for referring people to certain accounts. This creates a conflict of interest, since these sites ultimately serve the banks that pay them, not the consumers doing research.
- Pay-to-win features: Some sites will aggregate products, but provide premium placement for sponsored products, prioritizing them ahead of products which are objectively better for the user.
- Incomplete data sets: Tools may have incomplete data or allow banks to pay for exclusivity, thereby recommending inferior products to users.
- Stale Data: Aggregation sites and tools batch their updates monthly or quarterly, even though product rates and fees can change daily.

# About Bank Rank <a name="project-bankrank"></a>

Bank Rank is made up of 2 main components: A web automation tool and product scripts. The Bank Rank engine l everages [Playwright](https://playwright.dev/) for web automation, which reads the scripts contained in the `productScripts` directory. These scripts tell the Bank Rank engine how to navigate across the web and where to extract information about various financial products.

By maintaining an open list of product scripts, regulators, researchers, and consumers can access to the entire market of financial products whenever they want, while avoiding all of the [existing problems](#existing-problems) with current solutions. And by being open sourced, the Bank Rank community can provide updates to the product scripts as banks change their web sites.

# Contribution Guide <a name="contributing"></a>

See our [contributing documentation](/docs/.github/CONTRIBUTING.md) which contains several ways to contribute, regardless of your technical experience.

# Getting Started <a name="getting-started"></a>

1. Clone the repository locally with `git clone https://github.com/project-bankrank/bankrank.git`
2. Ensure that you have `npm` version 10.2.3+ and `node` version 20.10.0+ installed locally by verifying the versions with the following commands:

- `npm -v`
- `node -v`

3. Install necessary dependencies with `npm i`
4. Run `npm run engine` to execute the scraping engine on all the productScripts
5. Successful results are output to `outputs/bank-data.csv`
   > Note: This file is cleared after every execution
6. Errors are output to `outputs/errors.txt`
   > This file retains errors between invocations, with each execution block starting with  
   > `==== START OF LOGS FROM EXECUTION AT {DATE} ====` and ending with  
   > `==== END OF LOGS FROM EXECUTION AT {DATE} ====`

# Architecture & Logic Flow <a name="logic-flow"></a>

The `package.json` file contains a script called `engine` which can be executed with `npm run engine`. This runs 4 sub-scripts which: compile the Typescript code; copy the packages to the compiled directory; install missing package dependencies; and executes the scraping engine `scrapingEngine.ts`. This engine reads the instructions for scraping product information from each `productScript` exported from `productScripts/productScripts.ts`.

The `productScripts` directory contains subdirectories for each bank. Each subdirectory contains a file for each product offered by the bank, such as `Savings`, `Checking` or `Time Deposit`, as well as an `index.ts` file to make exporting the `productScripts` more organized. The naming convention for these files is `{bankName}{brandedProductName}.ts`. Occasionally, a bank will offer multiple types of the same product, such as a `regular savings` and a `high-yield savings`. Each product offering gets its own file, so in this case there would be two different files: `{bankName}{regularSavings}.ts` and `{bankName}{highYieldSavings}.ts`.

Each product file contains functions to scrape the various tiers of the product offering. Some banks only offer 1 tier for a product, in which case, there would only be one function exported from that product file. Others offer multiple tiers, which will be captured in separate functions within the same file, following the naming convention `{bankName}{productName}{productTier}`.

For example, `bankOfAmericaBasicSavings.ts` may export 2 functions: `bankOfAmericaBasicSavings1` and `bankOfAmericaBasicSavings2` in order to capture the 2 tiers of offerings for the `Basic Savings` account offered by `Bank of America`.

When executed, the scraping engine will scrape every product tier and output the results in `outputs/bank-data.csv`. Informational messages will be logged to your terminal and errors will be captured in `outputs/errors.txt`.

### Conventions

- Attributes which correspond with a database field use `lower_case_with_underscores`
- Template Directories use `PascalCase`
- Template Files follow the pattern `{bankName}{productName}.ts`
- Template function names follow the pattern `{bankName}{productName}{tier}`
- Variable, Function, and File names use `camelCase`

# Currently Tracked Products <a name="tracking"></a>

See [tracking.csv](https://github.com/project-bankrank/bankrank/blob/main/tracking.csv) for a listing of individual products currently maintained by Bank Rank.

## Troubleshooting Error Messages

- `Code style issues found in # files. Run Prettier to fix.`
  Prettier is a tool which enforces common formatting across the codebase. In order to commit changes, the prettier tool will check the code to ensure all code is formatted properly. If it detects any errors, it will output a listing of files to review. To solve this, run `npm run formatCode` to format the code.
