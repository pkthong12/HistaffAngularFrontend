import { IAlertOptions } from "../libraries/alert/alert/alert.model";

export const alertOptions: IAlertOptions = {
    autoClose: true,
    keepAfterRouteChange: true,
    timeClose: 3000
};

export const longAlertOptions: IAlertOptions = {
    autoClose: true,
    keepAfterRouteChange: true,
    timeClose: 10000
};

export const noneAutoClosedAlertOptions: IAlertOptions = {
    autoClose: false,
    keepAfterRouteChange: true,
};