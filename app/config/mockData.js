import { groups } from "config/groupsMockData";
import { roles } from "config/securityMockData";
import { services } from "config/servicesMockData";

export const enumConstructor = (label, value) => {
  const o = {
    value: value,
    label: label
  };

  o.toScala = () => o;
  return o;
};

export const usersList = [
  {
    userId: 1,
    name: "Andrew Williamson",
    email: "a.williamson@nhs.com",
    avatar: null
  },
  {
    userId: 2,
    name: "Sophie Kingsley",
    email: "s.kingsley@nhs.com",
    avatar: "http://i.pravatar.cc/150?img=45"
  },
  {
    userId: 3,
    name: "Nick Ward-Thomas",
    email: "n.wrdthomas@nhs.com",
    avatar: "http://i.pravatar.cc/150?img=11"
  }
];

export const forgotPasswordQuestions = [
  {
    text: "What is your mother's maiden name?",
    type: "text",
    name: "mothersMaidenName"
  },
  {
    text: "1st, 3rd, 4th and 7th character of your place of birth?",
    type: "exactCharacter",
    charsNumber: 4,
    name: "placeOfBirth"
  },
  {
    text: "2nd, 5th, 8th and 9th number of your mobile?",
    type: "exactCharacter",
    charsNumber: 4,
    name: "numberOfMobile"
  }
];

export const announcements = [
  {
    title: "New feature Added",
    date: "Tue 30 Jan, 12:09",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec diam eros, sagittis sed cursus at, bibendum vel nunc\
             Proin tempus, neque non mattis euismod, elit libero scelerisque magna. Integer dapibus\
            Cras mauris arcu, commodo id commodo ut, fermentum vitae lectus."
  },
  {
    title: "Bug Fixed",
    date: "Tue 30 Jan, 12:09",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec diam eros, sagittis sed cursus at, bibendum vel nunc\
             Proin tempus, neque non mattis euismod, elit libero scelerisque magna. Integer dapibus\
             Proin tempus, neque non mattis euismod, elit libero scelerisque magna. Integer dapibus\
             Proin tempus, neque non mattis euismod, elit libero scelerisque magna. Integer dapibus\
             Proin tempus, neque non mattis euismod, elit libero scelerisque magna. Integer dapibus\
             Proin tempus, neque non mattis euismod, elit libero scelerisque magna. Integer dapibus\
            Cras mauris arcu, commodo id commodo ut, fermentum vitae lectus."
  }
];

export const statusOptions = ["statusPrePorting", "statusPorting", "statusAvailable"];

export const currencies = [
  {
    value: "USD",
    label: "BT"
  },
  {
    value: "EUR",
    label: "€"
  },
  {
    value: "BTC",
    label: "฿"
  },
  {
    value: "JPY",
    label: "¥"
  }
];

export const userInfo = {
  firstName: "John",
  lastName: "Doe",
  email: "johndoe@companyname.com"
};

export const quickSwitchUsers = [
  {
    name: "Sophie Jamerson - Smith",
    email: "sophiejamersonsmith@companyname.com"
  },
  { name: "Ben Ward", email: "benward@companyname.com" }
];

export const menuItems = [
  {
    text: "NHS",
    icon: "keyboard_backspace",
    onClick: () => console.log("account was clicked")
  },
  {
    text: "accountSettings",
    icon: "settings",
    onClick: () => console.log("settings was clicked")
  }
];

export const serviceTemplates = [
  {
    id: 1,
    name: "Template 1",
    imageUrl: "https://snag.gy/kC8vgu.jpg",
    isSimple: false,
    desc:
      "Lorem ipsum dolor sit amet, conse are ctetuer van adipiscing elit, sed diam sed diam nonummy nibh euismod dol..."
  },
  {
    id: 2,
    name: "Template 2",
    imageUrl: "https://snag.gy/kC8vgu.jpg",
    isSimple: false,
    desc:
      "Lorem ipsum dolor sit amet, conse are ctetuer van adipiscing elit, sed diam sed diam nonummy nibh euismod dol..."
  },
  {
    id: 3,
    name: "Template 3",
    imageUrl: "https://snag.gy/kC8vgu.jpg",
    isSimple: false,
    desc:
      "Lorem ipsum dolor sit amet, conse are ctetuer van adipiscing elit, sed diam sed diam nonummy nibh euismod dol..."
  },
  {
    id: 4,
    name: "Template 4",
    imageUrl: "https://snag.gy/kC8vgu.jpg",
    isSimple: true,
    desc:
      "Lorem ipsum dolor sit amet, conse are ctetuer van adipiscing elit, sed diam sed diam nonummy nibh euismod dol..."
  },
  {
    id: 5,
    name: "Template 5",
    imageUrl: "https://snag.gy/kC8vgu.jpg",
    isSimple: true,
    desc:
      "Lorem ipsum dolor sit amet, conse are ctetuer van adipiscing elit, sed diam sed diam nonummy nibh euismod dol..."
  },
  {
    id: 6,
    name: "Template 6",
    imageUrl: "https://snag.gy/kC8vgu.jpg",
    isSimple: true,
    desc:
      "Lorem ipsum dolor sit amet, conse are ctetuer van adipiscing elit, sed diam sed diam nonummy nibh euismod dol..."
  }
];
/*export const availableGroups = [
  { id: 1, name: "Group 1", color: "#00bcd4" },
  { id: 2, name: "Group 2", color: "#e93371" },
  { id: 3, name: "Group 3", color: "#00bcd4" },
  { id: 4, name: "Group 4", color: "#e93371" },
  { id: 5, name: "Group 5", color: "#00bcd4" },
  { id: 6, name: "Group 6", color: "#e93371" }
];*/

