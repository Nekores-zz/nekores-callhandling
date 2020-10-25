const description =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec diam eros, sagittis sed cursus at, bibendum vel nunc\
Proin tempus, neque non mattis euismod, elit libero scelerisque magna. Integer dapibus\
Cras mauris arcu, commodo id commodo ut, fermentum vitae lectus.";

const startTime = { seconds: 1525140000, nanos: 0 };
const endTime = { seconds: 1526140000, nanos: 0 };

export const services = [
  {
    id: "78901",
    name: "Service 1",
    updatedBy: {
      firstName: "Jack",
      lastName: "Smith",
      updatedAt: { seconds: 1525140000, nanos: 0 }
    },
    status: "Live on Version 1.2",
    statusFrom: "1 May, 2018",
    description,
    startTime,
    endTime,
    isFavorite: true,
    types: ["1", "2"]
  },
  {
    id: "78902",
    name: "Service 2",
    updatedBy: {
      firstName: "John",
      lastName: "Doe",
      updatedAt: { seconds: 1524734880, nanos: 0 }
    },
    status: "Live on Version 2.4",
    statusFrom: "16 Dec, 2017",
    description,
    isFavorite: true
  },
  {
    id: "78903",
    name: "Service 3",
    updatedBy: {
      firstName: "Sophie",
      lastName: "Stone",
      updatedAt: { seconds: 1524285240, nanos: 0 }
    },
    status: "Live on Version 3",
    statusFrom: "9 Jan, 2018",
    description,
    isFavorite: true
  },
  {
    id: "78904",
    name: "Service 4",
    updatedBy: {
      firstName: "Emma",
      lastName: "Johnson",
      updatedAt: { seconds: 1520173680, nanos: 0 }
    },
    status: "Live on Version 3",
    statusFrom: "4 Mar, 2018",
    description,
    isFavorite: true
  },
  {
    id: "78905",
    name: "Service 5",
    updatedBy: {
      firstName: "Jack",
      lastName: "Smith",
      updatedAt: { seconds: 1525140000, nanos: 0 }
    },
    status: "Live on Version 1.2",
    statusFrom: "1 May, 2018",
    description,
    isFavorite: false
  },
  {
    id: "78906",
    name: "Service 6",
    updatedBy: {
      firstName: "John",
      lastName: "Doe",
      updatedAt: { seconds: 1524734880, nanos: 0 }
    },
    status: "Live on Version 2.4",
    statusFrom: "16 Dec, 2017",
    description,
    isFavorite: false
  },
  {
    id: "78907",
    name: "Service 7",
    updatedBy: {
      firstName: "Sophie",
      lastName: "Stone",
      updatedAt: { seconds: 1524285240, nanos: 0 }
    },
    status: "Live on Version 3",
    statusFrom: "9 Jan, 2018",
    description,
    isFavorite: false
  },
  {
    id: "78908",
    name: "Service 8",
    updatedBy: {
      firstName: "Emma",
      lastName: "Johnson",
      updatedAt: { seconds: 1520173680, nanos: 0 }
    },
    status: "Live on Version 3",
    statusFrom: "4 Mar, 2018",
    description,
    isFavorite: false
  },
  {
    id: "78909",
    name: "Service 9",
    updatedBy: {
      firstName: "Thomas",
      lastName: "Zee",
      updatedAt: { seconds: 1518484620, nanos: 0 }
    },
    status: "Live on Version 1",
    statusFrom: "4 Jan, 2018",
    description,
    isFavorite: false
  },
  {
    id: "78910",
    name: "Service 10",
    updatedBy: {
      firstName: "Jack",
      lastName: "Smith",
      updatedAt: { seconds: 1525140000, nanos: 0 }
    },
    status: "Live on Version 1.2",
    statusFrom: "1 May, 2018",
    description,
    isFavorite: false
  }
];

// it is returning a function so you must call getEmptyService() to get an object
export const getEmptyService = () => {
  const service = {
    name: "",
    description: "",
    tags: [],
    startTime: null,
    endTime: null,
    defaultPublishedVersionId: "",

    fieldName: "name",
    fieldDescription: "description",
    fieldTags: "tags",
    fieldStartTime: "startTime",
    fieldEndTime: "endTime",
    fieldDefaultPublishedVersionId: "defaultPublishedVersionId"
  };

  service.setName = name => {
    service.name = name;
    return service;
  };

  service.setDescription = description => {
    service.description = description;
    return service;
  };

  service.setTags = tags => {
    service.tags = tags;
    return service;
  };

  service.setStartTime = startTime => {
    service.startTime = startTime;
    return service;
  };

  service.setEndTime = endTime => {
    service.endTime = endTime;
    return service;
  };

  service.setDefaultPublishedVersionId = defaultPublishedVersionId => {
    service.defaultPublishedVersionId = defaultPublishedVersionId;
    return service;
  };

  service.toScala = () => {
    return service;
  };

  return service;
};

export const serviceExample = {
  id: "98650",
  ...getEmptyService()
    .setName("Example Service")
    .setDescription(description)
    .setStartTime(startTime)
    .setEndTime(endTime)
    .setDefaultPublishedVersionId(null), // ("1")

  // deprecated fields (need to bee updated also):
  lastOpenedName: "Jack Smith",
  lastOpenedDate: "10:00 1 May, 2018",
  status: "Live on Version 1.2",
  statusFrom: "1 May, 2018",
  isFavorite: true
  // defaultPublishedVersionNumber: {
  //   majorVersion: 1,
  //   minorVersion: 1
  // }
};

