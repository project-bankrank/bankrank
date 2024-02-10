// Constants (Todo: If this grows too large, consider moving to a separate file)
// Interfaces
export interface ProductScriptResponseSuccess {
  institution_name: string;
  account_type: DepositAccountType;
  success: boolean;
  error: null;
  path: string;
  apy: string;
  product_name: string;
  minimum_balance: string;
  maximum_balance: string;
}

export interface LogErrors {
  path?: string;
  error?: any;
}

export interface ProductData {
  institution_name?: string;
  account_type?: string;
  product_name?: string;
  apy?: string;
  minimum_balance?: string;
  maximum_balance?: string;
}

// Types
type DepositAccountType =
  | "savings"
  | "checking"
  | "money-market"
  | "time deposit";
