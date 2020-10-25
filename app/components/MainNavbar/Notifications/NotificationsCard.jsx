import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Fab,
  Icon,
  withStyles,
  Avatar
} from "@material-ui/core";
import IosIcon from "Icons/IosIcon";
import LinesEllipsis from "react-lines-ellipsis";
import { translate } from "react-i18next";
import { styleSheet } from "jss/MainNavbar/NotificationsCard";

export default withStyles(styleSheet, { name: "NotificationsCard" })(
  translate("common")(props => {
    const { classes, cardData, alert, unreadNotifications, t } = props;

    const onClick = () => {
      console.log("Notification card clicked");
    };
    return (
      <Card
        className={`${classes.notificationCard} ${unreadNotifications &&
          classes.notificationCardUnread}`}
      >
        <div className={classes.notificationItemIcon}>
          {alert && <Icon className={classes.notificationItemIconAlert}>error</Icon>}
          {!alert && (
            <Fab
              size="small"
              color="secondary"
              className={classes.notificationItemIconNotification}
            >
              {cardData.author ? (
                <Avatar
                  alt="Remy Sharp"
                  src="https://material-ui.com/static/images/avatar/1.jpg"
                  className={classes.avatar}
                />
              ) : (
                <Icon>notifications</Icon>
              )}
            </Fab>
          )}
        </div>

        <div className={classes.notificationItemContent}>
          <CardContent classes={{ root: classes.cardContent }}>
            <div className={classes.notificationItemText}>
              <LinesEllipsis
                text={`${cardData.author ? cardData.author + " - " : ""} ${cardData.text}`}
                maxLine="3"
              />
            </div>
            <div className={classes.notificationItemTime}>
              {cardData.os === "android" ? (
                <Icon className={classes.notificationItemTimeIcon}>android</Icon>
              ) : cardData.os === "ios" ? (
                <IosIcon className={classes.notificationItemTimeIconIos} />
              ) : (
                ""
              )}
              {cardData.time}
            </div>
          </CardContent>

          <CardActions classes={{ root: classes.cardActions }}>
            <Button classes={{ root: classes.notificationItemButton }}>{t("reply")}</Button>

            <Button classes={{ root: classes.notificationItemButton }}>{t("learnMore")}</Button>

            <Button classes={{ root: classes.notificationItemButton }}>{t("dismiss")}</Button>
          </CardActions>
        </div>
      </Card>
    );
  })
);
