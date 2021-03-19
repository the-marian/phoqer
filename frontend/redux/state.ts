import { IState } from '../interfaces';

const initState: IState = {
    auth: {
        access_token: null,
    },
    config: {
        drawer: false,
        search: {
            search: null,
            category: null,
            sub_category: null,
            period: null,
            status: null,
            ordering: null,
            max_price: null,
            min_price: null,
            top: null,
            no_deposit: null,
            is_deliverable: null,
        },
        offers: {
            filters: true,
            popularSearch: true,
            hideTop: false,
        },
    },
    categories: [],
    profiles: {
        public: null,
        private: null,
    },
    comments: { loading: false, data: [] },
    offers: {
        popular: {
            data: [],
            loading: true,
        },
        search: {
            data: {
                data: [],
                total: 1,
            },
            loading: true,
        },
        favorite: {
            data: [],
            loading: true,
        },
        single: null,
        newOffer: {
            // step 1
            title: '',
            price: null,
            category: null,
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
    },
};

export default initState;
