const types = {
    /**
     * DOCS
     * 1 GENERAL
     * 2 AUTH
     * 3 CATEGORIES
     * 4 OFFERS
     * 5 NEW OFFER
     * */

    // ========================
    // GENERAL
    // ========================
    // SEARCH_FILTERS
    SEARCH_FILTERS: 'SEARCH_FILTERS',

    // ========================
    // AUTH
    // ========================
    // LOGIN
    LOGIN_START: 'LOGIN_START',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_ERROR: 'LOGIN_ERROR',
    // LOGOUT
    LOGOUT_START: 'LOGOUT_START',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    LOGOUT_ERROR: 'LOGOUT_ERROR',
    // USER
    GET_USER_START: 'GET_USER_START',
    GET_USER_SUCCESS: 'GET_USER_SUCCESS',
    GET_USER_ERROR: 'GET_USER_ERROR',

    // ========================
    // CATEGORIES
    // ========================
    // GET_CATEGORIES
    GET_CATEGORIES_START: 'GET_CATEGORIES_START',
    GET_CATEGORIES_SUCCESS: 'GET_CATEGORIES_SUCCESS',
    GET_CATEGORIES_ERROR: 'GET_CATEGORIES_ERROR',

    // ========================
    // OFFERS
    // ========================
    // GET_POPULAR_OFFERS
    GET_POPULAR_OFFERS_START: 'GET_POPULAR_OFFERS_START',
    GET_POPULAR_OFFERS_SUCCESS: 'GET_POPULAR_OFFERS_SUCCESS',
    GET_POPULAR_OFFERS_ERROR: 'GET_POPULAR_OFFERS_ERROR',

    // ========================
    // NEW OFFER
    // ========================
    // NEW_OFFER_SAVE
    NEW_OFFER_FORM: 'NEW_OFFER_FORM',
};

export default types;
