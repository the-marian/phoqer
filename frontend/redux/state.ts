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
    newOffer: {
        // step 1
        title: '',
        price: null,
        category: null,
        currency: null,
        is_deliverable: false,
        // step 2
        doc_needed: false,
        description: '',
        deposit_val: null,
        min_rent_period: null,
        max_rent_period: null,
        extra_requirements: '',
        optional: {
            deposit_val: false,
            min_rent_period: false,
            max_rent_period: false,
        },
        // is done
        isDone: {
            one: false,
            two: false,
            three: false,
        },
    },
};

export default initState;
