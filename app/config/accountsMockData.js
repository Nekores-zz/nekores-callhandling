export const protoAccountApply = (_acc = {}) => {
  _acc.fieldAccId = "accId";
  _acc.fieldName = "name";
  _acc.fieldDomain = "domainCode";
  _acc.fieldLastUpdatedUser = "lastUpdatedUser";
  _acc.fieldLastUpdatedDate = "lastUpdatedDate";
  _acc.fieldStatus = "status";
  _acc.fieldIsFavorite = "isFavorite";
  _acc.fieldBadage = "badage";

  // setId: () => {},  could it be edited?
  _acc.setName = () => {};
  _acc.setDomain = () => {};
  // setLastUpdatedUser: () => {}, could it be edited?
  // setLastUpdatedDate: () => {}, could it be edited?
  _acc.setStatus = () => {};
  _acc.setIsFavorite = () => {};
  _acc.toScala = () => _acc;

  return _acc;
};

export const protoAccount = protoAccountApply();

export const activateAccountSetters = _acc => {
  _acc.setName = name => {
    _acc.name = name;
    return _acc;
  };
  _acc.setDomainCode = domainCode => {
    _acc.domainCode = domainCode;
    return _acc;
  };
  _acc.setStatus = status => {
    _acc.status = status;
    return _acc;
  };
  _acc.setFavoriteUsers = x => {
    _acc.favoriteUsers = x;
    return _acc;
  };
  return _acc;
};

export const initialAccountStatusOptions = ["Incomplete"];

export const activeAccountStatusOptions = ["Active", "Suspended", "Closed"];

export const accounts = [
  protoAccountApply({
    id: "80134",
    name: "Account 1",
    domainCode: "accountdomain.com",
    lastUpdatedUser: "John Doe",
    lastUpdatedDate: "22 Mar, 2018",
    status: "Active",
    isFavorite: true,
    accountType: "reseller"
  }),
  protoAccountApply({
    id: "80142",
    name: "Account 2",
    domainCode: "accountdomain.com",
    lastUpdatedUser: "Anthony Johnson",
    lastUpdatedDate: "19 Mar, 2018",
    status: "Active",
    isFavorite: true,
    accountType: null
  }),
  protoAccountApply({
    id: "80156",
    name: "Account 3",
    domainCode: "accountdomain.com",
    lastUpdatedUser: "Georgina Wesley",
    lastUpdatedDate: "5 Mar, 2018",
    status: "Suspended",
    isFavorite: true,
    accountType: "seller"
  }),
  protoAccountApply({
    id: "80161",
    name: "Account 4",
    domainCode: "accountdomain.com",
    lastUpdatedUser: "Jack Smith",
    lastUpdatedDate: "5 Mar, 2018",
    status: "Active",
    isFavorite: true,
    accountType: null
  }),
  protoAccountApply({
    id: "81134",
    name: "Account 5",
    domainCode: "accountdomain.com",
    lastUpdatedUser: "John Doe",
    lastUpdatedDate: "25 Feb, 2018",
    status: "Active",
    isFavorite: false,
    accountType: null
  }),
  protoAccountApply({
    id: "81142",
    name: "Account 6",
    domainCode: "accountdomain.com",
    lastUpdatedUser: "Anthony Johnson",
    lastUpdatedDate: "17 Feb, 2018",
    status: "Active",
    isFavorite: false,
    accountType: null
  }),
  protoAccountApply({
    id: "81156",
    name: "Account 7",
    domainCode: "accountdomain.com",
    lastUpdatedUser: "Georgina Wesley",
    lastUpdatedDate: "29 Jan, 2018",
    status: "Closed",
    isFavorite: false,
    accountType: null
  }),
  protoAccountApply({
    id: "81161",
    name: "Account 8",
    domainCode: "accountdomain.com",
    lastUpdatedUser: "Jack Smith",
    lastUpdatedDate: "18 Jan, 2018",
    status: "Active",
    isFavorite: false,
    accountType: null
  }),
  protoAccountApply({
    id: "81162",
    name: "Account 9",
    domainCode: "accountdomain.com",
    lastUpdatedUser: "Jack Smith",
    lastUpdatedDate: "2 Jan, 2018",
    status: "Incomplete",
    isFavorite: false,
    accountType: null
  })
];


export const country = function() {
  const _country = {
    id: "",
    name: "",
    fieldId: "id",
    fieldName: "name"
  };
  _country.setId = function(id) {
    _country.id = id;
    return _country;
  };
  _country.setName = function(name) {
    _country.name = name;
    return _country;
  };
  _country.toScala = function() {
    return _country;
  };
  return _country;
};

