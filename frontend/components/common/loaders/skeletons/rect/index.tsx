import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

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
    cat: {
        width: '100%',
        marginRight: theme.rem(2),
        height: theme.rem(14),
        borderRadius: theme.radius,
        background: `linear-gradient(45deg, ${theme.palette.gray[1]}, ${theme.palette.gray[0]}, ${theme.palette.gray[1]})`,
        backgroundSize: '400% 400%',
        animation: '$loader 2s ease infinite',
        '&:nth-last-of-type(1)': {
            marginRight: 0,
        },
    },
}));

interface IProps {
    className?: string;
    amount?: number;
}
const RectSkeleton = ({ className, amount = 1 }: IProps): ReactElement => {
    const css = useStyles();
    return (
        <div className={clsx(css.wrp, className)}>
            {[...Array(amount)].map<ReactElement>((_, index) => (
                <div key={index} className={css.cat} />
            ))}
        </div>
    );
};

export default RectSkeleton;
