import React, { ReactElement } from 'react';

import { useRouter } from 'next/router';
import { createUseStyles } from 'react-jss';

import useAuth from '../../../../../hooks/auth.hook';
import useTrans from '../../../../../hooks/trans.hook';
import { IOfferCard } from '../../../../../interfaces';
import { moneyFormat } from '../../../../../utils/helpers';
import routes from '../../../../../utils/routes';
import mixin from '../../../../../utils/theming/mixin';
import { Theme } from '../../../../../utils/theming/theme';
import LoginForm from '../../../../common/auth-form/login-form';
import { modal } from '../../../../common/modal';
import SmallModalWrp from '../../../../common/modal/small-modal-wrp';

const useStyles = createUseStyles((theme: Theme) => ({
    priceTitle: {
        margin: theme.rem(4, 0, 0),
        fontSize: theme.rem(2),
        fontWeight: theme.text.weight[2],
        color: theme.palette.black[0],

        ...theme.media(768).max({
            margin: theme.rem(1, 0, 0),
        }),
    },
    price: {
        fontSize: theme.rem(1.6),
        fontWeight: theme.text.weight[2],
        color: theme.palette.black[0],
    },
    num: {
        fontSize: theme.rem(3.5),
        fontWeight: theme.text.weight[5],
        color: theme.palette.primary[0],
    },
    point: {
        fontSize: theme.rem(2),
        fontWeight: theme.text.weight[5],
        color: theme.palette.primary[0],
    },
    buy: {
        display: 'block',
        marginTop: theme.rem(2),
        padding: theme.rem(1, 4),
        borderRadius: theme.radius,
        background: theme.palette.green[0],
        fontSize: theme.rem(1.8),
        color: theme.palette.trueWhite,
        ...mixin(theme).outline,
    },
}));

interface IProps {
    withButton?: boolean;
    offer: IOfferCard;
}

const Price = ({ offer, withButton = false }: IProps): ReactElement => {
    const css = useStyles();
    const auth = useAuth();
    const trans = useTrans();
    const history = useRouter();

    const handleRent = (): void => {
        if (!auth?.access_token) {
            modal.open(
                <SmallModalWrp>
                    <LoginForm />
                </SmallModalWrp>,
            );
            return;
        }

        history.push(routes.newMessage(offer?.id));
    };

    return (
        <>
            <h3 className={css.priceTitle}>{trans('price')}:</h3>
            <p className={css.price}>
                <span className={css.num}>{moneyFormat(offer?.price)}</span> {trans('uah')} / {trans('day')}
            </p>
            {withButton && (
                <button className={css.buy} onClick={handleRent} type="button">
                    {trans('rent')}
                </button>
            )}
        </>
    );
};

export default Price;
