
import PropTypes from "prop-types";
import { SelectedIds } from './Ids';

export const Service = {
    propType: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        types: SelectedIds.propType.isRequired,
    })
};
