import { IState, ITranslations, Languages } from '../../interfaces';
import types from '../types';

export default interface IAction {
    type: typeof types.GET_TRANSLATIONS_START | typeof types.GET_TRANSLATIONS_SUCCESS | typeof types.GET_TRANSLATIONS_ERROR;
    payload: IState | Languages | ITranslations;
}
