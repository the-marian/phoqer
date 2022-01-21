import React, { ReactElement } from 'react';

import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { IOfferCard, IState } from '../../../../../../interfaces';
import types from '../../../../../../redux/types';
import routes from '../../../../../../utils/routes';
import ConfirmModalTemplate from '../../../../../common/modal/template/confirm-modal';
import notifications from '../../../../../common/notifications';

const DeleteOfferModal = (): ReactElement => {
    const dispatch = useDispatch();
    const history = useRouter();

    const offer = useSelector<IState, IOfferCard | null>(state => state.offers.single.data);

    const handleDelete = (): void => {
        dispatch({
            type: types.DELETE_OFFER_START,
            offerId: offer?.id,
            callback: () => notifications.info({ message: 'Вы успешно удалили ваше объвление' }),
        });
        history.push(routes.my_offers('draft'));
    };

    return (
        <ConfirmModalTemplate
            title="Вы уверенны что хотите удалить это объвление?"
            content="После этого действия вы больше не сможете востановить его"
            onSubmit={handleDelete}
        />
    );
};

export default DeleteOfferModal;
