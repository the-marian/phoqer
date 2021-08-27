import React, { ReactElement, useEffect, useRef, useState } from 'react';

import clsx from 'clsx';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../utils/theming/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    '@keyframes one': {
        '0%': { top: '50%', left: '25%' },
        '35%': { top: '35%', left: '32%' },
        '75%': { top: '90%', left: '20%' },
        '100%': { top: '50%', left: '25%' },
    },
    '@keyframes two': {
        '0%': { top: '80%', left: '85%' },
        '75%': { top: '65%', left: '80%' },
        '35%': { top: '76%', left: '72%' },
        '100%': { top: '80%', left: '85%' },
    },
    '@keyframes three': {
        '0%': { top: '40%', left: '55%' },
        '75%': { top: '20%', left: '80%' },
        '35%': { top: '36%', left: '62%' },
        '100%': { top: '40%', left: '55%' },
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
            backdropFilter: 'blur(var(--blur, 4rem))',
        },

        '& span': {
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
            borderRadius: '100%',
            opacity: 0.3,
        },

        '& span:nth-of-type(1)': {
            background: theme.palette.red[0],
            animation: '$one 8s ease-in-out infinite',
        },

        '& span:nth-of-type(2)': {
            background: theme.palette.green[0],
            animation: '$two 6s ease-in-out infinite',
        },

        '& span:nth-of-type(3)': {
            background: theme.palette.primary[0],
            animation: '$three 12s ease-in-out infinite',
        },
    },
}));

interface IProps {
    className?: string;
}

const AnimatedBackdrop = ({ className }: IProps): ReactElement => {
    const css = useStyles();
    const ref = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState<number>(0);

    useEffect(() => {
        if (ref.current) {
            setContainerWidth(ref.current?.offsetWidth || 0);
            ref.current.style.setProperty('--blur', ((ref.current?.offsetWidth || 0) / window.innerWidth) * 40 + 'px');
        }
    }, [ref]);

    return (
        <div ref={ref} className={clsx(css.root, className)}>
            <span style={{ height: containerWidth * 0.2, width: containerWidth * 0.2 }} />
            <span style={{ height: containerWidth * 0.22, width: containerWidth * 0.22 }} />
            <span style={{ height: containerWidth * 0.45, width: containerWidth * 0.45 }} />
        </div>
    );
};

export default AnimatedBackdrop;
