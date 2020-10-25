import { facadeOf } from "./sdk/facadeOf";

export * from "./sdk/commonFacade";

export const ListServicesSidemenu = facadeOf("Services/ListServicesSidemenu");
export const ListServices = facadeOf("Services/ListServices");
export const CreateServiceSidemenu = facadeOf("Services/CreateServiceSidemenu");
export const CreateService = facadeOf("Services/CreateService");
export const ManageServiceSidemenu = facadeOf("Services/ManageServiceSidemenu");
export const ManageServiceVersions = facadeOf("Services/ManageServiceVersions");
export const ManageServiceAssignedNumbers = facadeOf("Services/ManageServiceAssignedNumbers");
export const ManageServiceSettings = facadeOf("Services/ManageServiceSettings");
export const ListTemplates = facadeOf("Services/ListTemplates");
