import Link from 'next/link';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../config/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        maxWidth: theme.rem(80),
        margin: '0 auto',
        textAlign: 'center',
        '& svg': {
            width: theme.rem(5),

            '& circle': {
                fill: theme.palette.green,
            },
        },
    },
    success: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    title: {
        maxWidth: theme.rem(40),
        margin: '2rem auto',
        color: theme.palette.green,
    },
    text: {
        maxWidth: theme.rem(40),
        margin: '0 auto',
        fontSize: theme.rem(1.2),
    },
    link: {
        margin: theme.rem(3),
        fontSize: theme.rem(1.2),
        color: theme.palette.blue[0],
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    top: {
        margin: '5rem auto',
        padding: theme.rem(10),
        borderRadius: theme.radius,
        background: theme.palette.soft[0],

        '@media (max-width: 460px)': {
            padding: theme.rem(6, 3),
        },
    },
    btn: {
        height: theme.rem(6),
        padding: theme.rem(1, 4),
        margin: theme.rem(5, 0, 0),
        background: theme.palette.blue[0],
        fontSize: theme.rem(1.4),
        color: theme.palette.white,
        borderRadius: theme.radius,

        '@media (max-width: 470px)': {
            margin: theme.rem(2, 0, 0),
            padding: theme.rem(2, 4),
        },
    },
    topTitle: {
        maxWidth: theme.rem(40),
        margin: '3rem auto',
    },
    img: {
        width: theme.rem(10),
        margin: '0 auto',
    },
}));

const Success = (): ReactElement => {
    const css = useStyles();
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
                    В ближайшее время мы проверим ваше объявление и опубликуем его. Вы можете отслеживать статус вашего
                    объявления в личном кабинете.
                </p>

                <Link href="/">
                    <a className={css.link}>Перейти в личный кабинет</a>
                </Link>
            </div>

            <div className={css.top}>
                <img className={css.img} src="/top.png" alt="" />
                <h1 className={css.topTitle}>Выводите товар в топ на месяц абсолютно бесплатно</h1>
                <p className={css.text}>
                    Ляля тополя ляля тополя тополя ляля тополя тополя ляля тополя тополя ляля тополя. Тополя ляля тополя
                    тополя ляля тополя.
                </p>

                <button className={css.btn} type="button">
                    Подробнее
                </button>
            </div>
        </div>
    );
};

export default Success;
