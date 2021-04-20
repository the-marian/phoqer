import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { CSSTransition } from 'react-transition-group';

import { Theme } from '../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    btn: {
        position: 'fixed',
        right: theme.rem(2.5),
        bottom: theme.rem(2.5),
        zIndex: '10000',
        height: theme.rem(5),
        width: theme.rem(5),
        background: theme.palette.black[5],
        borderRadius: '50%',
        border: 'none',
        outline: 'none',
        transition: '0.2s ease-in-out',
    },
    '&:hover': {
        boxShadow: theme.shadow[2],
    },
    '&:focus': {
        boxShadow: theme.shadow[2],
    },
    '&::before': {
        content: '""',
        position: 'absolute',
        top: '53%',
        left: '50%',
        transform: 'translate(-50%, -50%) rotate(45deg)',
        height: theme.rem(1),
        width: theme.rem(1),
        background: 'none',
        borderTop: theme.border(0.1, theme.palette.white),
        borderLeft: theme.border(0.1, theme.palette.white),
    },
}));

const ScrollTop = (): ReactElement => {
    const css = useStyles();
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const [top, setTop] = useState(false);

    useEffect(() => {
        const handleScroll = (): void => {
            setTop(window.scrollY >= 150);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleClick = (): void => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <CSSTransition in={top} timeout={600} unmountOnExit>
            <button className={css.btn} ref={buttonRef} onClick={handleClick} type="button" />
        </CSSTransition>
    );
};

export default ScrollTop;
