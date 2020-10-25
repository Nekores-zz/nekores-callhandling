import React, {Component} from "react";
import PropTypes from "prop-types";
import {translate} from "react-i18next";
import {
    AvatarSimpleCell,
    PermissionRowDisplay,
    PermissionsInfoCell,
    RowDisplayPanel,
    VirtualizedList
} from "components";
import {Permission, securitySection} from "models";

class ListPermissions extends Component {
    static propTypes = {
        isEmpty: PropTypes.bool.isRequired,
        permissionSetId: PropTypes.string,
        permissions: PropTypes.arrayOf(Permission.propType).isRequired,
        permissionsCount: PropTypes.number.isRequired,
        loadMore: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
        onScrollPositionChange: PropTypes.func,
        onScrollPositionSetter: PropTypes.func,
        getEditPermissionPermission: PropTypes.func.isRequired,
        createPermissionPermission: PropTypes.bool.isRequired,
        navigate: securitySection.propTypes.navigate.isRequired,

        t: PropTypes.func.isRequired
    };

    state = {
        openRow: null
    };

    ///// QUICK-VIEW SETUP /////

    openQuickView = row => this.setState({openRow: row});

    closeQuickView = () => this.setState({openRow: null});

    QuickView = () => {
        if (this.state.openRow === null) return null;
        let editPermissionPermission = this.state.openRow ? this.props.getEditPermissionPermission(this.state.openRow) : null;
        const rowData = {...this.state.openRow};

        return (
            <RowDisplayPanel
                rowData={rowData}
                getHeader={row => ({color: row.id, name: row.name})}
                content={{render: PermissionRowDisplay}}
                onClose={this.closeQuickView}
                onEdit={editPermissionPermission ? this.handleEdit : null}
                // onStar={this.handleFavoriteClick}
                t={this.props.t}
            />
        );
    };

    ///// LIST SETUP /////

   /* sortGroupFn = row => {
        const {t} = this.props;
        return row.isFavorite ? t("favorites") : t("other");
    };

    isFavorite = row => row.isFavorite;

    handleFavoriteClick = row => {
    };
*/
    handleEdit = permission =>
        this.props.navigate.permissions.edit(permission.id, permission.permissionSetId);

    listSchema = [
        {
            display: "hoverBar"
        },
        {
            display: "250px",
            heading: "permissions",
            args: ["id", "name"],
            render: AvatarSimpleCell,
            hidden: false
        },
        {
            display: "flex",
            heading: "information",
            args: [],
            render: PermissionsInfoCell,
            hidden: true
        },
        {
            display: "spacer"
        },
        {
            display: "actions",
            args: [
                //  { label: "favorite", action: this.handleFavoriteClick, isFavorite: this.isFavorite },
                {label: "edit", action: this.handleEdit, icon: "edit"}
            ],
            hidden: true
        }
    ];

    bulkActions = [
        {
            icon: "edit",
            onClick: (items, inverted, clearSelection) => {
                inverted
                    ? console.log("Bulk edit all, except: " + items.length + " items!")
                    : console.log("Bulk edit " + items.length + " items!");
            }
        },
        {
            icon: "delete",
            onClick: (items, inverted, clearSelection) => {
                inverted
                    ? console.log("Bulk delete all, except: " + items.length + " items!")
                    : console.log("Bulk delete " + items.length + " items!");
            }
        },
        {
            icon: "more_horiz",
            bulkMenu: [
                {
                    label: "otherAction1",
                    icon: "settings",
                    onClick: (items, inverted, clearSelection) => {
                        inverted
                            ? console.log("Bulk otherAction1 all, except: " + items.length + " items!")
                            : console.log("Bulk otherAction1 on " + items.length + " items!");
                    }
                },
                {
                    label: "otherAction2",
                    icon: "settings",
                    onClick: (items, inverted, clearSelection) => {
                        inverted
                            ? console.log("Bulk otherAction2 all, except: " + items.length + " items!")
                            : console.log("Bulk otherAction2 on " + items.length + " items!");
                    }
                }
            ]
        }
    ];

    render = () => {
        const {
            isEmpty,
            permissionSetId,
            permissions,
            permissionsCount,
            isLoading,
            onScrollPositionChange,
            onScrollPositionSetter,
            loadMore,
            navigate,
            createPermissionPermission,
            getEditPermissionPermission,
            t
        } = this.props;

        const QuickView = this.QuickView;

        return (
            <VirtualizedList
                isEmpty={isEmpty}
                emptyMessageKeys={{
                    startCreatingTitle: permissionSetId?"startAddPermissions":"noPermissionsAvailable",
                    startCreatingMsg: permissionSetId?"startAddPermissionsMsg":"addPermissionsFromPermissionSetMsg",
                    noHitsTitle: "noPermissionsHits",
                    noHitsMsg: "noPermissionsHitsMsg"
                }}
                data={permissions}
                dataCount={permissionsCount}
                schema={this.listSchema}
                getKeyFn={item => item.id}
                getActionPermission={getEditPermissionPermission}
                bulkActions={this.bulkActions}
                handleRowClick={this.openQuickView}
                handleAddClick={permissionSetId && createPermissionPermission ? () => navigate.permissions.create(permissionSetId) : undefined}
                //sortGroupFn={this.sortGroupFn}
                onScrollPositionChange={onScrollPositionChange}
                onScrollPositionSetter={onScrollPositionSetter}
                isLoading={isLoading}
                loadMore={loadMore}
                t={t}
            >
                <QuickView/>
            </VirtualizedList>
        );
    };
}

export default translate("security")(ListPermissions);
