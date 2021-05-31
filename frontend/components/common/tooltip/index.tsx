import clsx from 'clsx';
import React, { ReactElement, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../assets/theme';
import useMedia from '../../../hooks/media.hook';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        position: 'relative',
        zIndex: 2,
        '&:hover > .tooltip': {
            opacity: 1,
            visibility: 'visible',
        },
        '&:focus > .tooltip': {
            opacity: 1,
            visibility: 'visible',
        },
    },
    tooltip: {
        position: 'absolute',
        padding: theme.rem(1),
        borderRadius: theme.radius,
        background: theme.palette.black[0],
        color: theme.palette.white,
        opacity: '0',
        visibility: 'hidden',
        transition: 'opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        fontSize: theme.rem(1.2),
        fontWeight: theme.text.weight[3],
        pointerEvents: 'none',
        '&::before': {
            content: '""',
            position: 'absolute',
            height: theme.rem(1),
            width: theme.rem(1),
            background: theme.palette.black[0],
            zIndex: 1,
        },
    },
    top_left: {
        top: theme.rem(-1),
        right: 0,
        transform: 'translate(0%, -100%)',
        '&::before': {
            bottom: theme.rem(-0.5),
            right: theme.rem(0.5),
            transform: 'translate(-50%, 0) rotate(45deg)',
        },
    },
    top_right: {
        top: theme.rem(-1),
        left: 0,
        transform: 'translate(0%, -100%)',
        '&::before': {
            bottom: theme.rem(-0.5),
            left: theme.rem(1.5),
            transform: 'translate(-50%, 0) rotate(45deg)',
        },
    },
    bottom_left: {
        bottom: theme.rem(-1),
        right: 0,
        transform: 'translate(0%, 100%)',
        '&::before': {
            top: theme.rem(-0.5),
            right: theme.rem(0.5),
            transform: 'translate(-50%, 0) rotate(45deg)',
        },
    },
    bottom_right: {
        bottom: theme.rem(-1),
        left: 0,
        transform: 'translate(0%, 100%)',
        '&::before': {
            top: theme.rem(-0.5),
            left: theme.rem(1.5),
            transform: 'translate(-50%, 0) rotate(45deg)',
        },
    },
}));

interface IProps {
    className?: string;
    classNameWrp?: string;
    children: ReactElement | ReactElement[];
    content: string | ReactElement | ReactElement[];
}

type PositionClassNames = 'top_left' | 'top_right' | 'bottom_left' | 'bottom_right';

const Tooltip = ({ children, className, classNameWrp, content }: IProps): ReactElement => {
    const css = useStyles();
    const media = useMedia(768);
    const ref = useRef<HTMLDivElement | null>(null);
    const [position, setPosition] = useState<PositionClassNames>('top_right');

    const handleHover = (): void => {
        if (!ref.current) return;
        const isTop = ref.current?.getBoundingClientRect().top / window.innerHeight > 0.1;
        const isLeft = ref.current?.getBoundingClientRect().left / window.innerHeight > 0.6;
        setPosition(`${isTop ? 'top' : 'bottom'}_${isLeft ? 'left' : 'right'}` as PositionClassNames);
    };

    return media ? (
        <div ref={ref} className={clsx(css.wrp, classNameWrp)} onMouseEnter={handleHover}>
            <div className={clsx(css.tooltip, css[position], 'tooltip', className)}>{content}</div>
            {children}
        </div>
    ) : (
        <>{children}</>
    );
};

export default Tooltip;
