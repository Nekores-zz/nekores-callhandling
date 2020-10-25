import { facadeOf } from "./sdk/facadeOf";

export * from "./sdk/commonFacade";

export const ServiceDesignerComponent = facadeOf("ServiceDesigner/ServiceDesignerComponent");
export const CallCareNodeDialog = facadeOf("ServiceDesigner/NodeDialogs/CallCareNodeDialog");
export const CallCarePlayNodeDialog = facadeOf(
  "ServiceDesigner/NodeDialogs/CallCarePlayNodeDialog"
);
export const TimeDateNodeDialog = facadeOf("ServiceDesigner/NodeDialogs/TimeDateNodeDialog");
export const DialNodeDialog = facadeOf("ServiceDesigner/NodeDialogs/DialNodeDialog");
export const GoToNodeDialog = facadeOf("ServiceDesigner/NodeDialogs/GotoNodeDialog");
