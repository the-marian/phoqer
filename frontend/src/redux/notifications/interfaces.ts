import { IState, NotificationsResponse } from '../../interfaces';
import types from '../types';

type Type =
    | typeof types.GET_NOTIFICATIONS_START
    | typeof types.GET_NOTIFICATIONS_ERROR
    | typeof types.GET_NOTIFICATIONS_SUCCESS
    | typeof types.GET_NOTIFICATIONS_PAGINATION_START
    | typeof types.GET_NOTIFICATIONS_PAGINATION_SUCCESS
    | typeof types.GET_NOTIFICATIONS_PAGINATION_ERROR;

export default interface IAction {
    type: Type;
    payload: IState | NotificationsResponse | number;
}
