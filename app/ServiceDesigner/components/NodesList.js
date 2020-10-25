import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {withStyles, Grid, Icon, Input} from '@material-ui/core';
import {objects, functions} from '../utility';
import {Paper, Node, Link, Divider, ColorBar, withHover, Tooltip, TooltipContent} from '../components';

const styleSheet = (theme) => ({
  container: {
    userSelect: 'none',
  },
  search: {
    padding: 20,
    paddingLeft: 25,
  },
  nodeCategory: {
    padding: 20,
    paddingLeft: 25,
    cursor: 'pointer',
  },
  searchInput: {
    ...theme.typography.serviceDesignerMenu,
    color: theme.colors.white,
    flex: 1,
  },
  clearIcon: {
    color: theme.colors.white,
    cursor: 'pointer',
  },
  icon: {
    color: theme.colors.white,
  },
  secondaryIcon: {
    color: theme.colors.darkWhite,
  },
  nodeCategoryName: {
    flex: 1,
    ...theme.typography.serviceDesignerMenu,
    textTransform: 'uppercase',
    color: theme.colors.white,
  },
  nodeName: {
    paddingLeft: 10,
    flex: 1,
    ...theme.typography.serviceDesignerMenu,
    color: theme.colors.darkWhite,
  },
  node: {
    position: 'relative',
    padding: 20,
    marginTop: -10,
    paddingLeft: 25,
    cursor: 'pointer',
  },
  hoverNode: {
    backgroundColor: '#3F3F3F',
    zIndex: 20,
  },
  activeNode: {
    backgroundColor: theme.colors.darkGray,
  },
  marginRight: {
    marginRight: 10,
  },
  favoriteIcon: {
    color: '#FFC108',
  },
});

export const NodesListSearch = withStyles(styleSheet, {name: 'NodesListSearch'}) (
  ({ searchString, onChange, onClear, classes }) => 
    <Grid 
      item container 
      direction="row" wrap="nowrap" alignItems="center" 
      className={classes.search}
    >
      <Input 
        value={searchString} 
        onChange={onChange} 
        placeholder={'Search nodes'} 
        className={clsx(classes.searchInput)} 
        disableUnderline
      />
      {searchString && 
        <Icon onClick={onClear} classes={{root: classes.clearIcon}}>clear</Icon>
      }
      <Icon classes={{root: classes.icon}}>search</Icon>
    </Grid>
)

export const NodesListContainer = withStyles(styleSheet, {name: 'NodesListContainer'}) (
  ({ children, classes }) => 
    <Grid 
      container 
      direction="column" alignItems="stretch" wrap="nowrap" 
      className={classes.container}
    >
      {children}
    </Grid>
)

export const NodesListSubheader = withStyles(styleSheet, {name: 'NodesListSubheader'}) (
  ({ label, isOpen, onClick, classes }) => 
    <Grid 
      onClick={onClick} 
      item container 
      direction="row" wrap="nowrap" alignItems="center" 
      className={classes.nodeCategory}
    >
      <Grid item className={classes.nodeCategoryName}>
        {label}
      </Grid>
      <Icon classes={{root: classes.icon}}>{isOpen ? 'remove' : 'add'}</Icon>
    </Grid>
)

export const NodesListItem = withStyles(styleSheet, {name: 'NodesListItem'}) (
  withHover(({ nodeType, isSelected, onMouseDown, onClick, classes, hover }) => {
    let { isHover, ...hoverHandlers } = hover
    let { color, icon: NodeTypeIcon } = nodeType
    return (
      <Grid
        item container
        direction="row" wrap="nowrap"
        alignItems="center"
        className={clsx(classes.node, {[classes.hoverNode]: isHover, [classes.activeNode]: isSelected})}
        onClick={onClick}
        onMouseDown={onMouseDown}
        {...hoverHandlers}
      >
        {isSelected ? <ColorBar color={color}/> : null}
        <NodeTypeIcon classes={{ root: classes.secondaryIcon }}/>
        <Grid item className={classes.nodeName}>{nodeType.name}</Grid>
        {isHover ? <>
          <Tooltip content={<TooltipContent title={nodeType.nodeType} text={`nodeTypeDescription.${nodeType.nodeType}`}/>}>
            <Icon classes={{
              root: clsx(classes.secondaryIcon, classes.marginRight)
            }}>info</Icon>
          </Tooltip>
          <Icon classes={{
            root: clsx(classes.secondaryIcon, { [classes.favoriteIcon]: false })
          }}>star</Icon>
        </> : null}
      </Grid>
    )
  })
)

