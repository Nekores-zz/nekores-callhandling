import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles, Input } from "@material-ui/core";
import { withRouter } from "react-router";
import { translate } from "react-i18next";
import { strings, arrays } from "utils";
import {
  PrimaryTextLink,
  PrimaryButton,
  SecondaryTextLink,
  IconButton,
  Icon,
  Avatar,
  Divider,
  VerticalFilesPicker,
  HorizontalFilesPicker,
  DropDownMenu
} from "components/Elements";
import { ConfirmDialog } from "components";
import {
  Text,
  Select,
  Page,
  Box,
  Stretch,
  Collapse,
  Progress,
  Line,
  TextField,
  Row,
  Column,
  Padding,
  ChipInput,
  Checkbox,
  Radio,
  Tooltip,
  ConfirmButtons,
  ExpandableSectionRadio,
  HorizontalDivider
} from "components/LayoutElements";
import { Grid, MenuItem } from "@material-ui/core";
import { AudioPlayer, RecordButton, Timer, RecordIcon } from "./AudioPlayer";
import AudioStatus from "./AudioStatus";
import { styleSheet, largeMainIconStylesheet } from "jss/Audio/UploadAudio";
import FileUploadDialog from "./FileUploadDialog";
import RecordFromPhoneDialog from "./RecordFromPhoneDialog";
import AudioFileList from "./AudioFileList";
import clsx from "clsx";
import { voiceArtists } from "config/audioMockData.js";
import { audioSets } from "config/audioMockData";
import { handleFileUpload } from "../../utils/upload";
import { generateUid } from "../../utils/strings";
import { SingleAudioPlayer } from "./AudioPlayer";

const ListContainer = ({ children }) => (
  <Column borderHalf stretch>
    {children}
  </Column>
);

const ListRow = ({ children, isSelected, ...props }) => (
  <Row borderHalf paddingHalf backgroundHighlight={isSelected} {...props}>
    {children}
  </Row>
);

const ListHeaderRow = ({ children, ...props }) => <ListRow {...props}>{children}</ListRow>;

const ListField = ({ children, isStretching, ...props }) => (
  <Column stretch={isStretching} paddingRightHalf paddingLeftHalf {...props}>
    {children}
  </Column>
);

const LargeMainIcon = withStyles(largeMainIconStylesheet, { name: "LargeMainIcon" })(
  ({ name, classes, className, ...props }) => (
    <Icon
      fontSize="large"
      className={className ? clsx(classes.root, className) : classes.root}
      {...props}
    >
      {name}
    </Icon>
  )
);

const SingleFileButton = withStyles(styleSheet, { name: "SingleFileButton" })(
  translate("audio")(({ t, information, mark, name, iconName, classes, onClick }) => {
    return (
      <div className={classes.singleFileButton} onClick={onClick}>
        <Column stretch justifyChildrenCenter paddingTopDouble paddingBottomDouble>
          <Row positionRelative paddingBottom justifyChildrenCenter>
            <LargeMainIcon name={iconName} />
            {mark && (
              <Text variant="thirdSmallOutlined" className={classes.mark}>
                {t(mark)}
              </Text>
            )}
          </Row>
          <Row justifyChildrenCenter>
            <Text>{t(name)}</Text>
            {information && (
              <Text className={information}>
                <Icon>info</Icon>
              </Text>
            )}
          </Row>
        </Column>
      </div>
    );
  })
);

const RecordFromBrowser = translate("audio")(
  ({ t, audioRecord, isRecording, onSubmit, onCancel }) => (
    <ListContainer>
      <ListRow>
        <Column stretch alignChildrenCenter>
          <Row paddingHalf justifyChildrenCenter>
            <Timer ms={audioRecord.duration} size="large" />
          </Row>
          <Row paddingHalf justifyChildrenCenter>
            <RecordButton isRecording={true}>
              {t(isRecording ? "stopRecording" : "startRecording")}
            </RecordButton>
          </Row>
        </Column>
      </ListRow>
      <ListRow paddingNone>
        <IconButton onClick={onCancel}>
          <Icon>delete</Icon>
        </IconButton>
        <Box stretch />
        <IconButton onClick={onSubmit}>
          <Icon color="action">done</Icon>
        </IconButton>
      </ListRow>
    </ListContainer>
  )
);

