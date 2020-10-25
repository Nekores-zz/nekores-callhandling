import React, { PureComponent, Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Button as MUIButton, Fab, withStyles, Icon } from "@material-ui/core";
import { translate } from "react-i18next";
import { Box } from "./Box";
import {
  buttonStylesheet,
  primaryButtonStylesheet,
  secondaryButtonStylesheet,
  AddButtonStylesheet,
  primaryTextLinkButtonStylesheet,
  secondaryTextLinkButtonStylesheet,
  thirdTextLinkButtonStylesheet,
  actionButtonStylesheet
} from "jss/Elements/Buttons";

export const Button = withStyles(buttonStylesheet, { name: "Button" })(props => (
  // <MUIButton variant={Box} {...props} />
  <MUIButton {...props} />
));

export const PrimaryButton = withStyles(primaryButtonStylesheet, { name: "PrimaryButton" })(
  props => <Button variant="contained" {...props} />
);

export const SecondaryButton = withStyles(secondaryButtonStylesheet, { name: "SecondaryButton" })(
  props => <Button variant="outlined" {...props} />
);

export const AddButton = withStyles(AddButtonStylesheet, { name: "AddButton" })(props => (
  <Fab {...props}>
    <Icon>add</Icon>
  </Fab>
));

export const PrimaryTextLink = withStyles(primaryTextLinkButtonStylesheet, {
  name: "PrimaryTextLink"
})(({ denseLeft, denseRight, classes, ...props }) => (
  <Button
    {...props}
    variant="text"
    classes={{
      // ...classes,
      root: clsx(classes.root, denseLeft && classes.denseLeft, denseRight & classes.denseRight)
    }}
  />
));

export const SecondaryTextLink = withStyles(secondaryTextLinkButtonStylesheet, {
  name: "SecondaryTextLink"
})(props => <Button variant="text" {...props} />);

export const ThirdTextLink = withStyles(thirdTextLinkButtonStylesheet, { name: "ThirdTextLink" })(
  props => <Button variant="text" {...props} />
);

export const ActionButton = withStyles(actionButtonStylesheet, { name: "ActionButton" })(Fab);

export const withPreloader = C =>
  class WithPreloader extends Component {
    static propTypes = {
      onClick: PropTypes.func.isRequired,
      children: PropTypes.any
    };

    state = {
      isLoading: false
    };

    isMounted = false;

    handleResolve = result => {
      if (this.isMounted) {
        this.setState({ isLoading: false });
      }
    };

    handleClick = event => {
      event.stopPropagation();
      event.persist();
      this.setState({ isLoading: true });
      let result = this.props.onClick(event);
      if (result instanceof Promise) {
        result.then(this.handleResolve);
      } else {
        this.handleResolve(result);
      }
    };

    componentDidMount() {
      this.isMounted = true;
    }

    componentWillUnmount() {
      this.isMounted = false;
    }

    render() {
      const { onClick, children, disabled, ...props } = this.props;

      const { isLoading } = this.state;

      return (
        <C onClick={this.submitHandler} disabled={disabled || isLoading} {...props}>
          {isLoading ? <CircularProgress size={24} className={classes.progress} /> : null}
          {children}
        </C>
      );
    }
  };

export const ButtonWithPreloader = withPreloader(PrimaryButton);
