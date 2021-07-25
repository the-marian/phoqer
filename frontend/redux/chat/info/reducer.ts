import { IChatOfferInfo, IOfferCard } from '../../../interfaces';
import initState from '../../state';
import types from '../../types';
import IAction from './interfaces';

const info = (state: IChatOfferInfo = initState.chat.info, { type, payload }: IAction): IChatOfferInfo => {
    switch (type) {
        case types.GET_CHAT_OFFER_INFO_START:
            return { data: null, loading: true };

        case types.GET_CHAT_OFFER_INFO_SUCCESS:
            return { data: payload as IOfferCard, loading: false };

        case types.GET_CHAT_OFFER_INFO_ERROR:
            return { data: null, loading: false };

        default:
            return state;
    }
};

export default info;
