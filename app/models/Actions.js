import PropTypes from "prop-types";
import { Id } from './Ids';
  
export const Action = {
    propType: PropTypes.shape({
        id: Id.propType,
        name: PropTypes.string.isRequired,
    }),    
};

