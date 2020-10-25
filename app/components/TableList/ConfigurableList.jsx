import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { Hidden, Table, TableBody, Typography, withStyles } from "@material-ui/core";
import {
  bottomCenterShadow,
  bottomLeftShadow,
  bottomRightShadow,
  topCenterShadow,
  topLeftShadow,
  topRightShadow
} from "utils/shadows";
import { styleSheet } from "jss/components/TableList/ConfigurableList";

class ConfigurableList extends PureComponent {
  static propTypes = {
    children: PropTypes.any.isRequired,
    rows: PropTypes.array.isRequired,
    Row: PropTypes.any.isRequired,
    classes: PropTypes.object.isRequired,
    headless: PropTypes.bool,
    getKeyFn: PropTypes.func.isRequired,
    sortGroupFn: PropTypes.func,
    headerVariation: PropTypes.oneOf([undefined, "blue", "darkblue"]),
    span: PropTypes.number.isRequired,
    hideCount: PropTypes.number.isRequired
  };

  injectTopShadowRow = () => {
    const { span, hideCount } = this.props;

    return (
      <tr>
        {topLeftShadow()}
        <Hidden mdUp>{topCenterShadow(span - hideCount - 2)}</Hidden>
        <Hidden smDown>{topCenterShadow(span - 2)}</Hidden>
        {topRightShadow()}
      </tr>
    );
  };

  injectBottomShadow = () => {
    const { span, hideCount } = this.props;
    return (
      <tr>
        {bottomLeftShadow()}
        <Hidden mdUp>{bottomCenterShadow(span - hideCount - 2)}</Hidden>
        <Hidden smDown>{bottomCenterShadow(span - 2)}</Hidden>
        {bottomRightShadow()}
      </tr>
    );
  };

  renderGroupName = groupName => {
    const { span, hideCount, classes } = this.props;

    return (
      <tr>
        <Hidden mdUp>
          <td />
          <td colSpan={String(span - hideCount - 1)}>
            <Typography variant="subtitle1" align="left" className={classes.sectionHeader}>
              {groupName}
            </Typography>
          </td>
        </Hidden>
        <Hidden smDown>
          <td />
          <td colSpan={String(span - 1)}>
            <Typography variant="subtitle1" align="left" className={classes.sectionHeader}>
              {groupName}
            </Typography>
          </td>
        </Hidden>
      </tr>
    );
  };

  renderHeader = () => {
    const { children, headerVariation, classes } = this.props;
    const headCells = children.map((child, i) => (
      <Fragment key={"header_" + i}>{child.props.head}</Fragment>
    ));

    return (
      <tr
        className={
          ["blue", "darkblue"].includes(headerVariation)
            ? classes[headerVariation + "HeaderVariation"]
            : classes.whiteHeaderSE
        }
      >
        {headCells}
      </tr>
    );
  };

  renderRows = (rows, rowFunction) => {
    const { headless, sortGroupFn } = this.props;

    let firstGrp = true;
    let lastGrp = null;

    return rows.map((row, i) => {
      if (sortGroupFn === undefined) {
        return rowFunction(row, i);
      } else {
        const groupName = sortGroupFn(row);
        if (lastGrp === groupName) {
          // are we on the same group? then render next line
          return rowFunction(row, i);
        } else {
          // have we changed the group? then:
          // 1. close section (with shadow border),
          // 2. output the group name,
          // 3. open new section (with shadow border),
          // 4. render the  same table header (again)
          // 5. render next line, continue mapping...
          lastGrp = groupName;
          return (
            <Fragment key={"segment_" + i}>
              {firstGrp ? (firstGrp = false) : this.injectBottomShadow()}
              {this.renderGroupName(groupName)}
              {this.injectTopShadowRow()}
              {!headless && this.renderHeader()}
              {rowFunction(row, i)}
            </Fragment>
          );
        }
      }
    });
  };

  render = () => {
    const { children, rows, Row, headless, getKeyFn, sortGroupFn } = this.props;
    const rowCells = children.map(child => child.props.Cell);
    const rowArgs = children.map(child => child.props.args);
    const rowHides = children.map(child => child.props.hidden);
    const rowDisplays = children.map(child => child.props.display);

    return (
      <Table>
        <TableBody>
          {sortGroupFn === undefined ? (
            <>
              {this.injectTopShadowRow()}
              {!headless && this.renderHeader()}
            </>
          ) : null}
          {this.renderRows(rows, (row, i) => (
            <Row
              key={"row_" + (getKeyFn(row, i) || i)}
              row={row}
              cells={rowCells}
              args={rowArgs}
              hides={rowHides}
              displays={rowDisplays}
              index={i}
            />
          ))}
          {this.injectBottomShadow()}
        </TableBody>
      </Table>
    );
  };
}

export default withStyles(styleSheet, { name: "ConfigurableList" })(ConfigurableList);

export class ConfigurableListColumn extends PureComponent {
  static propTypes = {
    display: PropTypes.string,
    head: PropTypes.any.isRequired,
    Cell: PropTypes.any.isRequired,
    args: PropTypes.array,
    hidden: PropTypes.bool
  };
}
