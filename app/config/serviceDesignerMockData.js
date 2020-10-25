import * as usersMockData from "./usersMockData";

export const currentUserId = usersMockData.users[0].id;

export const users = usersMockData.users.reduce((r, x, i) => {
  r[x.id] = x;
  return r;
}, {});

// const nodeTypesOptions = {
//   'access': ['option1'],
//   'access-control': ['option1', 'option2'],
//   'menu': ['option1', 'option2', 'option3'],
//   'queue': ['option1', 'option2', 'option3', 'option4'],
//   'call-dialing': ['option1', 'option2', 'option3'],
// }

// const makeNode = ({ nodeType, position, name, description }) => ({
//   id: generateUid(),
//   nodeType,
//   options: nodeTypesOptions[nodeType],
//   name,
//   description,
//   position,
// })

const description =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

// export const nodes = [
//   makeNode({ nodeType: 'access', position: geometry.point(20, 20), name: 'Node 1', description }),
//   makeNode({ nodeType: 'access-control', position: geometry.point(250, 20), name: 'Node 1', description }),
//   makeNode({ nodeType: 'menu', position: geometry.point(480, 20), name: 'Node 1', description }),
//   makeNode({ nodeType: 'queue', position: geometry.point(710, 20), name: 'Node 1', description }),
//   makeNode({ nodeType: 'call-dialing', position: geometry.point(20, 180), name: 'Node 1', description }),
// ]
import { generateJsWriter } from "./utils";
export const versions = [
  {
    id: "1",
    datetime: new Date().toLocaleString(),
    author: "John Doe",
    children: [
      {
        id: 2,
        datetime: new Date().toLocaleString(),
        author: "John Sue"
      },
      {
        id: 3,
        datetime: new Date().toLocaleString(),
        author: "Mary Doe"
      }
    ]
  },
  {
    id: 4,
    datetime: new Date().toLocaleString(),
    author: "Mary Sue",
    children: [
      {
        id: 5,
        datetime: new Date().toLocaleString(),
        author: "John Owen"
      }
    ]
  },
  {
    id: 6,
    datetime: new Date().toLocaleString(),
    author: "A. N. Owen"
  }
];

export const documentHistory = {
  canUndo: true,
  canRedo: false
};

export const pages = [{ id: "1", name: "Page 1" }];

export const serviceDocument = {
  nodes: {},
  links: {},
  comments: {}
};

// State options for call-care node
export const stateOptions = ["open", "closed", "preOpen"];

export const states = [
  generateJsWriter({
    state: "open",
    description: "Open",
    typeOfState: "autoDetected"
  }),
  generateJsWriter({
    state: "closed",
    description: "Closed for holidays",
    typeOfState: "autoDetected"
  }),
  generateJsWriter({
    state: "preOpen",
    description: "",
    typeOfState: "autoDetected"
  })
];

export const callCareConfig = () => {
  const config = {
    states: states,
    accountMode: "accountOne",
    timeout: 2,
    accountIds: ["80134", "80156"],
    name: "",
    getEmptyStates: () =>
      generateJsWriter({ state: "Open", description: "", typeOfState: "manuallyAdded" })
  };
  config.toScala = () => config;
  return generateJsWriter(config);
};

export const dialConfig = () => {
  const config = {
    numberPresentationMode: "presentNotWithheld",
    numberMode: "number",
    number: null,
    customNumber: null,
    codeMode: "countryCode",
    countryCode: "uk",
    localNumber: "",
    variable: "",
    reportLabel: "",
    timeout: 10,

    // multi-dial
    distributionMode: "blast",
    numbers: [],
    multiNumberPresentationMode: "presentNotWithheld",
  };
  config.toScala = () => config;
  return generateJsWriter(config);
};

export const gotoConfig = () => {
  const config = {
    serviceMode: "thisService",
    node: null,
    selectedService: null,
    selectedVersion: null
  };
  config.toScala = () => config;
  return generateJsWriter(config);
};