export const address = function() {
  const _address = {
    addressLine1: "",
    addressLine2: "",
    city: "",
    postCode: "",
    county: "",
    country: country(),
    fieldAddressLine1: "addressLine1",
    fieldAddressLine2: "addressLine2",
    fieldCity: "city",
    fieldPostCode: "postCode",
    fieldCounty: "county",
    fieldCountry: "country"
  };
  _address.setAddressLine1 = function(addressLine1) {
    _address.addressLine1 = addressLine1;
    return _address;
  };
  _address.setAddressLine2 = function(addressLine2) {
    _address.addressLine2 = addressLine2;
    return _address;
  };
  _address.setCity = function(city) {
    _address.city = city;
    return _address;
  };
  _address.setPostCode = function(postCode) {
    _address.postCode = postCode;
    return _address;
  };
  _address.setCounty = function(county) {
    _address.county = county;
    return _address;
  };
  _address.setCountry = function(country) {
    _address.country = country;
    return _address;
  };
  _address.toScala = function() {
    return _address;
  };

  return _address;
};

const invitedUser = function() {
  const user = { firstName: "John", lastName: "Doe", email: "j.doe@nhs.com" };
  user.toScala = function() {
    return user;
  };

  return user;
};

export const accountUsers = [invitedUser()];

export const initialUser = () => {
  const user = {
    firstName: "",
    lastName: "",
    email: "",
    fieldFirstName: "firstName",
    fieldLastName: "lastName",
    fieldEmail: "email"
  };

  user.setFirstName = firstName => {
    user.firstName = firstName;
    return user;
  };

  user.setLastName = lastName => {
    user.lastName = lastName;
    return user;
  };

  user.setEmail = email => {
    user.email = email;
    return user;
  };

  user.toScala = () => user;

  return user;
};

const getAccountTypes = () => {
  const types = [
    {
      value: 0,
      name: "Normal"
    },
    {
      value: 1,
      name: "Group"
    },
    {
      value: 2,
      name: "Reseller"
    }
  ];

  types.forEach(a => (a.get = value => types.find(type => type.value === value)));

  return types;
};

export const accountTypes = getAccountTypes();

export const accountStatus = [
  {
    value: 0,
    name: "Incomplete"
  },
  {
    value: 1,
    name: "Active"
  },
  {
    value: 2,
    name: "Archived"
  },
  {
    value: 3,
    name: "Suspended"
  }
];

export const getMinimalAccInfo = () => {
  const defaultAccountType = accountTypes[0];
  const detaulsAccountStatus = accountStatus[0];
  const accInfo = {
    accountType: accountTypes[0],
    status: {
      value: detaulsAccountStatus.value,
      name: detaulsAccountStatus.name,
      get: num => accountStatus.find(status => status.value === num)
    },
    domainCode: "",
    companyName: "",
    firstName: "",
    lastName: "",
    email: "",
    workNo: "",

    fieldAccountType: "accountType",
    fieldDomainCode: "domainCode",
    fieldCompanyName: "companyName",
    fieldFirstName: "firstName",
    fieldLastName: "lastName",
    fieldEmail: "email",
    fieldWorkNo: "workNo"
  };

  accInfo.setAccountType = accountType => {
    accInfo.accountType = accountType;
    return accInfo;
  };

  accInfo.setStatus = status => {
    accInfo.status = status;
    return accInfo;
  };

  accInfo.setDomainCode = domainCode => {
    accInfo.domainCode = domainCode;
    return accInfo;
  };

  accInfo.setCompanyName = companyName => {
    accInfo.companyName = companyName;
    return accInfo;
  };

  accInfo.setFirstName = firstName => {
    accInfo.firstName = firstName;
    return accInfo;
  };

  accInfo.setLastName = lastName => {
    accInfo.lastName = lastName;
    return accInfo;
  };

  accInfo.setEmail = email => {
    accInfo.email = email;
    return accInfo;
  };

  accInfo.setWorkNo = workNo => {
    accInfo.workNo = workNo;
    return accInfo;
  };

  accInfo.toScala = () => accInfo;

  return accInfo;
};

export const minimalAccInfo = getMinimalAccInfo();

