import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { moneyFormat } from '../../../../assets/helpers';
import { Theme } from '../../../../assets/theme';
import useAuth from '../../../../hooks/auth.hook';
import { IOfferCard, IState } from '../../../../interfaces';
import LoginForm from '../../../Common/Auth/LoginForm';
import { modal } from '../../../Common/Modal';
import SmallModalWrp from '../../../Common/Modal/SmallModalWrp';
import RentModal from '../RentModal';

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
        color: '#ffffff',
        ...theme.outline,
    },
}));

const Price = (): ReactElement => {
    const css = useStyles();
    const auth = useAuth();

    const offer = useSelector<IState, IOfferCard | null>(state => state.offers.single);

    const handleRent = (): void => {
        if (!auth?.auth_token) {
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
            <h3 className={css.priceTitle}>Цена:</h3>
            <p className={css.price}>
                <span className={css.num}>{moneyFormat(offer?.price)}</span>
                <span className={css.point}>.00</span> грн/день
            </p>
            <button className={css.buy} onClick={handleRent} type="button">
                Арендовать
            </button>
        </>
    );
};

export default Price;
