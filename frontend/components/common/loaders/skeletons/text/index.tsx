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
    text: {
        width: '100%',
        height: theme.rem(2),
        margin: theme.rem(1, 0),
        borderRadius: theme.radius,
        background: `linear-gradient(45deg, ${theme.palette.gray[1]}, ${theme.palette.gray[0]}, ${theme.palette.gray[1]})`,
        backgroundSize: '400% 400%',
        animation: '$loader 2s ease infinite',
    },
    short: {
        width: '40%',
        minWidth: theme.rem(10),
    },
}));

interface IProps {
    amount?: number;
}
const TextSkeleton = ({ amount = 1 }: IProps): ReactElement => {
    const css = useStyles();
    return (
        <>
            {[...Array(amount)].map<ReactElement>((_, index) => (
                <div key={index} className={css.text} />
            ))}
            <div className={clsx(css.text, css.short)} />
        </>
    );
};

export default TextSkeleton;
