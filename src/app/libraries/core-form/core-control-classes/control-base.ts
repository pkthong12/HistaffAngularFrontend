import { EnumFormBaseContolType } from "../core-form/enum-interfaces";

export class ControlBase<T> {
    rowIndex: number;
    columnIndex: number;
    flexSize: number;
    value: T | undefined;
    key: string;
    label: string;
    required?: boolean;
    readonly?: boolean;
    order: number;
    controlType: EnumFormBaseContolType | null;
    type: string;
    options?: { key: string, value: string }[];

    constructor(options: {
        rowIndex?: number;
        columnIndex?: number;
        flexSize?: number;
        value?: T;
        key?: string;
        label?: string;
        required?: boolean;
        order?: number;
        controlType?: EnumFormBaseContolType;
        type?: string;
        options?: { key: string, value: string }[];
    } = {}) {
        this.rowIndex = options.rowIndex!;
        this.columnIndex = options.columnIndex!;
        this.flexSize = options.flexSize!;
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || null;
        this.type = options.type || '';
        this.options = options.options || [];
    }
}