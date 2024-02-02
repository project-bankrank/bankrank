
type DepositAccountType = "savings" | "checking" | "money-market" | "time deposit";  
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