const RecordFromPhone = translate("audio")(({ t, phone, code }) => (
  <Column paddingHalf borderDouble>
    <Row paddingHalf>
      <Text>
        1. {t("call")} <Text bold>{phone}</Text>
      </Text>
    </Row>
    <Row paddingHalf>
      <Text>
        2. {t("whenAskedForPINPleaseEnter")} <Text bold>{code}</Text>
      </Text>
    </Row>
  </Column>
));

const OrderRow = translate("audio")(({ t, order }) => (
  <ListRow>
    <ListField>
      <Avatar src={order.to.avatarUrl} />
    </ListField>
    <ListField isStretching alignChildrenStart>
      <Text variant="primarySmallBody">{order.to.name}</Text>
      <Text variant="secondarySmallBody">{order.to.from}</Text>
      <Text variant="thirdSmall">{order.to.price}</Text>
    </ListField>
    <ListField alignChildrenStart>
      <Text variant="secondarySmallBody">{t("purchaseDate")}</Text>
      <Text>{order.date}</Text>
    </ListField>
    <ListField alignChildrenStart>
      <Text variant="secondarySmallBody">{t("status")}</Text>
      <AudioStatus status={order.status} />
    </ListField>
    <ListField>
      <Text />
      <PrimaryTextLink>{t("cancelOrder")}</PrimaryTextLink>
    </ListField>
  </ListRow>
));

const OrdersList = translate("audio")(({ t, orders }) => (
  <ListContainer>
    <ListHeaderRow>
      <ListField>
        <Text variant="sectionHeaders">{t("yourOrders")}</Text>
      </ListField>
    </ListHeaderRow>
    {orders.map((order, i) => (
      <OrderRow order={order} key={i} />
    ))}
  </ListContainer>
));

const VoiceArtistRow = translate("audio")(({ t, voiceArtist, isSelected }) => (
  <ListRow>
    <ListField>
      <Avatar src={voiceArtist.avatarUrl} />
    </ListField>
    <ListField isStretching alignChildrenStart>
      <Text variant="primarySmallBody">{voiceArtist.name}</Text>
      <Text variant="secondarySmallBody">{voiceArtist.from}</Text>
      <Text variant="thirdSmall">{voiceArtist.price}</Text>
    </ListField>
    <ListField>
      <Text />
      <Row>
        <PrimaryTextLink>
          <Icon fontSize="small">play_circle_filled_white</Icon>
          {t("select")}
        </PrimaryTextLink>
      </Row>
    </ListField>
  </ListRow>
));

const VoiceArtistsList = translate("audio")(({ t, ...props }) => {
  let language = null;
  let region = null;
  // languages = arrays.union(this.props.voiceArtists.map(
  //   (voiceArtist) => voiceArtist.languages
  // ));
  // regions = arrays.union(this.props.voiceArtists.map(
  //   (voiceArtist) => voiceArtist.region
  // ));
  return (
    <ListContainer>
      <ListHeaderRow>
        <ListField>
          <Text variant="sectionHeaders">{"Choose a voice artist"}</Text>
        </ListField>
      </ListHeaderRow>
      <ListRow>
        <ListField stretch>
          <Select
            onChange={() => {}}
            getKey={x => x}
            renderOption={t}
            options={["all"]}
            value={"all"}
            label={t("languages")}
            fullWidth
          />
        </ListField>
        <Column noStretch>
          <Line />
        </Column>
        <ListField stretch>
          <Select
            onChange={() => {}}
            getKey={x => x}
            renderOption={t}
            options={["all"]}
            value={"all"}
            label={t("regions")}
            fullWidth
          />
        </ListField>
      </ListRow>
      {props.voiceArtists.map((voiceArtist, i) => (
        <VoiceArtistRow
          voiceArtist={voiceArtist}
          isSelected={voiceArtist === props.voiceArtist}
          key={i}
        />
      ))}
    </ListContainer>
  );
});

