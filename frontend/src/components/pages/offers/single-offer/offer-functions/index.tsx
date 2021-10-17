import React, { ReactElement } from 'react';

import { faTrashAlt } from '@fortawesome/free-regular-svg-icons/faTrashAlt';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { IOfferCard, IPublicProfile, IState } from '../../../../../interfaces';
import types from '../../../../../redux/types';
import routes from '../../../../../utils/routes';
import { Theme } from '../../../../../utils/theming/theme';
import notifications from '../../../../common/notifications';

const useStyles = createUseStyles((theme: Theme) => ({
    flex: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    link: {
        marginRight: theme.rem(2),
        fontSize: theme.rem(1.4),
        color: theme.palette.primary[0],
        ...theme.hover({
            textDecoration: 'underline',
        }),

        '& > svg': {
            margin: theme.rem(0, 0.5, 0.2, 0),
        },
    },
}));

const OfferFunctions = (): ReactElement | null => {
    const css = useStyles();
    const dispatch = useDispatch();
    const history = useRouter();

    const user = useSelector<IState, IPublicProfile | null>(state => state.user);
    const offer = useSelector<IState, IOfferCard | null>(state => state.offers.single);

    const deleteOffer = (): void => {
        dispatch({
            type: types.DELETE_OFFER_START,
            offerId: offer?.id,
            callback: () => notifications.info({ message: 'Your offer successfully deleted' }),
        });
        history.push(routes.profile.private.my_offers('draft'));
    };

    const editOffer = (): void => {
        history.push(routes.offers.edit(offer?.id));
    };

    return user?.id === offer?.author_id && offer?.status === 'DRAFT' ? (
        <div className={css.flex}>
            <button className={css.link} type="button" onClick={deleteOffer}>
                <FontAwesomeIcon icon={faTrashAlt} />
                <span>Удалить</span>
            </button>
            <button className={css.link} type="button" onClick={editOffer}>
                <FontAwesomeIcon icon={faPen} />
                <span>Редактировать</span>
            </button>
        </div>
    ) : null;
};

export default OfferFunctions;
