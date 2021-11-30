import { IState, PopularSearches } from '../../interfaces';

import types from './types';

type Type =
    | typeof types.GET_POPULAR_SEARCHES_START
    | typeof types.GET_POPULAR_SEARCHES_ERROR
    | typeof types.GET_POPULAR_SEARCHES_SUCCESS;

export default interface IAction {
    type: Type;
    payload: IState | PopularSearches;
}