const CreateOrder = translate("audio")(
  class extends Component {
    state = {
      text: ""
    };

    handleTextChange = event => {
      let text = event.target.value;
      this.setState({ text });
    };

    render() {
      let { t, voiceArtist, currency } = this.props;
      let { text } = this.state;
      let words = strings.words(text).length;
      let net = words * voiceArtist.price;
      let vat = Math.ceil(net * this.props.vat);
      let total = vat + net;
      return (
        <ListContainer>
          <ListHeaderRow>
            <ListField>
              <Text variant="sectionHeaders">{t("createOrder")}</Text>
            </ListField>
          </ListHeaderRow>
          <ListRow>
            <Column>
              <Row>
                <ListField>
                  <Avatar src={voiceArtist.avatarUrl} />
                </ListField>
                <ListField stretch alignChildrenStart>
                  <Text variant="primarySmallBody">{voiceArtist.name}</Text>
                  <Text variant="secondarySmallBody">{voiceArtist.from}</Text>
                  <Text variant="thirdSmall">
                    {currency}
                    {voiceArtist.price}
                  </Text>
                </ListField>
                <Row noStretch>
                  <AudioPlayer.PlayButton size="small" />
                  <IconButton size="small">
                    <Icon>delete</Icon>
                  </IconButton>
                </Row>
              </Row>
              <Row paddingHalf>
                <TextField
                  value={text}
                  onChange={this.handleTextChange}
                  variant="outlined"
                  fullWidth
                />
              </Row>
              <Row>
                <Stretch />
                <Box paddingHalf>
                  <Text variant="primarySmallBody">{t("words", { words })}</Text>
                </Box>
                <Box paddingHalf>
                  <Text variant="thirdSmall">
                    {currency}
                    {net}
                  </Text>
                </Box>
              </Row>
            </Column>
          </ListRow>
          <ListRow>
            <Column isStretching />
            <Column alignChildrenEnd paddingHalf noStretch>
              <Text variant="primarySmallBody">{t("net")}</Text>
              <Text variant="primarySmallBody">{t("vat")}</Text>
              <Text variant="thirdSmall">{t("total")}</Text>
            </Column>
            <Column alignChildrenStart paddingHalf noStretch>
              <Text variant="primarySmallBody">
                {currency}
                {net}
              </Text>
              <Text variant="primarySmallBody">
                {currency}
                {vat}
              </Text>
              <Text variant="thirdSmall">
                {currency}
                {total}
              </Text>
            </Column>
          </ListRow>
        </ListContainer>
      );
    }
  }
);

class UploadAudio extends Component {
  static propTypes = {
    isCreate: PropTypes.bool.isRequired,
    onAudioFileChange: PropTypes.func.isRequired,
    audioSets: PropTypes.array,
    navigation: PropTypes.object.isRequired,
    vat: PropTypes.number,

    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    audioFile: PropTypes.object,
    onAddFile: PropTypes.func,
    onUploadComplete: PropTypes.func,
    onUploadFailure: PropTypes.func,
    onDeleteFile: PropTypes.func,
    onRenameFile: PropTypes.func,
    getFileUploadMeta: PropTypes.func,
    getPlayUrl: PropTypes.func,

    t: PropTypes.func.isRequired
  };

  static defaultProps = {
    vat: 0.2,
    currency: "£",
    voiceArtists: voiceArtists
  };

  state = {
    recordedFromBrowser: { name: "Audio1.mp3", duration: 153000 },
    recordedFromPhone: { name: "Audio1.mp3", duration: 325000 },
    voiceArtists: this.props.voiceArtists,
    voiceArtist: this.props.voiceArtists[0],
    orders: [
      {
        to: this.props.voiceArtists[0],
        date: "1 Mar, 2018",
        status: "pending"
      }
    ],
    createNewSet: false,
    audioMenuSelected: "rename",
    uploadDialog: false,
    recordFromPhoneDialog: false,
    recordFromBrowserDialog: false,
    uploadModeSelected: "addMoreAudios",
    leavePageDialog: false,
    deleteDialog: false,
    editFileExpanded: false,
    newSetName: ""
  };

  handleOption = type => isChecked => {
    this.props.onAudioFileChange({ ...this.props.audioFile, type });
  };

