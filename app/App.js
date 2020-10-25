import React, { Component } from "react";
import { JssProvider } from "react-jss";
import { MuiThemeProvider } from "@material-ui/core";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import Main from "./components/Main.jsx";
import theme from "./config/theme";

window.ScalaDate = {
  tsToDate: ts => new Date((ts.seconds * 1000000000 + ts.nanos) / 1000000),
  dateToTs: date => {
    const epoch = date.getTime();
    return { seconds: Math.floor(epoch / 1000), nanos: (epoch % 1000) * 1000000 };
  },
  tsToString: ts => ts.seconds + "," + ts.nanos,
  stringToTs: string => {
    const tsArray = string.split(",");
    return { seconds: Number(tsArray[0]), nanos: Number(tsArray[1]) };
  },
  timeStampToJSDate: ts => new Date((ts.seconds * 1000000000 + ts.nanos) / 1000000)
};

class App extends Component {
  render() {
    return (
      <I18nextProvider
        i18n={i18n}
        //initialLanguage="asterisk"
        initialLanguage="en"
      >
        <MuiThemeProvider theme={theme}>
          <JssProvider classNamePrefix="hubbub-">
            <Main />
          </JssProvider>
        </MuiThemeProvider>
      </I18nextProvider>
    );
  }
}

export default App;
