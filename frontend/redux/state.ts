import { IState } from '../interfaces';

const initState: IState = {
    auth: {
        loading: false,
        access_token: null,
    },
    user: {
        bio: 'loading...',
        birth_date: 'loading...',
        communication_rate: 0,
        date_joined: 'loading...',
        description_rate: 'loading...',
        dislikes: 0,
        email: 'loading...',
        id: 0,
        first_name: 'loading...',
        last_login: 'loading...',
        last_activity: 'loading...',
        last_name: 'loading...',
        likes: 0,
        location: 'loading...',
        profile_img: 'loading...',
        response_rate: 0,
        satisfaction_rate: 0,
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
        searchHiddenBlocks: {
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
