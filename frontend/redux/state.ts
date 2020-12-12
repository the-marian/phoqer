import { IState } from '../interfaces';

const initState: IState = {
    auth: {
        user: null,
        auth_token: null,
    },
    filters: { open: true },
    categories: null,
    offers: {
        popular: {
            data: null,
            loading: true,
        },
    },
};

export default initState;
