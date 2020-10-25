import { objects } from "utils";
import { Permission, PermissionSet, Sharing, Account, Policy } from "models";
import { services as servicesArray } from "config/servicesMockData";

const description =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec diam eros, sagittis sed cursus at, bibendum vel nunc\
Proin tempus, neque non mattis euismod, elit libero scelerisque magna. Integer dapibus\
Cras mauris arcu, commodo id commodo ut, fermentum vitae lectus.";

export const services = {
  "1": {
    id: "1",
    name: "Service 1"
  },
  "2": {
    id: "2",
    name: "Service 2"
  },
  "3": {
    id: "3",
    name: "Service 3"
  }
};

export const actions = {
  "1": { id: "1", name: "Action 1" },
  "2": { id: "2", name: "Action 2" },
  "3": { id: "3", name: "Action 3" },
  "4": { id: "4", name: "Action 4" },
  "5": { id: "5", name: "Action 5" }
};

export const types = {
  "1": { id: 1, name: "Type 1", actions: actions, isShareable: true },
  "2": { id: 2, name: "Type 2", actions: actions, isShareable: false },
  "3": { id: 3, name: "Type 3", actions: actions, isShareable: true }
};

export const actionTypes = {
  "1": { id: "1", name: "ActionType 1" },
  "2": { id: "2", name: "ActionType 2" },
  "3": { id: "3", name: "ActionType 3" }
};

export const account1Children = {
  children: ["11", "12"],
  accounts: {
    "11": {
      id: "11",
      type: Account.types.normal,
      name: "Account 1.1",
      children: ["111"],
      parentId: "1"
    },
    "12": {
      id: "12",
      type: Account.types.reseller,
      name: "Account 1.2",
      children: [],
      parentId: "1"
    }
  }
};
export const account11Children = {
  children: ["111"],
  accounts: {
    "111": {
      id: "111",
      type: Account.types.normal,
      name: "Account 1.1.1",
      children: [],
      parentId: "11"
    }
  }
};
export const account2Children = {
  children: ["21", "22"],
  accounts: {
    "21": {
      id: "21",
      type: Account.types.group,
      name: "Account 2.1",
      children: ["211"],
      parentId: "2"
    },
    "22": {
      id: "22",
      type: Account.types.reseller,
      name: "Account 2.2",
      children: [],
      parentId: "2"
    }
  }
};
export const account21Children = {
  children: ["211"],
  accounts: {
    "211": {
      id: "211",
      type: Account.types.group,
      name: "Account 2.1.1",
      children: [],
      parentId: "21"
    }
  }
};
export const accounts = {
  children: ["1", "2"],
  accounts: {
    "1": {
      id: "1",
      type: Account.types.group,
      name: "Account 1",
      children: ["11", "12"],
      parentId: undefined
    },
    "2": {
      id: "2",
      type: Account.types.group,
      name: "Account 2",
      children: ["21", "22"],
      parentId: undefined
    }
  }
};

export const accountsSelections = [
  //  { id: "1", includeChildren: undefined },
  { id: "1", includeChildren: { normal: true, reseller: true, group: false } },
  //  { id: "11", includeChildren: undefined },
  //  { id: "12", includeChildren: undefined },
  // { id: "2", includeChildren: undefined },
  { id: "2", includeChildren: { normal: true, reseller: true, group: true } }
  //  { id: "21", includeChildren: undefined },
  // { id: "22", includeChildren: undefined }
];

export const resources = {
  items: [
    {
      id: "1",
      name: "Resource 1",
      type: "1",
      typeName: "Type1",
      relation: "1",
      relationName: "RelationName",
      children: ["2"]
    },
    {
      id: "2",
      name: "Resource 2",
      type: "1",
      typeName: "Type1",
      children: ["11", "12"]
    },
    {
      id: "1",
      name: "Resource 1"
    },
    {
      id: "2",
      name: "Resource 2"
    }
  ],
  resources: {
    "1": "Resource 1",
    "11": "Resource 1.1",
    "12": "Resource 1.2",
    "2": "Resource 2"
  }
};

export const permissions = {
  "1": {
    ...Permission.create(),
    id: "1",
    name: `Permission 1`,
    description,
    services: ["1"],
    types: ["1"]
  },
  "2": {
    ...Permission.create(),
    id: "1",
    name: `Permission 1`,
    description,
    services: ["1", "2"]
  }
};

