import { bandTypes } from "utils/bands";
import { enumConstructor } from "config/mockData";

const prePorting = enumConstructor("statusPrePorting", 0);
const porting = enumConstructor("statusPorting", 1);
const available = enumConstructor("statusAvailable", 2);

export const statusOptions = [prePorting, porting, available];

const BT = enumConstructor("BT", 0);
const Vodafone = enumConstructor("Vodafone", 1);
const KCOM = enumConstructor("KCOM", 2);

export const networks = [BT, Vodafone, KCOM];

export const bands = [bandTypes.Gold, bandTypes.Silver, bandTypes.Bronze, bandTypes.Standard];

const gold = enumConstructor("gold", 0);
const silver = enumConstructor("silver", 1);
const bronze = enumConstructor("bronze", 2);
const standard = enumConstructor("standard", 3);

export const protoBands = [gold, silver, bronze, standard]

export const noAccount = () => {
    const o = {
        name: "noAccount",
        value: 0
    };
    
    o.toScala = () => {
        return o;
    };
    return o;
};

export const allocateToAccount = users => {
    const o = {
        name: "allocate",
        value: 1,
        users
    };
    
    o.toScala = () => {
        return o;
    };
    return o;
};

export const reserveForAccount = users => {
    const o = {
        name: "reserve",
        value: 2,
        users
    };

    
    o.toScala = () => {
        return o;
    };
    return o;

};

export const hiddenFromAccounts = () => {
    const o = {
        name: "hidden",
        value: 3
    };
    
    
    o.toScala = () => {
        return o;
    };
    return o;
};

export const releasedFromAccounts = users => {
    const o = {
        name: "released",
        value: 4,
        users
    };
    
    o.toScala = () => {
        return o;
    };
    return o;

};

export const allocationOptions = [noAccount, allocateToAccount, reserveForAccount, hiddenFromAccounts, releasedFromAccounts];

export const allocation = allocationValue => allocationOptions[allocationValue];

export const emptyNumberRange = () => {
    const numberRange = {
        from: 0,
        to: 0,
        fieldFrom: "from",
        fieldTo: "to"
    };
    numberRange.setFrom = newFrom => {
        numberRange.from = newFrom;
        return numberRange;
    };
    numberRange.setTo = newTo => {
        numberRange.to = newTo;
        return numberRange;
    };

    numberRange.toScala = () => numberRange;

    return numberRange;
};

export const emptyNumberConfiguration = () => {
    const numberConfig = { 
        bandType: gold,
        accountId: "",
        isReserved: false,
        status: prePorting,
        network: BT,
        numbers: emptyNumberRange(),
        excludes: [],
        includes: [],
        allocation: {},
        countryCode: 0,
        serviceId: "",
        fieldBandType: "bandType",
        fieldAccountId: "accountId",
        fieldIsReserved: "isReserved",
        fieldStatus: "status",
        fieldNetwork: "network",
        fieldAllocation: "allocation",
        fieldCountryCode: "countryCode",
        fieldServiceId: "serviceId",
        fieldNumbers: "numbers",
        fieldExcludes: "excludes",
        fieldIncludes: "includes"
    };
    numberConfig.setBandType = newBandType => {
        numberConfig.bandType = newBandType;
        return numberConfig;
    };
    numberConfig.setAccountId = newAccId => {
        numberConfig.accountId = newAccId;
        return numberConfig;
    };
    
    numberConfig.setIsReserved = newIsReserved => {
        numberConfig.isReserved = newIsReserved;
        return numberConfig;
    };
    numberConfig.setStatus = newStatus => { 
        numberConfig.status = newStatus;
        return numberConfig;
    };
    numberConfig.setNetwork = newNetwork => {
        numberConfig.network = newNetwork;
        return numberConfig;
    };
    numberConfig.setAllocation = newAllocation => {
        numberConfig.allocation = allocation;
        return numberConfig;
    }
    numberConfig.setCountryCode = newCountryCode => {
        numberConfig.countryCode = newCountryCode;
        return numberConfig;
    };
    numberConfig.setServiceId = newServiceId => {
        numberConfig.serviceId = newServiceId;
        return numberConfig
    };
    numberConfig.setNumbers = newNumbers => {
        numberConfig.numbers = newNumbers;
        return numberConfig;
    };
    numberConfig.setExcludes = newExcludes => {
        numberConfig.excludes = newExcludes;
        return numberConfig;
    };
    numberConfig.setIncludes = newIncludes => {
        numberConfig.includes = newIncludes;
        return numberConfig;
    };

    numberConfig.toScala = () => numberConfig;

    return numberConfig;

};

