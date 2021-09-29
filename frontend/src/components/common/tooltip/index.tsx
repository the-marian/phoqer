import React, { ReactElement, useCallback, useEffect, useRef, useState } from 'react';

import clsx from 'clsx';
import { createUseStyles } from 'react-jss';

import useMedia from '../../../hooks/media.hook';
import useTrans from '../../../hooks/trans.hook';
import { Theme } from '../../../utils/theming/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        position: 'relative',
        zIndex: 2,
        ...theme.hover({
            zIndex: '10',
            '& > .tooltip': {
                opacity: 1,
                display: 'block',
                visibility: 'visible',
                zIndex: 10,
            },
        }),
        ...theme.focus({
            zIndex: '10',
            '& > .tooltip': {
                opacity: 1,
                display: 'block',
                visibility: 'visible',
                zIndex: 10,
            },
        }),
    },
    tooltip: {
        position: 'absolute',
        padding: theme.rem(1),
        borderRadius: theme.radius,
        background: theme.palette.black[0],
        color: theme.palette.white,
        opacity: '0',
        visibility: 'hidden',
        display: 'none',
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
    showInMobile?: boolean;
    children: ReactElement | ReactElement[];
    content: string | ReactElement | ReactElement[];
}

type PositionClassNames = 'top_left' | 'top_right' | 'bottom_left' | 'bottom_right';

const Tooltip = ({ children, showInMobile = false, className, classNameWrp, content }: IProps): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const media = useMedia(768);
    const ref = useRef<HTMLDivElement | null>(null);
    const [position, setPosition] = useState<PositionClassNames>('top_right');

    const handleTooltipPosition = useCallback((): void => {
        if (!ref.current) return;
        const isTop = ref.current?.getBoundingClientRect().top / window.innerHeight > 0.1;
        const isLeft = ref.current?.getBoundingClientRect().left / window.innerHeight > 0.6;
        setPosition(`${isTop ? 'top' : 'bottom'}_${isLeft ? 'left' : 'right'}` as PositionClassNames);
    }, [ref]);

    useEffect(() => {
        handleTooltipPosition();
    }, [handleTooltipPosition]);

    const handleHover = (): void => handleTooltipPosition();

    return media || showInMobile ? (
        <div ref={ref} className={clsx(css.wrp, classNameWrp)} onMouseEnter={handleHover}>
            <div className={clsx(css.tooltip, css[position], 'tooltip', className)}>
                {typeof content === 'string' ? trans(content) : content}
            </div>
            {children}
        </div>
    ) : (
        <>{children}</>
    );
};

export default Tooltip;