export const schedule = [
  {
    id: "1",
    serviceVersionId: "1",
    settings: "d",
    startTime: { seconds: 1520173680, nanos: 0 },
    endTime: null,
    serviceVersionNumber: {
      majorVersion: 1,
      minorVersion: 1
    },
    serviceVersionTags: ["Tag one", "Tag two", "Tag three"],
    isException: false
  },
  {
    id: "2",
    serviceVersionId: "2",
    settings: "e",
    startTime: { seconds: 1524734880, nanos: 0 },
    endTime: { seconds: 1525140000, nanos: 0 },
    serviceVersionNumber: {
      majorVersion: 1,
      minorVersion: 2
    },
    serviceVersionTags: ["Tag one", "Tag two", "Tag three", "Tag four"],
    isException: true
  }
];

// it is returning a function so you must call getEmptyServiceScheduling() to get an object
export const getEmptyServiceScheduling = () => {
  const _scheduling = {
    serviceId: "",
    serviceVersionId: "",
    startTime: null,
    endTime: null,
    isException: false,

    fieldServiceId: "serviceId",
    fieldServiceVersionId: "serviceVersionId",
    fieldStartTime: "startTime",
    fieldEndTime: "endTime",
    fieldIsException: "isException"
  };

  _scheduling.setId = id => {
    _scheduling.id = id;
    return _scheduling;
  };

  _scheduling.setServiceId = serviceId => {
    _scheduling.serviceId = serviceId;
    return _scheduling;
  };

  _scheduling.setServiceVersionId = serviceVersionId => {
    _scheduling.serviceVersionId = serviceVersionId;
    return _scheduling;
  };

  _scheduling.setStartTime = startTime => {
    _scheduling.startTime = startTime;
    return _scheduling;
  };

  _scheduling.setEndTime = endTime => {
    _scheduling.endTime = endTime;
    return _scheduling;
  };

  _scheduling.setIsException = isException => {
    _scheduling.isException = isException;
    return _scheduling;
  };

  _scheduling.toScala = () => {
    return _scheduling;
  };

  return _scheduling;
};

export const versions = [
  // status option strings might need update... for now, these ones are used on VersionStatusCell:
  // status: 'dl' = Default live, status: 'ae' = Active scheduling, status: 'nv' = Invalid
  {
    id: "1",
    versionNumber: {
      majorVersion: 1,
      minorVersion: 1
    },
    tags: ["Tag one", "Tag two", "Tag three"],
    updatedBy: {
      id: "34570",
      firstName: "Jack",
      lastName: "Smith",
      updatedAt: { seconds: "1276324", nanos: "1231" }
    },
    status: "DefaultLive"
  },
  {
    id: "2",
    versionNumber: {
      majorVersion: 1,
      minorVersion: 2
    },
    tags: ["Tag one", "Tag two", "Tag five"],
    updatedBy: {
      id: "34567",
      firstName: "John",
      lastName: "Doe",
      updatedAt: { seconds: "1234124", nanos: "1231" }
    },
    status: "ActiveException"
  },
  {
    id: "3",
    versionNumber: {
      majorVersion: 1,
      minorVersion: 3
    },
    tags: ["Tag three", "Tag four", "Tag five"],
    updatedBy: {
      id: "34568",
      firstName: "Sophie",
      lastName: "Stone",
      updatedAt: { seconds: "123324", nanos: "1231" }
    },
    status: "ActiveException"
  },
  {
    id: "4",
    versionNumber: {
      majorVersion: 1,
      minorVersion: 4
    },
    tags: ["Tag one", "Tag two", "Tag three"],
    updatedBy: {
      id: "34569",
      firstName: "Emma",
      lastName: "Johnson",
      updatedAt: { seconds: "121224", nanos: "1231" }
    },
    status: "ActiveException"
  },
  {
    id: "5",
    versionNumber: {
      majorVersion: 2,
      minorVersion: 1
    },
    tags: ["Tag one", "Tag two"],
    updatedBy: {
      id: "34570",
      firstName: "Jack",
      lastName: "Smith",
      updatedAt: { seconds: "127624", nanos: "1231" }
    },
    status: "Invalid"
  },
  {
    id: "6",
    versionNumber: {
      majorVersion: 2,
      minorVersion: 2
    },
    tags: ["Tag one", "Tag two", "Tag three"],
    updatedBy: {
      id: "34567",
      firstName: "John",
      lastName: "Doe",
      updatedAt: { seconds: "123454", nanos: "1231" }
    },
    status: "Invalid"
  }
];

export const numbers = [
  {
    id: 1,
    number: "033 786 1231",
    tags: "Banbury, East",
    bandColor: "#999238",
    bandIcon: "G",
    band: "Gold",
    rate: "£0.015",
    status: "Service 1"
  },
  {
    id: 2,
    number: "033 786 1232",
    tags: "Bristol, Somerset, West",
    bandColor: "#A8A8A8",
    bandIcon: "S",
    band: "Silver",
    rate: "£0.015",
    status: "Available"
  },
  {
    id: 3,
    number: "033 786 1233",
    tags: "Bristol, Somerset, West",
    bandColor: "#AF702E",
    bandIcon: "B",
    band: "Bronze",
    rate: "£0.015",
    status: "Service 1"
  },
  {
    id: 4,
    number: "033 786 1234",
    tags: "Banbury, East",
    bandColor: "#353535",
    bandIcon: "ST",
    band: "Standard",
    rate: "£0.015",
    status: "Available"
  }
];