  handleNameChange = event => {
    let name = event.target.value;
    this.props.onAudioFileChange({ ...this.props.audioFile, name });
  };

  handleDescriptionChange = event => {
    let description = event.target.value;
    this.props.onAudioFileChange({ ...this.props.audioFile, description });
  };

  handleAddTag = tag => {
    let tags = [...this.props.audioFile.tags, tag];
    this.props.onAudioFileChange({ ...this.props.audioFile, tags });
    // this.setState({ audioFile: { ...this.state.audioFile, tags } });
  };

  handleRemoveTag = tag => {
    let tags = this.props.audioFile.tags.filter(t => t !== tag);
    this.props.onAudioFileChange({ ...this.props.audioFile, tags });
  };

  handleSetChange = set => {
    this.props.onAudioFileChange({ ...this.props.audioFile, setId: set.id });
  };

  toggleCanBeOverridden = () => {
    let canBeOverridden = !this.props.audioFile.canBeOverridden;
    this.props.onAudioFileChange({ ...this.props.audioFile, canBeOverridden });
  };

  tempIds = {};

  // issue : Not sure what this means
  handleUploadFiles = (fileList = []) => {
    this.setState({ uploadDialog: false });
    let lookUp = {};
    let files = Array.prototype.map.call(fileList, file => {
      let id = generateUid();
      lookUp[file.name] = id;
      return {
        id: id,
        name: file.name,
        type: "file",
        state: "uploading",
        progress: 30
      };
    });

    this.props.onAddFile(files);

    const onComplete = (success, response) => {
      if (success) {
        const result = JSON.parse(response);
        const status = result.reduce(
          (status, result) => {
            let tempId = lookUp[result.name];
            if (result.error || !result.id) {
              status.hasFailed = true;
              status.failed[tempId] = result.error || "Failed";
            } else {
              status.hasSucccess = true;
              this.tempIds[tempId] = result.id;
              status.done[tempId] = result.id;
            }
            return status;
          },
          { done: {}, failed: {} }
        );

        if (status.hasSucccess) {
          this.props.onUploadComplete(status.done);
        }
        if (status.hasFailed) {
          this.props.onUploadFailure(status.failed);
        }
      } else {
        const failed = fileList.reduce((failed, file) => {
          let tempId = lookUp[file.name];
          failed[tempId] = "UploadFailed";
        }, {});
        this.props.onUploadFailure(failed);
      }
    };

    handleFileUpload({
      getFileUploadMeta: this.props.getFileUploadMeta,
      onComplete
    })(fileList);
  };

  handleToggleCreateNewSet = () => {
    this.setState({ createNewSet: !this.state.createNewSet });
  };

  handleCancelCreateNewSet = () => {
    this.setState({ createNewSet: !this.state.createNewSet, newSetName: "" });
  };

  handleCreateNewSet = () => {
    this.props.onCreateNewSet({ name: this.state.newSetName, description: "" });
    this.setState({ createNewSet: !this.state.createNewSet });
  };

  handleNewSetNameChange = event => {
    let newSetName = event.target.value;
    this.setState({ newSetName });
  };

  handleRenameFile = audioFile => event => {
    const files = this.props.audioFile.files;
    files[0].isRenaming = true;
    this.props.onAudioFileChange({ ...this.props.audioFile, files });
    this.setState({ editFileExpanded: false });
  };

  handleChangeFileName = audioFile => event => {
    if (event.key === "Enter") {
      audioFile.isRenaming = false;
      this.props.onRenameFile(audioFile.id, this.tempIds[audioFile.id], event.target.value);
    }
  };

  handleDeleteRow = audioFile => {
    this.props.onDeleteFile(audioFile.id, this.tempIds[audioFile.id]);
  };

  handleDeleteRows = audioFiles => {
    const files = [...this.props.audioFile.files];
    Array.prototype.forEach.call(audioFiles, file => files.splice(files.indexOf(file), 1));
    this.props.onAudioFileChange({ ...this.props.audioFile, files });
  };

  handleDeleteFile = audioFile => event => {
    this.setState({ deleteDialog: true, editFileExpanded: false });
  };

  handleExpandEditFile = expanded => {
    this.setState({ editFileExpanded: expanded });
  };

