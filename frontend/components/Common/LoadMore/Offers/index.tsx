import React, { ReactElement, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { createUseStyles } from 'react-jss';

import config from '../../../../assets/config';
import { Theme } from '../../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    '@keyframes loader': {
        '0%': { background: theme.palette.gray[1] },
        '50%': { background: theme.palette.gray[2] },
        '100%': { background: theme.palette.gray[1] },
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: theme.fr(config.offers.grid.desktop),
        gridGap: theme.rem(8, 3),
        marginTop: theme.rem(8),
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
            maxWidth: theme.rem(45),
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
}));

interface IProps {
    onSubmit: (page: number) => void;
    loading: boolean;
    total: number;
}

const OffersLoadMore = ({ onSubmit, total, loading }: IProps): ReactElement => {
    const css = useStyles();

    const [innerLoading, setInnerLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const { ref, inView } = useInView({
        threshold: 0,
        rootMargin: '400px',
    });

    setTimeout(() => {
        setInnerLoading(false);
    }, 500);

    useEffect(() => {
        let id = null;
        if (!loading && !innerLoading) {
            setInnerLoading(true);

            id = setTimeout(() => {
                setInnerLoading(false);
                setPage(value => value + 1);
                onSubmit(page + 1);
            }, 500);
        }

        return () => {
            if (id !== null) clearTimeout(id);
        };
    }, [inView]);

    return total > page ? (
        <div ref={ref} className={css.grid}>
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
    ) : null;
};

export default OffersLoadMore;