export const protoManageableNumber = {
  fieldId: "id",
  fieldNumber: "number",
  fieldNetwork: "network",
  fieldBandType: "bandType",
  fieldUpdatedBy: "updatedBy",
  fieldAccount: "account",
  fieldService: "service",
  fieldTags: "tags",
  fieldIsReserved: "isReserved",

  setId: () => {},
  setNumber: () => {},
  setNetwork: () => {},
  setBandType: () => {},
  setUpdatedBy: () => {},
  setAccount: () => {},
  setStatus: () => {},
  setAllocation: () => {},
  setService: () => {},
  setTags: () => {},
  setIsReserved: () => {}
};

const createNumberProtocol = (id, number, bandType, accountId, serviceId, network, isReserved, status, allocation, numberType) => {
    const numberProto = {
        id,
        number,
        bandType,
        accountId,
        serviceId,
        network,
        isReserved,
        status,
        allocation,
        numberType
    };

    // numberProto.createFunctionMeta = type => {
    //     numberProto['set'+type] = v => {
    //         numberProto[type] = v;
    //         return numberProto;
    //     };
    // };

    numberProto.setNumber = newNumber => {
        numberProto.number = newNumber;
        return numberProto;
    };

    numberProto.setBandType = newBandType => {
        numberProto.bandType = newBandType;
        return numberProto;
    };

    numberProto.setServiceId = newServiceId => {
        numberProto.serviceId = newServiceId;
        return numberProto;
    };

    numberProto.setAccountId = newAccountId => {
        numberProto.accountId = newAccountId;
        return numberProto;
    };

    numberProto.setNetwork = newNetwork => {
        numberProto.network = newNetwork;
        return numberProto;
    };

    numberProto.setIsReserved = newIsReserved => {
        numberProto.isReserved = newIsReserved;
        return numberProto;
    };

    numberProto.setStatus = newStatus => {
        numberProto.status = newStatus;
        return numberProto;
    };

    numberProto.setAllocation = newAllocation => {
        numberProto.allocation = newAllocation;
        return numberProto;
    };

    numberProto.setNumberType = newNumberType => {
        numberProto.numberType = newNumberType;
        return numberProto;
    };

    numberProto.toScala = () => {
        return numberProto;
    };
    
    return numberProto;
};

const numberType = ({
    type: "4404",
    ccyCode: "UK"
});

