import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";

export default props => (
  <SvgIcon className={props.className} width="24" height="24" viewBox="0 0 24 24" {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g transform-origin="50% 50%" transform="rotate(-45)">
            <path fill="none" d="M0 0h24v24H0z"/><path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z"/>
        </g>
    </svg>
  </SvgIcon>
);