export const menuConfig = () => {
  const config = {
    checkMode: "simple", // "simple" / "advanced",
    enabledKeys: [
      { key: "1", description: "" },
      { key: "2", description: "" },
      { key: "*", description: "" },
      { key: "#", description: "" }
    ],
    greetingAndPromptsList: [...greetingAndPromptsList],

    addMultipleKey: false,
    forcedEndOfDTMF: false,
    selectToSaveDTMF: false,
    customTimeout: false,
    detectRepeatedKeys: false,
    menuRepeatMode: "returnNoKeyAfterFirstBlank",

    // other options
    detectKeyPress: false,
    preventCaller: false,
    flushOnInterrupt: false,
    flushAfterPlay: false,
    enableBackwardForwardJumps: false,
    jumpMode: "day",
    delay: "",
    backwardsKey: "#",
    forwardsKey: "*"
  };
  config.toScala = () => config;
  return generateJsWriter(config);
};

export const timeConfig = () => {
  const config = {
    checkMode: "simple", // simple / advanced

    // simple configs
    time: { from: null, to: null },
    dayOfWeeks: [
      {
        label: "monday",
        isSelected: false
      },
      {
        label: "tuesday",
        isSelected: false
      },
      {
        label: "wednesday",
        isSelected: false
      },
      {
        label: "thursday",
        isSelected: false
      },
      {
        label: "friday",
        isSelected: false
      },
      {
        label: "saturday",
        isSelected: false
      },
      {
        label: "sunday",
        isSelected: false
      }
    ],
    customDays: {
      label: "custom",
      isSelected: false,
      days: [{ from: null, to: null }]
    },

    // advanced configs
    ruleMode: "allRules",
    rules: []
  };
  config.toScala = () => config;
  return generateJsWriter(config);
};

export const playConfig = () => {
  const config = {
    audios: [],
    detectKeyPress: false,
    preventCaller: false,
    flushOnInterrupt: false,
    flushAfterPlay: false,
    enableBackwardForwardJumps: false,
    injectDelayBetweenPlays: false,
    jumpMode: "day",
    delay: "",
    backwardsKey: "#",
    forwardsKey: "*",
    injectDelay: "",
  };
  config.toScala = () => config;
  return generateJsWriter(config);
};

export const recordVoiceConfig = () => {
  const config = {
    getRecordingForm,
    getTargetForm,
    getInitialMessageForm,
    getOtherOptionsForm
  };
  config.toScala = () => config;
  return generateJsWriter(config);
};

export const dateTimeTypeOptions = [
  "hour",
  "minute",
  "dayOfWeek",
  "dayOfMonth",
  "month",
  "year",
  "dayOfYear",
  "weekOfYear",
  "weekOfMonth",
  "minuteOfDay",
  "leapYear"
];

export const dateTimeOperatorOptions = ["=", "!=", ">", ">=", "<", "<="];

export const weekdayOptions = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday"
];

export const monthOptions = [
  "january",
  "februray",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december"
];

export const timeOutOptions = [2, 4, 6, 8, 10];

export const timeSelectionIntervalOptions = [5, 10, 15, 20, 25];
export const nearestIntervalOptions = ["round", "ceiling", "floor"];

export const dateTimeValueOptions = {
  hour: { type: "number", min: 0, max: 23 },
  minute: { type: "number", min: 0, max: 59 },
  dayOfWeek: { type: "select", options: weekdayOptions },
  dayOfMonth: { type: "number", min: 0, max: 31 },
  month: { type: "select", options: monthOptions },
  year: { type: "number" },
  dayOfYear: { type: "number", min: 1, max: 366 },
  weekOfYear: { type: "number", min: 1, max: 53 },
  weekOfMonth: { type: "number", min: 1, max: 5 },
  minuteOfDay: { type: "number", min: 0, max: 1339 }
};

