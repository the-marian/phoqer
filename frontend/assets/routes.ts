type ID = string | number | null;

const routes = {
    root: '/',
    auth: {
        login: '/auth/login',
        join: '/auth/join',
        forgot_pass: '/auth/forgot-pass',
        confirmation: '/auth/confirmation',
    },
    profile: {
        public: (id: ID = ':profileId'): string => `/profile/public/${id}`,
        private: {
            my_offers: (status = 'all'): string => `/profile/private/my-offers/${status}`,
            messages: (status: string | number = ''): string => `/profile/private/messages/${status}`,
            settings: (status: string | number = 'general'): string => `/profile/private/settings/${status}`,
            reviews: '/profile/private/reviews',
            referral: '/profile/private/referral',
            analytics: (): string =>
                process.env.NODE_ENV === 'development'
                    ? 'http://localhost:4200'
                    : `http://analytics.phoqer.com/${process.browser ? document.documentElement.lang : ''}`,
        },
    },
    offers: {
        single: (id: ID = ':offerId'): string => `/offers/${id}`,
        edit: (id: ID = ':offerId'): string => `/offers/edit/${id}`,
        new: (step: ID = ':step'): string => `/offers/new/${step}`,
        list: '/offers',
    },
    static: {
        help: '/static/help',
        ad: '/static/ad',
        rules: '/static/rules',
        politic: '/static/politic',
        faq: '/static/faq',
        safety: '/static/safety',
        map: '/static/map',
    },
    favorite: '/favorite',
};

export default routes;
