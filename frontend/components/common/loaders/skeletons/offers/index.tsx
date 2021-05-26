import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import config from '../../../../../assets/config';
import { Theme } from '../../../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    '@keyframes loader': {
        '0%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '100% 50%' },
        '100%': { backgroundPosition: '0% 50%' },
    },
    wrp: {
        display: 'flex',
    },
    card: {
        width: '100%',
    },
    img: {
        height: theme.rem(25),
        borderRadius: theme.radius,
        background: `linear-gradient(45deg, ${theme.palette.gray[1]}, ${theme.palette.gray[0]}, ${theme.palette.gray[1]})`,
        backgroundSize: '400% 400%',
        animation: '$loader 2s ease infinite',
    },
    title: {
        height: theme.rem(3),
        margin: theme.rem(1, 0),
        borderRadius: theme.radius,
        background: `linear-gradient(45deg, ${theme.palette.gray[1]}, ${theme.palette.gray[0]}, ${theme.palette.gray[1]})`,
        backgroundSize: '400% 400%',
        animation: '$loader 2s ease infinite',
    },
    text: {
        height: theme.rem(2),
        margin: theme.rem(1, 0),
        borderRadius: theme.radius,
        background: `linear-gradient(45deg, ${theme.palette.gray[1]}, ${theme.palette.gray[0]}, ${theme.palette.gray[1]})`,
        backgroundSize: '400% 400%',
        animation: '$loader 2s ease infinite',
    },
    textShort: {
        width: '60%',
        height: theme.rem(2),
        margin: theme.rem(1, 0),
        borderRadius: theme.radius,
        background: `linear-gradient(45deg, ${theme.palette.gray[1]}, ${theme.palette.gray[0]}, ${theme.palette.gray[1]})`,
        backgroundSize: '400% 400%',
        animation: '$loader 2s ease infinite',
    },
}));

interface IProps {
    className?: string;
    amount?: number;
}

const OffersLoader = React.forwardRef<HTMLDivElement | null, IProps>(({ amount = 1, className }, ref): ReactElement => {
    const css = useStyles();

    return (
        <div ref={ref} className={clsx(css.wrp, className)}>
            {[...Array(amount)].map((_, index) => (
                <div className={css.card} key={index}>
                    <div className={css.img} />
                    <div className={css.text} />
                    <div className={css.text} />
                    <div className={css.textShort} />
                </div>
            ))}
        </div>
    );
});

OffersLoader.displayName = 'OffersLoader';

export default OffersLoader;
