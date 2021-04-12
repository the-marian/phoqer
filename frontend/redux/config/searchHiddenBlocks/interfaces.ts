import { IState } from '../../../interfaces';
import types from '../../types';

export interface ISearchHiddenBlocks {
    filters: boolean;
    popularSearch: boolean;
    hideTop: boolean;
}

export default interface IAction {
    type: typeof types.OFFERS_HIDE_POPULAR_SEARCH | typeof types.OFFERS_HIDE_FILTERS | typeof types.OFFERS_HIDE_TOP;
    payload?: IState | ISearchHiddenBlocks | boolean;
}
