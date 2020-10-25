import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles, Toolbar, Input, IconButton, Icon, Button } from "@material-ui/core";
import {
  stylesheet,
  dividerStylesheet,
  inputStylesheet,
  searchStylesheet,
  buttonStylesheet,
} from "jss/components/List/ListHeader";

export const ListHeaderButton = withStyles(buttonStylesheet, { name: "ListHeader" }) (
  class ListHeaderButton extends PureComponent {
    render() {
      let { border, nav, classes, ...props } = this.props;

      return (
        <Button 
          classes={{ 
            root: clsx({
              [classes.button]: true,
              [classes.border]: border,
              [classes.nav]: nav,
            })
          }} 
          {...props}
        />
      );
    }
  }
);

export const ListHeader = withStyles(stylesheet, { name: "ListHeader" })(
  class ListHeader extends PureComponent {
    static propTypes = {
      color: PropTypes.string,
      children: PropTypes.any,
      className: PropTypes.string,
      classes: PropTypes.object.isRequired
    };

    static Button = ListHeaderButton;

    static colors = {
      main: 'colorMain',
      secondary: 'colorSecondary',
    };

    render() {
      const { color, children, classes, className } = this.props;

      return (
        <Toolbar
          className={clsx(
            classes.listHeader, 
            classes[ListHeader.colors[color]],
            className, 
            classes,
          )}
        >
          {children}
        </Toolbar>
      );
    }
  }
);

export const ListHeaderDivider = withStyles(dividerStylesheet, {
  name: "ListHeaderDivider"
})(
  class ListHeaderDivider extends PureComponent {
    static propTypes = {
      className: PropTypes.string,
      classes: PropTypes.object.isRequired
    };

    render() {
      const { classes, className } = this.props;

      return <div className={clsx(classes.divider, className)} />;
    }
  }
);

export const ListHeaderInput = withStyles(inputStylesheet, {
  name: "ListHeaderInput"
})(
  class ListHeaderInput extends PureComponent {
    static propTypes = {
      className: PropTypes.string,
      classes: PropTypes.object.isRequired
    };

    render() {
      const { classes, className, ...props } = this.props;

      return (
        <Input
          placeholder={"Search"}
          className={clsx(classes.input, className)}
          disableUnderline
          {...props}
        />
      );
    }
  }
);

export const ListHeaderSelect = withStyles(inputStylesheet, {
  name: "ListHeaderSelect"
})(
  class ListHeaderSelect extends PureComponent {
    static propTypes = {
      className: PropTypes.string,
      classes: PropTypes.object.isRequired
    };

    render() {
      const { classes, className, ...props } = this.props;

      return (
        <Input
          placeholder={"Search"}
          className={clsx(classes.input, className)}
          disableUnderline
          {...props}
        />
      );
    }
  }
);

export const ListHeaderSearch = withStyles(searchStylesheet, {
  name: "ListHeaderSearch"
})(
  class ListHeaderSearch extends PureComponent {
    static propTypes = {
      isActive: PropTypes.bool,
      onToggle: PropTypes.func,
      listHeaderDark: PropTypes.bool,
      searchString: PropTypes.string,
      onChange: PropTypes.func,
      className: PropTypes.string,
      classes: PropTypes.object.isRequired
    };

    handleChange = event => {
      this.props.onChange(event.target.value);
    };

    handleToggle = () => {
      this.props.onToggle(!this.props.isActive);
    };

    handleClear = () => {
      this.props.onChange("");
      this.props.onToggle(false);
    };

    handleOnKeyPress = event => {
      const ENTER_KEY = 13;
      const ESC_KEY = 27;
      const UP_KEY = 38;
      const DOWN_KEY = 40;

      const { value } = event.target;

      switch (event.keyCode) {
        case ENTER_KEY:
          break;

        case UP_KEY:
          break;

        case DOWN_KEY:
          break;

        case ESC_KEY:
          this.handleClear();
          break;

        default:
          break;
      }
    };

    render() {
      const {
        isActive,
        onToggle,
        searchString,
        onChange,
        classes,
        className,
        listHeaderDark,
        ...props
      } = this.props;

      return isActive || searchString ? (
        <Fragment>
          <IconButton onClick={this.handleToggle}>
            <Icon className={listHeaderDark ? classes.iconDark : classes.icon}>search</Icon>
          </IconButton>
          <ListHeaderInput
            onKeyDown={this.handleOnKeyPress}
            value={searchString}
            onChange={this.handleChange}
            className={clsx(listHeaderDark ? classes.inputDark : classes.input)}
            placeholder="Search"
            autoFocus
          />
          <IconButton onClick={this.handleClear}>
            <Icon className={listHeaderDark ? classes.iconDark : classes.icon}>clear</Icon>
          </IconButton>
        </Fragment>
      ) : (
        <IconButton onClick={this.handleToggle}>
          <Icon className={listHeaderDark ? classes.iconDark : classes.icon}>search</Icon>
        </IconButton>
      );
    }
  }
);
