import { facadeOf } from "./sdk/facadeOf";

export * from "./sdk/commonFacade";

export const CreatePermissionSetSidemenu = facadeOf("Security/CreatePermissionSetSidemenu");
export const ListPermissionSets = facadeOf("Security/ListPermissionSets");
export const SecuritySidemenu = facadeOf("Security/SecuritySidemenu");
export const EditSidemenu = facadeOf("Security/EditSidemenu");
export const EditPermissionSetSidemenu = facadeOf("Security/EditPermissionSetSidemenu");
export const EditPermissionSet = facadeOf("Security/EditPermissionSet");
export const ListRoles = facadeOf("Security/ListRoles");
export const EditRole = facadeOf("Security/EditRole");
export const ListPolicies = facadeOf("Security/ListPolicies");
export const PolicyInfo = facadeOf("Security/PolicyElements/PolicyInfo");
export const PolicyInfoWithDetails = facadeOf("Security/PolicyElements/PolicyInfoWithDetails");
export const PolicyRowDisplay = facadeOf("TableList/RowDisplayTypes/PolicyRowDisplay");
export const EditPolicy = facadeOf("Security/EditPolicy");
export const EditUserPolicy = facadeOf("Security/EditUserPolicy");
export const EditRolePolicy = facadeOf("Security/EditRolePolicy");
export const EditAggregatedPolicy = facadeOf("Security/EditAggregatedPolicy");
export const ListPermissions = facadeOf("Security/ListPermissions");
export const EditPermission = facadeOf("Security/EditPermission");
