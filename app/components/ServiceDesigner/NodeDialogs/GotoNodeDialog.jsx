import React, { PureComponent, Fragment } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import { Grid, Typography, FormControlLabel, Button, Radio, withStyles } from "@material-ui/core";
import {
  Row,
  Column,
  Box,
  Select,
  Stretch,
  Text,
  TextField,
  RenderWithLoading
} from "components/LayoutElements";
import { Icon } from "components/Elements";
import {
  SearchableChipSelector,
  SearchableNodeSelector,
  SearchableTextfieldSelector
} from "components";
import { DiodeSearchable } from "utils/commonShapes";
import SelectedNodeRow from "./GotoNodeDialog/SelectedNodeRow";

const styleSheet = theme => ({
  contentWrapper: {
    padding: "12px 24px",
    position: "relative",
    overflowY: "auto",
    height: "-webkit-fill-available",
    maxHeight: "100%"
  },

  checkModeSimple: {
    background: "#eee",
    paddingLeft: "16px !important",
    marginRight: 8,
    flexGrow: 1
  },

  checkModeAdvanced: {
    background: "#eee",
    paddingLeft: "16px !important",
    marginLeft: 8,
    flexGrow: 1
  },

  searchableTextfieldSelector: {
    // width: "516px",
    width: "100%"
  },

  searchableTextfieldSelectorList: {
    width: 552,
    marginTop: 0
  }
});

