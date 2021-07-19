import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../utils/theming/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    '@keyframes one': {
        '0%': { top: '50%', left: '25%', height: '16%', width: '16%' },
        '35%': { top: '35%', left: '32%', height: '26%', width: '26%' },
        '75%': { top: '90%', left: '20%', height: '6%', width: '6%' },
        '100%': { top: '50%', left: '25%', height: '16%', width: '16%' },
    },
    '@keyframes two': {
        '0%': { top: '80%', left: '85%', height: '20%', width: '20%' },
        '75%': { top: '65%', left: '80%', height: '10%', width: '10%' },
        '35%': { top: '76%', left: '72%', height: '10%', width: '10%' },
        '100%': { top: '80%', left: '85%', height: '20%', width: '20%' },
    },
    '@keyframes three': {
        '0%': { top: '40%', left: '55%', height: '14%', width: '14%' },
        '75%': { top: '20%', left: '80%', height: '20%', width: '20%' },
        '35%': { top: '36%', left: '62%', height: '14%', width: '14%' },
        '100%': { top: '40%', left: '55%', height: '14%', width: '14%' },
    },

    root: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 0,
        overflow: 'hidden',
        borderRadius: theme.radius,

        '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backdropFilter: 'blur(6rem)',
        },

        '& span': {
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
            borderRadius: '100%',
            background: theme.palette.primary[0],
        },

        '& span:nth-of-type(1)': {
            animation: '$one 8s ease infinite',
        },

        '& span:nth-of-type(2)': {
            animation: '$two 6s ease infinite',
        },

        '& span:nth-of-type(3)': {
            animation: '$three 12s ease infinite',
        },
    },
}));

interface IProps {
    className?: string;
}

const GradientBackdrop = ({ className }: IProps): ReactElement => {
    const css = useStyles();
    return (
        <div className={clsx(css.root, className)}>
            <span />
            <span />
            <span />
        </div>
    );
};

export default GradientBackdrop;
