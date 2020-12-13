import { IState } from '../interfaces';
import newOffer from './new_offer/reducer';

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
    newOffer: {
        // step 1
        title: '',
        price: null,
        category: null,
        currency: null,
        // step 2
        description: '',
        deposit_val: null,
        min_rent_value: null,
        max_rent_value: null,
        extra_requirements: '',
        optional: {
            deposit_val: true,
            min_rent_value: true,
            max_rent_value: true,
        },
    },
};

export default initState;
