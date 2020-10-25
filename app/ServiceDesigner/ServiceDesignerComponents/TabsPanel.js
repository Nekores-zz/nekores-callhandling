import React, { PureComponent, Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import {
  NodesListContainer,
  NodesListSearch,
  NodesListSubheader,
  NodesListItem,
  TabsPanelContainer,
  TabsPanelContent,
  withHover,
  Divide
} from "../components";
import { withServiceDesigner } from "./ServiceDesigner";
import { ServiceDocument } from "../serviceDesigner";
import { functions, observables, arrays, objects, geometry, events, debug } from "../utility";

const PageItem = withHover(({ name, isSelected, onSelect, hover }) => {
  let { isHover, ...hoverHandlers } = hover;
  return (
    <TabsPanelContent.Item {...hoverHandlers} onClick={onSelect} isSelected={isHover || isSelected}>
      <TabsPanelContent.ItemIcon>insert_drive_file</TabsPanelContent.ItemIcon>
      <TabsPanelContent.ItemLabel>{name}</TabsPanelContent.ItemLabel>
      {isHover || isSelected ? (
        <>
          <TabsPanelContent.ItemIcon secondary>file_copy</TabsPanelContent.ItemIcon>
          <TabsPanelContent.ItemIcon secondary>delete</TabsPanelContent.ItemIcon>
        </>
      ) : null}
    </TabsPanelContent.Item>
  );
});

const VersionsGroupItem = ({ title }) => {
  return (
    <Divide bottom>
      <TabsPanelContent.Item secondary>
        <TabsPanelContent.ItemLabel>{title}</TabsPanelContent.ItemLabel>
      </TabsPanelContent.Item>
    </Divide>
  );
};

const VersionItem = withHover(({ level, version, isCurrent, isUnfold, onSelect, hover }) => {
  let { isHover, ...hoverHandlers } = hover;
  return (
    <Divide bottom>
      <TabsPanelContent.Item
        {...hoverHandlers}
        onClick={onSelect}
        isSelected={isHover || isCurrent || isUnfold}
      >
        <div style={{ width: 20 * level }} />
        <TabsPanelContent.ItemIcon>insert_drive_file</TabsPanelContent.ItemIcon>
        <Grid container direction="column">
          <TabsPanelContent.ItemLabel>{version.datetime}</TabsPanelContent.ItemLabel>
          <TabsPanelContent.ItemLabel secondary>{version.author}</TabsPanelContent.ItemLabel>
          {isCurrent ? (
            <TabsPanelContent.ItemLabel secondary>Is current</TabsPanelContent.ItemLabel>
          ) : null}
        </Grid>
        {version.children && version.children.length ? (
          <TabsPanelContent.ItemIcon>
            {isUnfold ? "keyboard_arrow_up" : "keyboard_arrow_down"}
          </TabsPanelContent.ItemIcon>
        ) : null}
      </TabsPanelContent.Item>
    </Divide>
  );
});

const VersionItemSubtree = ({
  level,
  version,
  currentVersion,
  unfoldVersions = {},
  onSelectVersion = () => {}
}) => {
  let isCurrent = version.id === currentVersion;
  let isUnfold = version.children && version.children.length && unfoldVersions[version.id];
  return (
    <>
      <VersionItem
        level={level}
        version={version}
        isCurrent={isCurrent}
        isUnfold={isUnfold}
        onSelect={onSelectVersion}
      />
      {isUnfold
        ? version.children.map(child => (
            <VersionItemSubtree
              key={child.id}
              level={level + 1}
              version={child}
              currentVersion={currentVersion}
              unfoldVersions={unfoldVersions}
              onSelectVersion={onSelectVersion}
            />
          ))
        : null}
    </>
  );
};

const Tabs = {
  NodeTypes: class NodeTypes extends Component {
    state = {
      nodeType: objects.values(this.props.serviceDesigner.nodeTypes)[0],
      nodeCategories: [{ name: "Favourites", nodeTypes: [] }]
    };

    componentDidMount() {
      let { serviceDesigner } = this.props;
      const nodeCategories = [{ name: "Favourites", nodeTypes: [], isOpen: true }];

      objects.values(serviceDesigner.nodeTypes).forEach(type => {
        const category = nodeCategories.find(filter => filter.name === type.category);
        if (category) {
          category.nodeTypes.push(type);
        } else {
          nodeCategories.push({ name: type.category, nodeTypes: [type], isOpen: false });
        }

        if (type.isFavorite) {
          nodeCategories[0].nodeTypes.push(type);
        }
      });

      this.setState({ nodeCategories });
    }

    handleMouseDown = nodeType => event => {
      this.props.serviceDesigner.emitEvent("startCreatingNode", nodeType, event);
      this.setState({ nodeType });
    };

    handleClick = nodeType => event => this.setState({ nodeType });

    handleCollapseCategory = nodeCategory => event => {
      const { nodeCategories } = this.state;
      const index = nodeCategories.indexOf(nodeCategory);
      nodeCategories.forEach(category => category !== nodeCategory && (category.isOpen = false));
      nodeCategory.isOpen = !nodeCategory.isOpen;
      this.setState({ nodeCategories: [...nodeCategories] });
    };

    render() {
      const { nodeCategories } = this.state;

      console.log(this.state.nodeType);

      return (
        <NodesListContainer>
          <Divide bottom>
            <NodesListSearch searchString={""} onClear={() => {}} onChange={() => {}} />
          </Divide>
          {nodeCategories.map((nodeCategory, index) => (
            <Divide bottom key={index}>
              <NodesListSubheader
                label={nodeCategory.name}
                isOpen={nodeCategory.isOpen}
                onClick={this.handleCollapseCategory(nodeCategory)}
              />
              {nodeCategory.isOpen &&
                nodeCategory.nodeTypes.map((nodeType, index) => (
                  <NodesListItem
                    key={nodeType.nodeType}
                    onMouseDown={this.handleMouseDown(nodeType.nodeType)}
                    nodeType={nodeType}
                    isSelected={nodeType.nodeType === this.state.nodeType}
                    onClick={this.handleClick(nodeType.nodeType)}
                    key={index}
                  />
                ))}
            </Divide>
          ))}
        </NodesListContainer>
      );
    }
  },

  Pages: ({ pages, pageId, onCreate, onSelect }) => (
    <TabsPanelContent.Items>
      <Divide bottom>
        <TabsPanelContent.Item onClick={onCreate}>
          <TabsPanelContent.ItemIcon>add</TabsPanelContent.ItemIcon>
          <TabsPanelContent.ItemLabel>ADD A NEW PAGE</TabsPanelContent.ItemLabel>
        </TabsPanelContent.Item>
      </Divide>
      {objects.values(pages).map(page => (
        <PageItem
          key={page.id}
          name={page.name}
          isSelected={page.id === pageId}
          onSelect={() => onSelect(page)}
        />
      ))}
    </TabsPanelContent.Items>
  ),

  Versions: ({ versions, versionId, onSelect, onUnfold }) => {
    return (
      <TabsPanelContent.Items>
        <Divide bottom>
          <TabsPanelContent.Item>
            <TabsPanelContent.ItemLabel>Versions history</TabsPanelContent.ItemLabel>
          </TabsPanelContent.Item>
        </Divide>
        <VersionsGroupItem title={"This month"} />
        {versions.map(version => (
          <Divide key={version.id} bottom>
            <VersionItemSubtree
              level={0}
              version={version}
              currentVersion={versionId}
              onSelect={onSelect}
            />
          </Divide>
        ))}
      </TabsPanelContent.Items>
    );
  }
};

const tabs = Object.keys(Tabs);

export const TabsPanel = withServiceDesigner(
  class TabsPanel extends Component {
    state = {
      currentTab: "NodeTypes"
    };

    render() {
      let { currentTab } = this.state;
      let CurrentTab = Tabs[currentTab];
      return (
        <TabsPanelContainer
          tabs={tabs}
          activeTab={currentTab}
          onSelect={currentTab => this.setState({ currentTab })}
        >
          <CurrentTab {...this.props} />
        </TabsPanelContainer>
      );
    }
  }
);

// const tabs = ['NODES', 'PAGES', 'HISTORY'];

// tabsContent = {
//   'NODES': () => <NodesList nodeTypes={nodeTypes} onNodeType={this.handleStartCreatingNode}/>,
//   'PAGES': ({pages, pageId}) => {
//     return (
//       <TabsPanelContent.Items>
//         <Divide bottom>
//           <TabsPanelContent.Item onClick={this.handleCreatePage}>
//             <TabsPanelContent.ItemIcon>add</TabsPanelContent.ItemIcon>
//             <TabsPanelContent.ItemLabel>ADD A NEW PAGE</TabsPanelContent.ItemLabel>
//           </TabsPanelContent.Item>
//         </Divide>
//         {objects.values(pages).map((page) =>
//           <Divide key={page.id} bottom>
//             <this.PageItem name={page.name} isSelected={page.id === pageId} onSelect={() => {}}/>
//           </Divide>
//         )}
//       </TabsPanelContent.Items>
//     );
//   },
//   'HISTORY': ({versions, versionId}) => {
//     return (
//       <TabsPanelContent.Items>
//         <Divide bottom>
//           <TabsPanelContent.Item>
//             <TabsPanelContent.ItemLabel>Versions history</TabsPanelContent.ItemLabel>
//           </TabsPanelContent.Item>
//         </Divide>
//         <this.VersionsGroupItem title={'This month'}/>
//         {versions.map((version) =>
//           <Divide key={version.id} bottom>
//             <this.VersionItemSubtree level={0} version={version} isCurrent={version.id === versionId}/>
//           </Divide>
//         )}
//       </TabsPanelContent.Items>
//     );
//   },
// };

// export const TabsPanel = withServiceDesigner(
//   class TabsPanel extends PureComponent {

//     handleTabChange = (activeTab) => (event) => this.setState({activeTab});

//     handleStartCreatingNode = (nodeType, event) => this.props.serviceDesigner.emitEvent('startCreatingNode', nodeType, event);

//     state = {
//       activeTab: tabs[0],
//       unfoldVersions: {},
//     };

//     PageItem = withHover(({name, isSelected, onSelect, hover}) => {
//       let {isHover, ...hoverHandlers} = hover;
//       return (
//         <TabsPanelContent.Item {...hoverHandlers} onClick={onSelect} isSelected={isHover || isSelected}>
//           <TabsPanelContent.ItemIcon >insert_drive_file</TabsPanelContent.ItemIcon>
//           <TabsPanelContent.ItemLabel>{name}</TabsPanelContent.ItemLabel>
//           {isHover || isSelected ? (
//             <>
//               <TabsPanelContent.ItemIcon secondary>file_copy</TabsPanelContent.ItemIcon>
//               <TabsPanelContent.ItemIcon secondary>delete</TabsPanelContent.ItemIcon>
//             </>
//           ) : null}
//         </TabsPanelContent.Item>
//       );
//     });

//     VersionsGroupItem = ({title}) => {
//       return (
//         <Divide bottom>
//           <TabsPanelContent.Item secondary>
//             <TabsPanelContent.ItemLabel>{title}</TabsPanelContent.ItemLabel>
//           </TabsPanelContent.Item>
//         </Divide>
//       );
//     };

//     VersionItem = withHover(({level, version, isCurrent, isUnfold, onSelect, hover}) => {
//       let {isHover, ...hoverHandlers} = hover;
//       return (
//         <Divide bottom>
//           <TabsPanelContent.Item {...hoverHandlers} onClick={onSelect} isSelected={isHover || isCurrent || isUnfold}>
//             <div style={{width: 20 * level}}></div>
//             <TabsPanelContent.ItemIcon>insert_drive_file</TabsPanelContent.ItemIcon>
//             <Grid container direction="column">
//               <TabsPanelContent.ItemLabel>{version.datetime}</TabsPanelContent.ItemLabel>
//               <TabsPanelContent.ItemLabel secondary>{version.author}</TabsPanelContent.ItemLabel>
//               {isCurrent ? <TabsPanelContent.ItemLabel secondary>Is current</TabsPanelContent.ItemLabel> : null}
//             </Grid>
//             {version.children ? <TabsPanelContent.ItemIcon>{isUnfold ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}</TabsPanelContent.ItemIcon> : null}
//           </TabsPanelContent.Item>
//         </Divide>
//       );
//     });

//     VersionItemSubtree = ({level, version, isCurrent, isUnfold}) => {
//       return (
//         <>
//           <this.VersionItem level={level} version={version} isCurrent={isCurrent} isUnfold={isUnfold}/>
//           {isUnfold ? version.children.map((child) =>
//             <this.VersionItemSubtree key={child.id} level={level + 1} version={child}/>
//           ) : null}
//         </>
//       );
//     };

//     render() {
//       let Tab = this.tabsContent[this.state.activeTab];
//       return (
//         <TabsPanelContainer tabs={tabs} activeTab={this.state.activeTab} onSelect={this.handleTabChange}>
//           <Tab {...this.props} {...this.state}/>
//         </TabsPanelContainer>
//       );
//     }
//   }
// );
