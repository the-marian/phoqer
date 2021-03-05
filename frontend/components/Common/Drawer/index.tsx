import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { MouseEvent, ReactElement, TouchEvent, useEffect, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { CSSTransition } from 'react-transition-group';

import { Theme } from '../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    backdrop: {
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 10000,
        width: '100%',
        height: '100%',
        maxHeight: '100%',
        background: theme.palette.modal,
        color: theme.palette.black[0],
        transition: theme.transitions[0],
        cursor: 'pointer',

        '&.enter .inner': {
            left: theme.rem(-60),
        },
        '&.enter-done .inner': {
            left: theme.rem(-20),
        },

        '&.exit .inner': {
            left: theme.rem(-60),
        },
        '&.exit-done .inner': {
            left: theme.rem(-20),
        },

        '& .inner': {
            position: 'absolute',
            top: 0,
            left: theme.rem(-20),
            transform: 'translateX(0%)',
            height: '100%',
            width: theme.rem(60),
            padding: theme.rem(5, 2, 2, 22),
            background: theme.palette.white,
            borderRight: theme.border(0.1, theme.palette.gray[1]),
            transition: theme.transitions[0],
            overflow: 'auto',
            cursor: 'auto',
            scrollBehavior: 'smooth',
            '-webkit-overflow-scrolling': 'touch',
        },
    },
    button: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 10,
        padding: theme.rem(1.2, 1.8),
        fontSize: theme.rem(1.6),
        color: theme.palette.black[0],

        '& svg': {
            height: theme.rem(1.6),
            width: theme.rem(1.6),
        },
    },
}));

interface IProps {
    open: boolean;
    onToggle: (value: boolean) => void;
    children: ReactElement | ReactElement[];
}
const Root = ({ children, open, onToggle }: IProps) => {
    const css = useStyles();

    const handleToggle = (event: MouseEvent<HTMLDivElement>): void => {
        if (event.target === event.currentTarget) onToggle(!open);
    };

    useEffect(() => {
        const close = (event: KeyboardEvent): void => {
            event.preventDefault();
            if (event.key === 'Escape') onToggle(false);
        };

        // style
        document.body.style.top = `-${window.scrollY}px`;
        document.body.style.position = 'fixed';
        document.body.style.paddingRight = '15px';
        // event
        window.addEventListener('keydown', close);

        return () => {
            // style
            const top = document.body.style.top;
            document.body.style.paddingRight = '0';
            document.body.style.position = '';
            document.body.style.top = '0';
            window.scrollTo({ top: parseInt(top || '0') * -1 });
            // event
            window.removeEventListener('keydown', close);
        };
    }, []);

    return (
        <div className={css.backdrop} onClick={handleToggle} aria-hidden role="button">
            {children}
        </div>
    );
};

const Drawer = ({ children, open, onToggle }: IProps): ReactElement | null => {
    const css = useStyles();
    const [x, setX] = useState<number>(0);
    const ref = useRef<HTMLDivElement>(null);

    const handleToggle = (): void => {
        onToggle(!open);
    };

    // touch events
    const handleTouchStart = (): void => {
        if (ref.current) ref.current.style.transition = '0s';
    };
    const handleTouchMove = (event: TouchEvent<HTMLDivElement>): void => {
        const dif = event?.touches?.[0]?.clientX - (ref.current?.clientWidth || 0) / 1.6 || 0;
        setX(dif > 50 ? x + 10 / dif : dif);
    };
    const handleTouchEnd = (): void => {
        if (ref.current) {
            if (ref.current?.offsetWidth + x < 200) onToggle(false);
            ref.current.style.transition = '';
        }

        setTimeout(() => {
            setX(0);
        }, 4);
    };

    return (
        <CSSTransition timeout={300} unmountOnExit in={open}>
            <Root onToggle={onToggle} open={open}>
                <div
                    ref={ref}
                    className="inner"
                    style={{ transform: `translateX(${x}px)` }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <button type="button" className={css.button} onClick={handleToggle}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                    {children}
                </div>
            </Root>
        </CSSTransition>
    );
};

export default Drawer;
