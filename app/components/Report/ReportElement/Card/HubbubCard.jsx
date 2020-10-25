import React from "react";
import { withStyles, Card, CardContent } from "@material-ui/core";
import { styleSheet } from "jss/Report/ReportElement/Card/HubbubCard";
import { Text } from "components/LayoutElements";
import { translate } from "react-i18next";
function HubbubCard(props) {
  const { highlight, type, setAttempts, classes, item } = props;
  return (
    <Card
      classes={{ root: classes.root }}
      onClick={setAttempts ? () => setAttempts(item) : null}
      className={classes[type + "Card"]}
      style={{ backgroundColor: highlight && "#2196F3" }}
    >
      <CardContent>
        {item.attempts ? (
          <Text variant="third" color="textSecondary">
            {item.attempts && item.attempts.length > 4 ? "4+" : item.attempts.length} Attempts
          </Text>
        ) : (
          <Text variant="secondarySmallBody" style={{ color: highlight && "#fff" }}>
            {item.title}
          </Text>
        )}
        <br />
        <br />
        <Text variant="headline" component="h2" style={{ color: highlight && "#fff" }}>
          {item.value}
        </Text>
        <br />
        <Text variant="primarySmallBody" style={{ color: highlight && "#fff" }}>
          {item.titleDesc}
        </Text>
      </CardContent>
    </Card>
  );
}

export default withStyles(styleSheet, { name: "HubbubCard" })(translate("reports")(HubbubCard));
