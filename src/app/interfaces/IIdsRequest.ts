import { ISysMutationLogBeforeAfterRequest } from "../libraries/core-page-edit/core-page-edit.component";

export interface IIdsRequest {
    ids: number[];
    sysMutationLogBeforeAfterRequest?: ISysMutationLogBeforeAfterRequest,
    sysMutationLogBeforeAfterSendUnapprove?: ISysMutationLogBeforeAfterRequest
}