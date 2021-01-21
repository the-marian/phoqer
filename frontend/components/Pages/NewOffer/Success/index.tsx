import clsx from 'clsx';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import routes from '../../../../assets/routes';
import { INewOffer, IState } from '../../../../interfaces';
import initState from '../../../../redux/state';
import types from '../../../../redux/types';
import useStyles from './Success.styles';

const Success = (): ReactElement => {
    const css = useStyles();
    const dispatch = useDispatch();
    const value = useSelector<IState, INewOffer>(state => state.offers.newOffer);

    useEffect(() => {
        const handleClear = () => {
            dispatch({ type: types.NEW_OFFER_FORM, payload: initState.offers.newOffer });
        };
        Router.events.on('routeChangeComplete', handleClear);

        return () => {
            Router.events.off('routeChangeComplete', handleClear);
        };
    }, []);

    return (
        <div className={css.root}>
            <div className={css.success}>
                <svg viewBox="0 0 76 76">
                    <circle cx={38} cy={38} r={36} />
                    <path
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth={5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit={10}
                        d="M17.7,40.9l10.9,10.9l28.7-28.7"
                    />
                </svg>

                <h2 className={css.title}>Ваше объявление отправлено на модерацию</h2>

                <p className={css.text}>
                    В ближайшее время мы проверим ваше объявление и опубликуем его. Вы можете отслеживать статус вашего объявления
                    в личном кабинете.
                </p>

                <Link href={routes.offers.single(value.id)}>
                    <a className={clsx(css.btn, css.center)} type="button">
                        Просмотреть объявление
                    </a>
                </Link>

                <Link href={routes.root}>
                    <a className={css.link}>Перейти в личный кабинет</a>
                </Link>
            </div>

            <div className={css.top}>
                <img className={css.img} src="/emoji/top.png" alt="" />
                <h1 className={css.topTitle}>Выводите товар в топ на месяц абсолютно бесплатно</h1>
                <p className={css.text}>
                    Ляля тополя ляля тополя тополя ляля тополя тополя ляля тополя тополя ляля тополя. Тополя ляля тополя тополя
                    ляля тополя.
                </p>

                <button className={css.btn} type="button">
                    Подробнее
                </button>
            </div>
        </div>
    );
};

export default Success;
