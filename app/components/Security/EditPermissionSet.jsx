import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import {translate} from "react-i18next";
import {
    Page,
    PrimaryButton,
    PrimaryTextLink,
    SecondaryTextLink,
    ThirdTextLink,
    IconButton,
    Icon,
    Text,
    Paper,
    Row,
    Column,
    Stretch,
    Box,
    Padding,
    Checkbox,
    Radio,
    Switch,
    FormControlLabel,
    RadioGroup,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Tooltip,
    TooltipContent,
    TooltipTarget,
    Divider,
    List,
    ListHeader,
    ListFooter,
    ListItem,
    ListCheckbox,
    ListHeaderSearch,
    ListItemText,
    ListAvatar,
    ListItemAvatar,
    ListItemSecondaryAction,
    Field,
    FieldChip,
    FieldText,
    TextField,
    Select,
    Multiselect,
    Caption,
    SecondaryText,
    PrimaryText,
    SmallText,
    SectionHeader
} from "components/Elements";
import {EditSharing} from "./SecurityElements/EditSharing";
import {Sharing, PermissionSet, Accounts, ActionType} from "models";
import {withPromiseProps} from 'utils/promise.js';
import {Grid} from "@material-ui/core";

class EditPermissionSet extends Component {
    static propTypes = {
        permissionSet: PermissionSet.propType.isRequired,
        accounts: Accounts.propType.isRequired,
        loadAccounts: PropTypes.func.isRequired,
        actionTypes: PropTypes.objectOf(ActionType.propType).isRequired,
        onSubmit: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired,
        onDelete: PropTypes.func,
        getUIPermissions: PropTypes.func.isRequired,
        createSharablePermission: PropTypes.bool.isRequired,
        t: PropTypes.func.isRequired
    };

    state = {
        permissionSet: this.props.permissionSet,
        errors: undefined,
    };

    handleChange = (setter, ...args0) => (...args1) => {
        let permissionSet = setter(this.state.permissionSet, ...args0, ...args1);
        this.setState({permissionSet});
    };

    getFieldErrorMessage = fieldName =>
        (this.state.errors &&
            this.state.errors.formErrors &&
            this.state.errors.formErrors[fieldName]) ||
        (this.state.errors && this.state.errors.apiErrors && this.state.errors.apiErrors[fieldName]);

    isFieldInvalid = fieldName => {
        return !!this.getFieldErrorMessage(fieldName);
    };

    handleChangeEventTargetValue = (setter, ...args0) => (event) => {
        let value = event.target.value;
        this.handleChange(setter, ...args0)(value);
    };

    handleSubmit = () => {
        event.preventDefault();
        event.stopPropagation();
        let {onSubmit} = this.props;
        let {permissionSet} = this.state;

        return onSubmit(permissionSet).catch(
            (errors) => this.setState({errors})
        );
    };

    renderSharing = () => {
        let {accounts, actionTypes, loadAccounts} = this.props;
        let {permissionSet} = this.state;
        return (
            <Column paddingBottom alignChildrenStretch>
                <Column paddingTop paddingBottom alignChildrenStretch>
                    <EditSharing
                        sharing={permissionSet.sharing}
                        onChange={this.handleChange(PermissionSet.setSharing)}
                        accounts={accounts}
                        loadAccounts={loadAccounts}
                        actionTypes={actionTypes}
                    />
                </Column>
                <Divider/>
            </Column>
        );
    };

    Status = ({code, hint}) => {
        let {t} = this.props;
        return (
            <Tooltip
                content={
                    <TooltipContent
                        title={t(code)}
                        text={t(hint)}
                    />
                }
            >
                <TooltipTarget>
                    {t(code)}
                </TooltipTarget>
            </Tooltip>
        );
    }

