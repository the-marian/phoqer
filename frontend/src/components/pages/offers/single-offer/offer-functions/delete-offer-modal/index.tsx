import React, { ReactElement } from 'react';

import { useRouter } from 'next/router';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { IOfferCard, IState } from '../../../../../../interfaces';
import types from '../../../../../../redux/types';
import routes from '../../../../../../utils/routes';
import mixin from '../../../../../../utils/theming/mixin';
import { Theme } from '../../../../../../utils/theming/theme';
import Button from '../../../../../common/button';
import { modal } from '../../../../../common/modal';
import StickyModal from '../../../../../common/modal/sticky-modal';
import notifications from '../../../../../common/notifications';

const useStyles = createUseStyles((theme: Theme) => ({
    img: {
        display: 'block',
        width: theme.rem(7),
        margin: '1rem auto',
        textAlign: 'center',
    },
    title: {
        fontSize: theme.rem(1.4),
        textAlign: 'center',
        fontWeight: theme.text.weight[4],
        color: theme.palette.primary[0],
    },
    text: {
        padding: theme.rem(2),
        fontSize: theme.rem(1.4),
        textAlign: 'center',
    },
    flex: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: theme.rem(4),
    },
    btn: {
        ...mixin(theme).btn,
        marginLeft: theme.rem(1),

        ...theme.hover({
            background: theme.palette.primary[1],
            border: theme.border(0.2, theme.palette.primary[0]),
        }),
    },
    cancel: {
        ...mixin(theme).btn,
        background: theme.palette.gray[0],
        color: theme.palette.black[0],
    },
}));

const DeleteOfferModal = (): ReactElement => {
    const css = useStyles();
    const dispatch = useDispatch();
    const history = useRouter();

    const offer = useSelector<IState, IOfferCard | null>(state => state.offers.single);

    const handleDelete = (): void => {
        dispatch({
            type: types.DELETE_OFFER_START,
            offerId: offer?.id,
            callback: () => notifications.info({ message: 'Your offer successfully deleted' }),
        });
        history.push(routes.my_offers('draft'));
    };

    return (
        <StickyModal>
            <>
                <img className={css.img} src="/icons/faq.png" alt="" />
                <h2 className={css.title}>Вы уверенны что хотите удалить это объвление?</h2>
                <p className={css.text}>После этого действия вы больше не сможете востановить его</p>
                <div className={css.flex}>
                    <Button className={css.cancel} onClick={modal.close}>
                        Отменить
                    </Button>
                    <Button className={css.btn} onClick={handleDelete}>
                        Удалить
                    </Button>
                </div>
            </>
        </StickyModal>
    );
};

export default DeleteOfferModal;
