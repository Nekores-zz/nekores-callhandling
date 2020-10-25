import PropTypes from "prop-types";

export const Role = {
  propType: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    isComposite: PropTypes.bool.isRequired,
    children: PropTypes.arrayOf(PropTypes.string).isRequired,
    setId: PropTypes.string.isRequired,
    permissionSetName:PropTypes.string.isRequired
  }),

  create: (permissionSetId) => ({
    name: "",
    description: "",
    isComposite: false,
    children: [],
    permissionSetId
  }),

  setName: (role, name) => ({ ...role, name }),

  setDescription: (role, description) => ({ ...role, description }),

  toggleComposite: (role, isComposite) => ({ ...role, isComposite }),

  setRoles: (role, children) => ({ ...role, children })
};
