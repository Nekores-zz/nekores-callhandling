import React, { PureComponent } from "react";
import clsx from "clsx";
import { Button, withStyles } from "@material-ui/core";
// TODO: if needed, create the JSS file (removing these line was a quick fix)
// as below file does not exist:
// import { textButtonStylesheet } from "jss/LayoutElements/TextLink";

//export const TextLink = withStyles(textButtonStylesheet, { name: "TextLink" })(
class TextLink extends PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    third: PropTypes.bool,
    // classes: PropTypes.object.isRequired,
    children: PropTypes.any
  };

  render = () => {
    const { onClick, primary, secondary, third, children, classes, ...props } = this.props;

    return (
      <Button
        onClick={onClick}
        variant="text"
        // clsx already checks if property exists, no need to double check
        classes={clsx(classes.button, classes.primary, classes.secondary, classes.third)}
        {...props}
      >
        {children}
      </Button>
    );
  };
}
//);
export default TextLink;

export const PrimaryTextLink = props => <TextLink primary {...props} />;

export const SecondaryTextLink = props => <TextLink secondary {...props} />;

export const ThirdTextLink = props => <TextLink third {...props} />;
