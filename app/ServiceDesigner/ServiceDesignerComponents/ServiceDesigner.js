import React, { memo, createContext, PureComponent } from 'react';
import { Layout as LayoutComponent } from '../components';
import { functions, observables, arrays, objects, geometry, events, debug } from '../utility';

const Context = createContext();

const ObservingProvider = observables.withGetObservable(
  observables.resolve,
  Context.Provider,
)

export const createComponent = ({ createServiceDesigner }) => (
  class ServiceDesigner extends PureComponent {
    handleAction = (action) => {
      this.props.onAction(action);
    };

    serviceDocument = observables.of(this.props.serviceDocument).denote('serviceDocument')

    serviceDesigner = window.SERVICE_DESIGNER = createServiceDesigner(
      this.serviceDocument,
      this.handleAction,
      (({ serviceDocument, onAction, children, ...rest }) => rest) (this.props),
    );

    componentDidUpdate() {
      this.serviceDocument.set(this.props.serviceDocument)
    }

    componentDidMount() {
      let { serviceDesigner } = this
      debug.emit('loaded', { serviceDesigner })
    }

    render() {
      let { children } = this.props;
      return (
        <ObservingProvider value={this.serviceDesigner}>
          {children}
        </ObservingProvider>
      )
    }
  }
);

export const withServiceDesigner = (Consumer) => memo(
  (props) =>
    <Context.Consumer>
      {(serviceDesigner) => <Consumer serviceDesigner={serviceDesigner} {...props}/>}
    </Context.Consumer>
)

export const Layout = withServiceDesigner(
  class Layout extends PureComponent {
    handleMouseDown = (event) => this.props.serviceDesigner.emitEvent('mouseDown', event);
    handleMouseMove = (event) => this.props.serviceDesigner.emitEvent('mouseMove', event);
    handleMouseUp = (event) => this.props.serviceDesigner.emitEvent('mouseUp', event);
    handleClick = (event) => this.props.serviceDesigner.emitEvent('click', event);
    handleKeyDown = (event) => this.props.serviceDesigner.emitEvent('keyDown', event);
    handleKeyUp = (event) => this.props.serviceDesigner.emitEvent('keyUp', event);

    componentDidMount() {
      global.document.body.addEventListener('keydown', this.handleKeyDown);
      global.document.body.addEventListener('keyup', this.handleKeyUp);
    }

    componentWillUnmount() {
      global.document.body.removeEventListener('keydown', this.handleKeyDown);
      global.document.body.removeEventListener('keyup', this.handleKeyUp);
    }

    render() {
      return (
        <LayoutComponent
          onMouseUp={this.handleMouseUp}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          {...this.props}
        />
      )
    }
  }
)