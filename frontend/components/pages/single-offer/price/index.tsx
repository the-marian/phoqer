import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { moneyFormat } from '../../../../assets/helpers';
import template from '../../../../assets/template';
import { Theme } from '../../../../assets/theme';
import useAuth from '../../../../hooks/auth.hook';
import useTrans from '../../../../hooks/trans.hook';
import { IOfferCard, IState } from '../../../../interfaces';
import LoginForm from '../../../common/auth/login-form';
import { modal } from '../../../common/modal';
import SmallModalWrp from '../../../common/modal/small-modal-wrp';
import RentModal from '../rent-modal';

const useStyles = createUseStyles((theme: Theme) => ({
    priceTitle: {
        margin: theme.rem(4, 0, 0),
        fontSize: theme.rem(2),
        fontWeight: theme.text.weight[2],
        color: theme.palette.black[0],
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
        padding: theme.rem(1.5, 4),
        borderRadius: theme.radius,
        background: theme.palette.green[0],
        fontSize: theme.rem(1.8),
        color: theme.palette.trueWhite,
        ...template(theme).outline,
    },
}));

const Price = (): ReactElement => {
    const css = useStyles();
    const auth = useAuth();
    const trans = useTrans();
    const offer = useSelector<IState, IOfferCard | null>(state => state.offers.single);

    const handleRent = (): void => {
        if (!auth?.access_token) {
            modal.open(
                <SmallModalWrp>
                    <LoginForm />
                </SmallModalWrp>,
            );
            return;
        }

        modal.open(<RentModal />);
    };
    return (
        <>
            <h3 className={css.priceTitle}>{trans('price')}:</h3>
            <p className={css.price}>
                <span className={css.num}>{moneyFormat(offer?.price)}</span>
                <span className={css.point}>.00</span> {trans('uah')} / {trans('day')}
            </p>
            <button className={css.buy} onClick={handleRent} type="button">
                {trans('rent')}
            </button>
        </>
    );
};

export default Price;
