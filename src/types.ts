// Constants (Todo: If this grows too large, consider moving to a separate file)
// Interfaces
export interface LogErrors {
	path?: string;
	error?: object;
}

export interface ProductScriptResponseSuccess {
	institution_name: string;
	account_type: DepositAccountType;
	success: boolean;
	error: boolean | null;
	path: string;
	apy: string;
	product_name: string;
	minimum_balance: string | number;
	maximum_balance: string | number;
}
export interface ProductScriptResponseError {
	success: boolean;
	error: boolean;
	path: string;
}

export interface ProductData {
	institution_name?: string;
	account_type?: string;
	product_name?: string;
	apy?: string;
	minimum_balance?: string;
	maximum_balance?: string;
}

export interface SystemError {
	address?: string;
	code?: string;
	dest?: string;
	errno?: number;
	info?: object;
	message?: string;
	path?: string;
	port?: number;
	syscall?: string;
}
// Types
export type DepositAccountType =
	| "savings"
	| "checking"
	| "money-market"
	| "time deposit";

export type TemplateResponseTypes = Promise<ProductScriptResponses>;
export type ProductScriptResponses =
	| ProductScriptResponseSuccess
	| ProductScriptResponseError;
