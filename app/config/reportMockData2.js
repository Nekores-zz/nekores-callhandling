//
// Copyright (c) 2020 Call-Handling Services [https://www.callhandling.co.uk/]
// Author: 4ητonio Prατєs [antonioprates@gmail.com], jan-2020
//
// New sample data for reports, based on latest understanding of Hubbub dynamic applications
// [https://docs.google.com/document/d/139ssmuuRRZ_bLOmc0nHXqcBNjMM854LCRQzACqQhX5M]
//
// TYPE NAME REFERENCES:
// type-names and expected react component to be mapped at render time:
// "grid" => mui grid
// "dropdownSingleValue" => LayoutElements/Select
// "dropdownMultiValue" => LayoutElements/Multiselect
// "SearchableChipSelectorSingleValue" => LayoutElements/SearchableChipSelector with one value only
// "SearchableChipSelectorMultiValue" => LayoutElements/SearchableChipSelector with list of values
// "timePeriodDropdownSingleSelect" => is a Select from time options hard-coded to:
//      "Today",
//      "Yesterday",
//      "This week",
//      "Last week",
//      "This month",
//      "Last month",
//      "All time",
//      "Custom",
// "dateIntervalInput" => Services/ServiceElements/ServiceDateIntervalInput (could be moved to generic place)
//
// UI COMPONENT BASE MODEL:
// const uiBaseModel = {
//   id: "uuid", // String
//   type: "type-name", // String
//   label: "label", // String
//   uiProps: {}, // js.Object
//   children: undefined // js.Array[UiBaseModel].orUndefined
// };
//
// APPLICATION MANAGEMENT FUNCTIONS FOR IO COMPONENTS:
//
// getFieldValue(formFieldId: String): Loadable
// setFieldValue(formFieldId: String, value: js.Any): Future[Boolean]
//
// loadFieldData(formFieldId: String): Loadable
// loadFormData(formId: String): Loadable // for whole output data of a form to render a tabular data chart
//
// LOADABLE STRUCTURE:
// {
//   content: js.Any,
//   isLoading: Boolean
// }

import { services as servicesList } from "./servicesMockData";
import { numbersList } from "./numbersMockData";

import { getMockLoadable } from "./mockLoadable";
import { getMockSearchable } from "./mockSearchable";

// before you use bellow getter functions, you should set wire up setState callback
// like from page component do setLoadableMockSetState(this.setState);
export const setLoadableMockSetState = fn => (window._loadableMockSetState = fn);

// Adapters and renderers are an abstraction that UI does not need to know about,
// but we are defining them here just to have a more accurate expression of what
// would happen under the hood.
// Of course in real we would need to get the service item from an api call,
// and not from a js.find out of a mock servicesList (on following example):

const serviceValueAdapter = {
  get: serviceId => {
    const service = servicesList.find(service => service.id === serviceId);
    return service ? { id: service.id, name: service.name } : null;
  },
  set: service => service.id
};

const serviceDataRenderer = {
  apply: services => services.map(service => ({ id: service.id, name: service.name }))
};

const numberValueAdapter = {
  get: numberIds => {
    const numbers = numbersList.filter(number => !!numberIds.find(id => number.id === id));
    return numbers ? numbers.map({ id: number.id, name: number.number }) : [];
  },
  set: numbers => numbers.map(number => number.id)
};

const numberDataRenderer = {
  apply: numbers => numbers.map(number => ({ id: number.id, name: number.number }))
};

export const getFieldValue = formFieldId => {
  const setState = window._loadableMockSetState ? window._loadableMockSetState : () => {};

  switch (formFieldId) {
    case "e38c4f2ace9e2312e44aa24f7300b847": // match serviceSelector field
      return getMockLoadable(serviceValueAdapter.get(servicesList[0]), setState);

    case "62a0a87cd4f2b3b885d1cd457f280ec2": // match numbersSelector field
      return getMockLoadable(
        [numberValueAdapter.get(numbersList[0]), numberValueAdapter.get(numbersList[1])],
        setState
      );

    default:
      console.log("[ Application Management ]: resource not found!");
      return null;
  }
};

