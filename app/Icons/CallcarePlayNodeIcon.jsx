import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";

export default props => (
  <SvgIcon className={props.className} width="24" height="24" viewBox="0 0 24 24" {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <text
        x="2"
        y="16"
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
      <g transform="scale(0.5) translate(24, -1)">
        <path d="M11,10 L18,13.74 18,22.28 11,26 M18,13.74 L26,18 26,18 18,22.28" />
      </g>
    </svg>
  </SvgIcon>
);
