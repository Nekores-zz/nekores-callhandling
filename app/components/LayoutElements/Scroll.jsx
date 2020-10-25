import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";

class Scroll extends Component {
  renderView({ style, ...props }) {
    const viewStyle = {
      padding: 0
    };
    return (
      <div className="box" style={{ ...style, ...viewStyle }} {...props} />
    );
  }

  renderThumb({ style, ...props }) {
    const thumbStyle = {
      width: "8px",
      backgroundColor: "#a8a8a8"
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  }

  render() {
    return (
      <Scrollbars
        style={{
          height: this.props.height ? this.props.height : "auto",
          width: this.props.width ? this.props.width : "auto",
          overflowX: this.props.hideOverflowX ? "hidden" : "auto"
        }}
        renderView={this.renderView}
        renderThumbVertical={this.renderThumb}
      >
        {this.props.children}
      </Scrollbars>
    );
  }
}

export default Scroll;
