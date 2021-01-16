import types from '../types';

interface IState {
    open: boolean;
}

interface IAction {
    type: typeof types.SEARCH_FILTERS;
    payload: IState;
}

const filters = (state: IState = { open: true }, { type, payload }: IAction): IState => {
    switch (type) {
        case types.SEARCH_FILTERS:
            return payload;

        default:
            return state;
    }
};

export default filters;
