/**
 * No need to refactor this Dialog Module, Coz, it is not used anywhere. #Sajid U.
 */

import React, { Component, Fragment } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  Avatar,
  Typography,
  Radio,
  Divider,
  FormControl,
  Grid,
  Icon,
  withStyles
} from "@material-ui/core";
import { styleSheet } from "jss/Accounts/PricingPlansDialog";
import { TextField, PrimaryTextButton, SubmitButton } from "components";
import { translate } from "react-i18next";
import ListDetails from "./ListDetails";

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

const setupFields = [
  {
    label: "Lorem Ipsum",
    helperText: "200"
  },
  {
    label: "Lorem Ipsum",
    helperText: "200"
  },
  {
    label: "Lorem Ipsum",
    helperText: "200"
  },
  {
    label: "Lorem Ipsum",
    helperText: "200"
  }
];

class PricingPlansDialog extends Component {
  state = {
    open: false,
    isSearchInput: false,
    isSelectPlan: true,
    stringInput: "",
    isLeftIcon: "",
    searchIcon: true,
    checkedStates: [false, false, false, false],
    checked: false,
    isAvHidden: false,
    isDetails: true,
    plan: "2",
    selectedValue: "",
    isSetup: false,
    headerText: "",
    customiseItems: [],
    isCustomizable: false,
    isPlanField: true
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  handlePreview = () => {
    this.setState({
      isDetails: true,
      searchIcon: true,
      isSetup: false,
      isCustomizable: false
    });
    if (this.state.isSetup) {
      this.setState({
        isCustomizable: true,
        isDetails: false,
        searchIcon: false
      });
    }
  };

  handleOpenSearch = () => {
    this.setState({
      isSearchInput: !this.state.isSearchInput
    });
  };

  handleCustomize = () => {
    this.setState({
      isCustomizable: true,
      isDetails: false
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

  handleCustomisePlans = (e, index) => {
    this.setState({
      isDetails: false,
      isSetup: true,
      headerText: e
    });
  };
  handleChange = e => {
    this.setState({
      stringInput: e.target.value
    });
  };

  handleChangeRadio = event => {
    this.setState({ selectedValue: event.target.value });
  };

  handleClear = () => {
    this.setState({
      stringInput: ""
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

  handleHover = index => {
    this.setState({
      isLeftIcon: index
    });
  };

  render() {
    const { t, classes } = this.props;
    let listDetails = "";
    let customise = "";
    let headerText = "";

    if (this.state.isCustomizable) {
      customise = "Customise";
    }
    if (this.state.isDetails) {
      headerText = "Select a plan";
    } else {
      headerText = `${customise} ${this.state.plan}`;
    }
    if (this.state.isSetup) {
      headerText = this.state.headerText;
    }
    if (this.state.isDetails) {
      listDetails = (
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
                    {this.state.isLeftIcon !== index &&
                    this.state.checkedStates[index] === false ? (
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
    } else {
      listDetails = <ListDetails accountPanelTitles={this.props.accountPanelTitles} />;
    }
    if (this.state.isCustomizable) {
      listDetails = (
        <List className={classes.list}>
          {customiseItems.map((item, index) => {
            return (
              <Fragment key={index}>
                <ListItem
                  button
                  className={classes.listItem}
                  key={index}
                  onClick={this.handleCustomisePlans.bind(this, item.title, index)}
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
                    <Typography className={classes.itemId}>{t(`${item.title}`)}</Typography>
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

    if (this.state.isSetup) {
      listDetails = (
        <Grid className={classes.gridWrapper} container spacing={24}>
          <Grid
            style={{
              display: "flex",
              paddingRight: 22,
              paddingLeft: 22,
              flexDirection: "column"
            }}
            xs={6}
          >
            {setupFields.map((item, index) => {
              return (
                <FormControl key={index} className={classes.formControl}>
                  <TextField
                    helperText={`${t("Default")}: ${200}`}
                    className={classes.textField}
                    label={t("Lorem ipsum")}
                  />
                </FormControl>
              );
            })}
          </Grid>
          <Grid
            style={{
              display: "flex",
              paddingRight: 44,
              flexDirection: "column"
            }}
            xs={6}
          >
            {setupFields.map((item, index) => {
              return (
                <FormControl key={index} className={classes.formControl}>
                  <TextField
                    helperText={`${t("Default")}: ${200}`}
                    className={classes.textField}
                    label={t("Lorem ipsum")}
                  />
                </FormControl>
              );
            })}
          </Grid>
        </Grid>
      );
    }
    return (
      <div>
        <PrimaryTextButton className={classes.selectPlan} onClick={this.handleClickOpen}>
          {t("select a plan")}
        </PrimaryTextButton>
        <Dialog
          classes={{
            paper: classes.paper
          }}
          className={classes.dialog}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle className={classes.dialogTitleWrapper} id="alert-dialog-title">
            <div>
              {this.state.isDetails === false ? (
                <IconButton
                  className={classes.previewBtn}
                  onClick={this.handlePreview}
                  variant="text"
                >
                  <svg
                    className={classes.preview}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" />
                  </svg>
                </IconButton>
              ) : null}
              {this.state.isSearchInput ? (
                <input
                  onChange={this.handleChange}
                  value={this.state.stringInput}
                  type="text"
                  placeholder="Search"
                  className={classes.input}
                />
              ) : (
                <div>
                  <span
                    className={
                      this.state.isDetails ? classes.headerText : classes.headerTextDetails
                    }
                  >
                    {" "}
                    {!this.state.isSearchInput ? headerText : null}
                  </span>
                </div>
              )}
              <div
                className={
                  this.state.isSearchInput ? classes.searchIconForInput : classes.searchIconWrapper
                }
              >
                {this.state.searchIcon ? (
                  <IconButton onClick={this.handleOpenSearch}>
                    <Icon className={classes.searchIcon}>search</Icon>
                  </IconButton>
                ) : null}
                <IconButton
                  onClick={this.handleClear}
                  className={this.state.isDetails ? classes.clearIcon : classes.clearIconDetails}
                >
                  <Icon>clear</Icon>
                </IconButton>
              </div>
            </div>
          </DialogTitle>

          {listDetails}
          <DialogActions className={classes.dialogActions}>
            {this.state.isCustomizable === false ? (
              <Button
                onClick={this.handleCustomize}
                style={{ position: "absolute", left: 4 }}
                color="secondary"
              >
                {t("customise")}
              </Button>
            ) : null}
            <Button onClick={this.handleClose}>Cancel</Button>
            <SubmitButton onClick={this.props.handlePlanFields}>{t("selectAPlan")}</SubmitButton>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styleSheet, { name: "PricingPlansDialog" })(
  translate("accounts")(PricingPlansDialog)
);
