import { facadeOf } from "./sdk/facadeOf";

export * from "./sdk/commonFacade";

// Users Components
export const EditProfile = facadeOf("Users/EditProfile");
export const EditProfileRolesAndGroups = facadeOf("Users/EditProfileRolesAndGroups");
export const EditProfileSettings = facadeOf("Users/EditProfileSettings");
export const EditProfileSidemenu = facadeOf("Users/EditProfileSidemenu");
export const InviteUsers = facadeOf("Users/InviteUsers");
export const InviteUsersSidemenu = facadeOf("Users/InviteUsersSidemenu");
export const ViewProfile = facadeOf("Users/ViewProfile");
export const ViewProfileSidemenu = facadeOf("Users/ViewProfileSidemenu");
export const ListUsers = facadeOf("Users/ListUsers");
export const ListUsersSidemenu = facadeOf("Users/ListUsersSidemenu");

// Group Components
export const CreateGroup = facadeOf("Groups/CreateGroup");
export const CreateGroupSidemenu = facadeOf("Groups/CreateGroupSidemenu");
export const EditGroupMembers = facadeOf("Groups/EditGroupMembers");
export const EditGroupRoles = facadeOf("Groups/EditGroupRoles");
export const EditGroupSettings = facadeOf("Groups/EditGroupSettings");
export const EditGroupSidemenu = facadeOf("Groups/EditGroupSidemenu");
export const ListGroups = facadeOf("Groups/ListGroups");
export const ListGroupsSidemenu = facadeOf("Groups/ListGroupsSidemenu");
export const AddRoles = facadeOf("Groups/GroupDialogs/AddRoles");
export const InviteMembers = facadeOf("Groups/GroupDialogs/InviteMembers");
