import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Divider,
  List,
  ListItem,
  Radio,
  Typography,
  Icon,
  withStyles
} from "@material-ui/core";
import { styleSheet } from "jss/Accounts/PricingPlansDialog";
import { translate } from "react-i18next";

class ListPlans extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequiredn
  };

  state = {
    checkedStates: [false, false, false, false],
    stringInput: "",
    isLeftIcon: "",
    selectedValue: ""
  };
  handleHover = index => {
    this.setState({
      isLeftIcon: index
    });
  };

  handleOnLeave = index => {
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

  handleChangeRadio = index => {
    let states = this.state.checkedStates;
    states[index] = !states[index];
    this.setState({
      checked: !this.state.checked,
      isLeftIcon: index
    });
  };

  handlePlanDetails = id => {
    this.setState({
      isDetails: false,
      plan: id,
      isSearchInput: false,
      searchIcon: false
    });
  };

  render() {
    const { classes, t } = this.props;
    return (
      <List className={classes.list}>
        {this.props.plans
          .filter(id => {
            return !id.id.indexOf(this.state.stringInput);
          })
          .map((item, index) => {
            return (
              <Fragment key={index}>
                <ListItem
                  button
                  className={classes.listItem}
                  key={index}
                  onClick={this.handlePlanDetails.bind(this, item.id)}
                  onMouseEnter={this.handleHover.bind(this, index)}
                >
                  {this.state.isLeftIcon !== index && this.state.checkedStates[index] === false ? (
                    <Avatar
                      style={{ background: `${item.bgColor}` }}
                      className={classes.avatarIcon}
                    >
                      P
                    </Avatar>
                  ) : (
                    <Radio
                      className={classes.radio}
                      checked={
                        this.state.selectedValue ===
                        item.id
                          .slice(4)
                          .trim()
                          .toLowerCase()
                      }
                      value={item.id
                        .slice(4)
                        .trim()
                        .toLowerCase()}
                      onChange={this.handleChangeRadio}
                      onClick={this.handleChangeRadio.bind(this, index)}
                    />
                  )}
                  <div className={classes.typoWrapper}>
                    <Typography className={classes.itemId}>{t(`${item.id}`)}</Typography>
                    <Typography>{item.text}</Typography>
                  </div>
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

export default withStyles(styleSheet, { name: "ListPlans" })(translate("accounts")(ListPlans));
