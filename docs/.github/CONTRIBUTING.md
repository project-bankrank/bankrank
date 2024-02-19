Thank you for your interest in contributing to Project Bank Rank. Bank Rank is entirely dependent on the contributions of volunteers like you. No matter how technical you are, there are plenty of ways to get involved.

Regardless of how you want to contribute, the first step should be to read the project [README](../README.md) file to get background about the project.

Some ways to contribute:

- [Submit New Product Scripts (Moderately Technical)](#addProduct)
- [Validate Existing Product Scripts (Non-Technical)](#validating)
- [Engine Enhancements (Technical)](#engine)
- [Backlog "Todos" (Technical)](#todos)

### Submit New Product Scripts (Moderately Technical)<a name="addProduct"></a>

The best way to contribute to the project is to identify product offerings which are not currently monitored by Bank Rank and submit scripts to track those products to the project. This process involves recording the steps you would take to normally look up the details about an account using a tool called [playwright codegen](https://playwright.dev/docs/codegen-intro#running-codegen).

You can read the written step-by-step instructions below or follow along with our video tutorial [here]().

Prerequistes:

- [NodeJS](https://nodejs.org/en0)
- [NPM](https://www.npmjs.com/) (or other package manager)
- A local fork of [Bank Rank](https://github.com/project-bankrank/bankrank/tree/main) with all dependencies installed

Steps to Contribute a new product:

1. Identify a bank or product offering which is not included in [tracking.csv](https://github.com/project-bankrank/bankrank/blob/main/tracking.csv).

2. Find the website url of the product you want to track. If you have to fill out forms, navigate through menu options, or perform other actions in the browser to arrive at the page with the product information, just find the closest page you can navigate to directly without entering any information or performing any actions.

3. Plan out the steps involved in finding the key product information. Currently, new product scripts added must contain the following information:

- The product's common or brand name
- The product's: [APY](https://en.wikipedia.org/wiki/Annual_percentage_yield) (not interest rate)
- The minimum and maximum balances required to:
  - Open an account
  - Earn interest
  - And avoid fees

4. Run `npm run scaffold` to setup the various files needed to add your product script to the project. This scaffold script will take you through a few questions to help configure the files needed.
   ![Scaffold script](https://github.com/project-bankrank/bankrank/assets/155323861/141de711-cf5b-4532-9d8b-a297db633685)

5. Open the file created at `src/productScripts/NewBankName/NewBankNameProductType.ts`. (Alternatively, do a global search for `Step 1`)
   ![New Product Script](https://github.com/project-bankrank/bankrank/assets/155323861/4ca3450f-31d6-4758-96c6-b77e90909cf7)

6. Begin recording your product script by running `npm run record`. This will open up a chrome browser and an inspection tool which will track the steps you take to arrive at the webpage with the product information.

7. While recording, navigate to the product page, and specifically click on the sections of the page that have the product's name, APY, minimum and maximum balances. When finished recording, set the target to `Node.js > Library`, copy all lines of the script, and paste them under the `Step 1` comment in the file from #5 above.
   ![Target library](https://github.com/project-bankrank/bankrank/assets/155323861/4b83bdb0-1ffc-4e4c-bd17-ffb1085eb837)

8. Follow the steps outlined in that file to import and export the functions into the rest of the engine.

9. Validate your changes by running `npm run engine`. Your product should appear in `/outputs/bank-data.csv`. If you encounter errors, they should be listed in `outputs/errors.txt`
   > By default, the engine runs your script in headless mode. You can run it outside headless mode by updating the function's parameter to be `headless = false` rather than `headless = true`.

### Validate Existing Product Scripts (Non-Technical)<a name="validating"></a>

### Engine Enhancements (Technical)<a name="engine"></a>

The core engine runs each template sequentially and could use improvements. Any and all suggestions would be greatly appreciated, and if you're looking for specific tasks to start on, try one of these;

- Running templates in parallel rather than sequentially
- Ways to avoid issues executing scripts in headless mode
- Execute the same template across multiple zip codes to detect geographical descrepancies
- Better tooling around error handling

### Backlog "Todos"<a name="todos"></a>

- Creating better tutorial videos and writeups
- Improve data formatting in `bank-data.csv`
- Implement unit testing (Preferribly using [Jest](https://jestjs.io/))
- create PR templates for:
  - validation issues
  - new product scripts
- Create a linter/prettier rule which will alphabetize or group imports according to a configuration
- Sanitize input on scaffolding script so people don't make banks with weird characters in the name (for instance, `;` will break the script)
