import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Collapse as MUICollapse, withStyles } from "@material-ui/core";
import { Column } from "./Box";
import { collapseStylesheet } from "jss/LayoutElements/Collapse";

export const Collapse = withStyles(collapseStylesheet, { name: "Collapse" })(({ ...props }) =>
  props.in ? <MUICollapse {...props} /> : null
);
