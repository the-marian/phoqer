import { IState } from '../../../interfaces';
import types from '../../types';

export default interface IAction {
    type: typeof types.TOGGLE_CHAT_DRAWER;
    payload?: boolean | IState;
}
