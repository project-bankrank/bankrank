## Background
There are approximately 4,136 [banks](https://banks.data.fdic.gov/explore/historical/?displayFields=STNAME%2CTOTAL%2CBRANCHES%2CNew_Char%2COFFICES%2CUNIT%2CBRANCHIN&selectedEndDate=2022&selectedReport=CBS&selectedStartDate=1934&selectedStates=0&sortField=YEAR&sortOrder=desc) and 4,645 [credit unions](https://ncua.gov/analysis/credit-union-corporate-call-report-data/quarterly-data-summary-reports) in the United States. These institutions offer [deposit accounts](https://en.wikipedia.org/wiki/Deposit_account), and most commonly offer at least one of the following: [Savings](https://en.wikipedia.org/wiki/Savings_account), [Checking](https://en.wikipedia.org/wiki/Transaction_account), [Money Market](https://en.wikipedia.org/wiki/Money_market_account), or [Certificate of Deposit](https://en.wikipedia.org/wiki/Time_deposit). The primary difference between banks and credit unions is that banks are for-profit institutions whereas credit unions are [not-for-profit, cooperative, tax-exempt organizations](https://en.wikipedia.org/wiki/Credit_unions_in_the_United_States).

Within the scope of this project, we use the term `bank` to refer to all institutions offering federally insured deposit accounts available in the United States, including credit unions and savings and loan institutions. We also use the term `bank account` to refer to any type of deposit account offered by a bank.

It is common for banks to offer multiple tiers of an account in order to incentivize customers to deposit more money with the bank. To give an approximation of how large the deposit account marketplace is: if each bank were to offer 2 tiers of each type of bank account, there would be ~64,000 accounts in the United States, each with different rates and fees which can change at any time, for any reason.

Because these accounts are regulated and federally insured, they are effectively risk-free financial commodities, which compete primarily on fees and interest rates. With the technological advancements in mobile technology, banks are no longer tied to geographic regions, and can compete nationally for deposits. This has dramatically increased competition.

Despite the increased competition, the top banks offer some of the worst interest rates, highest fees, and tightest restrictions, compared to [national averages](https://www.fdic.gov/resources/bankers/national-rates/index.html). This is partially due to the [billions](https://www.google.com/search?hl=en&q=how%20much%20do%20banks%20spend%20on%20advertising) that large banks invest in advertising and marketing. Because they spend less on marketing and advertising, smaller banks are able to offer better rates, lower fees, and more accessible products. But due to the tens of thousands of products to compare, it is infeasible for an individual to monitor changes across the marketplace without assistance. Bank Rank seeks to provide a comprehensive solution to help consumers identify the best financial products for their personal financial situation. 

## Problems with Existing Solutions
There are many tools and services available which attempt to improve transparency in deposit account rates and fees, but all struggle from one or more of the following limitations:
- Closed source/methodologies: Many bank aggregation sites do not disclose how they rank or rate bank accounts. Bank Rank seeks to aggregate as much data as possible so users can make an informed decision.
- Conflicts of interest: many bank review sites will receive referral bonuses for referring people to certain accounts. This creates a conflict of interest, since these sites ultimately serve the banks that pay them, not the consumers doing research. 
- Pay-to-win features: Some sites will aggregate products, but provide premium placement for sponsored products, putting them ahead of products which are objectively better.
- Incomplete data sets: Other tools may have incomplete data or allow banks to pay for exclusivity, recommending users towards an inferior product.

## Project Roadmap

#### Phase 1 [In Progress]: Scraping Engine & Templates
The initial phase requires developing the infrastructure to monitor the financial data. Most banks publish their product information on their websites, so by creating a scraping engine, Bank Rank can monitor changes in product information. The engine reads templates, which are instructions for navigating to the web page(s) which contain information about a deposit account. 

Banks tend to change their websites infrequently, so once a template is created, it can be used repeatedly to monitor changes in a given product. 

Developing the engine and templates to monitor all of the banks is the primary goal of this phase. 

#### Phase 2: API & Database
As the engine and templates are developed, work can begin on an API and database to provide a method for saving results and querying data. The engine will continue to output results in a `csv` file, but maintaining a historical record of rate changes can provide additional benefit to regulators, researchers, and consumers. 

#### Phase 3: Consumer Tools 
Once the backend services are developed, there is an opportunity to provide additional tools to automate workflows a user may encounter when shopping for deposit accounts. For example:  
- A web application which allows researchers to query bank account data based on certain parameters
- A mobile app to customize a search based on a consumer's specific preferences, and get notified when a better product becomes available

## Getting Started

### Requirements
- NPM version 10.2.3+  
`npm -v`
- Node version 20.10.0+  
`node -v`
- [Playwright](https://playwright.dev/) for scraping  
`npm init playwright@latest`


### Conventions
- Template Directories use `PascalCase` 
- variable, function, and file names use `camelCase`
- attributes which correspond with a database field use `lower_case_with_underscores`

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