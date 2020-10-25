import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";

export default props => (
  <SvgIcon className={props.className} width="24" height="24" viewBox="0 0 24 24" {...props} >
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g transform-origin="50% 50%" transform="rotate(-90)">
            <path d="M16 13h-3V3h-2v10H8l4 4 4-4zM4 19v2h16v-2H4z"/><path d="M0 0h24v24H0z" fill="none"/>
        </g>
    </svg>
  </SvgIcon>
);