export const numbersList = [
    createNumberProtocol(
        "bf911175d85746d58aadf1f7ac401a22",
        "033 786 1231",
        gold,
        "123asdh9123lmjnxf9q38y41219hjasb",
        "n9f1823jnqsd0812u312084dq917yhas",
        BT,
        false,
        prePorting,
        noAccount(),
        numberType
    ),
    createNumberProtocol(
        "bf911175d85746d58aadf1f7ac401a23",
        "033 786 1231",
        gold,
        "123asdh9123lmjnxf9q38y41219hjasb",
        "n9f1823jnqsd0812u312084dq917yhas",
        false,
        BT,
        prePorting,
        allocateToAccount(["123asdh9123lmjnxf9q38y41219hjasb"]),
        numberType
    ),
    createNumberProtocol(
        "bf911175d85746d58aadf1f7ac401a24",
        "033 786 1231",
        gold,
        "123asdh9123lmjnxf9q38y41219hjasb",
        "n9f1823jnqsd0812u312084dq917yhas",
        BT,
        false,
        prePorting,
        noAccount(),
        numberType
    ),
    createNumberProtocol(
        "bf911175d85746d58aadf1f7ac401a25",
        "033 786 1231",
        gold,
        "123asdh9123lmjnxf9q38y41219hjasb",
        "n9f1823jnqsd0812u312084dq917yhas",
        BT,
        false,
        prePorting,
        hiddenFromAccounts(),
        numberType
    ),
    createNumberProtocol(
        "bf911175d85746d58aadf1f7ac401a26",
        "033 786 1231",
        gold,
        "123asdh9123lmjnxf9q38y41219hjasb",
        "n9f1823jnqsd0812u312084dq917yhas",
        BT,
        false,
        prePorting,
        noAccount(),
        numberType
    ),
    createNumberProtocol(
        "bf911175d85746d58aadf1f7ac401a27",
        "033 786 1231",
        gold,
        "123asdh9123lmjnxf9q38y41219hjasb",
        "n9f1823jnqsd0812u312084dq917yhas",
        BT,
        false,
        prePorting,
        allocateToAccount(["123asdh9123lmjnxf9q38y41219hjasb"]),
        numberType
    ),
    createNumberProtocol(
        "bf911175d85746d58aadf1f7ac401a28",
        "033 786 1231",
        gold,
        "123asdh9123lmjnxf9q38y41219hjasb",
        "n9f1823jnqsd0812u312084dq917yhas",
        BT,
        false,
        prePorting,
        noAccount(),
        numberType
    ),
    createNumberProtocol(
        "bf911175d85746d58aadf1f7ac401a29",
        "033 786 1231",
        gold,
        "123asdh9123lmjnxf9q38y41219hjasb",
        "n9f1823jnqsd0812u312084dq917yhas",
        BT,
        false,
        prePorting,
        noAccount(),
        numberType
    ),
    createNumberProtocol(
        "bf911175d85746d58aadf1f7ac401a30",
        "033 786 1231",
        gold,
        "123asdh9123lmjnxf9q38y41219hjasb",
        "n9f1823jnqsd0812u312084dq917yhas",
        BT,
        false,
        prePorting,
        noAccount(),
        numberType
    ),
    createNumberProtocol(
        "bf911175d85746d58aadf1f7ac401a31",
        "033 786 1231",
        gold,
        "123asdh9123lmjnxf9q38y41219hjasb",
        "n9f1823jnqsd0812u312084dq917yhas",
        BT,
        false,
        prePorting,
        noAccount(),
        numberType
    ),
    createNumberProtocol(
        "bf911175d85746d58aadf1f7ac401a32",
        "033 786 1231",
        gold,
        "123asdh9123lmjnxf9q38y41219hjasb",
        "n9f1823jnqsd0812u312084dq917yhas",
        BT,
        false,
        prePorting,
        noAccount(),
        numberType
    ),
    createNumberProtocol(
        "bf911175d85746d58aadf1f7ac401a33",
        "033 786 1231",
        gold,
        "123asdh9123lmjnxf9q38y41219hjasb",
        "n9f1823jnqsd0812u312084dq917yhas",
        BT,
        false,
        prePorting,
        noAccount(),
        numberType
    ),
    createNumberProtocol(
        "bf911175d85746d58aadf1f7ac401a34",
        "033 786 1231",
        gold,
        "123asdh9123lmjnxf9q38y41219hjasb",
        "n9f1823jnqsd0812u312084dq917yhas",
        BT,
        false,
        prePorting,
        noAccount(),
        numberType
    ),
    createNumberProtocol(
        "bf911175d85746d58aadf1f7ac401a35",
        "033 786 1231",
        gold,
        "123asdh9123lmjnxf9q38y41219hjasb",
        "n9f1823jnqsd0812u312084dq917yhas",
        BT,
        false,
        prePorting,
        noAccount(),
        numberType
    ),
    createNumberProtocol(
        "bf911175d85746d58aadf1f7ac401a36",
        "033 786 1231",
        gold,
        "123asdh9123lmjnxf9q38y41219hjasb",
        "n9f1823jnqsd0812u312084dq917yhas",
        BT,
        false,
        prePorting,
        noAccount(),
        numberType
    ),
    createNumberProtocol(
        "bf911175d85746d58aadf1f7ac401a37",
        "033 786 1231",
        gold,
        "123asdh9123lmjnxf9q38y41219hjasb",
        "n9f1823jnqsd0812u312084dq917yhas",
        BT,
        false,
        prePorting,
        noAccount(),
        numberType
    ),
    
];

