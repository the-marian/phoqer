const routes = {
    root: '/',
    auth: {
        login: '/auth/login',
        join: '/auth/join',
        forgot_pass: '/auth/forgot_pass',
    },
    profile: {
        single: (id: string | number = ':profileId'): string => `/profile/${id}`,
    },
    offers: {
        single: (id: string | number = ':offerId'): string => `/offers/${id}`,
        list: '/offers',
    },
    new_offer: (step: string | number = ':step'): string => `/new_offer/${step}`,
    favorite: '/favorite',
};

export default routes;
