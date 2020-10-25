import React, { Component } from "react";
import { Button, Grid, Paper, Icon, withStyles } from "@material-ui/core";
import NotificationsCard from "./NotificationsCard";
import { translate } from "react-i18next";
import { styleSheet } from "jss/MainNavbar/NotificationsContent";

class NotificationsContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notifications: props.notifications,
      alerts: props.alerts
    };
  }

  isMobile() {
    return window.innerWidth < 640;
  }

  renderHeader = (title, count, withButtons) => {
    const { classes, t } = this.props;

    return (
      <Grid item xs={12} className={classes.notificationsContentTitleWrapper}>
        <span className={classes.notificationsContentTitle}>{t(title, { count })}</span>
        {console.log(count)}
        {withButtons && <Icon className={classes.notificationsContentIcon}>done_all</Icon>}
        {withButtons && <Icon className={classes.notificationsContentIcon}>settings</Icon>}
      </Grid>
    );
  };

  render() {
    const { classes, alerts, notifications, t } = this.props;

    return (
      <Paper classes={{ root: classes.notificationsContentPaper }}>
        <Grid container spacing={0}>
          <div className={classes.notificationsWrapper}>
            {/* <Scroll height="calc(100vh - 136px)" width="100%" hideOverflowX> */}
            {alerts.length > 0 &&
              this.renderHeader("alertsCount", alerts.length, alerts.length > 0)}
            <Grid item xs={12} className={classes.notificationCardsWrapper}>
              {alerts.map((item, index) => {
                return (
                  <NotificationsCard
                    unreadNotifications={item.read}
                    alert={true}
                    cardData={item}
                    key={index}
                  />
                );
              })}
            </Grid>

            {notifications.length > 0 &&
              this.renderHeader(
                "notificationsCount",
                notifications.length,
                notifications.length > 0 && alerts.length === 0
              )}
            <Grid item xs={12} className={classes.notificationCardsWrapper}>
              {notifications.map((item, index) => {
                return (
                  <NotificationsCard unreadNotifications={item.read} cardData={item} key={index} />
                );
              })}
            </Grid>
            {/* </Scroll> */}
          </div>
          <Grid item xs={12} className={classes.viewAllButtonWrapper}>
            <Button classes={{ root: classes.viewAllButton }}>{t("viewAll")}</Button>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

NotificationsContent.defaultProps = {
  notifications: [
    {
      author: "Sophie Jones",
      text: "added profile details amet, consectetuer adi piscing elit, sed diam nonummy nibh...",
      os: "ios",
      time: "20m ago",
      read: false
    },
    {
      text:
        "Lorem ipsum dolor sit amet, consectetuer adi piscing elit, sed diam nonummy nibh euismod...",
      os: "android",
      time: "20m ago",
      read: true
    }
  ],
  alerts: [
    // {
    //   text:
    //     "Lorem ipsum dolor sit amet, consectetuer adi piscing elit, sed diam nonummy nibh euismod...",
    //   os: "ios",
    //   time: "20m ago"
    // },
    // {
    //   text:
    //     "Lorem ipsum dolor sit amet, consectetuer adi piscing elit, sed diam nonummy nibh euismod...",
    //   os: "ios",
    //   time: "20m ago"
    // },
    {
      text:
        "Lorem ipsum dolor sit amet, consectetuer adi piscing elit, sed diam nonummy nibh euismod...",
      os: "ios",
      time: "20m ago",
      read: true
    }
  ]
};

export default withStyles(styleSheet, { name: "NotificationsContent" })(
  translate("common")(NotificationsContent)
);
