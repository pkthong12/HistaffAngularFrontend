import { EnumTranslateKey } from "src/app/enum/EnumTranslateKey";
import { EnumCoreTablePipeType } from "../core-table/EnumCoreTablePipeType";

export interface ICoreViewSection {
    caption?: EnumTranslateKey,
    rows: ICoreViewItem[][];
}

export interface ICoreViewItem {
    labelFlexSize: number;
    flexSize: number;
    height?: number;
    controlType: EnumCoreViewItemType,
    field: string,
    value?: any,
    label: EnumTranslateKey,
    pipe?: EnumCoreTablePipeType, // shared pipe from CoreTable
    hint?: EnumTranslateKey,
}

export enum EnumCoreViewItemType {
    TEXT = "TEXT",
    CHECKBOX = "CHECKBOX",
}