export const loadFieldData = formFieldId => {
  const setState = window._loadableMockSetState ? window._loadableMockSetState : () => {};

  switch (formFieldId) {
    case "e38c4f2ace9e2312e44aa24f7300b847": // match serviceSelector field
      return getMockSearchable(serviceDataRenderer.apply(servicesList), setState);

    case "62a0a87cd4f2b3b885d1cd457f280ec2": // match numbersSelector field
      return getMockSearchable(numberDataRenderer.apply(numbersList), setState);

    default:
      console.log("[ Application Management ]: resource not found!");
      return null;
  }
};

const callSummaryBillingReportTabularData = [];

export const loadFormData = formId => {
  const setState = window._loadableMockSetState ? window._loadableMockSetState : () => {};

  switch (formId) {
    case "b52ebd120b55b36850fe90e3a7c628be":
      return getMockLoadable(callSummaryBillingReportTabularData, setState);

    default:
      console.log("[ Application Management ]: resource not found!");
      return null;
  }
};

const serviceSelector = {
  id: "d8853c80b66eb22d21044a582b100dd8",
  type: "SearchableChipSelectorSingleValue",
  label: "Service",
  uiProps: {
    emptyLabel: "Select a service"
  },
  children: undefined,
  // IOComponentProps:
  formId: undefined,
  formFieldId: "e38c4f2ace9e2312e44aa24f7300b847"
};

const numbersSelector = {
  id: "62a0a87cd4f2b3b885d1cd457f280ec2",
  type: "SearchableChipSelectorMultiValue",
  label: "Numbers",
  uiProps: {},
  children: undefined,
  // IOComponentProps:
  formId: undefined,
  formFieldId: "6c49d42394f4c0fc1b79ebd135e18e0c"
};

const timePeriodSelector = {
  id: "2980e3f26b3601807ba16fa72f8fa891",
  type: "timePeriodDropdownSingleSelect",
  label: "Time period",
  uiProps: {},
  // children: timePeriodSelectorValueOptions,
  // IOComponentProps:
  formId: undefined,
  formFieldId: "cdb65474986e62dba925bd57bf228e85"
};

const dateIntervalSelector = {
  id: "42819d688ae1f639a4ff1d107359d045",
  type: "dateIntervalInput",
  label: "",
  uiProps: {
    alternativeStartLabel: "From",
    alternativeEndLabel: "To"
  },
  children: undefined,
  // IOComponentProps:
  formId: undefined,
  formFieldId: "7716f6a52c1a2591c91a4390d72454e0"
};

const tabularDataOutput = {
  id: "01001cbbf7c9bab5c1cb9111ccd4a413",
  type: "tabularDataOutput",
  label: "",
  uiProps: {},
  children: undefined,
  // IOComponentProps:
  formId: "b52ebd120b55b36850fe90e3a7c628be",
  formFieldId: undefined
};

const column1 = {
  id: "990bcdb89f35ff527cfba95a03a0de54",
  type: "grid",
  label: "",
  uiProps: {
    direction: "column",
    justify: "flex-start",
    alignItems: "flex-start"
  },
  children: [serviceSelector, numbersSelector]
};

const column2 = {
  id: "4e79250abf96f382192f1530969bfef9",
  type: "grid",
  label: "",
  uiProps: {
    direction: "column",
    justify: "flex-start",
    alignItems: "flex-start"
  },
  children: [timePeriodSelector, dateIntervalSelector]
};

const parameters = {
  id: "255c92a1f765595fabc2da0ad151cbf2",
  type: "grid",
  label: "parameters",
  uiProps: {
    direction: "row",
    justify: "space-between",
    alignItems: "flex-start"
  },
  children: [column1, column2]
};

const body = {
  id: "8aa865ac4c9689d4be69bf0ecda0bc70",
  type: "grid",
  label: "body",
  uiProps: {
    direction: "column",
    justify: "flex-start",
    alignItems: "flex-start"
  },
  children: [tabularDataOutput]
};

export const reportExample1 = [{
  id: "87a7822dfdc04a57aca0a1d520cfb6e6",
  name: "Call Summary for Billing",
  description: "This report has essential information to calculate billing based on calls data.",
  tags: ["Calls", "Summary"],
  isFavorite: false,
  parameters,
  body
}];
