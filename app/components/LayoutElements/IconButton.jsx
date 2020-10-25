import React, { PureComponent } from "react";
import clsx from "clsx";
import { Button as MUIButton, withStyles } from "@material-ui/core";
// TODO: if needed, create the JSS file (removing these line was a quick fix)
// as below file does not exist:
// import { iconButtonStylesheet } from "jss/LayoutElements/IconButton";

//  export const IconButton = withStyles(iconButtonStylesheet, { name: "IconButton" })(
class IconButton extends PureComponent {
  static propTypes = {
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    // classes: PropTypes.object.isRequired,
    children: PropTypes.any
  };

  render = () => {
    const { primary, secondary, children, classes, ...props } = this.props;

    return (
      <MUIButton
        onClick={onClick}
        variant="contained"
        // clsx already checks if property exists, no need to double check
        classes={clsx(classes.button, classes.primary, classes.secondary)}
        {...props}
      >
        {children}
      </MUIButton>
    );
  };
}
//);
export default IconButton;

export const PrimaryButton = props => <IconButton primary {...props} />;

export const SecondaryButton = props => <IconButton secondary {...props} />;