  handleAudioPlayPause = audioFile => {
    const files = this.props.audioFile.files.map(file => {
      if (file === audioFile) {
        file.state = audioFile.state === "playing" ? "pause" : "playing";
        return file;
      }
      return file;
    });
    this.props.onAudioFileChange({ ...this.props.audioFile, files });
  };

  handleSingleAudioPlayPause = () => {
    this.handleAudioPlayPause(this.props.audioFile.files[0]);
  };

  handleUploadFile = () => {
    this.setState({ uploadDialog: true });
  };

  handleCloseUploadDialog = () => {
    this.setState({ uploadDialog: false });
  };

  handleRecordFromPhone = () => {
    this.setState({ recordFromPhoneDialog: true });
  };

  handleSaveRecordFromPhone = data => {
    this.setState({ recordFromPhoneDialog: false });
  };

  handleCloseRecordFromPhone = () => {
    this.setState({ recordFromPhoneDialog: false });
  };

  handleRecordFromBrowser = () => {
    this.setState({ recordFromBrowserDialog: true });
  };

  handleCloseRecordFromBrowser = () => {
    this.setState({ recordFromBrowserDialog: false });
  };

  handleEditFileChange = mode => {
    if (mode === "uploadFiles") {
      this.setState({ uploadDialog: true });
    }
    this.setState({ uploadModeSelected: mode });
  };

  handleAudiosPlayPause = file => {
    const files = [...this.props.audioFile.files];
    const changedFile = files.indexOf(file);
    changedFile.state = changedFile.state === "playing" ? "pause" : "playing";
    this.props.onAudioFileChange({ ...this.props.audioFile, files });
  };

  handleStayOnPage = () => {
    this.setState({ leavePageDialog: false });
  };

  handleLeavePage = () => {
    this.setState({ leavePageDialog: false });
  };

  handleConfirmDeleteDialog = () => {
    this.setState({ deleteDialog: false });
    this.props.onAudioFileChange({ ...this.props.audioFile, files: [] });
  };

  handleCancelDeleteDialog = () => {
    this.setState({ deleteDialog: false });
  };

  handleFileRename = (file, newName) => {
    this.props.onRenameFile(file.id, this.tempIds[file.id], newName);
  };

  handleSubmit = () => {
    this.props.onSubmit();
  };

  handleCancel = () => {
    this.props.onCancel();
  };

