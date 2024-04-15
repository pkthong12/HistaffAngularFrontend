import { ICoreDropdownOption } from "../libraries/core-dropdown/core-dropdown/core-dropdown.component";

export enum EnumSortDirection {
    NONE = 0,
    ASC = 1,
    DESC = -1
}

// Operator constants for Backend
export enum EnumFilterOperator {
    EQUAL = "==",
    GREATER_THAN_OR_EQUAL = ">=",
    LESS_THAN_OR_EQUAL = "<=",
    GREATER_THAN = ">",
    LESS_THAN = "<"
}

export interface IFilterOperator {
    field: string;
    operator: EnumFilterOperator;
    dateTimeValue?: Date | null;
}

export interface ISearchItem {
    field: string;
    searchFor: string;
}

export interface IInOperator {
    field: string;
    values: number[];
}

export interface IDropdownFilter {
    index : number;
    conditionFilters : IDropdownDetailFilter[]
}
export interface IDropdownDetailFilter {
    field : ICoreDropdownOption,
    conditionFilterDetail : ICoreDropdownOption,
    valueCompare : string
}

export interface ISortItem {
    field: string;
    sortDirection: EnumSortDirection
}

export interface IPagination {
    skip: number;
    take: number;
}

export interface IGeneralSearch {
    searchFor: string;
    availableColumns: string[];
}

export interface IQueryListRequest {
    lang?: string;
    generalSearch?: IGeneralSearch;
    sort?: ISortItem[];
    pagination?: IPagination;
    filter?: any;
    filterOperators?: IFilterOperator[];
    inOperators?: IInOperator[];
    search?: ISearchItem[];
    id?: number | string | null,
    forceReloadingFlag?: boolean;
}