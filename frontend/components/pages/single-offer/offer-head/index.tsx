import { faHeart } from '@fortawesome/free-regular-svg-icons/faHeart';
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye';
import { faHeart as faFillHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { Theme } from '../../../../assets/theme';
import useAuth from '../../../../hooks/auth.hook';
import useTrans from '../../../../hooks/trans.hook';
import { IOfferCard, IState } from '../../../../interfaces';
import types from '../../../../redux/types';
import LoginForm from '../../../common/auth/login-form';
import { modal } from '../../../common/modal';
import SmallModalWrp from '../../../common/modal/small-modal-wrp';

const useStyles = createUseStyles((theme: Theme) => ({
    title: {
        margin: theme.rem(0, 0, 1),
        fontSize: theme.rem(3),
        fontWeight: theme.text.weight[3],
        lineHeight: 1.4,
        color: theme.palette.black[0],

        ...theme.media(768).max({
            fontSize: theme.rem(2.5),
        }),
    },
    action: {
        display: 'flex',
        alignItems: 'center',
        color: theme.palette.black[0],

        ...theme.media(768).max({
            fontSize: theme.rem(1.6),
        }),
    },
    favorite: {
        margin: theme.rem(0, 2),
        padding: theme.rem(1.5, 2),
        color: theme.palette.primary[0],
        borderRadius: theme.radius,
        transition: theme.transitions[0],
        ...theme.hover({
            background: theme.palette.secondary[0],
        }),

        '& svg': {
            height: theme.rem(1.4),
            width: theme.rem(1.4),

            ...theme.media(768).max({
                height: theme.rem(1.8),
                width: theme.rem(1.8),
            }),
        },
    },
    eye: {
        margin: theme.rem(0, 0, 0, 6),
        fontSize: theme.rem(1.4),
        '& span': {
            margin: theme.rem(0, 1),
        },
        ...theme.media(768).max({
            margin: theme.rem(0, 0, 0, 3),
            fontSize: theme.rem(2),
        }),
    },
}));

const OfferHead = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const offer = useSelector<IState, IOfferCard | null>(state => state.offers.single);
    const auth = useAuth();
    const dispatch = useDispatch();

    const handleFavorite = (): void => {
        if (!auth?.access_token) {
            modal.open(
                <SmallModalWrp>
                    <LoginForm />
                </SmallModalWrp>,
            );
            return;
        }
        dispatch({ type: types.PATCH_FAVORITE_OFFERS_START, payload: offer?.id });
    };

    return (
        <>
            <h2 className={css.title}>{offer?.title}</h2>
            <div className={css.action}>
                <p>
                    {trans('date')}: {offer?.pub_date}
                </p>
                <p className={css.eye}>
                    <FontAwesomeIcon icon={faEye} />
                    <span>{(offer?.views || 0) + 1}</span>
                </p>
                <button className={css.favorite} onClick={handleFavorite} type="button">
                    {offer?.is_favorite ? <FontAwesomeIcon icon={faFillHeart} /> : <FontAwesomeIcon icon={faHeart} />}
                </button>
            </div>
        </>
    );
};

export default OfferHead;