const GotoNodeDialog = withStyles(styleSheet, { name: "GotoNodeDialog" })(
  translate(["servicedesigner", "services", "common"])(
    class GotoNodeDialog extends PureComponent {
      static propTypes = {
        node: PropTypes.any.isRequired,

        searchableServices: DiodeSearchable.isRequired,
        searchableVersions: DiodeSearchable.isRequired,
        searchableNodes: DiodeSearchable.isRequired,
        nodeTypes: PropTypes.object.isRequired,

        handleNodeConfig: PropTypes.func.isRequired,
        loadConfig: PropTypes.func.isRequired,
        callbackOnSubmit: PropTypes.func.isRequired
      };

      static defaultProps = {};

      state = {
        // this service
        // showFilters: false,
        // filters: [],

        // another service

        config: null
      };

      /**
       * We should load config server and save it into state for later update
       * TODO: This function is replicated everywhere. Consider refactoring this.
       */
      componentDidMount() {
        //Load configuration from the server
        this.props
          .loadConfig(this.props.node.id)
          .then(config => {
            console.log(config);
            this.setState(
              { config: config },
              () => this.props.callbackOnSubmit(this.handleNodeConfig) //Pass function to NodeDialog so it would be trigger from there.
            );
          })
          .catch(error => this.setState({ error: error }));
      }

      // TODO: This function is replicated everywhere. Consider refactoring this.
      componentWillUnmount() {
        this.props.callbackOnSubmit(undefined);
      }

      handleNodeConfig = dataFromParent => {
        //Call an Api for submitting node config
        const { config } = this.state;
        const updatedConfig = config.setName(dataFromParent.name);
        return this.props.handleNodeConfig(this.props.node.id, updatedConfig.toScala());
      };

      handleChangeWithSetter = setter => value => this.setState({ config: setter(value) });

      handleChangeFromEvent = setter => event =>
        this.handleChangeWithSetter(setter)(event.target.value);

      handleChangeServiceMode = config => value => param =>
        this.handleChangeWithSetter(config.setServiceMode)(value);

      handleChangeNode = config => this.handleChangeFromEvent(config.setNode);

      handleRemoveSelectedNode = config => () => {
        this.handleChangeWithSetter(config.setNode)(null);
      };

      handleAddDescriptionSelectedNode = config => description => {
        const node = { ...config.node, description };
        this.handleChangeWithSetter(config.setNode)(node);
      };

      renderContent = config => {
        const { searchableNodes, nodeTypes, searchableServices, searchableVersions } = this.props;
        const { classes, t } = this.props;

        const filters = [{ name: "Favourites", values: [] }];

        Object.entries(nodeTypes).forEach(([key, type]) => {
          const filter = filters.find(filter => filter.name === type.category);
          if (filter) {
            filter.values.push(type);
          } else {
            filters.push({ name: type.category, values: [type] });
          }

          if (type.isFavorite) {
            filters[0].values.push(type);
          }
        });

        return (
          <div className={classes.contentWrapper}>
            <Column stretch>
              <Row paddingTop>
                <Column>
                  <Grid container direction="row" spacing={16}>
                    <Grid item className={classes.checkModeSimple}>
                      <FormControlLabel
                        control={
                          <Radio
                            checked={config.serviceMode === "thisService"}
                            onChange={this.handleChangeServiceMode(config)("thisService")}
                          />
                        }
                        label={t("thisService")}
                      />
                    </Grid>
                    <Grid item className={classes.checkModeAdvanced}>
                      <FormControlLabel
                        control={
                          <Radio
                            checked={config.serviceMode === "anotherService"}
                            onChange={this.handleChangeServiceMode(config)("anotherService")}
                          />
                        }
                        label={t("anotherService")}
                      />
                    </Grid>
                  </Grid>
                </Column>
              </Row>
              {config.serviceMode === "thisService" && (
                <Row paddingTopDouble>
                  {!config.node ? (
                    <SearchableNodeSelector
                      searchable={searchableNodes}
                      filters={filters}
                      name="selectedNumber"
                      topLevelOnlyClassName={classes.searchableTextfieldSelector}
                      className={classes.searchableTextfieldSelectorList}
                      value={config.node}
                      label={t("")}
                      emptyLabel={t("gotoNodeSelection")}
                      onChange={this.handleChangeNode(config)}
                      oneValue
                    />
                  ) : (
                    <Column>
                      <Row>
                        <Typography variant="caption">{t("gotoNode")}</Typography>
                      </Row>
                      <Row>
                        <SelectedNodeRow
                          item={config.node}
                          onRemove={this.handleRemoveSelectedNode(config)}
                          onAddDescription={this.handleAddDescriptionSelectedNode(config)}
                        />
                      </Row>
                    </Column>
                  )}
                </Row>
              )}
              {config.serviceMode === "anotherService" && (
                <Row paddingTop>
                  <Column>
                    <Row paddingTop>
                      <SearchableTextfieldSelector
                        searchable={searchableServices}
                        name="selectedService"
                        topLevelOnlyClassName={classes.searchableTextfieldSelector}
                        className={classes.searchableTextfieldSelectorList}
                        value={config.selectedService}
                        label={t("serviceName")}
                        emptyLabel={t("services")}
                        onChange={this.handleChangeFromEvent(config.setSelectedService)}
                        oneValue
                      />
                    </Row>
                    <Row paddingTop>
                      <SearchableTextfieldSelector
                        searchable={searchableVersions}
                        name="selectedVersion"
                        topLevelOnlyClassName={classes.searchableTextfieldSelector}
                        className={classes.searchableTextfieldSelectorList}
                        value={config.selectedVersion}
                        label={t("version")}
                        emptyLabel={t("version")}
                        onChange={this.handleChangeFromEvent(config.setSelectedVersion)}
                        oneValue
                      />
                    </Row>
                    {config.selectedService && config.selectedVersion && config.node && (
                      <Row paddingTopHalf>
                        <Text variant="errorMessage">
                          <Icon>warning</Icon> &nbsp;
                          {t("validateAlert", {
                            service: config.selectedService.name,
                            version: config.selectedVersion.name,
                            node: config.node.name
                          })}
                        </Text>
                      </Row>
                    )}
                    <Row paddingTop>
                      {!config.node ? (
                        <SearchableNodeSelector
                          searchable={searchableNodes}
                          filters={filters}
                          name="selectedNumber"
                          topLevelOnlyClassName={classes.searchableTextfieldSelector}
                          className={classes.searchableTextfieldSelectorList}
                          value={config.node}
                          label={t("gotoNodeSelection")}
                          emptyLabel={t("gotoNodeSelection")}
                          onChange={this.handleChangeNode(config)}
                          oneValue
                        />
                      ) : (
                        <Column>
                          <Row>
                            <Typography variant="caption">{t("gotoNode")}</Typography>
                          </Row>
                          <Row>
                            <SelectedNodeRow
                              item={config.node}
                              onRemove={this.handleRemoveSelectedNode(config)}
                              onAddDescription={this.handleAddDescriptionSelectedNode(config)}
                            />
                          </Row>
                        </Column>
                      )}
                    </Row>
                  </Column>
                </Row>
              )}
            </Column>
          </div>
        );
      };

      render = () => (
        <RenderWithLoading property={this.state.config} renderCallback={this.renderContent} />
      );
    }
  )
);

export default GotoNodeDialog;
