import { EnumErrorType } from "../enum/EnumErrorType";

export interface IQueryListResponse {
    message: string | null;
    errorType: EnumErrorType;
    list: any[] | null;
    skip: number | null;
    take: number | null;
    count: number | null;
    page: number | null;
    pageCount: number | null;

}