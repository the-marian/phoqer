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
        private: {
            personal_area: '/profile/private',
            my_offers: (status = 'all'): string => `/profile/private/my-offers/${status}`,
            chat: (chat: Primitive = ''): string => `/profile/private/chat/${chat}`,
            newMessage: (offerId: Primitive = ''): string => `/profile/private/chat/new/${offerId}`,
            settings: (status: Primitive = 'general'): string => `/profile/private/settings/${status}`,
            reviews: '/profile/private/reviews',
            referral: '/profile/private/referral',
            analytics: '/profile/private/analytics',
        },
    },
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
