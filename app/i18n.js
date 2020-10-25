import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// english language pack
import enAccounts from "locales/en/accounts.json";
import enAudio from "locales/en/audio.json";
import enCallcare from "locales/en/callcare.json";
import enCelltypes from "locales/en/celltypes.json";
import enCommon from "locales/en/common.json";
import enFilters from "locales/en/filters.json";
import enGroups from "locales/en/groups.json";
import enHomepage from "locales/en/homepage.json";
import enLogin from "locales/en/login.json";
import enNumbers from "locales/en/numbers.json";
import enSecurity from "locales/en/security.json";
import enServices from "locales/en/services.json";
import enReport from "locales/en/report.json";
import enSnackbar from "locales/en/snackbar.json";
import enUsers from "locales/en/users.json";
import enServiceDesigner from "locales/en/servicedesigner.json";

// test language transformer
// (applied over english pack to create a "asterisk" language)
import { asteriskize } from "locales/test/asterisk";

const moment = require("moment");

i18n.use(LanguageDetector).init({
  // we init with resources
  resources: {
    en: {
      accounts: enAccounts,
      audio: enAudio,
      callcare: enCallcare,
      celltypes: enCelltypes,
      common: enCommon,
      filters: enFilters,
      groups: enGroups,
      homepage: enHomepage,
      login: enLogin,
      numbers: enNumbers,
      security: enSecurity,
      services: enServices,
      report: enReport,
      snackbar: enSnackbar,
      users: enUsers,
      servicedesigner: enServiceDesigner
    },
    asterisk: {
      accounts: asteriskize(enAccounts),
      audio: asteriskize(enAudio),
      callcare: asteriskize(enCallcare),
      celltypes: asteriskize(enCelltypes),
      common: asteriskize(enCommon),
      filters: asteriskize(enFilters),
      groups: asteriskize(enGroups),
      homepage: asteriskize(enHomepage),
      login: asteriskize(enLogin),
      numbers: asteriskize(enNumbers),
      security: asteriskize(enSecurity),
      services: asteriskize(enServices),
      report: asteriskize(enReport),
      snackbar: asteriskize(enSnackbar),
      users: asteriskize(enUsers),
      servicedesigner: asteriskize(enServiceDesigner)
    }
  },

  fallbackLng: "en",
  debug: true,

  // have a common namespace used around the full app
  ns: ["common"],
  defaultNS: "common",
  fallbackNS: "common",

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ",",
    format: function(value, format, lng) {
      if (format === "uppercase") return value.toUpperCase();
      if (value instanceof Date) return moment(value).format(format);
      return value;
    }
  },

  react: {
    wait: true
  }
});

export default i18n;
