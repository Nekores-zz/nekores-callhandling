import { facadeOf } from "./sdk/facadeOf";

export * from "./sdk/commonFacade";

const numbersFacade = fileName => facadeOf("NumbersManagement/"+fileName);

export const AddNumbers = numbersFacade("AddNumbers");
export const AddNumbersSidemenu = numbersFacade("AddNumbersSidemenu");
export const ListNumbers = numbersFacade("ListNumbers");
export const ListNumbersSidemenu = numbersFacade("ListNumbersSidemenu");
export const EditNumber = numbersFacade("EditNumber");
export const EditNumberSidemenu = numbersFacade("EditNumberSidemenu");
