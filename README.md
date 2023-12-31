## Background
As of December 2023, there are approximately XXX banks and YYY credit unions in the United States. These institutions offer [deposit accounts](https://en.wikipedia.org/wiki/Deposit_account) which usually come in the form of [Savings](https://en.wikipedia.org/wiki/Savings_account), [Checking](https://en.wikipedia.org/wiki/Transaction_account), [Money Markets](https://en.wikipedia.org/wiki/Money_market_account), or [Certificates of Deposit](https://en.wikipedia.org/wiki/Time_deposit). The primary difference between banks and credit unions is that banks are for-profit institutions whereas credit unions are [not-for-profit, cooperative, tax-exempt organizations](https://en.wikipedia.org/wiki/Credit_unions_in_the_United_States).

Within the scope of this project, we use the term "Bank" to refer to all institutions offering federally insured deposit accounts available in the United States. We also use the term "bank account" to refer to any type of deposit account offered by a "bank".

Banks often provide at least 1 of each type of bank account, and it is common for a bank to offer multiple tiers of the same account to provide different benefits to customers based on the amount they deposit with the bank. If each bank were to offer 2 tiers of each type of bank account, there would be ~72,000 accounts in the United States, each with different rates and fees which can change at any time, for any reason.

Because these accounts are regulated and federally insured, they are effectively risk-free financial commodities, which compete on price (fees) and value (rates). With the technological advancements in mobile technology, banks are no longer tied to geographic regions, and can compete nationally for deposits. 

Despite the increased competition, the top banks offer some of the worst interest rates, highest fees, and tightest restrictions. This is partially due to the billions large institutions invest in advertising and marketing, which smaller banks cannot compete against. Instead, smaller banks compete by offering better rates, lower fees, and more accessible products. There are many tools and services available which attempt to improve transparency in deposit account rates and fees, but most struggle from one or more of the following:
- Conflicts of interest (e.g. primarily funded or owned by a large financial institution)
- Pay-to-win features (e.g. prioritizing inferior products which pay for preferred placement)
- Incomplete data sets (e.g. excluding -- sometimes intentionally -- superior products from their listings)

## Goal
The goal of Project Bankrank is to create open tools to monitor as many deposit products as possible so that consumers have increased transparency when shopping for financial products, while avoiding the issues with existing solutions outlined above. 

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