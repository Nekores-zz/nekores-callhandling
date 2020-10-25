import PropTypes from "prop-types";
import { objects } from 'utils';
  
export const Errors = {
    propType: PropTypes.shape({
        formErrors: PropTypes.object,
        apiErrors: PropTypes.object,
    }),

    fieldErrors: (fieldName) => [
        (errors) => errors && errors.formErrors && errors.formErrors[fieldName],
        (errors) => errors && errors.apiErrors && errors.apiErrors[fieldName],
    ],

    getErrors: (errors, fieldName) => 
        Errors.fieldErrors(fieldName).filter((getError) => getError(errors)),

    getError: (errors, fieldName) => 
        Errors.getErrors(errors, fieldName) [0],

    isEmpty: (errors) => !errors || [errors.formErrors, errors.apiErrors].every(
        (e) => !e || objects.isEmpty(e)
    ),
};

