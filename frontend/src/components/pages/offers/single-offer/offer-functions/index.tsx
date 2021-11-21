import React, { ReactElement } from 'react';

import { faTrashAlt } from '@fortawesome/free-regular-svg-icons/faTrashAlt';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { IOfferCard, IPublicProfile, IState } from '../../../../../interfaces';
import routes from '../../../../../utils/routes';
import { Theme } from '../../../../../utils/theming/theme';
import { modal } from '../../../../common/modal';

import DeleteOfferModal from './delete-offer-modal';

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
    const history = useRouter();

    const user = useSelector<IState, IPublicProfile | null>(state => state.user);
    const offer = useSelector<IState, IOfferCard | null>(state => state.offers.single);

    const deleteOffer = (): void => {
        modal.open(<DeleteOfferModal />);
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