export const numbersManagementList = [
  {
    ...protoManageableNumber,
    id: "bf911175d85746d58aadf1f7ac401a25",
    number: "033 786 1231",
    network: "BT",
    bandType: "Bronze",
    status: "prePorting",
    allocation: "noAccount",
    updatedBy: {
      firstName: "Jack",
      lastName: "Smith",
      updatedAt: { seconds: 1525140000, nanos: 0 }
    },
    accountName: "Account 1",
    serviceName: "Service 1",
    tags: [],
    isReserved: true
  },
  {
    ...protoManageableNumber,
    id: "bf911175d85746d58aadf1f7ac401a26",
    number: "033 786 1231",
    network: "BT",
    bandType: "Gold",
    status: "prePorting",
    allocation: "noAccount",
    updatedBy: {
      firstName: "Jack",
      lastName: "Smith",
      updatedAt: { seconds: 1525140000, nanos: 0 }
    },
    accountName: "Account 2",
    serviceName: "Service 2",
    tags: [],
    isReserved: true
  },
  {
    ...protoManageableNumber,
    id: "bf911175d85746d58aadf1f7ac401a27",
    number: "033 786 1231",
    network: "BT",
    bandType: "Gold",
    status: "prePorting",
    allocation: "noAccount",
    updatedBy: {
      firstName: "Jack",
      lastName: "Smith",
      updatedAt: { seconds: 1525140000, nanos: 0 }
    },
    accountName: "Account 3",
    serviceName: "Service 3",
    tags: [],
    isReserved: true
  },
  {
    ...protoManageableNumber,
    id: "bf911175d85746d58aadf1f7ac401a28",
    number: "033 786 1231",
    network: "BT",
    bandType: "Silver",
    status: "prePorting",
    allocation: "noAccount",
    updatedBy: {
      firstName: "Jack",
      lastName: "Smith",
      updatedAt: { seconds: 1525140000, nanos: 0 }
    },
    accountName: "Account 4",
    serviceName: "Service 4",
    tags: [],
    isReserved: true
  },
  {
    ...protoManageableNumber,
    id: "bf911175d85746d58aadf1f7ac401a29",
    number: "033 786 1231",
    network: "Vodafone",
    bandType: "Standard",
    status: "prePorting",
    allocation: "noAccount",
    updatedBy: {
      firstName: "Jack",
      lastName: "Smith",
      updatedAt: { seconds: 1525140000, nanos: 0 }
    },
    accountName: "Account 1",
    serviceName: "Service 1",
    tags: [],
    isReserved: false
  },
  {
    ...protoManageableNumber,
    id: "bf911175d85746d58aadf1f7ac401a30",
    number: "033 786 1231",
    network: "BT",
    bandType: "Gold",
    status: "prePorting",
    allocation: "noAccount",
    updatedBy: {
      firstName: "Jack",
      lastName: "Smith",
      updatedAt: { seconds: 1525140000, nanos: 0 }
    },
    accountName: "Account 2",
    serviceName: "Service 2",
    tags: [],
    isReserved: false
  },
  {
    ...protoManageableNumber,
    id: "bf911175d85746d58aadf1f7ac401a31",
    number: "033 786 1231",
    network: "BT",
    bandType: "Bronze",
    status: "prePorting",
    allocation: "noAccount",
    updatedBy: {
      firstName: "Jack",
      lastName: "Smith",
      updatedAt: { seconds: 1525140000, nanos: 0 }
    },
    accountName: "Account 3",
    serviceName: "Service 3",
    tags: [],
    isReserved: false
  },
  {
    ...protoManageableNumber,
    id: "bf911175d85746d58aadf1f7ac401a32",
    number: "033 786 1231",
    network: "BT",
    bandType: "Standard",
    status: "prePorting",
    allocation: "noAccount",
    updatedBy: {
      firstName: "Jack",
      lastName: "Smith",
      updatedAt: { seconds: 1525140000, nanos: 0 }
    },
    accountName: "Account 4",
    serviceName: "Service 4",
    tags: [],
    isReserved: false
  },
  {
    ...protoManageableNumber,
    id: "bf911175d85746d58aadf1f7ac401a33",
    number: "033 786 1231",
    network: "BT",
    bandType: "Bronze",
    status: "prePorting",
    allocation: "noAccount",
    updatedBy: {
      firstName: "Jack",
      lastName: "Smith",
      updatedAt: { seconds: 1525140000, nanos: 0 }
    },
    accountName: "Account 5",
    serviceName: "Service 5",
    tags: [],
    isReserved: false
  },
  {
    ...protoManageableNumber,
    id: "bf911175d85746d58aadf1f7ac401a34",
    number: "033 786 1231",
    network: "BT",
    bandType: "Silver",
    status: "prePorting",
    allocation: "noAccount",
    updatedBy: {
      firstName: "Jack",
      lastName: "Smith",
      updatedAt: { seconds: 1525140000, nanos: 0 }
    },
    accountName: "Account 6",
    serviceName: "Service 6",
    tags: [],
    isReserved: false
  }
];

