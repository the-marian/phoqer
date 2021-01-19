const types = {
    /**
     * DOCS
     * 1 GENERAL
     * 2 AUTH
     * 3 CATEGORIES
     * 4 OFFERS
     * 5 NEW_OFFER
     * 6 SINGLE_OFFER
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
    // NEW_OFFER
    // ========================
    // NEW_OFFER_SAVE
    NEW_OFFER_FORM: 'NEW_OFFER_FORM',
    // POST_OFFER
    POST_OFFER_START: 'POST_OFFER_START',
    POST_OFFER_SUCCESS: 'POST_OFFER_SUCCESS',
    POST_OFFER_ERROR: 'POST_OFFER_ERROR',

    // ========================
    // SINGLE_OFFER
    // ========================
    // GET_SINGLE_OFFER
    GET_SINGLE_OFFER_START: 'GET_SINGLE_OFFER_START',
    GET_SINGLE_OFFER_SUCCESS: 'GET_SINGLE_OFFER_SUCCESS',
    GET_SINGLE_OFFER_ERROR: 'GET_SINGLE_OFFER_ERROR',
};

export default types;
