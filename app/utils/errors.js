/*
 * Copyright (c) 2019. call-handling services [https://www.callhandling.co.uk/]
 * Author : geekbytes.io [0xff@geekbytes.io]
 *
 */

import React from "react";

function translateError(t) {
  return function(error) {
    // added string error support for backward compatibility
    return typeof error === "string" ? t(error) : t(error.key, error.data);
  };
}

function getFieldErrorMessage(errorResponse) {
  return function(fieldRef) {
    return errorResponse && errorResponse.formErrors && errorResponse.formErrors[fieldRef];
  };
}

const getGeneralErrors = errorResponse => errorResponse && errorResponse.generalErrors;

const translateFieldError = (t, errorResponse) => fieldRef => {
  const error = getFieldErrorMessage(errorResponse)(fieldRef);
  return error && translateError(t)(error);
};

/**
 *
 * @param errorResponse
 * @returns {function(*=): boolean}
 */
const hasError = errorResponse => fieldRef => {
  const error = getFieldErrorMessage(errorResponse)(fieldRef);
  return !!error;
};

/**
 * This function check and return field error
 * @param t
 * @param errorResponse
 * @returns {function(*=): (*|{error: boolean, helperText: *})}
 */
const getErrorProps = (t, errorResponse) => fieldRef => {
  const error = getFieldErrorMessage(errorResponse)(fieldRef);
  return {
    error: !!error,
    helperText: error ? translateError(t)(error) : ""
  };
};

const defaultError = errorsHtml => <>{errorsHtml}</>;

const renderGeneralErrors = (t, errorResponse) => (getHtmlForError, renderForChildren) => {
  const errors = getGeneralErrors(errorResponse);
  renderForChildren = renderForChildren || defaultError;
  return (
    errors &&
    errors.length &&
    renderForChildren(
      errors.map((error, index) => getHtmlForError(error, translateError(t)(error), index))
    )
  );
};

export {
  renderGeneralErrors,
  translateFieldError,
  getFieldErrorMessage,
  translateError,
  getGeneralErrors,
  hasError,
  getErrorProps
};

/*
* ErrorResponse Format
* {
  generalErrors: [{ key: "<i18nKey>", data: "<object || undefined>" }, ...],
  formErrors: {
    fieldRef: { key: "<i18nKey>", data: "<object || undefined>" },
    ...
  }
};
* */

/*
const sampleErrorResponse = {
    generalErrors: [{key: "<i18nKey>", data: "<object || undefined>"}, {
        key: "<i18nKey2>",
        data: "<object || undefined>"
    }],
    formErrors: {
        fieldRef: {key: "<i18nKey>", data: "<object || undefined>"},
        fieldRef2: {key: "<i18nKey>", data: "<object || undefined>"}
    }
};

render () {

let renderFieldError = translateFieldError(this.props.t, this.props.errors)
let renderErrors = renderGenericErrors(this.props.t,this.props.errors)

return <div>
    {
        renderErrors((error,errorText, index) => <Text key={error.key} variant="errorMessage">{errorText}<br /></Text>,errorsHtml => <div>{errorsHtml}</div>)
    }
    <TextField
        value={entity.name}
        onChange={this.handleChange(entity.setName)}
        label={t(entity.fieldName)}
        error={hasError(entity.fieldName)}
        helperText={renderFieldError(entity.fieldName)}
        />
<div>
}
*
* */
