import PropTypes from "prop-types";

const securityAreas = {
    permissionSets: 'permission-sets', 
    permissions: 'permissions', 
    policies: 'policies', 
    roles: 'roles',
    edit: 'edit'
};

export const securitySection = {
    areas: securityAreas,
        
    propTypes: {
        area: PropTypes.oneOf(Object.values(securityAreas)),

        navigate: PropTypes.shape({
            permissionSets: PropTypes.shape({
                list: PropTypes.func.isRequired,
                edit: PropTypes.func.isRequired,
                create: PropTypes.func.isRequired,
                permissions: PropTypes.func.isRequired,
                policies: PropTypes.func.isRequired,
                roles: PropTypes.func.isRequired,
            }).isRequired,
            permissions: PropTypes.shape({
                list: PropTypes.func.isRequired,
                edit: PropTypes.func.isRequired,
                create: PropTypes.func.isRequired,
            }).isRequired,
            policies: PropTypes.shape({
                list: PropTypes.func.isRequired,
                edit: PropTypes.func.isRequired,
                create: PropTypes.func.isRequired,
            }).isRequired,
            roles: PropTypes.shape({
                list: PropTypes.func.isRequired,
                edit: PropTypes.func.isRequired,
                create: PropTypes.func.isRequired,
            }).isRequired,
            back: PropTypes.func.isRequired,
        }),
    },
};
