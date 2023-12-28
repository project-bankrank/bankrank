import fs from 'fs';

const errorLogPath = "./logFiles/errors.txt";
const bankDataLogPath = "./logFiles/bank-data.csv";
const bankDataCsvColumnHeaders = "institution_name, account_type, account_name, apy, minimum_balance, maximum_balance\n"; // The \n at the end is important so that the first row of data does not append to the headers.

export const writeBeginningOrEndingErrorLogMessage = (errorLogTimestamp, startOfLogs) => {
  const prefix = startOfLogs ? "START" : "END" // Todo: Enum this when converted to TS
  fs.appendFileSync(errorLogPath, `\n\n==== ${prefix} OF LOGS FROM EXECUTION AT ${errorLogTimestamp} ==== \n`, (err) => {
    if (err) throw err;
  });
}

export const writeErrorLog = (errorObject) => {
  const errorStringToWrite = `
  \nStart Error Message ${errorObject?.path}:
  \n${errorObject?.error}
  \nEND Error Message ${errorObject?.path}`;

  fs.appendFileSync(errorLogPath, errorStringToWrite, (err) => {
    if (err) throw err;
  });
}

export const createNewBankDataCsv = () => {
  // Write file will overwrite any existing files, which we want to ensure that we don't replicate data between invocations
  fs.writeFileSync(bankDataLogPath, bankDataCsvColumnHeaders, (err) => {
    if (err) throw err;
  });
}

export const writeDataToBankDataCsv = (productData) => {
  const { institutionName, productName, apy, minimum_balance, maximum_balance } = productData;
  if (productName && apy && minimum_balance) {
    fs.appendFileSync(bankDataLogPath, `bank, Account Type, ${productName}, ${apy}, ${minimum_balance}, ${maximum_balance}, \n`, function (err) {
      if (err) throw err;
    });
  }
  
}