    render() {
        let {onCancel, onDelete, getUIPermissions, createSharablePermission, t} = this.props;
        let {permissionSet} = this.state;
        let permissions = permissionSet.id ? getUIPermissions(permissionSet): undefined;
        return (
            <Page.Content>
                <Page.Paper>
                    { !permissions || permissions.changeSetStatus ? <Column backgroundSecondary>
                        <Row fullWidth paddingDouble>
                            <Box stretch paddingRight>
                                <Select
                                    options={objects.values(PermissionSet.statuses)}
                                    onChange={this.handleChange(PermissionSet.setStatus)}
                                    value={permissionSet.status}
                                    renderOption={(status) => status ? t(status) : ""}
                                    required
                                    name="status"
                                    label={t("setStatus")}
                                    white
                                    disabled={!permissionSet.id}
                                />
                            </Box>
                            {!permissionSet.id ? <Tooltip
                                content={
                                    <TooltipContent
                                        text={t("createdInDisabledState")}
                                    />
                                }
                            >
                                <Icon color="inherit" fontSize="inherit">info</Icon>
                            </Tooltip> : null}

                            <Box stretch paddingLeft>
                                <SmallText textWhite>
                                    {t("aSetCanBe")} &nbsp;
                                    <this.Status code={PermissionSet.statuses.disabled}
                                                 hint="permissionSetDisabledStatus"/>
                                    , &nbsp;
                                    <this.Status code={PermissionSet.statuses.available}
                                                 hint="permissionSetAvailableStatus"/>
                                    &nbsp; {t("or")} &nbsp;
                                    <this.Status code={PermissionSet.statuses.active} hint="permissionSetActiveStatus"/>
                                </SmallText>
                            </Box>
                            <Stretch/>
                        </Row>
                    </Column> : null}

                    <Column paddingDouble alignChildrenStretch>
                        {!permissions || permissions.edit ?
                            <Row paddingBottomDouble>
                                <TextField
                                    onChange={this.handleChangeEventTargetValue(PermissionSet.setName)}
                                    value={permissionSet.name}
                                    required
                                    name="name"
                                    label={t("setName")}
                                    fullWidth
                                    error={this.isFieldInvalid("name")}
                                    helperText={t(this.getFieldErrorMessage("name"))}
                                />
                            </Row> : null}

                        { !permissions || permissions.edit ?
                            <Row paddingBottomDouble>
                                <TextField
                                    onChange={this.handleChangeEventTargetValue(PermissionSet.setDescription)}
                                    value={permissionSet.description}
                                    required
                                    name="description"
                                    label={t("description")}
                                    fullWidth
                                />
                            </Row> : null}

                        {!permissionSet.id && createSharablePermission?
                            <Row paddingBottomDouble>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={!!permissionSet.sharing}
                                            onChange={this.handleChange(PermissionSet.setSharing, permissionSet.sharing ? undefined : Sharing.create())}
                                            color="secondary" dense
                                        />
                                    }
                                    label={
                                        <PrimaryText fontSizeS fontSizeM={false}>
                                            {t("enableSharing")}
                                        </PrimaryText>
                                    }
                                />
                                <PrimaryText paddingLeftHalf>
                                    <Tooltip
                                        content={
                                            <TooltipContent
                                                title={t("enableSharing")}
                                                text={t("createdWithSharingEnabled")}
                                            />
                                        }
                                    >
                                        <Icon color="inherit" fontSize="inherit">info</Icon>
                                    </Tooltip>
                                </PrimaryText>
                            </Row> : null}
                        {permissionSet.id && permissionSet.sharing && permissions.share? this.renderSharing() : null}

                        <Row paddingTop>
                            {!permissionSet.id ? null : (
                                <PrimaryTextLink onClick={onDelete}>
                                    {t("delSet")}
                                </PrimaryTextLink>
                            )}
                            <Stretch/>
                            <SecondaryTextLink onClick={onCancel}>
                                {t('cancel')}
                            </SecondaryTextLink>
                            <PrimaryButton onClick={this.handleSubmit}>
                                {t('confirmAndsave')}
                            </PrimaryButton>
                        </Row>
                    </Column>
                </Page.Paper>
            </Page.Content>
        );
    }
}

export default translate("security")(
    withPromiseProps(
        (props) => {
            return {
                accounts: props.loadAccounts()
            };
        },
        EditPermissionSet,
    )
);