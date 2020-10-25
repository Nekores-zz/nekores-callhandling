import { users } from "config/usersMockData";
import { roles } from "config/securityMockData";
import { generateUid } from "utils/strings";

export const protoGroup = {
  // fieldId: "id", could it be edited?
  fieldName: "name",
  fieldDescription: "description",
  fieldMembers: "members",
  // fieldMembersCount: "membersCount", could it be edited?
  fieldRoles: "roles",
  // fieldRolesCount: "rolesCount", could it be edited?
  fieldIsFavorite: "isFavorite",

  // setId: () => {}, could it be edited?
  setName: () => {},
  setDescription: () => {},
  setMembers: () => {},
  // setMembersCount: () => {}, could it be edited?
  setRoles: () => {},
  // setRolesCount: () => {}, could it be edited?
  setIsFavorite: () => {}
};

const description =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod \
  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam \
  quis nostrud exercitation.";

const getRole = roleId => {
  return roles[roleId];
};

const generateUser = () => {
  const user = users[Math.floor(Math.random() * users.length)]; // pick random from mock users
  return { ...user, id: generateUid() }; // give new id to user
};

const generateUsers = amount => new Array(amount).fill(0).map(_ => generateUser());

const membersExample12 = generateUsers(12);
const membersExample48 = generateUsers(48);
const membersExample96 = generateUsers(96);
const membersExample192 = generateUsers(192);

export const groups = [
  {
    ...protoGroup,
    id: "66548",
    name: "Group 1",
    description: description,
    members: [...membersExample192],
    membersCount: 192,
    roles: [getRole(1)],
    rolesCount: 1,
    isFavorite: true,
    toScala: function() {
      return this;
    }
  },
  {
    ...protoGroup,
    id: "20896",
    name: "Group 2",
    description: description,
    members: [...membersExample48].slice(0, 34),
    membersCount: 34,
    roles: [getRole(2), getRole(3)],
    rolesCount: 2,
    isFavorite: true,
    toScala: function() {
      return this;
    }
  },
  {
    ...protoGroup,
    id: "41645",
    name: "Group 3",
    description: description,
    members: [...membersExample12],
    membersCount: 12,
    roles: [getRole(3), getRole(4), getRole(5)],
    rolesCount: 3,
    isFavorite: true,
    toScala: function() {
      return this;
    }
  },
  {
    ...protoGroup,
    id: "7203",
    name: "Group 4",
    description: description,
    members: [...membersExample96],
    membersCount: 96,
    roles: [getRole(4)],
    rolesCount: 1,
    isFavorite: true,
    toScala: function() {
      return this;
    }
  },
  {
    ...protoGroup,
    id: "37104",
    name: "Group 5",
    description: description,
    members: [...membersExample192].slice(0, 130),
    membersCount: 130,
    roles: [getRole(5), getRole(6)],
    rolesCount: 2,
    isFavorite: false,
    toScala: function() {
      return this;
    }
  },
  {
    ...protoGroup,
    id: "43123",
    name: "Group 6",
    description: description,
    members: [...membersExample48],
    membersCount: 48,
    roles: [getRole(5), getRole(7)],
    rolesCount: 2,
    isFavorite: false,
    toScala: function() {
      return this;
    }
  },
  {
    ...protoGroup,
    id: "24362",
    name: "Group 7",
    description: description,
    members: [...membersExample12],
    membersCount: 12,
    roles: [getRole(6), getRole(8)],
    rolesCount: 2,
    isFavorite: false,
    toScala: function() {
      return this;
    }
  },
  {
    ...protoGroup,
    id: "34574",
    name: "Group 8",
    description: description,
    members: [...membersExample96].slice(0, 88),
    membersCount: 88,
    roles: [],
    rolesCount: 0,
    isFavorite: false,
    toScala: function() {
      return this;
    }
  },
  {
    ...protoGroup,
    id: "56745",
    name: "Group 9",
    description: description,
    members: [...membersExample96],
    membersCount: 96,
    roles: [getRole(4), getRole(5), getRole(6), getRole(7), getRole(8)],
    rolesCount: 5,
    isFavorite: false,
    toScala: function() {
      return this;
    }
  },
  {
    ...protoGroup,
    id: "2354",
    name: "Group 10",
    description: description,
    members: [...membersExample96],
    membersCount: 96,
    roles: [getRole(1), getRole(2), getRole(3)],
    rolesCount: 3,
    isFavorite: false,
    toScala: function() {
      return this;
    }
  }
];
