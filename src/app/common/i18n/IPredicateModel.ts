import { PredicateModel, DataStateChangeEventArgs } from "@syncfusion/ej2-angular-grids"

export interface IPredicateModel extends PredicateModel {
    predicates: any[];
}

export interface IDataStateChangeEventArgs extends DataStateChangeEventArgs {
    where?: IPredicateModel[]
}