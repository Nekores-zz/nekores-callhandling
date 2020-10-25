import React from "react";
import Loadable from "react-loadable";

export const loading = props => {
    if(props.error)
        console.log("Loadable status error", props.error);
    return <div>loading...</div>;
};

export const facadeOf = componentPath =>
  Loadable({
    loader: () => import("../../components/" + componentPath),
    loading      
  });
