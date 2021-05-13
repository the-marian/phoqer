import { IState } from '../interfaces';

const initState: IState = {
    auth: {
        loading: false,
        access_token: null,
    },
    user: {
        id: 0,
        likes: 0,
        dislikes: 0,
        response_rate: 0,
        bio: 'loading...',
        email: 'loading...',
        satisfaction_rate: 0,
        communication_rate: 0,
        location: 'loading...',
        last_name: 'loading...',
        last_login: 'loading...',
        first_name: 'loading...',
        birth_date: 'loading...',
        date_joined: 'loading...',
        profile_img: 'loading...',
        last_activity: 'loading...',
        description_rate: 'loading...',
    },
    region: {
        loading: true,
    },
    config: {
        drawer: false,
        searchParams: {
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
        single: null,
        new_offer: {
            loading: false,
            // step 1
            title: '',
            price: null,
            category: null,
            currency: 'UAH',
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
