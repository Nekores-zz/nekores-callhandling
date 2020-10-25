export const protoUser = {
  // fieldId: "id", could it be edited?
  fieldEmail: "email",
  fieldFirstName: "firstName",
  fieldLastName: "lastName",
  fieldAvatar: "avatar",
  // fieldStatus: "status", could it be edited?
  fieldTelephone: "telephone",
  fieldMobile: "mobile",
  fieldJobTitle: "jobTitle",
  fieldSkills: "skills",
  fieldIsFavorite: "isFavorite",
  fieldFavoriteUsers: "favoriteUsers",
  fieldUserEmails: "userEmails",
  // fieldInvitedAt: "invitedAt", could it be edited?

  // setId: () => {}, could it be edited?
  setEmail: () => {},
  setFirstName: () => {},
  setLastName: () => {},
  setAvatar: () => {},
  // setStatus: () => {}, could it be edited?
  setTelephone: () => {},
  setMobile: () => {},
  setJobTitle: () => {},
  setSkills: () => {},
  setIsFavorite: () => {},
  setFavoriteUsers: () => {},
  setUserEmails: () => {}
  // setInvitedAt: () => {}, could it be edited?
};

export const activateUserSetters = user => {
  // user.setId: could it be edited?
  user.setEmail = x => {
    user.email = x;
    return user;
  };
  user.setFirstName = x => {
    user.firstName = x;
    return user;
  };
  user.setLastName = x => {
    user.lastName = x;
    return user;
  };
  user.setAvatar = x => {
    user.avatar = x;
    return user;
  };
  // user.setStatus: could it be edited?
  user.setTelephone = x => {
    user.telephone = x;
    return user;
  };
  user.setMobile = x => {
    user.mobile = x;
    return user;
  };
  user.setJobTitle = x => {
    user.jobTitle = x;
    return user;
  };
  user.setSkills = x => {
    user.skills = x;
    return user;
  };
  user.setIsFavorite = x => {
    user.isFavorite = x;
    return user;
  };
  user.setFavoriteUsers = x => {
    user.favoriteUsers = x;
    return user;
  };
  user.setUserEmails = x => {
    user.userEmails = x;
    return user;
  };
  // user.setInvitedAt: could it be edited?
  return user;
};

export const protoEmail = {
  fieldEmail: "email",
  fieldIsPrimary: "isPrimary",
  // fieldIsActivated: "isActivated", could it be edited?
  // fieldCreatedAt: "createdAt", could it be edited?

  setEmail: () => {},
  setIsPrimary: () => {}
  // setIsActivated: () => {}, could it be edited?
  // setCreatedAt: () => {}, could it be edited?
};

