import { facadeOf } from "./sdk/facadeOf";

export * from "./sdk/commonFacade";

export const AllocateNumbers = facadeOf("Numbers/AllocateNumbers");
export const AllocateNumbersSidemenu = facadeOf("Numbers/AllocateNumbersSideMenu");
export const ListNumbers = facadeOf("Numbers/ListNumbers");
export const ListNumbersSidemenu = facadeOf("Numbers/ListNumbersSidemenu");
export const PurchaseSelectNumbers = facadeOf("Numbers/PurchaseSelectNumbers");
export const PurchaseNumbersSidemenu = facadeOf("Numbers/PurchaseNumbersSidemenu");
