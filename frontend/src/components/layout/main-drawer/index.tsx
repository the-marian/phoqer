import React, { ReactElement, useEffect } from 'react';

import ReactDOM from 'react-dom';
import { createUseStyles } from 'react-jss';
import { CSSTransition } from 'react-transition-group';

import { Theme } from '../../../utils/theming/theme';
import Gift from '../../common/advertising/gift';
import Notifications from '../../pages/notifications';
import Container from '../container';

import LeftSide from './left-side';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
        width: '100%',
        height: 0,
        transform: 'translateY(-5rem)',
        paddingTop: theme.rem(5),
        background: theme.palette.white,
        overflow: 'hidden',
        transition: theme.transitions[0],

        '&.enter-done': {
            height: '100vh',
            transform: 'translateY(0)',
        },
    },
    flex: {
        display: 'flex',
        height: 'calc(100% - 6rem)',

        ...theme.media(800).max({
            flexDirection: 'column',
            overflowY: 'auto',
            scrollBehavior: 'smooth',
            '-webkit-overflow-scrolling': 'touch',
        }),
    },
    left: {
        height: '100%',
        width: theme.rem(40),
        padding: theme.rem(0, 2, 2, 0),

        ...theme.media(1200).max({
            width: theme.rem(30),
            padding: theme.rem(2, 1, 2, 0),
        }),

        ...theme.media(800).max({
            height: 'max-content',
            width: '100%',
            padding: theme.rem(2, 0),
        }),
    },
    right: {
        height: '100%',
        width: 'calc(100% - 40rem)',
        padding: theme.rem(0, 0, 2),
        overflowY: 'auto',
        scrollBehavior: 'smooth',
        '-webkit-overflow-scrolling': 'touch',

        ...theme.media(1200).max({
            width: 'calc(100% - 30rem)',
            padding: theme.rem(2, 0),
        }),

        ...theme.media(800).max({
            height: 'max-content',
            width: '100%',
            padding: theme.rem(2, 0, 12),
            overflowY: 'unset',
        }),
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: theme.rem(6),
        fontSize: theme.rem(2.5),
        fontWeight: theme.text.weight[4],
        color: theme.palette.black[0],
        textAlign: 'center',
    },
    subtitle: {
        margin: theme.rem(2, 0, 1),
        fontSize: theme.rem(1.6),
        fontWeight: theme.text.weight[2],
        color: theme.palette.black[0],
    },
}));

interface IProps {
    onToggle: () => void;
}

const MainDrawer = ({ onToggle }: IProps): ReactElement => {
    const css = useStyles();

    useEffect(() => {
        const handler = (event: KeyboardEvent): void => {
            if (event.key === 'Escape') onToggle();
        };
        window.addEventListener('keydown', handler);
        return () => {
            window.removeEventListener('keydown', handler);
        };
    }, [onToggle]);

    return ReactDOM.createPortal(
        <CSSTransition timeout={300} in appear>
            <div className={css.root}>
                <h3 className={css.title}>Phoqer site menu</h3>
                <Container className={css.flex}>
                    <div className={css.left}>
                        <LeftSide />
                    </div>
                    <div className={css.right}>
                        <Gift style={{ marginBottom: '2rem' }} />
                        <h2 className={css.subtitle}>Мои уведомления</h2>
                        <Notifications />
                    </div>
                </Container>
            </div>
        </CSSTransition>,
        document.body,
    );
};

export default MainDrawer;
