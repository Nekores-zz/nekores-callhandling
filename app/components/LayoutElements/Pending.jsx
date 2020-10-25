import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { CircularProgress } from "@material-ui/core";

export function RenderWithLoading(props) {
  const color = { color: "#2196F3" };
  let _props = props.loaderProps || {};
  if (props.property === null || props.property === undefined) {
    return (
      <div style={{ width: "100%", textAlign: "center", marginTop: "10%" }}>
        <CircularProgress style={{ ...color, ..._props }} />
      </div>
    );
  } else {
    return props.renderCallback.call(this, props.property);
  }
}

class Pending extends PureComponent {
  // WARNING: Async code might have some leak issues, due to Javascript promise design
  // (promises are not cancelable), any attempt to change this will most probably be
  // only a hack on to hide the warning from react, but does not really solve the issue.
  // See: https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html

  static propTypes = {
    content: PropTypes.object.isRequired,
    onResponse: PropTypes.func.isRequired,
    loader: PropTypes.func, // if no loader component is passed, defaults to mui CircularProgress
    onFail: PropTypes.func,
    operationMode: PropTypes.string, // can be: "promise" or "diode"
    forceWait: PropTypes.bool, // set 'true' for keep loading, no matter what
    fullWidth: PropTypes.bool // if defined as "true" will use all width and center itself
  };

  static defaultProps = {
    operationMode: "promise"
  };

  state = {
    isLoading: true,
    resolved: false,
    data: null,
    displayLoader: null
  };

  timer = null;
  diodeInterval = null;

  componentDidMount = () => {
    this.timer = setTimeout(
      () =>
        this.setState({
          displayLoader: this.props.loader ? (
            <this.props.loader />
          ) : this.props.fullWidth ? (
            <div style={{ width: "100%", textAlign: "center" }}>
              <CircularProgress style={{ color: "#2196F3" }} />
            </div>
          ) : (
            <CircularProgress style={{ color: "#2196F3" }} />
          )
        }),
      200
    );

    if (this.props.operationMode === "promise") {
      this.props.content.then(
        response =>
          this.setState({
            isLoading: false,
            resolved: true,
            data: () => response
          }),
        failReason =>
          this.setState({
            isLoading: false,
            resolved: false,
            reason: () => failReason
          })
      );
    } else if (this.props.operationMode === "diode") {
      this.props.content.loading
        ? (this.diodeInterval = setInterval(this.checkIfDiodeLoaded, 150))
        : this.processDiodeContent();
    } else {
      console.log("[ Pending ]: Unknown operationMode!");
    }
  };

  componentWillUnmount = () => {
    if (this.timer !== null) clearTimeout(this.timer);
    if (this.diodeInterval !== null) clearInterval(this.diodeInterval);
  };

  checkIfDiodeLoaded = () => {
    if (!this.props.content.loading) {
      this.processDiodeContent();
      clearInterval(this.diodeInterval);
    }
  };

  processDiodeContent = () => {
    this.props.content.error === undefined
      ? this.setState({
          isLoading: false,
          resolved: true,
          data: () => this.props.content.data
        })
      : this.setState({
          isLoading: false,
          resolved: false,
          reason: () => this.props.content.error
        });
  };

  renderProgress = () => this.state.displayLoader;

  render = () => {
    return this.props.forceWait || this.state.isLoading
      ? this.renderProgress()
      : this.state.resolved
      ? this.props.onResponse(this.state.data())
      : this.props.onFail !== undefined
      ? this.props.onFail(this.state.reason())
      : console.log("Loading error at Pending component: " + this.state.reason());
  };
}

export default Pending;
