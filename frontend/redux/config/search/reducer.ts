import { ISearch } from '../../../interfaces';
import initState from '../../state';
import types from '../../types';
import IAction from './interfaces';

const search = (state: ISearch = initState.config.search, { type, payload }: IAction): ISearch => {
    switch (type) {
        case types.OFFERS_SEARCH:
            return payload as ISearch;

        default:
            return state;
    }
};

export default search;