const getBasicInfoForm = () => {
  const basicInfo = {
    accountMode: "thisAccount",
    accounts: [],
    timeout: 4,
    openingHourCombineMode: "fromToday",
    openingHourExceptionWeekday: "monday",
    useToday: true,
    useTomorrow: false,
    timeSelectionInterval: "15",
    settings: "round",

    timeOutOptions,
    weekdayOptions,
    timeSelectionIntervalOptions,
    settingsOptions: nearestIntervalOptions
  };

  basicInfo.setAccountMode = accountMode => {
    basicInfo.accountMode = accountMode;
    return basicInfo;
  };

  basicInfo.setAccounts = accounts => {
    basicInfo.accounts = [...accounts];
    return basicInfo;
  };

  basicInfo.setTimeOut = timeOut => {
    basicInfo.timeOut = timeOut;
    return basicInfo;
  };

  basicInfo.setOpeningHourCombineMode = openingHourCombineMode => {
    basicInfo.openingHourCombineMode = openingHourCombineMode;
    return basicInfo;
  };

  basicInfo.setOpeningHourExceptionWeekday = openingHourExceptionWeekday => {
    basicInfo.openingHourExceptionWeekday = openingHourExceptionWeekday;
    return basicInfo;
  };

  basicInfo.setUseToday = useToday => {
    basicInfo.useToday = useToday;
    return basicInfo;
  };

  basicInfo.setUseTomorrow = useTomorrow => {
    basicInfo.useTomorrow = useTomorrow;
    return basicInfo;
  };

  basicInfo.setTimeSelectionInterval = timeSelectionInterval => {
    basicInfo.timeSelectionInterval = timeSelectionInterval;
    return basicInfo;
  };

  basicInfo.setSettings = settings => {
    basicInfo.settings = settings;
    return basicInfo;
  };

  return basicInfo;
};

const getGroupingForm = () => {
  const grouping = {
    groupingMode: "doNotGroupDays",
    combineStateToDay: true
  };

  grouping.setGroupingMode = groupingMode => {
    grouping.groupingMode = groupingMode;
    return grouping;
  };

  grouping.setCombineStateToDay = combineStateToDay => {
    grouping.combineStateToDay = combineStateToDay;
    return grouping;
  };

  return grouping;
};

const getAudioFilesForm = () => {
  const audioFiles = {
    systemAudioFiles: [
      {
        title: "Initial greeting",
        description,
        audioFile: null
      },
      {
        title: "Closed all day file",
        description,
        audioFile: null
      },
      {
        title: "Statewide message before reading out time",
        description,
        audioFile: null
      },
      {
        title: "Message before state transition",
        description,
        audioFile: null
      }
    ],
    manualAudioFiles: []
  };

  return audioFiles;
};

const getKeyPressForm = () => {
  const keyPress = {
    preventCaller: false,
    flushOnInterrupt: false,
    flushAfterPlay: false,
    enableBackwardForwardJumps: false,
    jumpMode: "day",
    delay: "",
    backwardsKey: "#",
    forwardsKey: "*",

    jumpModeOptions: ["day", "milliSeconds"],
    delayOptions: []
  };

  keyPress.setPreventCaller = preventCaller => {
    keyPress.preventCaller = preventCaller;
    return keyPress;
  };

  keyPress.setFlushOnInterrupt = flushOnInterrupt => {
    keyPress.flushOnInterrupt = flushOnInterrupt;
    return keyPress;
  };

  keyPress.setFlushAfterPlay = flushAfterPlay => {
    keyPress.flushAfterPlay = flushAfterPlay;
    return keyPress;
  };

  keyPress.setEnableBackwardForwardJumps = enableBackwardForwardJumps => {
    keyPress.enableBackwardForwardJumps = enableBackwardForwardJumps;
    return keyPress;
  };

  keyPress.setJumpMode = jumpMode => {
    keyPress.jumpMode = jumpMode;
    if (jumpMode === "milliSeconds") {
      keyPress.delayOptions = [100, 200, 300, 400, 500];
      keyPress.delay = 500;
    }
    return keyPress;
  };

  keyPress.setDelay = delay => {
    keyPress.delay = delay;
    return keyPress;
  };

  keyPress.setBackwardsKey = backwardsKey => {
    keyPress.backwardsKey = backwardsKey;
    return keyPress;
  };

  keyPress.setForwardsKey = forwardsKey => {
    keyPress.forwardsKey = forwardsKey;
    return keyPress;
  };

  return keyPress;
};