/***It is returning function so you must call initialConfig() for getting an object*/
export const initialConfig = function() {
  const defaultAccountType = accountTypes[0];
  const config = {
    accountType: {
      value: defaultAccountType.value,
      name: defaultAccountType.name,
      get: num => accountTypes.find(accountType => accountType.value === num)
    },
    status: "Active", // purpose: only for testing administer
    domainCode: "",
    previousDomainCode: "",
    fieldAccountType: "accountType",
    fieldDomainCode: "domainCode",
    fieldStatus: "status",
    fieldPreviousDomainCode: "previousDomainCode"
  };

  config.setAccountType = function(accountType) {
    config.accountType = accountType;
    config.accountType.get = num => accountTypes.find(accountType => accountType.value === num);
    return config;
  };

  config.setDomainCode = function(domainCode) {
    config.domainCode = domainCode;
    return config;
  };

  config.setPreviousDomainCode = function(previousDomainCode) {
    config.previousDomainCode = previousDomainCode;
    return config;
  };

  config.setStatus = function(status) {
    // purpose: only for testing administer
    config.status = status;
    return config;
  };

  config.toScala = function() {
    return config;
  };

  return config;
};

/***It is returning function so you must call initialAccountDetails() for getting an object*/
export const initialAccountDetails = function() {
  const accountDetails = {
    companyName: "",
    phoneNo: "",
    referenceId: "",
    registrationNo: "",
    website: "",
    charityNo: "",
    address: address(),
    fieldCompanyName: "companyName",
    fieldPhoneNo: "phoneNo",
    fieldReferenceId: "referenceId",
    fieldRegistrationNo: "registrationNo",
    fieldWebsite: "website",
    fieldCharityNo: "charityNo",
    fieldAddress: "address"
  };

  accountDetails.setCharityNo = function(charityNo) {
    accountDetails.charityNo = charityNo;
    return accountDetails;
  };

  accountDetails.setReferenceId = function(referenceId) {
    accountDetails.referenceId = referenceId;
    return accountDetails;
  };

  accountDetails.setAddress = function(address) {
    accountDetails.address = address;
    return accountDetails;
  };

  accountDetails.setWebsite = function(website) {
    accountDetails.website = website;
    return accountDetails;
  };

  accountDetails.setRegistrationNo = function(registrationNo) {
    accountDetails.registrationNo = registrationNo;
    return accountDetails;
  };

  accountDetails.setPhoneNo = function(phoneNo) {
    accountDetails.phoneNo = phoneNo;
    return accountDetails;
  };

  accountDetails.setCompanyName = function(companyName) {
    accountDetails.companyName = companyName;
    return accountDetails;
  };

  accountDetails.toScala = function() {
    return accountDetails;
  };

  return accountDetails;
};

/***It is returning function so you must call initialAccountHolder() for getting an object*/
export const initialAccountHolder = function() {
  const accountHolder = {
    firstName: "",
    lastName: "",
    email: "",
    workNo: "",
    mobileNo: "",
    isSuperUser: false,
    fieldFirstName: "firstName",
    fieldLastName: "lastName",
    fieldEmail: "email",
    fieldWorkNo: "workNo",
    fieldMobileNo: "mobileNo",
    fieldIsSuperUser: "isSuperUser"
  };

  accountHolder.setFirstName = function(firstName) {
    accountHolder.firstName = firstName;
    return accountHolder;
  };

  accountHolder.setLastName = function(lastName) {
    accountHolder.lastName = lastName;
    return accountHolder;
  };

  accountHolder.setEmail = function(email) {
    accountHolder.email = email;
    return accountHolder;
  };

  accountHolder.setWorkNo = function(workNo) {
    accountHolder.workNo = workNo;
    return accountHolder;
  };

  accountHolder.setMobileNo = function(mobileNo) {
    accountHolder.mobileNo = mobileNo;
    return accountHolder;
  };

  accountHolder.setIsSuperUser = function(isSuperUser) {
    accountHolder.isSuperUser = isSuperUser;
    return accountHolder;
  };

  accountHolder.toScala = function() {
    return accountHolder;
  };

  return accountHolder;
};

