import { HYDRATE } from 'next-redux-wrapper';

import { IState, ITranslations } from '../../interfaces';
import types from '../types';
import IAction from './interfaces';

const translations = (state: ITranslations = { data: 'loading...' }, { type, payload }: IAction): ITranslations => {
    switch (type) {
        case HYDRATE:
            return (payload as IState).translations;

        case types.GET_TRANSLATIONS_ERROR:
            return state;

        case types.GET_TRANSLATIONS_SUCCESS:
            return payload as ITranslations;

        default:
            return state;
    }
};

export default translations;