export const callcarePlayNodeFormInfo = {
  getBasicInfoForm,
  getGroupingForm,
  getAudioFilesForm,
  getKeyPressForm

  // basicInfo: getBasicInfoForm(),
  // groupingForm: getGroupingForm(),
  // audioFilesInfo: getAudioFilesForm(),
  // keyPressInfo: getKeyPressForm()
};

export const numberPresentationOptions = [
  "presentNotWithheld",
  "alwaysWithheld",
  "presentDialledNumber",
  "selectOwnedNumbers",
  "customPresentationNumber"
];

export const countryCodeOptions = ["uk"];

export const getCountryName = regionCode => "UK";
export const getCountryCode = regionCode => "44";
export const getFormattedCode = regionCode =>
  getCountryName(regionCode) + " (+ " + getCountryCode(regionCode) + ")";

export const variableOptions = [
  {
    id: "771",
    name: "Variable 1"
  },
  {
    id: "772",
    name: "Variable 2"
  },
  {
    id: "773",
    name: "Variable 3"
  }
];

export const nodes = [
  {
    id: "1",
    name: "Node 1",
    nodeType: "1"
  },
  {
    id: "2",
    name: "Node 2",
    nodeType: "1"
  },
  {
    id: "3",
    name: "Node 3",
    nodeType: "2"
  },
  {
    id: "4",
    name: "Node 4",
    nodeType: "3"
  }
];

export const greetingAndPromptsList = [
  {
    title: "Play long greeting message once on entering the node",
    audioFile: null
  },
  {
    title: "Play message on repeating the menu",
    audioFile: null
  },
  {
    title: "Play a message on invalid key press",
    audioFile: null
  }
];

// record-voice node config
export const keyOptions = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "#"];

const getRecordingForm = () => {
  const recording = {
    stopKeys: [],
    recordingTimeLimit: 60,
    silenceThreshold: 3,
    silenceHits: 2,
    recordingTimeLimitOpitons: [10, 20, 30, 40, 50, 60],
    silenceThresholdOptions: [1, 2, 3, 4, 5, 6],
    silenceHitsOptions: [1, 2, 3, 4, 5, 6]
  };

  recording.toScala = () => recording;
  return generateJsWriter(recording);
};

const getTargetForm = () => {
  const target = {
    recordingName: "",
    isVoiceMail: false,
    mailBoxName: "",
    isEmail: false,
    emailAddress: "",
    isSFTP: false,
    host: "",
    port: "",
    loginType: "",
    user: "",
    password: "",
    account: "",

    portOptions: [],
    loginTypeOptions: []
  };

  target.toScala = () => target;
  return generateJsWriter(target);
};

const getInitialMessageForm = () => {
  const initialMessage = {
    initialMessageAudio: {
      title: "Initial message",
      audioFile: null
    }
  };

  initialMessage.toScala = () => initialMessage;
  return generateJsWriter(initialMessage);
};

const getOtherOptionsForm = () => {
  const otherOptions = {
    messageAudio: {
      title: "Message",
      audioFile: null
    },
    toPlaybackKey: "1",
    toAcceptKey: "2",
    toRerecordKey: "3",
    toRepeatKey: "4"
  };

  otherOptions.toScala = () => otherOptions;
  return generateJsWriter(otherOptions);
};

export const recordVoiceNodeFormInfo = {
  getRecordingForm,
  getTargetForm,
  getInitialMessageForm,
  getOtherOptionsForm
};