/***It is returning function so you must call initialCostCenter() for getting an object*/
export const initialCostCenter = function() {
  const costCenter = {
    name: "",
    referenceId: "",
    contactName: "",
    address: address(),
    phoneNo: "",
    email: "",
    vat: "",
    fieldName: "name",
    fieldReferenceId: "referenceId",
    fieldContactName: "contactName",
    fieldAddress: "address",
    fieldPhoneNo: "phoneNo",
    fieldEmail: "email",
    fieldVat: "vat"
  };

  costCenter.setEmail = function(email) {
    costCenter.email = email;
    return costCenter;
  };

  costCenter.setVat = function(vat) {
    costCenter.vat = vat;
    return costCenter;
  };

  costCenter.setContactName = function(contactName) {
    costCenter.contactName = contactName;
    return costCenter;
  };

  costCenter.setReferenceId = function(referenceId) {
    costCenter.referenceId = referenceId;
    return costCenter;
  };

  costCenter.setAddress = function(address) {
    costCenter.address = address;
    return costCenter;
  };

  costCenter.setName = function(name) {
    costCenter.name = name;
    return costCenter;
  };

  costCenter.setPhoneNo = function(phoneNo) {
    costCenter.phoneNo = phoneNo;
    return costCenter;
  };

  costCenter.toScala = function() {
    return costCenter;
  };

  return costCenter;
};

export const passwordPolicyRules = (() => {
  const passwordPolicy = {
    ensureMinCharsOptions: [4, 5, 6, 8, 10, 12],
    ensureMaxCharsOptions: [4, 5, 6, 8, 10, 12, 16, 20],
    ensureTypeOptions: [1], // will be redefined when ensureMinChars changes
    enforceMinimumAgeOptions: [1, 3, 5, 7, 15],
    enforceMaximumAgeOptions: [30, 60, 90, 180, 365],
    enforceHistoryOptions: [1, 2, 3, 4, 5],
    enforceSpecialCharsNumberOptions: [1, 2],
    enforceSpecialCharsOptions: "!@£$%^&*", //[1, 2]

    ensureMinCharsMinLimit: 1,
    ensureMinCharsMaxLimit: 99,
    ensureMaxCharsMinLimit: 1,
    ensureMaxCharsMaxLimit: 99,
    ensureTypeMinLimit: 1,
    ensureTypeMaxLimit: 99,
    ensureLowercaseMinLimit: 1,
    ensureLowercaseMaxLimit: 99,
    ensureUppercaseMinLimit: 1,
    ensureUppercaseMaxLimit: 99,
    ensureNumbersMinLimit: 1,
    ensureNumbersMaxLimit: 99,
    ensureSpecialNumberMinLimit: 1,
    ensureSpecialNumberMaxLimit: 99,
    enforceMinimumAgeInDaysMinLimit: 1,
    enforceMinimumAgeInDaysMaxLimit: 99,
    enforceMaximumAgeInDaysMinLimit: 1,
    enforceMaximumAgeInDaysMaxLimit: 365,
    enforceHistoryMinLimit: 1,
    enforceHistoryMaxLimit: 5
  };

  return passwordPolicy;
})();

