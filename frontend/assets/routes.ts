const routes = {
    root: '/',
    auth: {
        login: '/auth/login',
        join: '/auth/join',
        forgot_pass: '/auth/forgot_pass',
    },
    profile: {
        public: (id: string | number | null = ':profileId'): string => `/profile/public/${id}`,
        private: {
            my_offers: (id: string | number | null = ':profileId'): string => `/profile/private/${id}/my_offers`,
            messages: (id: string | number | null = ':profileId'): string => `/profile/private/${id}/messages`,
            reviews: (id: string | number | null = ':profileId'): string => `/profile/private/${id}/reviews`,
            settings: (id: string | number | null = ':profileId'): string => `/profile/private/${id}/settings`,
            referral: (id: string | number | null = ':profileId'): string => `/profile/private/${id}/referral`,
        },
    },
    offers: {
        single: (id: string | number | null = ':offerId'): string => `/offers/${id}`,
        list: '/offers',
    },
    new_offer: (step: string | number | null = ':step'): string => `/new_offer/${step}`,
    favorite: '/favorite',
};

export default routes;