  render() {
    let { isCreate, audioSets, audioFile, getPlayUrl, classes, t } = this.props;

    let {
      createNewSet,
      audioMenuSelected,
      uploadDialog,
      recordFromPhoneDialog,
      recordFromBrowserDialog,
      uploadModeSelected,
      leavePageDialog,
      deleteDialog
    } = this.state;

    // Check if it's enable to save
    let canSubmit = true;
    const requiredFields = ["name", "description"];
    requiredFields.forEach(field => {
      canSubmit = canSubmit && !!audioFile[field];
    });
    if (audioSets) {
      canSubmit = canSubmit && !!audioFile["setId"];
    }

    let isFilesUploaded = audioFile.files && audioFile.files.length;
    Array.prototype.map.call(audioFile.files, file => {
      if (file.state === "uploading") {
        isFilesUploaded = false;
        return true;
      }
    });
    isFilesUploaded =
      isFilesUploaded || audioFile.type === "addFileLater" || (audioFile.type && isCreate);
    canSubmit &= isFilesUploaded;

    return (
      <Page.Content>
        <Page.Paper>
          <ConfirmDialog
            open={leavePageDialog}
            headerTitle={t("confirmDeleteTitle")}
            primaryMessage={t("confirmLeaveUploading")}
            dialogMessage={t("warningLeaveUploading")}
            confirmLabel={t("leavePage")}
            cancelLabel={t("stayOnPage")}
            onConfirm={this.handleLeavePage}
            onCancel={this.handleStayOnPage}
          />
          <Column paddingDouble>
            {!!audioSets && (
              <Row>
                {!createNewSet ? (
                  <Column>
                    <Row>
                      <Select
                        onChange={this.handleSetChange}
                        getKey={set => set.id}
                        renderOption={set => (!!set ? set.name : "")}
                        options={audioSets}
                        value={
                          audioFile.setId
                            ? audioSets.find(audioSet => audioSet.id === audioFile.setId)
                            : false
                        }
                        label={t("audioSet")}
                        required
                        fullWidth
                      />
                    </Row>
                    <Row>
                      <PrimaryTextLink
                        className={classes.createNewSet}
                        //  onClick={this.props.navigation.createAudioSet}
                        onClick={this.handleToggleCreateNewSet}
                      >
                        {t("createNewSet")}
                      </PrimaryTextLink>
                    </Row>
                  </Column>
                ) : (
                  <Column>
                    <Row>
                      <TextField
                        onChange={this.handleNewSetNameChange}
                        label={t("setName")}
                        value={this.state.newSetName}
                        error={false}
                        required
                        fullWidth
                      />
                    </Row>
                    <Row>
                      <Stretch />
                      <Padding paddingHalf>
                        <SecondaryTextLink onClick={this.handleCancelCreateNewSet}>
                          {t("cancel")}
                        </SecondaryTextLink>
                      </Padding>
                      <Padding paddingHalf>
                        <PrimaryButton onClick={this.handleCreateNewSet}>
                          {t("createNewSet")}
                        </PrimaryButton>
                      </Padding>
                    </Row>
                  </Column>
                )}
              </Row>
            )}

            <Row paddingBottom>
              <TextField
                onChange={this.handleNameChange}
                label={t("audioName")}
                value={audioFile.name}
                error={false}
                required
                fullWidth
              />
            </Row>
            <Row paddingBottom>
              <TextField
                onChange={this.handleDescriptionChange}
                label={t("audioDescription")}
                value={audioFile.description}
                error={false}
                required
                fullWidth
              />
            </Row>
            <Row paddingBottomDouble>
              <ChipInput
                value={audioFile.tags}
                onAdd={this.handleAddTag}
                onDelete={this.handleRemoveTag}
                label={t("tags")}
                fullWidth
              />
            </Row>
            <Row paddingBottom>
              <Checkbox
                isChecked={audioFile.canBeOverridden}
                onChange={this.toggleCanBeOverridden}
                // label={
                // }
              />
              <Text className={classes.overridenText}>
                {t("thisFileCanBeOverriddenInTheServiceFiles")}
                <Tooltip
                  content={t("thisFileCanBeOverriddenInTheServiceFilesInfo")}
                  placement="right"
                  classes={{ tooltip: classes.tooltipOverridden }}
                >
                  <Text className={classes.information}>
                    <Icon>info</Icon>
                  </Text>
                </Tooltip>
              </Text>
            </Row>
            <Row paddingTopDouble paddingBottom>
              <Text variant="subtitle">
                {t(
                  !isCreate && audioFile && audioFile.type === "addFileLater"
                    ? "replacePlaceHolder"
                    : "audio"
                )}
              </Text>
            </Row>
            <Row>
              {
                <Column>
                  {(!audioFile.files || !audioFile.files.length) && isCreate && (
                    <Row paddingBottom>
                      <Grid container className={classes.audioOptionsContainer}>
                        <Grid item xs={3} className={classes.audioOptions}>
                          <div className={classes.audioOption}>
                            <Radio
                              isChecked={audioFile.type === "singleFile"}
                              onChange={this.handleOption("singleFile")}
                              label={t("singleFile")}
                            />
                          </div>
                        </Grid>
                        <Grid item xs={3} className={classes.audioOptions}>
                          <div className={classes.audioOption}>
                            <Radio
                              isChecked={audioFile.type === "multiVersion"}
                              onChange={this.handleOption("multiVersion")}
                              label={t("multiVersion")}
                            />
                          </div>
                        </Grid>
                        <Grid item xs={3} className={classes.audioOptions}>
                          <div className={classes.audioOption}>
                            <Radio
                              isChecked={audioFile.type === "addFileLater"}
                              onChange={this.handleOption("addFileLater")}
                              label={t("addFileLater")}
                            />
                          </div>
                        </Grid>
                        <Grid item xs={3} className={classes.audioOptions} />
                      </Grid>
                    </Row>
                  )}
                  {!isCreate && (
                    <Fragment>
                      <Row>
                        <Collapse
                          in={
                            audioFile.type === "singleFile" ||
                            (audioFile.type === "addFileLater" && !isCreate)
                          }
                        >
                          {!audioFile.files || !audioFile.files.length ? (
                            <Grid container className={classes.audioButtonsContainer}>
                              <Grid item xs={3} className={classes.audioOptions}>
                                <SingleFileButton
                                  name="uploadFile"
                                  iconName="folder"
                                  onClick={this.handleUploadFile}
                                />
                              </Grid>
                              <Grid item xs={3} className={classes.audioOptions}>
                                <SingleFileButton
                                  name="recordFromPhone"
                                  iconName="phone"
                                  onClick={this.handleRecordFromPhone}
                                />
                              </Grid>
                              <Grid item xs={3} className={classes.audioOptions}>
                                <SingleFileButton
                                  name="recordFromBrowser"
                                  iconName="language"
                                  onClick={this.handleRecordFromBrowser}
                                />
                              </Grid>
                              <Grid item xs={3} className={classes.audioOptions}>
                                <SingleFileButton
                                  name="professional"
                                  iconName="account_box"
                                  information={classes.information}
                                  mark="paid"
                                />
                              </Grid>
                            </Grid>
                          ) : (
                            <SingleAudioPlayer
                              getPlayUrl={() => getPlayUrl("_")}
                              // expanded={this.state.editFileExpanded}
                              // onExpand={this.handleExpandEditFile}
                              file={audioFile.files[0]}
                              // audioMenuSelected={audioMenuSelected}
                              // onRenameFile={this.handleRenameFile}
                              // onDeleteFile={this.handleDeleteFile}
                              // onChangeFileName={this.handleChangeFileName}
                              // handleAudioPlayPause={this.handleSingleAudioPlayPause}
                            />
                          )}
                          {!!(audioFile.files && audioFile.files.length) && (
                            <ConfirmDialog
                              open={deleteDialog}
                              headerTitle={t("confirmDeleteTitle")}
                              primaryMessage={t("stillWantToDelete")}
                              dialogMessage={t("removeForever")}
                              confirmLabel={t("confirmDelete")}
                              onConfirm={this.handleConfirmDeleteDialog}
                              onCancel={this.handleCancelDeleteDialog}
                            />
                          )}
                          <RecordFromPhoneDialog
                            open={recordFromPhoneDialog}
                            onSave={this.handleSaveRecordFromPhone}
                            onClose={this.handleCloseRecordFromPhone}
                            phoneNumber={"020983402"}
                            pinCode={"8723"}
                          />
                        </Collapse>
                      </Row>
                      <Row>
                        <Collapse in={audioFile.type === "multiVersion"}>
                          <AudioFileList
                            getPlayUrl={getPlayUrl}
                            maxHeight={600}
                            files={audioFile.files}
                            uploadModeSelected={uploadModeSelected}
                            onUploadModeChange={this.handleEditFileChange}
                            isUploadMode={true}
                            onDeleteRow={this.handleDeleteRow}
                            onDeleteRows={this.handleDeleteRows}
                            onFileRename={this.handleFileRename}
                            onAudioPlayPause={this.handleAudioPlayPause}
                          />
                        </Collapse>
                      </Row>
                      <FileUploadDialog
                        files={[]}
                        open={uploadDialog}
                        onClose={this.handleCloseUploadDialog}
                        onUploadFiles={this.handleUploadFiles}
                        multiple={audioFile.type === "multiVersion"}
                        fileTypes=".mp3"
                      />
                    </Fragment>
                  )}
                </Column>
              }
            </Row>
            <Row paddingTopDouble>
              <Stretch />
              <ConfirmButtons
                confirmLabel={t("save")}
                blocked={!canSubmit}
                onCancel={this.handleCancel}
                onConfirm={this.handleSubmit}
              />
            </Row>
          </Column>
        </Page.Paper>
      </Page.Content>
    );
  }
}

export default withStyles(styleSheet, { name: "UploadAudio" })(
  translate(["audio", "common"])(UploadAudio)
);
