import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";

export default props => (
  <SvgIcon className={props.className} width="24" height="24" viewBox="0 0 24 24" {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <text
        x="4"
        y="12"
        style={{
          textAnchor: "start",
          dominantBaseline: "middle",
          fontWeight: "bold",
          fontSize: 14,
          paddingLeft: 10
        }}
      >
        Cc
      </text>
    </svg>
  </SvgIcon>
);
