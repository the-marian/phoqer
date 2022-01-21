type ID = string | number | null;
type Primitive = string | number;

const routes = {
    root: '/',
    auth: {
        login: '/auth/login',
        join: '/auth/join',
        forgot_pass: '/auth/forgot-pass',
        confirmation: '/auth/confirmation',
    },
    profile: {
        public: (id: ID = ':profileId'): string => `/profile/${id}`,
        private: '/profile/private',
    },
    my_offers: (status = 'all'): string => `/my-offers/${status}`,

    chat: {
        list: '/chat',
        i_am_author: '/chat?i_am_author=true',
        i_am_client: '/chat?i_am_client=true',
        item: (chat: Primitive = ''): string => `/chat/${chat}`,
        new: (offerId: Primitive = ''): string => `/chat/new/${offerId}`,
    },
    settings: (status: Primitive = 'general'): string => `/settings/${status}`,
    notifications: '/notifications',
    referral: '/referral',
    analytics: '/analytics',
    offers: {
        single: (id: ID = ':offerId'): string => `/offers/${id}`,
        edit: (id: ID = ':offerId'): string => `/offers/edit/${id}`,
        new: (step: ID = ':step', offerId?: string): string => `/offers/new/${step}${offerId ? '?offerId=' + offerId : ''}`,
        list: '/offers',
    },
    static: {
        help: '/static/help',
        business: '/static/business',
        rules: '/static/rules',
        politic: '/static/politic',
        faq: '/static/faq',
        safety: '/static/safety',
        map: '/static/map',
    },
    favorite: '/favorite',
};

export default routes;
