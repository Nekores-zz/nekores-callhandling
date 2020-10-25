// import React, { PureComponent } from "react";
// import clsx from 'clsx';
// import { Button as MUIButton, IconButton as MUIIconButton, Fab, withStyles } from "@material-ui/core";
// import { 
//   buttonStylesheet,
//   primaryButtonStylesheet, secondaryButtonStylesheet, 
//   primaryTextLinkButtonStylesheet, secondaryTextLinkButtonStylesheet, thirdTextLinkButtonStylesheet, 
//   iconButtonStylesheet,
//   actionButtonStylesheet,
// } from "jss/LayoutElements/Button";

// export const Button = withStyles(
//   buttonStylesheet, 
//   { name: "Button" },
// ) (MUIButton);

// export const PrimaryButton = withStyles(
//   primaryButtonStylesheet, 
//   { name: "PrimaryButton" },
// ) (
//   (props) => <Button  variant='contained' {...props}/>
// );

// export const SecondaryButton = withStyles(
//   secondaryButtonStylesheet, 
//   { name: "SecondaryButton" },
// ) (
//   (props) => <Button  variant='outlined' {...props}/>
// );

// export const PrimaryTextLink = withStyles(
//   primaryTextLinkButtonStylesheet, 
//   { name: "PrimaryTextLink" },
// ) (
//   ({denseLeft, denseRight, classes, ...props}) => (
//     <Button {...props}
//       variant='text' 
//       classes={{
//         ...classes,
//         root: clsx(
//           classes.root, 
//           denseLeft && classes.denseLeft,
//           denseRight & classes.denseRight,
//         ),
//       }}
//     />
//   )
// );

// export const SecondaryTextLink = withStyles(
//   secondaryTextLinkButtonStylesheet, 
//   { name: "SecondaryTextLink" },
// ) (
//   (props) => <Button  variant='text' {...props}/>
// );

// export const ThirdTextLink = withStyles(
//   thirdTextLinkButtonStylesheet, 
//   { name: "ThirdTextLink" },
// ) (
//   (props) => <Button  variant='text' {...props}/>
// );

// export const IconButton = withStyles(
//   iconButtonStylesheet, 
//   { name: "IconButton" },
// ) (MUIIconButton);

// export const ActionButton = withStyles(
//   actionButtonStylesheet, 
//   { name: "ActionButton" },
// ) (Fab);
