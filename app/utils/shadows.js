/**
 * Shadow Emulation functions for HubbubList component
 * by A. Prates, jul-2018
 */

import React from "react";

export function topLeftShadow() {
  return (
    <td
      style={{
        background:
          "linear-gradient(to bottom right, rgba(0,0,0,0), rgba(0,0,0,0), rgba(0,0,0,.06))",
        height: "6px"
      }}
    />
  );
}

export function topCenterShadow(span) {
  return (
    <td
      colSpan={String(span)}
      style={{
        background: "linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.02), rgba(0,0,0,.07))",
        height: "6px"
      }}
    />
  );
}

export function topRightShadow() {
  return (
    <td
      style={{
        background:
          "linear-gradient(to bottom left, rgba(0,0,0,0), rgba(0,0,0,0), rgba(0,0,0,.06))",
        height: "6px"
      }}
    />
  );
}

export function bottomLeftShadow() {
  return (
    <td
      style={{
        background: "linear-gradient(to top right, rgba(0,0,0,0), rgba(0,0,0,0), rgba(0,0,0,.2))",
        height: "6px"
      }}
    />
  );
}

export function bottomCenterShadow(span) {
  return (
    <td
      colSpan={String(span)}
      style={{
        background: "linear-gradient(rgba(0,0,0,.3), rgba(0,0,0,0))",
        height: "6px"
      }}
    />
  );
}

export function bottomRightShadow() {
  return (
    <td
      style={{
        background: "linear-gradient(to top left, rgba(0,0,0,0), rgba(0,0,0,0), rgba(0,0,0,.2))",
        height: "6px"
      }}
    />
  );
}

export function leftMiddleShadow() {
  return (
    <td
      style={{
        background: "linear-gradient(to left, rgba(0,0,0,.15), rgba(0,0,0,.05), rgba(0,0,0,0))",
        width: "6px"
      }}
    />
  );
}

export function rightMiddleShadow() {
  return (
    <td
      style={{
        background: "linear-gradient(to right, rgba(0,0,0,.15), rgba(0,0,0,.05), rgba(0,0,0,0))",
        width: "6px"
      }}
    />
  );
}