export const permissionSets = {
  "1": {
    ...PermissionSet.create(),
    id: "1",
    name: "Permission Set 1",
    description,
    isEnabled: true
  },
  "2": {
    ...PermissionSet.create(),
    id: "2",
    name: "Permission Set 2",
    description,
    sharing: {
      typ: Sharing.typs.allSubAccounts,
      exclusions: {
        children: { normal: false, reseller: true, group: false },
        accounts: accountsSelections
      }
    }
  },
  "3": {
    id: "3",
    name: "Permission Set 3",
    description,
    sharing: {
      typ: Sharing.typs.selectedAccounts,
      exclusions: undefined,
      accounts: accountsSelections
    }
  }
};

export const roleTypes = {
  "1": { id: "1", label: "Ac" },
  "2": { id: "2", label: "Sy" }
};

export const protoRole = {
  // fieldId: "id", could it be edited?
  fieldName: "name",
  // fieldStatus: "status", could it be edited?
  fieldDescription: "description",
  fieldIsFavorite: "isFavorite",
  fieldIsComposite: "isComposite",
  fieldRoles: "roles",
  fieldSetId: "setId",
  fieldType: "type",

  // setId: () => {}, could it be edited?
  setName: () => {},
  // setStatus: () => {}, could it be edited?
  setDescription: () => {},
  setIsFavorite: () => {},
  setIsComposite: () => {},
  setRoles: () => {},
  setPermissionSetId: () => {},
  setType: () => {}
};

export const activateRoleSetters = role => {
  // user.setId: could it be edited?
  role.setName = x => {
    role.name = x;
    return role;
  };
  // setStatus: could it be edited?
  role.setDescription = x => {
    role.description = x;
    return role;
  };
  role.setIsFavorite = x => {
    role.isFavorite = x;
    return role;
  };
  role.setIsComposite = x => {
    role.isComposite = x;
    return role;
  };
  role.setRoles = x => {
    role.roles = x;
    return role;
  };
  role.setPermissionSetId = x => {
    role.setId = x;
    return role;
  };
  role.setType = x => {
    role.type = x;
    return role;
  };
  return role;
};

export const roles = {
  "1": {
    ...protoRole,
    id: "1",
    name: "Role 1",
    status: "active",
    description: description,
    isFavorite: true,
    isComposite: false,
    children: [],
    setId: "1",
    permissionSetName: "Permission Set 1",
    type: roleTypes["1"],
    toScala: function() {
      return this;
    }
  },
  "2": {
    ...protoRole,
    id: "2",
    name: "Role 2",
    status: "active",
    description,
    isFavorite: true,
    isComposite: false,
    children: [],
    setId: "1",
    permissionSetName: "Permission Set 1",
    type: roleTypes["1"],
    toScala: function() {
      return this;
    }
  },
  "3": {
    ...protoRole,
    id: "3",
    name: "Role 3",
    status: "active",
    description: description,
    isFavorite: true,
    isComposite: true,
    children: ["1", "2"],
    setId: "1",
    permissionSetName: "Permission Set 1",
    type: roleTypes["1"],
    toScala: function() {
      return this;
    }
  },
  "4": {
    ...protoRole,
    id: "4",
    name: "Role 4",
    status: "active",
    description,
    isFavorite: false,
    isComposite: true,
    children: ["1", "2", "3"],
    setId: "1",
    permissionSetName: "Permission Set 1",
    type: roleTypes["1"],
    toScala: function() {
      return this;
    }
  },
  "5": {
    ...protoRole,
    id: "5",
    name: "Role 5",
    status: "active",
    description: description,
    isFavorite: false,
    isComposite: true,
    children: ["1", "2", "3", "4"],
    setId: "1",
    permissionSetName: "Permission Set 1",
    type: roleTypes["1"],
    toScala: function() {
      return this;
    }
  },
  "6": {
    ...protoRole,
    id: "6",
    name: "Role 6",
    status: "active",
    description: description,
    isFavorite: false,
    isComposite: true,
    children: ["1", "2", "3", "4"],
    setId: "1",
    permissionSetName: "Permission Set 1",
    type: roleTypes["1"],
    toScala: function() {
      return this;
    }
  },
  "7": {
    ...protoRole,
    id: "7",
    name: "Role 7",
    status: "active",
    description: description,
    isFavorite: false,
    isComposite: false,
    children: [],
    setId: "1",
    permissionSetName: "Permission Set 1",
    type: roleTypes["1"],
    toScala: function() {
      return this;
    }
  },
  "8": {
    ...protoRole,
    id: "8",
    name: "Role 8",
    status: "active",
    description: description,
    isFavorite: false,
    isComposite: false,
    children: [],
    setId: "1",
    permissionSetName: "Permission Set 1",
    type: roleTypes["1"],
    toScala: function() {
      return this;
    }
  }
};

