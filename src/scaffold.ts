import fs from "fs";
import { input, select } from "@inquirer/prompts";

const bankName = await input({ message: "Enter a Bank Name " });
const productType = await select({
  message: "Select a product type",
  choices: [
    {
      name: "Checking",
      value: "Checking",
      description:
        "Checking Accounts generally provide low interest yields, but have minimal restrictions on withdrawing money.",
    },
    {
      name: "Savings",
      value: "Savings",
      description:
        "Savings Accounts generally provide better interest yields, but restrict how often money can be withdrawn.",
    },
    {
      name: "Money Market",
      value: "Money Market",
      description:
        "Money Market accounts are like a hybrid checking-savings account.",
    },
    {
      name: "Time Deposit",
      value: "Time Deposit",
      description:
        "Also known as Certificates of Deposit, time deposits provide higher yields on deposits but restrict access to the funds for a period of time.",
    },
  ],
});

const pascalCaseBankName = bankName
  .split(" ")
  .map((i) => i.charAt(0).toUpperCase() + i.slice(1).toLowerCase())
  .join("");
const camelCaseBankName =
  pascalCaseBankName.charAt(0).toLowerCase() + pascalCaseBankName.slice(1);
const productDirectory = `./src/ProductScripts/${pascalCaseBankName}`;
const productScriptName = camelCaseBankName + productType.split(" ").join("");
const pathToProductScript = `${productDirectory}/${productScriptName}.js`;

// Make the Bank Directory
if (fs.existsSync(pathToProductScript)) {
  console.log(
    `This bank/product combination already exists at ${pathToProductScript}`,
  );
} else {
  if (!fs.existsSync(productDirectory)) {
    fs.mkdirSync(productDirectory, { recursive: true });
  }
  // Make the product script file
  fs.writeFileSync(
    pathToProductScript,
    `
    const ${productScriptName}1 = () => {
      // Todo: Add your Script here, then remove this comment
    }
    export { ${productScriptName}1 };`,
  );
  // Make the index file
  if (!fs.existsSync(`${productDirectory}/index.js`)) {
    fs.writeFileSync(
      `${productDirectory}/index.js`,
      `
      import { someFunction } from './${productScriptName}.js'
  
      export default {
        ...Object.values(someFunction),
      }`,
    );
  }
  fs.appendFile(
    "./tracking.csv",
    `${bankName},${productType},1,${pathToProductScript}\n`,
    function (err) {
      if (err) throw err;
      console.log("Saved!");
    },
  );
}
