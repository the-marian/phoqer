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
            my_offers: (id: ID = ':profileId', status = 'all'): string => `/profile/private/${id}/my_offers/${status}`,
            messages: (id: ID = ':profileId'): string => `/profile/private/${id}/messages`,
            reviews: (id: ID = ':profileId'): string => `/profile/private/${id}/reviews`,
            settings: (id: ID = ':profileId'): string => `/profile/private/${id}/settings`,
            referral: (id: ID = ':profileId'): string => `/profile/private/${id}/referral`,
            analytics: (id: ID = ':profileId'): string => `/profile/private/${id}/analytics`,
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