// const styleSheet = (theme) => ({
//   container: {
//     userSelect: 'none',
//   },
//   search: {
//     padding: 20,
//     paddingLeft: 25,
//   },
//   nodeCategory: {
//     padding: 20,
//     paddingLeft: 25,
//     cursor: 'pointer',
//   },
//   searchInput: {
//     ...theme.typography.serviceDesignerMenu,
//     flex: 1,
//   },
//   clearIcon: {
//     color: theme.colors.white,
//     cursor: 'pointer',
//   },
//   icon: {
//     color: theme.colors.white,
//   },
//   secondaryIcon: {
//     color: theme.colors.darkWhite,
//   },
//   nodeCategoryName: {
//     flex: 1,
//     ...theme.typography.serviceDesignerMenu,
//     textTransform: 'uppercase',
//     color: theme.colors.white,
//   },
//   nodeName: {
//     paddingLeft: 10,
//     flex: 1,
//     ...theme.typography.serviceDesignerMenu,
//     color: theme.colors.darkWhite,
//   },
//   node: {
//     position: 'relative',
//     padding: 20,
//     marginTop: -10,
//     paddingLeft: 25,
//     cursor: 'pointer',
//   },
//   hoverNode: {
//     backgroundColor: '#3F3F3F',
//     zIndex: 20,
//   },
//   activeNode: {
//     backgroundColor: theme.colors.darkGray,
//   },
//   marginRight: {
//     marginRight: 10,
//   },
//   favoriteIcon: {
//     color: '#FFC108',
//   },
// });

// export const NodesList = withStyles(styleSheet, {name: 'NodesList'}) (
//   class NodesList extends PureComponent {
//     static propTypes = {
//       nodeTypes: PropTypes.object.isRequired,
//       onNodeType: PropTypes.func,
//       classes: PropTypes.any.isRequired,
//     };

//     state = {
//       searchString: '',
//       isOpen: {
//         'favorites': true,
//       },
//       selectedNodeType: objects.takeAny(this.props.nodeTypes),
//     };

//     handleClearSearch = (event) => {
//       this.setState({searchString: ''});
//     };

//     handleSearchChange = (event) => {
//       let searchString = event.target.value;
//       this.setState({searchString});
//     };

//     handleToggleOpen = (key, value) => (event) => {
//       let isOpen = {
//         ...this.state.isOpen,
//         [key]: value,
//       };
//       this.setState({isOpen});
//     };

//     handleSelect = (selectedNodeType) => (event) => {
//       this.setState({selectedNodeType});
//     };

//     Search = ({searchString, onChange, onClear, classes}) => (
//       <Grid item container direction="row" wrap="nowrap" alignItems="center" className={classes.search}>
//         <Input value={searchString} onChange={onChange} placeholder={'Search nodes'} className={clsx(classes.searchInput)} disableUnderline/>
//         {searchString ? <Icon onClick={onClear} classes={{root: classes.clearIcon}}>clear</Icon> : null}
//         <Icon classes={{root: classes.icon}}>search</Icon>
//       </Grid>
//     );

//     NodeType = withHover(({onMouseDown, nodeType, isSelected, onClick, classes, hover}) => {
//       let {isHover, ...hoverHandlers} = hover;
//       return (
//         <Grid
//           onClick={onClick}
//           onMouseDown={onMouseDown}
//           item container
//           direction="row" wrap="nowrap"
//           alignItems="center"
//           className={clsx(classes.node, {[classes.hoverNode]: isHover, [classes.activeNode]: isSelected})}
//           {...hoverHandlers}
//         >
//           {isSelected ? <ColorBar color={nodeType.color}/> : null}
//           <nodeType.icon classes={{root: classes.secondaryIcon}}/>
//           <Grid item className={classes.nodeName}>{nodeType.nodeType}</Grid>
//           {isHover ? (
//             <Fragment>
//               <Tooltip content={<TooltipContent title={nodeType.nodeType} text={nodeType.description}/>}>
//                 <Icon classes={{root: clsx(classes.secondaryIcon, classes.marginRight)}}>info</Icon>
//               </Tooltip>
//               <Icon classes={{root: clsx(classes.secondaryIcon, {[classes.favoriteIcon]: nodeType.isFavorite})}}>star</Icon>
//             </Fragment>
//           ) : null}
//         </Grid>
//       );
//     });

//     render() {
//       let {nodeTypes, onNodeType, classes} = this.props;
//       let {searchString, selectedNodeType, isOpen} = this.state;
//       return (
//         <Grid container direction="column" alignItems="stretch" wrap="nowrap" className={classes.container}>
//           <this.Search searchString={searchString} onClear={this.handleClearSearch} onChange={this.handleSearchChange} classes={classes}/>
//           <Divider/>
//           {[{name: 'favorites', nodeTypes}]
//           .map((category) => (
//             <Fragment key={category.name}>
//               <Grid onClick={this.handleToggleOpen(category.name, !this.state.isOpen[category.name])} item container direction="row" wrap="nowrap" alignItems="center" className={classes.nodeCategory}>
//                 <Grid item className={classes.nodeCategoryName}>{category.name}</Grid>
//                 <Icon classes={{root: classes.icon}}>{this.state.isOpen[category.name] ? 'minimize' : 'add'}</Icon>
//               </Grid>
//               {isOpen[category.name] ? objects.values(category.nodeTypes).map((nodeType, i) => (
//                 <this.NodeType key={i} onMouseDown={(event) => onNodeType(nodeType, event)} nodeType={nodeType} isSelected={nodeType === selectedNodeType} onClick={this.handleSelect(nodeType)} classes={classes}/>
//               )) : null}
//               <Divider/>
//             </Fragment>
//           ))}
//         </Grid>
//       );
//     }
//   }
// );
