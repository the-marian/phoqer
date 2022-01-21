import { IOffers } from '../../interfaces';

const offersInit: IOffers = {
    popular: {
        data: [],
        loading: true,
    },
    edit_offer: {
        loading: false,
    },
    search: {
        data: {
            data: [],
            total: 1,
        },
        loading: true,
        pagination: false,
    },
    my_offers: {
        data: {
            data: [],
            total: 1,
        },
        loading: true,
        pagination: false,
    },
    favorite: {
        data: [],
        loading: true,
    },
    single: { loading: true, data: null },
    new_offer: {
        loading: false,
        // step 1
        title: '',
        price: null,
        category: null,
        is_deliverable: false,
        items_amount: 1,
        currency: { name: 'uah', slug: 'UAH', type: 'main' },
        rental_period: { name: 'daily', slug: 'DAY', type: 'main' },
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

export default offersInit;
