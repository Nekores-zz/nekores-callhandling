import {Scrollbars} from 'react-custom-scrollbars';
import React from 'react';

export default class Subscroller extends React.Component {
 constructor(props, ...rest) {
   super(props, ...rest);
   this.state = { top: 0 };
   this.handleUpdate = this.handleUpdate.bind(this);
   this.renderView = this.renderView.bind(this);
   this.renderThumb = this.renderThumb.bind(this);
 }

 handleUpdate(values) {
   const { top } = values;
   this.setState({ top });
 }

 renderView({ style, ...props }) {
   const { top } = this.state;
   const viewStyle = {
     padding: 15,
     backgroundColor: '#F2F2F2',
     color: 'black',

   };
   return (
     <div
       className="box"
       style={{ ...style, ...viewStyle }}
       {...props} />
   );
 }

 renderThumb({ style, ...props }) {
   const { top } = this.state;
   const thumbStyle = {
     backgroundColor: 'black',
     width: '6px',
     right: '3px',

   };
   return (
     <div
       style={{ ...style, ...thumbStyle }}
       {...props} />
   );
 }

 render() {
   return (
     <Scrollbars
       renderView={this.renderView}
       renderThumbHorizontal={this.renderThumb}
       renderThumbVertical={this.renderThumb}
       onUpdate={this.handleUpdate}
       {...this.props} autoHeightMin={332} thumbSize={31}/>
   );
 }

}
