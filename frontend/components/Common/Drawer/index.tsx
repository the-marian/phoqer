import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { MouseEvent, ReactElement, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import { Theme } from '../../../assets/theme';
import useTheme from '../../../hooks/theme.hook';
import { IState } from '../../../interfaces';
import types from '../../../redux/types';
import Switcher from '../Switcher';

const useStyles = createUseStyles((theme: Theme) => ({
    backdrop: {
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000000,
        width: '100%',
        height: '100%',
        maxHeight: '100%',
        background: theme.palette.modal,
        color: theme.palette.black[0],
        cursor: 'pointer',
        transition: theme.transitions[0],
        overflow: 'autho',

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
            width: '100%',
            maxWidth: theme.rem(40),
            padding: theme.rem(5, 2, 2),
            background: theme.palette.white,
            borderRight: theme.border(0.1, theme.palette.gray[1]),
            transition: theme.transitions[0],
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
            height: theme.rem(1.2),
            width: theme.rem(1.2),
        },
    },
}));

interface IPros {
    children: ReactElement;
}
const Root = ({ children }: IPros) => {
    const css = useStyles();
    const dispatch = useDispatch();
    const drawer = useSelector<IState, boolean>(state => state.drawer);

    const handleToggle = (event: MouseEvent<HTMLDivElement>): void => {
        if (event.target === event.currentTarget) dispatch({ type: types.TOGGLE_DRAWER });
    };

    return (
        <CSSTransition timeout={300} unmountOnExit in={drawer}>
            <div className={css.backdrop} onClick={handleToggle} aria-hidden role="button">
                {children}
            </div>
        </CSSTransition>
    );
};

const Drawer = (): ReactElement | null => {
    const css = useStyles();
    const dispatch = useDispatch();
    const [theme, setTheme] = useTheme();

    const handleToggle = (): void => {
        dispatch({ type: types.TOGGLE_DRAWER });
    };

    const handleTheme = (value: boolean): void => {
        setTheme && setTheme(value ? 'black' : 'white');
    };

    useEffect(() => {
        const close = (event: KeyboardEvent): void => {
            if (event.key === 'Escape') dispatch({ type: types.TOGGLE_DRAWER, payload: false });
        };

        window.addEventListener('keydown', close);
        return () => {
            window.addEventListener('keydown', close);
        };
    }, []);

    return (
        <Root>
            <div className="inner">
                <button type="button" className={css.button} onClick={handleToggle}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <Switcher onClick={handleTheme} value={theme === 'black'} off="white" on="dark">
                    Toggle color theme
                </Switcher>
            </div>
        </Root>
    );
};

export default Drawer;
