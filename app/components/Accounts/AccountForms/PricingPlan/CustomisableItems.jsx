import React, { Component, Fragment } from "react";
import {
  Divider,
  List,
  Avatar,
  ListItem,
  Typography,
  Icon,
  withStyles
} from "@material-ui/core";
import { styleSheet } from "jss/Accounts/CreateAccount";
import { translate } from "react-i18next";

const customiseItems = [
  {
    title: "Setup Costs",
    bgColor: "#595959",
    icon: "settings"
  },
  {
    title: "Annual Charges",
    bgColor: "rgb(156, 39, 176)",
    icon: "date_range"
  },
  {
    title: "User Licenses",
    bgColor: "rgb(103, 58, 183)",
    icon: "account_circle"
  },
  {
    title: "National Call Tariffs",
    bgColor: "rgb(3, 169, 244)",
    icon: "room"
  },
  {
    title: "International Call Tariffs",
    bgColor: "rgb(0, 188, 212)",
    icon: "language"
  }
];

class CustomisableItems extends Component {
  state = {
    isSetup: false,
    isDetails: true,
    headerText: ""
  };

  handleChangeRadio = index => {
    let states = this.state.checkedStates;
    states[index] = !states[index];
    this.setState({
      checked: !this.state.checked,
      isLeftIcon: index
    });
  };

  handleOnLeave = index => {
    d;
    if (this.state.checked === false) {
      this.setState({
        isLeftIcon: 20
      });
    } else {
      this.setState({
        isLeftIcon: index
      });
    }
  };

  handleChange = e => {
    this.setState({
      stringInput: e.target.value
    });
  };
  handleHover = index => {
    this.setState({
      isLeftIcon: index
    });
  };
  handleCustomisePlans = (e, index) => {
    this.setState({
      isDetails: false,
      isSetup: true,
      headerText: e
    });
  };
  render() {
    const { t, classes } = this.props;

    return (
      <List className={classes.list}>
        {customiseItems.map((item, index) => {
          return (
            <Fragment key={index}>
              <ListItem
                button
                className={classes.listItem}
                key={index}
                onClick={this.handleCustomisePlans.bind(
                  this,
                  item.title,
                  index
                )}
                onMouseLeave={this.handleOnLeave.bind(this, index)}
                onMouseEnter={this.handleHover.bind(this, index)}
              >
                <Avatar
                  style={{ background: `${item.bgColor}` }}
                  className={`${classes.avatarIcon} ${classes.iconAv}`}
                >
                  <Icon>{item.icon}</Icon>
                </Avatar>
                <div className={classes.typoWrapper}>
                  <Typography className={classes.itemId}>
                    {t(`${item.title}`)}
                  </Typography>
                </div>
                <Icon>create</Icon>
                <Icon className={classes.nextIcon}>navigate_next</Icon>
              </ListItem>
              <Divider />
            </Fragment>
          );
        })}
      </List>
    );
  }
}

export default withStyles(styleSheet, { name: "CustomisableItems" })(
  translate("accounts")(CustomisableItems)
);
