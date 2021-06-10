import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { cutString } from '../../../../../../../assets/helpers';
import routes from '../../../../../../../assets/routes';
import { Theme } from '../../../../../../../assets/theme';
import useTrans from '../../../../../../../hooks/trans.hook';
import { IOfferCard, IState } from '../../../../../../../interfaces';
import types from '../../../../../../../redux/types';
import Tooltip from '../../../../../../common/tooltip';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        width: '100%',
        maxWidth: theme.rem(45),
        margin: '0 auto',
    },
    link: {
        display: 'block',
        textAlign: 'center',
        marginTop: theme.rem(4),
        color: theme.palette.black[0],
        ...theme.hover({
            textDecoration: 'underline',
        }),
    },
    img: {
        width: 'auto',
        maxHeight: theme.rem(45),
        maxWidth: '100%',
        margin: '0 auto',
        objectFit: 'cover',
        background: theme.palette.gray[1],
        borderRadius: theme.radius,
    },
    title: {
        margin: theme.rem(2, 0, 1),
        fontSize: theme.rem(1.6),
        fontWeight: theme.text.weight[2],
        color: theme.palette.gray[2],
    },
    text: {
        fontSize: theme.rem(1.4),
        textAlign: 'center',
        color: theme.palette.black[0],
    },
    price: {
        margin: theme.rem(2, 0, 0),
        color: theme.palette.gray[3],
        fontWeight: theme.text.weight[3],
        textAlign: 'center',
        fontSize: theme.rem(1.4),
    },
}));

interface IProps {
    children?: ReactElement;
}

const ChatInitConversation = ({ children }: IProps): ReactElement | null => {
    const css = useStyles();
    const trans = useTrans();
    const dispatch = useDispatch();
    const history = useRouter();
    const offerId = String(history.query.offerId || '');

    const offer = useSelector<IState, IOfferCard | null>(state => state.offers.single);

    useEffect(() => {
        if (offerId && !offer) dispatch({ type: types.GET_SINGLE_OFFER_START, payload: offerId });
    }, [dispatch, offerId, offer]);

    return offer ? (
        <div className={css.root}>
            <Link href={routes.offers.single(offer?.id)}>
                <a className={css.link}>
                    <Tooltip content="Нажмите чтобы просмотреть объявление">
                        <img className={css.img} src={offer?.cover_image || '/no_img.png'} alt="" />
                    </Tooltip>
                    <h2 className={css.title}>{offer?.title}</h2>
                    <p className={css.text}>{cutString(offer.description, 80)}</p>
                </a>
            </Link>
            <h3 className={css.price}>{trans('price')}</h3>
            <p className={css.text}>
                {offer.price} {trans(offer.currency.toLowerCase() || 'uah')}/{trans(offer.rental_period?.toLowerCase() || 'day')}
            </p>
            {children}
        </div>
    ) : null;
};

export default ChatInitConversation;
