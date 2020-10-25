import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import {
  withStyles,
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";
import { Icon } from "components/Elements";
import { Text } from "components/LayoutElements";
import clsx from "clsx";
import BasicInfoForm from "./CallCarePlayNodeDialog/CallCarePlayNodeForms/BasicInfoForm";
import GroupingForm from "./CallCarePlayNodeDialog/CallCarePlayNodeForms/GroupingForm";
import AudioFilesForm from "./CallCarePlayNodeDialog/CallCarePlayNodeForms/AudioFilesForm";
import KeyPressForm from "./CallCarePlayNodeDialog/CallCarePlayNodeForms/KeyPressForm";

const styleSheet = theme => ({
  contentWrapper: {
    padding: "0px",
    position: "relative",
    overflowY: "auto",
    height: "-webkit-fill-available",
    maxHeight: "100%"
  },

  expansionPanel: {
    marginTop: 1,
    marginBottom: 0,
    "&:before": {
      display: "none"
    }
  },

  expansionPanelSummary: {
    minHeight: 72,
    alignItems: "center",
    "&>div": {
      alignItems: "center"
    }
  },

  heading: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: "bold",
    height: 40,
    marginTop: 18
  },

  expansionPanelDetails: {
    paddingTop: 0
  },

  pageContent: {}
});

const CallCarePlayNodeDialog = withStyles(styleSheet, { name: "CallCarePlayNodeDialog" })(
  translate(["servicedesigner", "common"])(
    class CallCarePlayNodeDialog extends PureComponent {
      static propTypes = {
        node: PropTypes.any.isRequired,
        getBasicInfo: PropTypes.func.isRequired,
        getGrouping: PropTypes.func.isRequired,
        getAudioFiles: PropTypes.func.isRequired,
        getKeyPress: PropTypes.func.isRequired,
        getChildAccounts: PropTypes.func.isRequired,
        getPlayUrl: PropTypes.func,
        getFileUploadMeta: PropTypes.func,
        onCreateAudioFile: PropTypes.func
      };

      state = {
        expandedIndex: 0
      };

      forms = [
        {
          heading: "basicInfo",
          form: BasicInfoForm,
          data: {
            getBasicInfo: this.props.getBasicInfo,
            getChildAccounts: this.props.getChildAccounts
          }
        },
        {
          heading: "grouping",
          form: GroupingForm,
          data: {
            getGrouping: this.props.getGrouping
          }
        },
        {
          heading: "audioFiles",
          form: AudioFilesForm,
          data: {
            getAudioFiles: this.props.getAudioFiles,
            searchableAudioFiles: this.props.searchableAudioFiles,
            searchableAudioSets: this.props.searchableAudioSets,
            getPlayUrl: this.props.getPlayUrl,
            getFileUploadMeta: this.props.getFileUploadMeta,
            onCreateAudioFile: this.props.onCreateAudioFile,
            getAudioSetFromId: this.props.getAudioSetFromId
          }
        },
        {
          heading: "keyPress",
          form: KeyPressForm,
          data: {
            getKeyPress: this.props.getKeyPress
          }
        }
      ];

      handleStepChange = expandedIndex => () => {
        if (expandedIndex === this.state.expandedIndex) {
          expandedIndex = -1;
        }

        this.setState({ expandedIndex });
      };

      render() {
        const { classes, t } = this.props;
        const { expandedIndex } = this.state;
        const forms = this.forms;

        return (
          <div className={classes.contentWrapper}>
            {forms.map((form, index) => (
              <ExpansionPanel
                key={index}
                expanded={expandedIndex === index}
                onChange={this.handleStepChange(index)}
                className={classes.expansionPanel}
              >
                <ExpansionPanelSummary
                  className={classes.expansionPanelSummary}
                  expandIcon={expandedIndex === index ? <Icon>remove</Icon> : <Icon>add</Icon>}
                >
                  <Grid container direction="row" justify="space-between">
                    <Grid item>
                      <Text className={classes.heading}>{t(form.heading)}</Text>
                    </Grid>
                  </Grid>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                  <form.form panelIndex={index} data={form.data} />
                </ExpansionPanelDetails>
              </ExpansionPanel>
            ))}
          </div>
        );
      }
    }
  )
);

export default CallCarePlayNodeDialog;
