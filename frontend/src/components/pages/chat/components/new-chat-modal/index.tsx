import React, { useState } from 'react';

import { useRouter } from 'next/router';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import useTrans from '../../../../../hooks/trans.hook';
import { IOfferCard } from '../../../../../interfaces';
import types from '../../../../../redux/types';
import { cutString, moneyFormat } from '../../../../../utils/helpers';
import routes from '../../../../../utils/routes';
import mixin from '../../../../../utils/theming/mixin';
import { Theme } from '../../../../../utils/theming/theme';
import Button from '../../../../common/button';
import { modal } from '../../../../common/modal';
import StickyModal from '../../../../common/modal/sticky-modal';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        fontSize: theme.rem(1.4),
        color: theme.palette.black[0],
    },
    img: {
        width: '100%',
        height: theme.rem(25),
        objectFit: 'cover',
        borderRadius: theme.radius,
    },
    title: {
        margin: theme.rem(1.5, 0),
        fontSize: theme.rem(1.6),
        fontWeight: theme.text.weight[3],
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
    price: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: theme.rem(2),
        fontSize: theme.rem(2),

        '& span': {
            marginRight: theme.rem(1),
            fontWeight: theme.text.weight[4],
        },

        '& small': {
            fontSize: theme.rem(1.4),
        },
    },
}));

interface IProps {
    offer: IOfferCard;
}

const NewChatModal = ({ offer }: IProps): JSX.Element => {
    const css = useStyles();

    const trans = useTrans();
    const history = useRouter();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const handleCreateChat = (): void => {
        setLoading(true);
        dispatch({
            type: types.CREATE_CHAT_START,
            payload: { offer_id: offer.id },
            callback: (id: number) => {
                setLoading(false);
                history.push(routes.chat.item(id));
            },
        });
    };

    return (
        <StickyModal>
            <div className={css.root}>
                <img className={css.img} src={offer.cover_image} alt={offer.title} />

                <h2 className={css.title}>{cutString(offer.title, 200)}</h2>
                <p>{cutString(offer.description, 200)}</p>

                <p className={css.price}>
                    <span>{moneyFormat(offer.price)}</span>
                    <small>{`${trans('uah')} / ${trans('day')}`}</small>
                </p>

                <div className={css.flex}>
                    <Button loading={loading} className={css.cancel} onClick={modal.close}>
                        Отменить
                    </Button>
                    <Button loading={loading} className={css.btn} onClick={handleCreateChat}>
                        Открыть чат
                    </Button>
                </div>
            </div>
        </StickyModal>
    );
};

export default NewChatModal;
