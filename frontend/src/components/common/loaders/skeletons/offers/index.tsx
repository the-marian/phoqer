import React, { ReactElement } from 'react';

import clsx from 'clsx';
import { createUseStyles } from 'react-jss';

import useConfig from '../../../../../hooks/config.hook';
import { Theme } from '../../../../../utils/theming/theme';
import TextSkeleton from '../text';

const useStyles = createUseStyles((theme: Theme) => ({
    '@keyframes loader': {
        '0%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '100% 50%' },
        '100%': { backgroundPosition: '0% 50%' },
    },
    wrp: {
        display: 'flex',
        ...theme.media(768).max({
            justifyContent: 'center',
            flexWrap: 'wrap',
        }),
    },
    card: {
        width: '100%',
        maxWidth: theme.rem(35),
        marginRight: theme.rem(2),
        '&:nth-last-of-type(1)': {
            marginRight: 0,
        },

        ...theme.media(768).max({
            maxWidth: '47%',
        }),

        ...theme.media(500).max({
            maxWidth: '100%',
            marginRight: '0',
        }),
    },
    cardSmall: {
        maxWidth: theme.rem(15),
        marginRight: theme.rem(2.5),
        '&:nth-last-of-type(1)': {
            marginRight: 0,
        },

        ...theme.media(500).max({
            maxWidth: '45%',
        }),
    },
    img: {
        height: theme.rem(25),
        borderRadius: theme.radius,
        background: `linear-gradient(45deg, ${theme.palette.gray[1]}, ${theme.palette.gray[0]}, ${theme.palette.gray[1]})`,
        backgroundSize: '400% 400%',
        animation: '$loader 2s ease infinite',
    },
    imgSmall: {
        height: theme.rem(11),
    },
}));

interface IProps {
    className?: string;
    amount?: number;
}

const OffersLoader = React.forwardRef<HTMLDivElement | null, IProps>(({ amount = 1, className }, ref): ReactElement => {
    const css = useStyles();
    const [config] = useConfig();
    const isSmallCard = config.offerCardSize === 'small';

    return (
        <div ref={ref} className={clsx(css.wrp, className)}>
            {[...Array(amount)].map((_, index) => (
                <div className={clsx(css.card, isSmallCard && css.cardSmall)} key={index}>
                    <div className={clsx(css.img, isSmallCard && css.imgSmall)} />
                    <TextSkeleton amount={isSmallCard ? 1 : 2} />
                </div>
            ))}
        </div>
    );
});

OffersLoader.displayName = 'OffersLoader';

export default OffersLoader;
