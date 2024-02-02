import { LogErrors, ProductData } from 'constants.ts';
import fs from 'fs';

const outputsPath = './outputs';
const errorLogPath = `${outputsPath}/errors.txt`;
const bankDataLogPath = `${outputsPath}/bank-data.csv`;
const bankDataCsvColumnHeaders = "institution_name, account_type, account_name, apy, minimum_balance, maximum_balance\n"; // The \n at the end is important so that the first row of data does not append to the headers.

export const writeBeginningOrEndingErrorLogMessage = (errorLogTimestamp: string, startOfLogs: boolean) => {
  const prefix = startOfLogs ? "START" : "END" // Todo: Enum this when converted to TS
  fs.appendFile(errorLogPath, `\n\n==== ${prefix} OF LOGS FROM EXECUTION AT ${errorLogTimestamp} ==== \n`, (err: any) => {
    if (err) throw err;
  });
}

export const writeErrorLog = (errorObject: LogErrors) => {
  const errorStringToWrite = `
  \nStart Error Message ${errorObject?.path}:
  \n${errorObject?.error}
  \nEND Error Message ${errorObject?.path}`;
  if (!fs.existsSync(outputsPath)){
    fs.mkdirSync(outputsPath, { recursive: true });
  }

  fs.appendFile(errorLogPath, errorStringToWrite, (err: any) => {
    console.log("writing " + errorStringToWrite + " to " + errorLogPath)
    if (err) throw err;
  });
}

export const createNewBankDataCsv = () => {
  if (!fs.existsSync(outputsPath)){
    fs.mkdirSync(outputsPath, { recursive: true });
  }
  // Write file will overwrite any existing files, which we want to ensure that we don't replicate data between invocations
  fs.writeFile(bankDataLogPath, bankDataCsvColumnHeaders, (err: any) => {
    if (err) throw err;
  });
}

export const writeDataToBankDataCsv = (productData: ProductData) => {
  const { institution_name, account_type, product_name, apy, minimum_balance, maximum_balance } = productData;
  if (product_name && apy && minimum_balance && institution_name) {
    const rowOfData = `${institution_name},${account_type},${product_name},${apy},"${minimum_balance}","${maximum_balance}"\n`;
    fs.appendFile(bankDataLogPath, rowOfData, (err: any) => {
      if (err) throw err;
    });
  }
}