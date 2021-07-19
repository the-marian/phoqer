import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../utils/theming/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    '@keyframes one': {
        '0%': { top: '50%', left: '25%', height: '16vh', width: '16vh' },
        '35%': { top: '35%', left: '32%', height: '26vh', width: '26vh' },
        '75%': { top: '90%', left: '20%', height: '6vh', width: '6vh' },
        '100%': { top: '50%', left: '25%', height: '16vh', width: '16vh' },
    },
    '@keyframes two': {
        '0%': { top: '80%', left: '85%', height: '20vh', width: '20vh' },
        '75%': { top: '65%', left: '80%', height: '10vh', width: '10vh' },
        '35%': { top: '76%', left: '72%', height: '10vh', width: '10vh' },
        '100%': { top: '80%', left: '85%', height: '20vh', width: '20vh' },
    },
    '@keyframes three': {
        '0%': { top: '40%', left: '55%', height: '14vh', width: '14vh' },
        '75%': { top: '20%', left: '80%', height: '20vh', width: '20vh' },
        '35%': { top: '36%', left: '62%', height: '14vh', width: '14vh' },
        '100%': { top: '40%', left: '55%', height: '14vh', width: '14vh' },
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
            animation: '$one 8s ease-in-out infinite',
        },

        '& span:nth-of-type(2)': {
            animation: '$two 6s ease-in-out infinite',
        },

        '& span:nth-of-type(3)': {
            animation: '$three 12s ease-in-out infinite',
        },
    },
}));

interface IProps {
    className?: string;
}

const AnimatedBackdrop = ({ className }: IProps): ReactElement => {
    const css = useStyles();
    return (
        <div className={clsx(css.root, className)}>
            <span />
            <span />
            <span />
        </div>
    );
};

export default AnimatedBackdrop;
