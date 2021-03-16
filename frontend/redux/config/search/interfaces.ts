import { ISearch } from '../../../interfaces';
import types from '../../types';

export default interface IAction {
    type: typeof types.OFFERS_SEARCH;
    payload?: ISearch;
}
