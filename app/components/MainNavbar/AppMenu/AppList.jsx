import React from "react";
import {
  Button,
  Grid,
  FormControl,
  Input,
  InputAdornment,
  Paper,
  Icon,
  withStyles
} from "@material-ui/core";
import AppListButton from "./AppListButton";
import { translate } from "react-i18next";
import { styleSheet } from "jss/MainNavbar/AppList";

const apps = [
  {
    name: "dashboard",
    link: "home",
    icon: "dashboard",
    pathname: "/users"
  },
  {
    name: "accounts",
    link: "home",
    icon: "account_box",
    pathname: "/accounts"
  },
  {
    name: "reports",
    link: "home",
    icon: "insert_chart",
    pathname: "/report"
  },
  {
    name: "settings",
    link: "home",
    icon: "settings",
    pathname: "/users"
  },
  {
    name: "services",
    link: "home",
    icon: "queue_play_next",
    pathname: "/services"
  },
  {
    name: "users",
    link: "home",
    icon: "people",
    pathname: "/users"
  },
  {
    name: "groups",
    link: "home",
    icon: "group_work",
    pathname: "/groups"
  },
  {
    name: "security",
    link: "home",
    icon: "lock",
    pathname: "/security"
  },
  {
    name: "billing",
    link: "home",
    icon: "credit_card",
    pathname: "/users"
  },
  {
    name: "callcare",
    link: "home",
    icon: "device_hub",
    pathname: "/call-care"
  }
];

class AppList extends React.Component {
  constructor() {
    super();

    this.state = {
      query: ""
    };
  }

  render() {
    const { handleOnKeyPress, classes, t } = this.props;

    return (
      <Paper classes={{ root: classes.appsListPaper }}>
        <Grid container className={classes.appListContainer}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Input
                label={t("search")}
                placeholder={t("search")}
                id="search"
                className={classes.searchInputApplist}
                value={this.state.query}
                onChange={e => this.setState({ query: e.target.value })}
                onKeyDown={handleOnKeyPress}
                startAdornment={
                  <InputAdornment classes={{ root: classes.searchIcon }} position="start">
                    <Icon>search</Icon>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} className={classes.appsListContainer}>
            {apps.map((item, index) => (
              <AppListButton key={index} item={item} />
            ))}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} className={classes.buttonMoreWrapper}>
            <Button classes={{ root: classes.buttonMore }}>{t("more")}</Button>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styleSheet, { name: "AppList" })(translate("common")(AppList));
