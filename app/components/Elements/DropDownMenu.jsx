import React, { PureComponent, Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { styleSheet } from "jss/Elements/DropDownMenu";
import { withStyles } from "@material-ui/core";
import { IconButton, Icon, Box, Button } from "components/Elements";
import { Paper, Select, OutlinedInput, Menu, MenuItem, Grid } from "@material-ui/core";
import { Text } from "components/LayoutElements";

class DropDownMenu extends Component {
  static propTypes = {
    expanded: PropTypes.bool,
    onExpand: PropTypes.func
  };

  state = {
    anchorEl: null
  };

  handleClickMenu = event => {
    this.props.onExpand(true);
    this.setState({ anchorEl: event.currentTarget });
  };

  handleCloseMenu = () => {
    this.props.onExpand(false);
    this.setState({ anchorEl: null });
  };

  handleSelectOption = event => {
    console.log(event);
    this.handleCloseMenu();
  };

  render = () => {
    const { children, t, className, classes, selected, inverted } = this.props;
    const { anchorEl } = this.state;

    return (
      <div>
        <div
          className={clsx(
            classes.labelInput,
            !inverted ? classes.mainStyle : classes.invertStyle,
            classes[className]
          )}
          onClick={this.handleClickMenu}
        >
          <div className={clsx(classes.mainTextWrapper)}>
            <Text
              className={clsx(
                classes.mainText,
                !inverted ? classes.mainStyle : classes.invertStyle
              )}
            >
              {selected}
            </Text>
          </div>
          <div
            className={clsx(
              classes.menuButton,
              !inverted ? classes.mainStyle : classes.invertStyle
            )}
          >
            <Icon
              className={clsx(
                classes.menuIcon,
                !inverted ? classes.mainStyle : classes.invertStyle
              )}
              fontSize="default"
            >
              arrow_drop_down
            </Icon>
            {/* </Button> */}
          </div>
        </div>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={this.props.expanded}
          keepMounted
          onClose={this.handleCloseMenu}
          onChange={this.handleChange}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 50,
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
        >
          {children}
        </Menu>
      </div>
    );
  };
}

export default withStyles(styleSheet, { name: "DropDownMenu" })(DropDownMenu);
