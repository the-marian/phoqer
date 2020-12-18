import Link from 'next/link';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import config from '../../../../assets/config';
import router from '../../../../assets/router';
import { Theme } from '../../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    '@keyframes loader': {
        '0%': { background: theme.palette.gray[1] },
        '50%': { background: theme.palette.secondary[0] },
        '100%': { background: theme.palette.gray[1] },
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: theme.fr(config.offers.grid.desktop),
        gridGap: theme.rem(8, 4),
        fontSize: theme.rem(1.5),
        fontWeight: theme.text.weight[3],

        '@media (max-width: 1140px)': {
            gridTemplateColumns: theme.fr(config.offers.grid.tablet),
        },
        '@media (max-width: 960px)': {
            gridGap: theme.rem(6, 3),
        },
        '@media (max-width: 560px)': {
            gridTemplateColumns: theme.fr(config.offers.grid.mobile),
            maxWidth: theme.rem(40),
            margin: '0 auto',
        },
    },
    wrp: {
        '@media (max-width: 560px)': {
            display: 'none',
        },
    },
    img: {
        height: theme.rem(25),
        borderRadius: theme.radius,
        animation: '$loader 1s ease infinite',
    },
    title: {
        height: theme.rem(3),
        margin: theme.rem(1, 0),
        borderRadius: theme.radius,
        animation: '$loader 1s ease infinite',
    },
    text: {
        height: theme.rem(2),
        margin: theme.rem(1, 0),
        borderRadius: theme.radius,
        animation: '$loader 1s ease infinite',
    },
    textShort: {
        width: '60%',
        height: theme.rem(2),
        margin: theme.rem(1, 0),
        borderRadius: theme.radius,
        animation: '$loader 1s ease infinite',
    },
    empty: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    emoji: {
        width: theme.rem(10),
        marginBottom: theme.rem(4),
    },
    emptyText: {
        marginBottom: theme.rem(2),
        fontSize: theme.rem(1.6),
        color: theme.palette.gray[3],
        textAlign: 'center',
    },
    link: {
        fontSize: theme.rem(1.6),
        color: theme.palette.primary[0],
        fontWeight: theme.text.weight[3],

        '&:hover': {
            fontWeight: theme.text.weight[3],
            textDecoration: 'underline',
        },
    },
}));

interface IProps {
    loading: boolean;
    isEmpty: boolean;
    emptyText?: string;
    children: JSX.Element | JSX.Element[];
}

const OffersLoader = ({ loading, isEmpty, emptyText, children }: IProps): ReactElement => {
    const css = useStyles();
    return loading ? (
        <div className={css.grid}>
            <div>
                <div className={css.img} />
                <div className={css.text} />
                <div className={css.text} />
                <div className={css.textShort} />
            </div>

            <div>
                <div className={css.img} />
                <div className={css.text} />
                <div className={css.text} />
                <div className={css.textShort} />
            </div>

            <div className={css.wrp}>
                <div className={css.img} />
                <div className={css.text} />
                <div className={css.text} />
                <div className={css.textShort} />
            </div>

            <div className={css.wrp}>
                <div className={css.img} />
                <div className={css.text} />
                <div className={css.text} />
                <div className={css.textShort} />
            </div>
        </div>
    ) : isEmpty ? (
        <div className={css.empty}>
            <img className={css.emoji} src="/emoji/thinking.png" alt="" />
            <p className={css.emptyText}>{emptyText || 'Кадется здесь пусто. Создайте свое объявление, не тяните резину'}</p>

            <Link href={router.new_offer}>
                <a className={css.link}>Создать обьявление</a>
            </Link>
        </div>
    ) : (
        <div className={css.grid}>{children}</div>
    );
};

export default OffersLoader;
