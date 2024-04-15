export interface IToggleActiveIdsRequest {
    valueToBind: boolean;
    ids: number[];
}
export interface IToggleApproveIdsRequest {
    valueToBind: boolean;
    ids: number[];
}

export interface ITongleUnApproveIdsRequest{
    valueToBind: boolean;
    reason: string;
    ids: number[];
}