import React, {Component} from "react";
import PropTypes from "prop-types";
import {translate} from "react-i18next";
import {Grid, withStyles} from "@material-ui/core";
import {
    ConfirmButtons,
    GroupSelector,
} from "components";
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
    SectionHeader,
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
    Tooltip,
    TooltipContent,
} from "components/Elements";
import {RoleRow} from "components/Security";
import {styleSheet} from "jss/Security/EditRole";
import {
    SelectedIds, Errors, AccountsExclusions, AccountsSelections, Permission, PermissionSet, AccountSelection,
    Role, ResourcesItems, Policy, Service, Action, Account, Accounts, Type, ActionType,
} from "models";

class EditRole extends Component {
    static propTypes = {
        role: Role.propType.isRequired,
        roles: PropTypes.objectOf(Role.propType).isRequired,
        permissionSets: PropTypes.objectOf(PermissionSet.propType).isRequired,
        getEffectiveRoles: PropTypes.func,
        onSubmit: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired,
        onDelete: PropTypes.func,
        t: PropTypes.func.isRequired
    };

    static defaultProps = {
        getEffectiveRoles: (roles) => roles,
    };

    state = {
        role: this.props.role,
        permissionSetFilter: null,
        effectiveRoles: [],
        // anyOrAll: false,
        errors: undefined
    };

     componentDidMount() {
      let {role} = this.props;
        role.children.length === 0 ? this.setState({effectiveRoles: []}) :
                    this.props.getEffectiveRoles(role.children).then(response => {
                        this.setState({effectiveRoles: this.filterEffectiveRoles(role.children,response)})})
     }

    getFieldErrorMessage = fieldName =>
        (this.state.errors &&
            this.state.errors.formErrors &&
            this.state.errors.formErrors[fieldName]) ||
        (this.state.errors && this.state.errors.apiErrors && this.state.errors.apiErrors[fieldName]);

    isFieldInvalid = fieldName => {
        return !!this.getFieldErrorMessage(fieldName);
    };

    handleChange = (setter, ...args0) => (...args1) => {
        let role = setter(this.state.role, ...args0, ...args1);
        this.setState({role});
    };

    handleChangeEvent = (setter, ...args) => event => {
        event.stopPropagation();
        let value = event.target.value;
        this.handleChange(setter, ...args)(value);
        return true;
    };

    handleSubmit = () => {
        return this.props.onSubmit(this.state.role)
    };

    isRoleSelected = r => this.state.role.children.indexOf(r.id) !== -1;

    toggleRole = childRole => {
        const children = this.isRoleSelected(childRole)
            ? this.state.role.children.filter(r => r !== childRole.id)
            : [...this.state.role.children, childRole.id];

        children.length === 0 ? this.setState({effectiveRoles: [], role: {...this.state.role, children}}) :
            this.props.getEffectiveRoles(children).then(response => {
                this.setState({effectiveRoles: this.filterEffectiveRoles(children,response), role: {...this.state.role, children}})})
    };

    handleToggleComposite = (setter, arg) => ({...this.state.role, isComposite: arg});

    handleToggleRole = role => event => {
        event.stopPropagation();
        this.toggleRole(role);
    };

    handleClearAll = event => {
        event.stopPropagation();
        this.setState({role: Role.setRoles(this.state.role, [])});
    };

    getRoleRoles = role => role.children.map(id => this.props.roles[id]);

    filterEffectiveRoles = (selectedRoleIds, fetchedRoles) => {
    let selectedRoles = selectedRoleIds.map(r => this.props.roles[r])
    let effectiveRoles = [...selectedRoles, ...fetchedRoles]
       //remove duplicate
   return [...new Map(effectiveRoles.map(r => [r.id, r])).values()]
    };

    // handleToggleAnyOrAll = event => this.setState({ anyOrAll: !this.state.anyOrAll });

    render() {
        const {
            onCancel,
            onDelete,
            roles,
            permissionSets,
            classes,
            t
        } = this.props;
        const {role, effectiveRoles, errors /*anyOrAll*/} = this.state;

        return (
            <div className={classes.pageContent}>
                <Paper className={classes.paper} elevation={4}>
                    <TextField
                        onChange={this.handleChangeEvent(Role.setName)}
                        value={role.name}
                        required
                        fullWidth
                        name="name"
                        label={t("roleName")}
                        className={classes.marginBottomMedium}
                        error={this.isFieldInvalid("name")}
                        helperText={t(this.getFieldErrorMessage("name"))}
                    />

                    <TextField
                        onChange={this.handleChangeEvent(Role.setDescription)}
                        value={role.description}
                        fullWidth
                        multiline
                        name="description"
                        label={t("description")}
                        className={classes.marginBottomMedium}
                    />

                    <Grid container justify="flex-start" alignItems="center" spacing={16}>
                        <Grid item>
                            <Text>{t("compositeRole")}</Text>
                        </Grid>
                        <Grid item>
                            <Text>
                                <Tooltip
                                    content={
                                        <TooltipContent
                                            title={t("compositeRole")}
                                            text={t("createdWithSharingEnabled")}
                                        />
                                    }
                                >
                                    <Icon color="inherit">info</Icon>
                                </Tooltip>
                            </Text>
                        </Grid>
                        <Grid item>
                            <Switch
                                onChange={this.handleChange(this.handleToggleComposite, !role.isComposite)}
                                checked={role.isComposite}
                            />
                        </Grid>
                    </Grid>

                    {role.isComposite ? (
                        <GroupSelector
                            availableItemsHeading={t("availableRoles")}
                            availableItems={Object.values(roles)}
                            availableItemsSets={Object.values(permissionSets)}
                            searchBy={["name", "description", "permissionSetName"]}
                            seclectedItemsHeading={t("selectedRoles")}
                            isItemSelected={this.isRoleSelected}
                            effectiveItemsHeading={t("effectiveRoles")}
                            effectiveItems={effectiveRoles}
                            handleToggleItem={this.handleToggleRole}
                            itemItemsHeading={t("roleRoles")}
                            getItemItems={this.getRoleRoles}
                            handleClearAll={this.handleClearAll}
                            //isRequiredAll={anyOrAll}
                            // handleToggleAnyOrAll={this.handleToggleAnyOrAll}
                            RowElement={RoleRow}
                        />
                    ) : null}

                    <ConfirmButtons
                        className={classes.buttons}
                        // blocked={!Errors.isEmpty(errors)}
                        onConfirm={this.handleSubmit}
                        onCancel={onCancel}
                        altActionLabel={!!this.state.role.id ? t("delRole") : undefined}
                        onAltAction={
                            !!this.state.role.id ? onDelete : undefined
                        }
                        onFailure={errors => this.setState({errors})}
                    />
                </Paper>
            </div>
        );
    }
}

export default withStyles(styleSheet, {name: "EditRole"})(
    translate("security")(EditRole)
);
