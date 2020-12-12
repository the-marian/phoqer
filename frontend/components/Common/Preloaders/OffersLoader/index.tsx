import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    '@keyframes loader': {
        '0%': { background: theme.palette.gray[1] },
        '50%': { background: theme.palette.grayblue[0] },
        '100%': { background: theme.palette.gray[1] },
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
    loading: boolean;
    isEmpty: boolean;
    children: JSX.Element | JSX.Element[];
}

const OffersLoader = ({ loading, isEmpty, children }: IProps): ReactElement => {
    const css = useStyles();
    return loading ? (
        <>
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
        </>
    ) : isEmpty ? (
        <div>Nothing to show</div>
    ) : (
        <>{children}</>
    );
};

export default OffersLoader;