export const validatePasswordPolicy = () => {
  const _validatePasswordPolicy = {};

  _validatePasswordPolicy.validateRequired = (fieldName, value) => {
    // if (value === undefined || value === null || value === '')
    //   return {key:'validateRequired'};
    return true;
  };

  _validatePasswordPolicy.validateMinValue = (fieldName, value, minValue) => {
    if (Number.parseInt(value) < minValue)
      // return '' + fieldName + ' must be greater than ' + (minValue - 1);
      return { key: "validateMinValue", data: { fieldName, minValue: minValue - 1 } };
    return true;
  };

  _validatePasswordPolicy.validateMaxValue = (fieldName, value, maxValue) => {
    if (Number.parseInt(value) > maxValue)
      // return '' + fieldName + ' must be less than ' + (maxValue + 1);
      return { key: "validateMaxValue", data: { fieldName, maxValue: maxValue + 1 } };
    return true;
  };

  _validatePasswordPolicy.validateEnsureMinChars = ensureMinChars => {
    {
      const result = _validatePasswordPolicy.validateRequired("Min Characters", ensureMinChars);
      if (result != true) return result;
    }
    {
      const result = _validatePasswordPolicy.validateMinValue(
        "Min Characters",
        ensureMinChars,
        passwordPolicyRules.ensureMinCharsMinLimit
      );
      if (result != true) return result;
    }
    {
      const result = _validatePasswordPolicy.validateMaxValue(
        "Min Characters",
        ensureMinChars,
        passwordPolicyRules.ensureMinCharsMaxLimit
      );
      if (result != true) return result;
    }

    return true;
  };

  _validatePasswordPolicy.validateEnsureMaxChars = (ensureMaxChars, ensureMinChars) => {
    {
      const result = _validatePasswordPolicy.validateRequired("Max Characters", ensureMaxChars);
      if (result != true) return result;
    }
    {
      const result = _validatePasswordPolicy.validateMinValue(
        "Max Characters",
        ensureMaxChars,
        passwordPolicyRules.ensureMaxCharsMinLimit
      );
      if (result != true) return result;
    }
    {
      const result = _validatePasswordPolicy.validateMaxValue(
        "Max Characters",
        ensureMaxChars,
        passwordPolicyRules.ensureMaxCharsMaxLimit
      );
      if (result != true) return result;
    }

    if (Number.parseInt(ensureMaxChars) < Number.parseInt(ensureMinChars)) {
      return { key: "validateMaxVsMin" };
    }

    return true;
  };

  _validatePasswordPolicy.validateEnsureLowercase = ensureLowercase => {
    {
      const result = _validatePasswordPolicy.validateRequired("Lowercase", ensureLowercase);
      if (result != true) return result;
    }
    {
      const result = _validatePasswordPolicy.validateMinValue(
        "Lowercase",
        ensureLowercase,
        passwordPolicyRules.ensureLowercaseMinLimit
      );
      if (result != true) return result;
    }
    {
      const result = _validatePasswordPolicy.validateMaxValue(
        "Lowercase",
        ensureLowercase,
        passwordPolicyRules.ensureLowercaseMaxLimit
      );
      if (result != true) return result;
    }

    return true;
  };

  _validatePasswordPolicy.validateEnsureUppercase = ensureUppercase => {
    {
      const result = _validatePasswordPolicy.validateRequired("Uppercase", ensureUppercase);
      if (result != true) return result;
    }
    {
      const result = _validatePasswordPolicy.validateMinValue(
        "Uppercase",
        ensureUppercase,
        passwordPolicyRules.ensureUppercaseMinLimit
      );
      if (result != true) return result;
    }
    {
      const result = _validatePasswordPolicy.validateMaxValue(
        "Uppercase",
        ensureUppercase,
        passwordPolicyRules.ensureUppercaseMaxLimit
      );
      if (result != true) return result;
    }

    return true;
  };

  _validatePasswordPolicy.validateEnsureNumbers = ensureNumbers => {
    {
      const result = _validatePasswordPolicy.validateRequired("Numbers", ensureNumbers);
      if (result != true) return result;
    }
    {
      const result = _validatePasswordPolicy.validateMinValue(
        "Numbers",
        ensureNumbers,
        passwordPolicyRules.ensureNumbersMinLimit
      );
      if (result != true) return result;
    }
    {
      const result = _validatePasswordPolicy.validateMaxValue(
        "Numbers",
        ensureNumbers,
        passwordPolicyRules.ensureNumbersMaxLimit
      );
      if (result != true) return result;
    }

    return true;
  };

  _validatePasswordPolicy.validateEnsureSpecialNumber = ensureSpecialNumber => {
    {
      const result = _validatePasswordPolicy.validateRequired(
        "Special Character Number",
        ensureSpecialNumber
      );
      if (result != true) return result;
    }
    {
      const result = _validatePasswordPolicy.validateMinValue(
        "Special Character Number",
        ensureSpecialNumber,
        passwordPolicyRules.ensureSpecialNumberMinLimit
      );
      if (result != true) return result;
    }
    {
      const result = _validatePasswordPolicy.validateMaxValue(
        "Special Character Number",
        ensureSpecialNumber,
        passwordPolicyRules.ensureSpecialNumberMaxLimit
      );
      if (result != true) return result;
    }

    return true;
  };

  _validatePasswordPolicy.validateEnsureSpecial = (ensureSpecial, ensureSpecialNumber) => {
    {
      const result = _validatePasswordPolicy.validateRequired("Special Characters", ensureSpecial);
      if (result != true) return result;
    }
    if (ensureSpecial.length > ensureSpecialNumber) {
      // return 'Special Characters must be less than ' + ensureSpecialNumber + ' character(s)';
      return { key: "validateSpecialMax", data: { ensureSpecialNumber } };
    }
    for (const special of ensureSpecial) {
      if (passwordPolicyRules.enforceSpecialCharsOptions.indexOf(special) === -1) {
        // return 'Special Characters must be in "' + passwordPolicyRules.enforceSpecialCharsOptions + '"';
        return {
          key: "validateSpecialRange",
          data: { enforceSpecialCharsOptions: passwordPolicyRules.enforceSpecialCharsOptions }
        };
      }
    }
    return true;
  };

  _validatePasswordPolicy.validateEnforceMinimumAgeInDays = enforceMinimumAgeInDays => {
    {
      const result = _validatePasswordPolicy.validateRequired(
        "Minimum Age",
        enforceMinimumAgeInDays
      );
      if (result != true) return result;
    }
    {
      const result = _validatePasswordPolicy.validateMinValue(
        "Minimum Age",
        enforceMinimumAgeInDays,
        passwordPolicyRules.enforceMinimumAgeInDaysMinLimit
      );
      if (result != true) return result;
    }
    {
      const result = _validatePasswordPolicy.validateMaxValue(
        "Minimum Age",
        enforceMinimumAgeInDays,
        passwordPolicyRules.enforceMinimumAgeInDaysMaxLimit
      );
      if (result != true) return result;
    }

    return true;
  };

  _validatePasswordPolicy.validateEnforceMaximumAgeInDays = (
    enforceMinimumAgeInDays,
    enforceMaximumAgeInDays
  ) => {
    {
      const result = _validatePasswordPolicy.validateRequired(
        "Maximum Age",
        enforceMaximumAgeInDays
      );
      if (result != true) return result;
    }
    {
      if (Number.parseInt(enforceMinimumAgeInDays) > Number.parseInt(enforceMaximumAgeInDays)) {
        // return 'Maximum Age must be greater than Minimum Age';
        return { key: "validateMaxAgeVsMinAge" };
      }
    }
    {
      const result = _validatePasswordPolicy.validateMinValue(
        "Maximum Age",
        enforceMaximumAgeInDays,
        passwordPolicyRules.enforceMaximumAgeInDaysMinLimit
      );
      if (result != true) return result;
    }
    {
      const result = _validatePasswordPolicy.validateMaxValue(
        "Maximum Age",
        enforceMaximumAgeInDays,
        passwordPolicyRules.enforceMaximumAgeInDaysMaxLimit
      );
      if (result != true) return result;
    }

    return true;
  };

  _validatePasswordPolicy.validateEnforceHistory = enforceHistory => {
    {
      const result = _validatePasswordPolicy.validateRequired("Password history", enforceHistory);
      if (result != true) return result;
    }
    {
      const result = _validatePasswordPolicy.validateMinValue(
        "Password history",
        enforceHistory,
        passwordPolicyRules.enforceHistoryMinLimit
      );
      if (result != true) return result;
    }
    {
      const result = _validatePasswordPolicy.validateMaxValue(
        "Password history",
        enforceHistory,
        passwordPolicyRules.enforceHistoryMaxLimit
      );
      if (result != true) return result;
    }

    return true;
  };

  _validatePasswordPolicy.validate = content => {
    const formErrors = {};

    formErrors[content.fieldEnsureMinChars] = _validatePasswordPolicy.validateEnsureMinChars(
      content.ensureMinChars
    );
    formErrors[content.fieldEnsureMaxChars] = _validatePasswordPolicy.validateEnsureMaxChars(
      content.ensureMaxChars,
      content.ensureMinChars
    );
    formErrors[content.fieldEnsureLowercase] = _validatePasswordPolicy.validateEnsureLowercase(
      content.ensureLowercase
    );
    formErrors[content.fieldEnsureUppercase] = _validatePasswordPolicy.validateEnsureUppercase(
      content.ensureUppercase
    );
    formErrors[content.fieldEnsureNumbers] = _validatePasswordPolicy.validateEnsureNumbers(
      content.ensureNumbers
    );
    formErrors[
      content.fieldEnsureSpecialNumber
    ] = _validatePasswordPolicy.validateEnsureSpecialNumber(content.ensureSpecialNumber);
    formErrors[content.fieldEnsureSpecial] = _validatePasswordPolicy.validateEnsureSpecial(
      content.ensureSpecial,
      content.ensureSpecialNumber
    );

    if (formErrors[content.fieldEnsureMinChars] == true) {
      if (
        content.ensureMinChars <
        content.ensureLowercase +
          content.ensureUppercase +
          content.ensureNumbers +
          content.ensureSpecialNumber
      ) {
        formErrors[content.fieldEnsureMinChars] = { key: "validateSumExceedMin" };
      }
    }

    formErrors[
      content.fieldEnforceMinimumAgeInDays
    ] = _validatePasswordPolicy.validateEnforceMinimumAgeInDays(content.enforceMinimumAgeInDays);
    formErrors[
      content.fieldEnforceMaximumAgeInDays
    ] = _validatePasswordPolicy.validateEnforceMaximumAgeInDays(
      content.enforceMinimumAgeInDays,
      content.enforceMaximumAgeInDays
    );
    formErrors[content.fieldEnforceHistory] = _validatePasswordPolicy.validateEnforceHistory(
      content.enforceHistory
    );

    for (const i in formErrors) {
      if (formErrors[i] === true) delete formErrors[i];
    }
    return formErrors;
  };

  return _validatePasswordPolicy;
};

