import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { MouseEvent, ReactElement, useEffect } from 'react';
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
            transform: 'translateX(-100%)',
        },
        '&.enter-done .inner': {
            transform: 'translateX(0%)',
        },

        '&.exit .inner': {
            transform: 'translateX(-100%)',
        },
        '&.exit-done .inner': {
            transform: 'translateX(0%)',
        },

        '& .inner': {
            position: 'absolute',
            top: 0,
            left: 0,
            transform: 'translateX(0%)',
            height: '100%',
            width: '95%',
            maxWidth: theme.rem(50),
            minWidth: theme.rem(40),
            padding: theme.rem(5, 2, 2),
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
    }, []);

    return (
        <div className={css.backdrop} onClick={handleToggle} aria-hidden role="button">
            {children}
        </div>
    );
};

const Drawer = ({ children, open, onToggle }: IProps): ReactElement | null => {
    const css = useStyles();

    const handleToggle = (): void => {
        onToggle(!open);
    };

    return (
        <CSSTransition timeout={300} unmountOnExit in={open}>
            <Root onToggle={onToggle} open={open}>
                <div className="inner">
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