const arrayPermissionSets = Object.values(permissionSets);
/**
 * The EditRolesDialog component expecting `set` as permission set as object in role
 * @type {({setName, fieldIsComposite, fieldName, permissionSetId: string, fieldIsFavorite, description: *, fieldDescription, fieldRoles, setDescription, setType, type: *, setPermissionSetId, setIsComposite, isComposite: boolean, children: [], setIsFavorite, toScala: (function(): roles), fieldPermissionSetId, name: string, id: string, fieldType, setRoles, status: string, isFavorite: boolean} | {setName, fieldIsComposite, fieldName, permissionSetId: string, fieldIsFavorite, description: *, fieldDescription, fieldRoles, setDescription, setType, type: *, setPermissionSetId, setIsComposite, isComposite: boolean, children: [], setIsFavorite, toScala: (function(): roles), fieldPermissionSetId, name: string, id: string, fieldType, setRoles, status: string, isFavorite: boolean} | {setName, fieldIsComposite, fieldName, permissionSetId: string, fieldIsFavorite, description: *, fieldDescription, fieldRoles, setDescription, setType, type: *, setPermissionSetId, setIsComposite, isComposite: boolean, children: [], setIsFavorite, toScala: (function(): roles), fieldPermissionSetId, name: string, id: string, fieldType, setRoles, status: string, isFavorite: boolean} | {setName, fieldIsComposite, fieldName, permissionSetId: string, fieldIsFavorite, description: *, fieldDescription, fieldRoles, setDescription, setType, type: *, setPermissionSetId, setIsComposite, isComposite: boolean, children: [], setIsFavorite, toScala: (function(): roles), fieldPermissionSetId, name: string, id: string, fieldType, setRoles, status: string, isFavorite: boolean} | {setName, fieldIsComposite, fieldName, permissionSetId: string, fieldIsFavorite, description: *, fieldDescription, fieldRoles, setDescription, setType, type: *, setPermissionSetId, setIsComposite, isComposite: boolean, children: [string, string, string, string], setIsFavorite, toScala: (function(): roles), fieldPermissionSetId, name: string, id: string, fieldType, setRoles, status: string, isFavorite: boolean} | {setName, fieldIsComposite, fieldName, permissionSetId: string, fieldIsFavorite, description: *, fieldDescription, fieldRoles, setDescription, setType, type: *, setPermissionSetId, setIsComposite, isComposite: boolean, children: [string, string, string, string], setIsFavorite, toScala: (function(): roles), fieldPermissionSetId, name: string, id: string, fieldType, setRoles, status: string, isFavorite: boolean} | {setName, fieldIsComposite, fieldName, permissionSetId: string, fieldIsFavorite, description: *, fieldDescription, fieldRoles, setDescription, setType, type: *, setPermissionSetId, setIsComposite, isComposite: boolean, children: [string, string, string], setIsFavorite, toScala: (function(): roles), fieldPermissionSetId, name: string, id: string, fieldType, setRoles, status: string, isFavorite: boolean} | {setName, fieldIsComposite, fieldName, permissionSetId: string, fieldIsFavorite, description: *, fieldDescription, fieldRoles, setDescription, setType, type: *, setPermissionSetId, setIsComposite, isComposite: boolean, children: [string, string], setIsFavorite, toScala: (function(): roles), fieldPermissionSetId, name: string, id: string, fieldType, setRoles, status: string, isFavorite: boolean})[]}
 */
export const availableRoles = Object.values(roles).map(role => {
  role.set = arrayPermissionSets.find(p => p.id === role.setId);
  return role;
});

export const effectiveRoles = availableRoles.slice();

export const policies = [
  {
    id: "1",
    name: "Policy 1",
    description,
    isFavorite: true,
    isNegative: false,
    type: Policy.types.aggregated,
    decisionStrategy: Policy.decisionStrategies.unanimous,
    isRequiredAll: false,
    ids: ["2", "3"]
  },
  {
    id: "2",
    name: "Policy 2",
    description,
    isFavorite: true,
    type: Policy.types.user,
    decision: Policy.decisions.allow,
    isRequiredAll: true,
    ids: ["1", "2"]
  },
  {
    id: "3",
    name: "Policy 3",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
aliqua. Ut enim ad minim veniam quis nostrud exercitation.`,
    isFavorite: true,
    type: Policy.types.role,
    decision: Policy.decisions.deny,
    isRequiredAll: false,
    ids: ["1"]
  }
];

export const permissionSetUIPermissions = {
  describe: true,
  edit: true,
  changeSetStatus: true,
  createRole: true,
  createPolicy: true,
  createPermission: true,
  enableOnAccounts: true,
  share: true
};
