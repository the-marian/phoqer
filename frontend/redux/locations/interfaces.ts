import types from '../types';

type Type =
    | typeof types.GET_COUNTRIES_START
    | typeof types.GET_COUNTRIES_ERROR
    | typeof types.GET_COUNTRIES_SUCCESS
    | typeof types.GET_CITIES_START
    | typeof types.GET_CITIES_ERROR
    | typeof types.GET_CITIES_SUCCESS;

export default interface IAction {
    type: Type;
    payload?: string;
}
