import { ICategories, IState } from '../../interfaces';
import types from '../types';

type Type = typeof types.GET_CATEGORIES_START | typeof types.GET_CATEGORIES_ERROR | typeof types.GET_CATEGORIES_SUCCESS;

export default interface IAction {
    type: Type;
    payload: IState | ICategories[] | null;
}
