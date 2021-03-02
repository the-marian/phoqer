const routes = {
    root: '/',
    auth: {
        login: '/auth/login',
        join: '/auth/join',
        forgot_pass: '/auth/forgot_pass',
    },
    profile: {
        public: (id: string | number | null = ':profileId'): string => `/profile/public/${id}`,
    },
    offers: {
        single: (id: string | number | null = ':offerId'): string => `/offers/${id}`,
        list: '/offers',
    },
    new_offer: (step: string | number | null = ':step'): string => `/new_offer/${step}`,
    favorite: '/favorite',
};

export default routes;
