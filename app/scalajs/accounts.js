import { facadeOf } from "./sdk/facadeOf";

export * from "./sdk/commonFacade";

export const ListAccounts = facadeOf("Accounts/ListAccounts");
export const ListAccountsSidemenu = facadeOf("Accounts/ListAccountsSidemenu");
export const CreateAccount = facadeOf("Accounts/CreateAccount");
export const CreateAccountSidemenu = facadeOf("Accounts/CreateAccountSidemenu");
export const AdministerAccount = facadeOf("Accounts/AdministerAccount");
export const AdministerAccountSidemenu = facadeOf("Accounts/AdministerAccountSidemenu");
