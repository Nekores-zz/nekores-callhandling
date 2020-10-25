/**
 * Created by Andrzej on 02.02.2018.
 */
import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

class MainApp extends Component {
  render() {
    return <CssBaseline>{this.props.children}</CssBaseline>;
  }
}

export default MainApp;
