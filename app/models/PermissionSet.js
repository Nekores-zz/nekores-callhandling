import PropTypes from "prop-types";
import { objects } from 'utils';
import { SelectedIds } from './Ids';
import { Sharing } from "./Sharing";

const statuses = {
  disabled: 'disabled',
  available: 'available',
  active: 'active',
};

export const PermissionSet = {
  statuses,

  propType: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.oneOf(objects.values(statuses)).isRequired,
    sharedActionTypes: SelectedIds.propType.isRequired,
    sharing: Sharing.propType,
    isOwn: PropTypes.bool,
    isEnabled: PropTypes.bool,
  }),

  create: () => ({
    name: "",
    description: "",
    status: statuses.disabled,
    sharedActionTypes: [],
    sharing: undefined,
    isOwn: true,
    isEnabled: false,
  }),

  setSharing: (permissionSet, sharing) => ({ ...permissionSet, sharing }),

  setName: (permissionSet, name) => ({ ...permissionSet, name }),

  setDescription: (permissionSet, description) => ({ ...permissionSet, description }),

  setStatus: (permissionSet, status) => ({ ...permissionSet, status }),

  toggleEnabled: (permissionSet, isEnabled = !permissionSet.isEnabled) => ({ ...permissionSet, isEnabled }),
};
