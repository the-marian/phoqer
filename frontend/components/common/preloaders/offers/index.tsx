import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import config from '../../../../assets/config';
import { Theme } from '../../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    '@keyframes loader': {
        '0%': { background: theme.palette.gray[0] },
        '50%': { background: theme.palette.gray[1] },
        '100%': { background: theme.palette.gray[0] },
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: theme.fr(config.offers.grid.desktop),
        gridGap: theme.rem(8, 3),
        marginTop: theme.rem(8),
        fontSize: theme.rem(1.5),
        fontWeight: theme.text.weight[3],

        ...theme.media(1140).max({
            gridTemplateColumns: theme.fr(config.offers.grid.tablet),
        }),
        ...theme.media(960).max({
            gridGap: theme.rem(6, 3),
        }),
        ...theme.media(560).max({
            gridTemplateColumns: theme.fr(config.offers.grid.mobile),
            maxWidth: theme.rem(45),
            margin: '0 auto',
        }),
    },
    wrp: {
        ...theme.media(560).max({
            display: 'none',
        }),
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

const OffersLoader = React.forwardRef<HTMLDivElement | null>(
    (_, ref): ReactElement => {
        const css = useStyles();

        return (
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
        );
    },
);

OffersLoader.displayName = 'OffersLoader';

export default OffersLoader;
