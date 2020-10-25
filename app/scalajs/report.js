import { facadeOf } from "./sdk/facadeOf";

export * from "./sdk/commonFacade";

export const ListReport = facadeOf("Report/ListReport");
export const ListReportSidemenu = facadeOf("Reports/ListReportSidemenu");
export const RunReport = facadeOf("Report/RunReport");
export const RunReportSidemenu = facadeOf("Report/RunReportSidemenu");
export const UploadReport = facadeOf("Report/UploadReport");
