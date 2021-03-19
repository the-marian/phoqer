type ID = string | number | null;

const routes = {
    root: '/',
    auth: {
        login: '/auth/login',
        join: '/auth/join',
        forgot_pass: '/auth/forgot_pass',
    },
    profile: {
        public: (id: ID = ':profileId'): string => `/profile/public/${id}`,
        private: {
            my_offers: (status = 'all'): string => `/profile/private/my_offers/${status}`,
            messages: `/profile/private/messages`,
            reviews: `/profile/private/reviews`,
            settings: `/profile/private/settings`,
            referral: `/profile/private/referral`,
            analytics: `/profile/private/analytics`,
        },
    },
    offers: {
        single: (id: ID = ':offerId'): string => `/offers/${id}`,
        list: '/offers',
    },
    new_offer: (step: ID = ':step'): string => `/new_offer/${step}`,
    favorite: '/favorite',
};

export default routes;