const getGroup = groupId => {
  return groups.find(group => group.id === groupId);
};

const getRole = roleId => {
  return roles[roleId];
};
export const assignedUserGroups = [
  getGroup("66548"),
  getGroup("20896"),
  getGroup("41645"),
  getGroup("7203"),
  getGroup("37104"),
  getGroup("43123")
];

export const assignedUserRoles = [
  {
    ...getRole(1),
    userId: "90123"
  },
  {
    ...getRole(2),
    userId: "90123"
  },
  {
    ...getRole(3),
    userId: "90123"
  },
  {
    ...getRole(4),
    userId: "90123"
  },
  {
    ...getRole(5),
    userId: "90123"
  },
  {
    ...getRole(6),
    userId: "90123"
  }
];

export const userProfile = {
  getId: "90123",
  getAvatar: "http://i.pravatar.cc/150?img=45",
  getFirstName: "John",
  getLastName: "Doe",
  getJobTitle: "Sales manager",
  getStatus: "Pending",
  getFavoriteUsers: [],
  getEmail: "j.doe@nhs.com",
  getTelephone: "9012352472",
  getMobile: "8398462836",
  getSkills: ["Skill 1", "Skill 2"],
  getInvitedAt: { getSeconds: 1536077802, getNanos: 738000000 }
};

//export const groups = availableGroups.slice(0, 2);

export const numbers = [
  {
    id: 1,
    name: "033 7861231",
    network: "BT",
    band: "gold",
    dateAdded: "30/01/18",
    account: "Account 1",
    service: "Service 1",
    isFavorite: true
  },
  {
    id: 2,
    name: "033 7861231",
    network: "BT",
    band: "gold",
    dateAdded: "30/01/18",
    account: "Account 1",
    service: "Service 1",
    isFavorite: true
  },
  {
    id: 3,
    name: "033 7861231",
    network: "BT",
    band: "gold",
    dateAdded: "30/01/18",
    account: "Account 1",
    service: "Service 1",
    isFavorite: true
  }
];

export const addresses = [
  {
    id: 1,
    address: "1 City Road, Manchester, E1, 2YA"
  },
  {
    id: 2,
    address: "2 City Road, London, E1, 2YA"
  },
  {
    id: 3,
    address: "3 City Road, London, E1, 2YA"
  },
  {
    id: 4,
    address: "4 City Road, London, E1, 2YA"
  },
  {
    id: 5,
    address: "5 Very Very Long Road Name For Testing Purpose, London, E1, 2YA"
  }
];

export const serviceNumbers = [
  {
    id: 1,
    number: "033 786 1231",
    tags: ["Banbury", "East"],
    bandType: "Gold",
    rate: "£0.015",
    status: "Service 1"
  },
  {
    id: 2,
    number: "033 786 1232",
    tags: ["Bristol", "Somerset", "West"],
    bandType: "Silver",
    rate: "£0.015",
    status: "Available"
  },
  {
    id: 3,
    number: "033 786 1233",
    tags: ["Bristol", "Somerset", "West"],
    bandType: "Bronze",
    rate: "£0.015",
    status: "Service 1"
  },
  {
    id: 4,
    number: "033 786 1234",
    tags: ["Banbury", "East"],
    bandType: "Standard",
    rate: "£0.015",
    status: "Available"
  }
];

export const searchResults = [
  {
    text: "List A",
    url: "#"
  },
  {
    text: "List BCD",
    url: "#"
  },
  {
    text: "List ZXC",
    url: "#"
  },
  {
    text: "List CBA",
    url: "#"
  },
  {
    text: "List ZAQ",
    url: "#"
  },
  {
    text: "List WSX",
    url: "#"
  }
];
export const accTypes = [
  {
    id: "typeA",
    name: "Type A"
  },
  {
    id: "typeB",
    name: "Type B"
  },
  {
    id: "typeC",
    name: "Type C"
  }
];

export const defaultPricingPlan = {
  creditLimit: "£ 20,000",
  currentLimit: "£ 20,000",
  remainingCredit: "£ 10,000"
};

export const plans = [
  {
    id: "Plan A",
    bgColor: "#595959",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi accumsan interdum turpis suscipit eleifend."
  },
  {
    id: "Plan B",
    bgColor: "rgb(156, 39, 176)",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi accumsan interdum turpis suscipit eleifend."
  },
  {
    id: "Plan C",
    bgColor: "rgb(103, 58, 183)",
    text: "Lorem ipsum dolor sit amet, accumsan interdum turpis suscipit eleifend."
  },
  {
    id: "Plan D",
    bgColor: "rgb(3, 169, 244)",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi accumsan interdum turpis suscipit eleifend."
  }
];

export const accountPanelTitles = [
  {
    title: "Fixed Costs"
  },
  {
    title: "Annual Charges"
  },
  {
    title: "Inbound Call Tariffs"
  },
  {
    title: "Outbound Call Tariffs"
  }
];

export const countries = [
  {
    id: "UK",
    name: "United Kingdom"
  },
  {
    id: "FR",
    name: "France"
  },
  {
    id: "IR",
    name: "Ireland"
  }
];