export const regexOption = () => {
  const obj = {
    regex: "",
    description: "",
    fieldRegex: "regex",
    fieldDescription: "description"
  };
  obj.setRegex = value => {
    obj.regex = value;
    return obj;
  };

  obj.setDescription = value => {
    obj.description = value;
    return obj;
  };

  obj.toScala = () => obj;
  return obj;
};

export const passwordPolicy = (() => {
  const passwordPolicy = {
    ensureMinChars: 5, // set 0 to disable
    //ensureMinCharsOptions: [4, 5, 6, 8, 10, 12],
    ensureMaxChars: 20, // set 0 to disable
    //ensureMaxCharsOptions: [4, 5, 6, 8, 10, 12, 16, 20],
    ensureLowercase: 1, // set 0 to disable
    // ensureLowercaseOptions // dynamic
    ensureUppercase: 1, // set 0 to disable
    // ensureUppercaseOptions // dynamic
    ensureNumbers: 1, // set 0 to disable
    // ensureNumbersOptions // dynamic
    ensureSpecial: 2, // set 0 to disable
    // ensureSpecialNumberOptions // dynamic
    specialChars: "!@", // set 0 to disable
    // ensureSpecialOptions // dynamic

    meetComplexity: true,
    meetComplexityConsecutiveNumbers: true,
    meetComplexityFirstName: true,
    meetComplexityLastName: true,
    meetComplexityUsername: true,

    enforceMinimumAgeInDays: 1, // set 0 to disable
    //enforceMinimumAgeOptions: [1, 3, 5, 7, 15],
    enforceMaximumAgeInDays: 365, // set 0 to disable
    //enforceMaximumAgeOptions: [30, 60, 90, 180, 365],

    enforceHistory: 2, // set 0 to disable
    //enforceHistoryOptions: [1, 2, 3, 4, 5],

    regularExpressions: []
  };

  return passwordPolicy;
})();

