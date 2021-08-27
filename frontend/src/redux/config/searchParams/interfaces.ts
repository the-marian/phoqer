import { ISearch, IState } from '../../../interfaces';
import types from '../../types';

export default interface IAction {
    type: typeof types.OFFERS_SEARCH_LOCAL_PARAMS;
    payload?: ISearch | IState;
}