export const protoAccountNumber = {
  fieldNumber: "number",
  fieldBand: "band",
  fieldTags: "tags",
  fieldRate: "rate",
  fieldStatus: "status",
  fieldService: "service",

  setNumber: () => {},
  setBand: () => {},
  setTags: () => {},
  setRate: () => {},
  setStatus: () => {},
  setService: () => {}
};

export const numbersOnAccount = [
  {
    ...protoAccountNumber,
    number: "0845 786 1231",
    bandType: "Gold",
    tags: ["Banbury", "East"],
    rate: "15p/min",
    status: "Active",
    service: "78901",
    serviceName: "Service 1"
  },
  {
    ...protoAccountNumber,
    number: "0207 786 1231",
    bandType: "Silver",
    tags: ["Bristol", "Somerset", "West"],
    rate: "15p/min",
    status: "Available",
    service: "78901",
    serviceName: "Service 1"
  },
  {
    ...protoAccountNumber,
    number: "123 786 1231",
    bandType: "Bronze",
    tags: ["Bristol", "Somerset", "West"],
    rate: "15p/min",
    status: "Active",
    service: "78901",
    serviceName: "Service 1"
  },
  {
    ...protoAccountNumber,
    number: "4567 786 123",
    bandType: "Standard",
    tags: ["Banbury", "East"],
    rate: "15p/min",
    status: "Active",
    service: "78901",
    serviceName: "Service 1"
  },
  {
    ...protoAccountNumber,
    number: "01453 786 231",
    bandType: "Gold",
    tags: ["Banbury", "East"],
    rate: "15p/min",
    status: "Available",
    service: "78901",
    serviceName: "Service 1"
  },
  {
    ...protoAccountNumber,
    number: "456 786 1231",
    bandType: "Silver",
    tags: ["Bristol", "Somerset", "West"],
    rate: "15p/min",
    status: "Active",
    service: "78901",
    serviceName: "Service 1"
  }
];