export const initialPasswordPolicy = () => {
  const passwordPolicy = {
    ensureMinChars: 5, // set 0 to disable
    //ensureMinCharsOptions: [4, 5, 6, 8, 10, 12],
    ensureMaxChars: 20, // set 0 to disable
    //ensureMaxCharsOptions: [4, 5, 6, 8, 10, 12, 16, 20],
    ensureLowercase: 1, // set 0 to disable
    // ensureLowercaseOptions // dynamic
    ensureUppercase: 1, // set 0 to disable
    // ensureUppercaseOptions // dynamic
    ensureNumbers: 1, // set 0 to disable
    // ensureNumbersOptions // dynamic
    ensureSpecial: 2, // set 0 to disable
    // ensureSpecialNumberOptions // dynamic
    specialChars: "!@", // set 0 to disable
    // ensureSpecialOptions // dynamic

    meetComplexity: true,
    meetComplexityConsecutiveNumbers: true,
    meetComplexityFirstName: true,
    meetComplexityLastName: true,
    meetComplexityUsername: true,

    enforceMinimumAgeInDays: 1, // set 0 to disable
    //enforceMinimumAgeOptions: [1, 3, 5, 7, 15],
    enforceMaximumAgeInDays: 365, // set 0 to disable
    //enforceMaximumAgeOptions: [30, 60, 90, 180, 365],

    enforceHistory: 2, // set 0 to disable
    //enforceHistoryOptions: [1, 2, 3, 4, 5],

    regularExpressions: [],
    showAdvanced: false,

    fieldEnsureMinChars: "ensureMinChars",
    fieldEnsureMaxChars: "ensureMaxChars",
    fieldEnsureLowercase: "ensureLowercase",
    fieldEnsureUppercase: "ensureUppercase",
    fieldEnsureNumbers: "ensureNumbers",
    fieldEnsureSpecial: "ensureSpecial",
    fieldSpecialChars: "specialChars",
    fieldMeetComplexity: "meetComplexity",
    fieldMeetComplexityConsecutiveNumbers: "meetComplexityConsecutiveNumbers",
    fieldMeetComplexityFirstName: "meetComplexityFirstName",
    fieldMeetComplexityLastName: "meetComplexityLastName",
    fieldMeetComplexityUsername: "meetComplexityUsername",
    fieldEnforceMinimumAgeInDays: "enforceMinimumAgeInDays",
    fieldEnforceMaximumAgeInDays: "enforceMaximumAgeInDays",
    fieldEnforceHistory: "enforceHistory",
    fieldRegularExpressions: "regularExpressions"
  };

  passwordPolicy.setEnsureMinChars = value => {
    if (value === undefined || value === null || value === "") {
      passwordPolicy.ensureMinChars = "";
      return passwordPolicy;
    }
    value = Number.parseInt(value);
    passwordPolicy.ensureMinChars = value;
    return passwordPolicy;
  };

  passwordPolicy.setEnsureMaxChars = value => {
    if (value === undefined || value === null || value === "") {
      passwordPolicy.ensureMaxChars = "";
      return passwordPolicy;
    }
    value = Number.parseInt(value);
    passwordPolicy.ensureMaxChars = value;
    if (value !== 0 && value < passwordPolicy.ensureMinChars)
      passwordPolicy.setEnsureMinChars(value);
    return passwordPolicy;
  };

  passwordPolicy.setEnsureLowercase = value => {
    if (value === undefined || value === null || value === "") {
      passwordPolicy.ensureLowercase = "";
      return passwordPolicy;
    }
    value = Number.parseInt(value);
    passwordPolicy.ensureLowercase = value;
    return passwordPolicy;
  };

  passwordPolicy.setEnsureUppercase = value => {
    if (value === undefined || value === null || value === "") {
      passwordPolicy.ensureUppercase = "";
      return passwordPolicy;
    }
    value = Number.parseInt(value);
    passwordPolicy.ensureUppercase = value;
    return passwordPolicy;
  };

  passwordPolicy.setEnsureNumbers = value => {
    if (value === undefined || value === null || value === "") {
      passwordPolicy.ensureNumbers = "";
      return passwordPolicy;
    }
    value = Number.parseInt(value);
    passwordPolicy.ensureNumbers = value;
    return passwordPolicy;
  };

  passwordPolicy.setEnsureSpecial = value => {
    if (value === undefined || value === null || value === "") {
      passwordPolicy.ensureSpecial = "";
      return passwordPolicy;
    }
    value = Number.parseInt(value);
    passwordPolicy.ensureSpecial = value;
    return passwordPolicy;
  };

  passwordPolicy.setSpecialChars = value => {
    if (value === undefined || value === null || value === "") {
      passwordPolicy.specialChars = "";
      return passwordPolicy;
    }
    passwordPolicy.specialChars = value.substr(
      0,
      value.length > passwordPolicy.ensureSpecial ? passwordPolicy.ensureSpecial : value.length
    );
    return passwordPolicy;
  };

  passwordPolicy.setMeetComplexity = value => {
    passwordPolicy.meetComplexity = value;
    return passwordPolicy;
  };

  passwordPolicy.setMeetComplexityConsecutiveNumbers = value => {
    passwordPolicy.meetComplexityConsecutiveNumbers = value;
    return passwordPolicy;
  };

  passwordPolicy.setMeetComplexityFirstName = value => {
    passwordPolicy.meetComplexityFirstName = value;
    return passwordPolicy;
  };

  passwordPolicy.setMeetComplexityLastName = value => {
    passwordPolicy.meetComplexityLastName = value;
    return passwordPolicy;
  };

  passwordPolicy.setMeetComplexityUsername = value => {
    passwordPolicy.meetComplexityUsername = value;
    return passwordPolicy;
  };

  passwordPolicy.setEnforceMinimumAgeInDays = value => {
    passwordPolicy.enforceMinimumAgeInDays = value;
    return passwordPolicy;
  };

  passwordPolicy.setEnforceMaximumAgeInDays = value => {
    passwordPolicy.enforceMaximumAgeInDays = value;
    return passwordPolicy;
  };

  passwordPolicy.setEnforceHistory = value => {
    passwordPolicy.enforceHistory = value;
    return passwordPolicy;
  };

  passwordPolicy.setRegularExpressions = value => {
    passwordPolicy.regularExpressions = value;
    return passwordPolicy;
  };

  passwordPolicy.setRegularExpressionsIndex = (index, regexOption) => {
    passwordPolicy.regularExpressions[index] = regexOption;
    return passwordPolicy;
  };

  passwordPolicy.addRegularExpressions = value => {
    passwordPolicy.regularExpressions.push(value);
    return passwordPolicy;
  };

  passwordPolicy.removeRegularExpressions = index => {
    if (passwordPolicy.regularExpressions.length > 1)
      passwordPolicy.regularExpressions.splice(index, 1);
    else passwordPolicy.regularExpressions = [];
    return passwordPolicy;
  };

  passwordPolicy.toScala = () => passwordPolicy;

  return passwordPolicy;
};
