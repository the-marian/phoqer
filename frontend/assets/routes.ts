type ID = string | number | null;

const routes = {
    root: '/',
    auth: {
        login: '/auth/login',
        join: '/auth/join',
        forgot_pass: '/auth/forgot-pass',
    },
    profile: {
        public: (id: ID = ':profileId'): string => `/profile/public/${id}`,
        private: {
            my_offers: (status = 'all'): string => `/profile/private/my-offers/${status}`,
            messages: (status: string | number = ''): string => `/profile/private/messages/${status}`,
            settings: '/profile/private/settings',
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
        list: '/offers',
    },
    new_offer: (step: ID = ':step'): string => `/new-offer/${step}`,
    favorite: '/favorite',
};

export default routes;
