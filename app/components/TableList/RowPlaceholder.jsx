import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Avatar, Grid, withStyles } from "@material-ui/core";
import { TableListRow, TableListCell, Text } from "components";
import { leftMiddleShadow, rightMiddleShadow } from "utils/shadows";
import { styleSheet } from "jss/components/TableList/RowPlaceholder";

class RowPlaceholder extends PureComponent {
  static propTypes = {
    isMobileLayout: PropTypes.bool.isRequired,
    span: PropTypes.number.isRequired,
    hideCount: PropTypes.number.isRequired,

    classes: PropTypes.object.isRequired
  };

  LeftShadowCell = () => leftMiddleShadow();

  RightShadowCell = () => rightMiddleShadow();

  render() {
    const { isMobileLayout, span, hideCount, classes } = this.props;

    return (
      <TableListRow className={classes.row}>
        {leftMiddleShadow()}

        <td className={classes.fakeCell} />

        <TableListCell>
          <Grid container direction="row" alignItems="center" spacing={24} wrap="nowrap">
            <Grid item>
              <Avatar className={classes.avatar} />
            </Grid>

            <Grid item>
              <Text className={classes.text}>Loading...</Text>
            </Grid>
          </Grid>
        </TableListCell>

        <td
          className={classes.fakeCell}
          colSpan={String(isMobileLayout ? span - hideCount - 4 : span - 4)}
        />

        {rightMiddleShadow()}
      </TableListRow>
    );
  }
}

export default withStyles(styleSheet, { name: "RowPlaceholder" })(RowPlaceholder);