export const users = [
  {
    ...protoUser,
    id: "90123",
    email: "johndoe@gmail.com",
    firstName: "John",
    lastName: "Doe",
    avatar: "http://i.pravatar.cc/150?img=5",
    status: "Inactive",
    telephone: "345678909",
    mobile: "92312312",
    jobTitle: "Sales manager",
    skills: ["Skill 1", "Skill 2"],
    isFavorite: true,
    favoriteUsers: [],
    userEmails: [
      {
        ...protoEmail,
        email: "johndoe@gmail.com",
        isPrimary: true,
        isActivated: false,
        createdAt: {
          seconds: 1539870837,
          nanos: 522000000
        }
      }
    ],
    invitedAt: { seconds: 1536077802, nanos: 738000000 },
    toScala: function() {
      return this;
    }
  },
  {
    ...protoUser,
    id: "90124",
    email: "marysue@gmail.com",
    firstName: "Mary",
    lastName: "Sue",
    avatar: "http://i.pravatar.cc/150?img=15",
    status: "Active",
    telephone: "345678909",
    mobile: "92312312",
    jobTitle: "Sales manager",
    skills: ["Skill 3"],
    isFavorite: true,
    favoriteUsers: ["90123"],
    userEmails: [
      {
        ...protoEmail,
        email: "marysue@gmail.com",
        isPrimary: true,
        isActivated: true,
        createdAt: {
          seconds: 1539870837,
          nanos: 522000000
        }
      },
      {
        ...protoEmail,
        email: "user@aihshak.com",
        isPrimary: false,
        isActivated: false,
        createdAt: {
          seconds: 1539870837,
          nanos: 522000000
        }
      },
      {
        ...protoEmail,
        email: "mary34@hotmail.com",
        isPrimary: false,
        isActivated: true,
        createdAt: {
          seconds: 1539872837,
          nanos: 522040000
        }
      }
    ],
    invitedAt: { seconds: 1536077802, nanos: 738000000 },
    toScala: function() {
      return this;
    }
  },
  {
    ...protoUser,
    id: "90125",
    email: "anowen@gmail.com",
    firstName: "A. N.",
    lastName: "Owen",
    avatar: "http://i.pravatar.cc/150?img=35",
    status: "Pending",
    telephone: "345678909",
    mobile: "92312312",
    jobTitle: "Sales manager",
    skills: ["Skill 1"],
    isFavorite: false,
    favoriteUsers: [],
    userEmails: [
      {
        ...protoEmail,
        email: "anowen@gmail.com",
        isPrimary: true,
        isActivated: false,
        createdAt: {
          seconds: 1539870837,
          nanos: 522000000
        }
      }
    ],
    invitedAt: { seconds: 1536077802, nanos: 738000000 },
    toScala: function() {
      return this;
    }
  },
  {
    ...protoUser,
    id: "90126",
    email: "johnowen@gmail.com",
    firstName: "A. N.",
    lastName: "Doe",
    avatar: "http://i.pravatar.cc/150?img=55",
    status: "Inactive",
    telephone: "345678909",
    mobile: "92312312",
    jobTitle: "Sales manager",
    skills: ["Skill 1", "Skill 3"],
    isFavorite: false,
    favoriteUsers: ["90123"],
    userEmails: [
      {
        ...protoEmail,
        email: "johnowen@gmail.com",
        isPrimary: true,
        isActivated: false,
        createdAt: {
          seconds: 1539870837,
          nanos: 522000000
        }
      }
    ],
    invitedAt: { seconds: 1536077802, nanos: 738000000 },
    toScala: function() {
      return this;
    }
  },
  {
    ...protoUser,
    id: "90127",
    email: "marydoe@gmail.com",
    firstName: "John",
    lastName: "Sue",
    avatar: "http://i.pravatar.cc/150?img=40",
    status: "Active",
    telephone: "345678909",
    mobile: "92312312",
    jobTitle: "Sales manager",
    skills: ["Skill 2"],
    isFavorite: false,
    favoriteUsers: [],
    userEmails: [
      {
        ...protoEmail,
        email: "marydoe@gmail.com",
        isPrimary: true,
        isActivated: true,
        createdAt: {
          seconds: 1539870837,
          nanos: 522000000
        }
      }
    ],
    invitedAt: { seconds: 1536077802, nanos: 738000000 },
    toScala: function() {
      return this;
    }
  },
  {
    ...protoUser,
    id: "90183",
    email: "ansue@gmail.com",
    firstName: "Mary",
    lastName: "Owen",
    avatar: "http://i.pravatar.cc/150?img=30",
    status: "Pending",
    telephone: "345678909",
    mobile: "92312312",
    jobTitle: "Sales manager",
    skills: ["Skill 2", "Skill 3"],
    isFavorite: false,
    favoriteUsers: ["90123"],
    userEmails: [
      {
        ...protoEmail,
        email: "ansue@gmail.com",
        isPrimary: true,
        isActivated: false,
        createdAt: {
          seconds: 1539870837,
          nanos: 522000000
        }
      }
    ],
    invitedAt: { seconds: 1536077802, nanos: 738000000 },
    toScala: function() {
      return this;
    }
  }
];
