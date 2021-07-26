import React, { MouseEvent, ReactElement, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { CSSTransition } from 'react-transition-group';

import { Theme } from '../../../utils/theming/theme';
import ButtonClose from '../button-close';

const useStyles = createUseStyles((theme: Theme) => ({
    backdrop: {
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 10001,
        width: '100%',
        height: '100%',
        maxHeight: '100%',
        background: theme.palette.modal,
        color: theme.palette.black[0],
        transition: theme.transitions[0],
        cursor: 'pointer',

        // left
        '&.enter .left': {
            transform: 'translateX(-100%)',
        },
        '&.enter-done .left': {
            transform: 'translateX(0%)',
            transition: theme.transitions[0],
        },

        '&.exit .left': {
            transform: 'translateX(-100%)',
            transition: theme.transitions[0],
        },
        '&.exit-done .left': {
            transform: 'translateX(0%)',
        },

        // right
        '&.enter .right': {
            transform: 'translateX(100%)',
        },
        '&.enter-done .right': {
            transform: 'translateX(0%)',
            transition: theme.transitions[0],
        },

        '&.exit .right': {
            transform: 'translateX(100%)',
            transition: theme.transitions[0],
        },
        '&.exit-done .right': {
            transform: 'translateX(0%)',
        },

        // core
        '& .right': {
            right: 0,
            transform: 'translateX(-100%)',
        },
        '& .left': {
            left: 0,
            transform: 'translateX(-100%)',
        },
        '& .inner': {
            position: 'absolute',
            top: 0,
            height: '100%',
            width: '95%',
            padding: theme.rem(5, 2, 2),
            background: theme.palette.white,
            borderRight: theme.border(0.1, theme.palette.gray[1]),
            overflow: 'auto',
            cursor: 'auto',
            scrollBehavior: 'smooth',
            '-webkit-overflow-scrolling': 'touch',

            ...theme.media(768).max({
                padding: theme.rem(2),
            }),
        },
    },
    button: {
        position: 'absolute',
        top: theme.rem(0.7),
        right: theme.rem(1.5),
        zIndex: 10,
    },
}));

interface IProps {
    open: boolean;
    width?: number;
    right?: boolean;
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
            if (event.key === 'Escape') {
                event.preventDefault();
                onToggle(false);
            }
        };

        // style
        document.body.style.top = `-${window.scrollY}px`;
        document.body.style.position = 'fixed';
        // event
        window.addEventListener('keydown', close);

        return () => {
            // style
            const top = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            window.scrollTo({ top: parseInt(top || '0') * -1 });
            // event
            window.removeEventListener('keydown', close);
        };
    }, [onToggle]);

    return (
        <div className={css.backdrop} onClick={handleToggle} aria-hidden="true" role="button">
            {children}
        </div>
    );
};

const Drawer = ({ children, width = 40, open, onToggle, right = false }: IProps): ReactElement | null => {
    const css = useStyles();

    const handleToggle = (): void => {
        onToggle(!open);
    };

    return (
        <CSSTransition timeout={200} unmountOnExit in={open}>
            <Root onToggle={onToggle} open={open}>
                <div
                    className={right ? 'inner right' : 'inner left'}
                    style={{ maxWidth: `${width}rem`, minWidth: `${width - 10}rem` }}
                >
                    <ButtonClose className={css.button} onClick={handleToggle} />
                    {children}
                </div>
            </Root>
        </CSSTransition>
    );
};

export default Drawer;
