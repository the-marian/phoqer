import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { CSSTransition } from 'react-transition-group';

import mixin from '../../../utils/theming/mixin';
import { Theme } from '../../../utils/theming/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    btn: {
        position: 'fixed',
        right: theme.rem(2.5),
        bottom: theme.rem(-6),
        zIndex: '10000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: theme.rem(5),
        width: theme.rem(5),
        background: theme.palette.gray[4],
        borderRadius: '50%',
        fontSize: theme.rem(1.4),
        transition: theme.transitions[1],
        color: theme.palette.white,
        ...mixin(theme).outline,

        '&.enter-done': {
            bottom: theme.rem(2.5),

            ...theme.media(1060).max({
                bottom: theme.rem(7.5),
                right: theme.rem(1),
            }),
        },
        '&.exit-done': {
            bottom: theme.rem(-6),
        },
    },
}));

const ScrollTop = (): ReactElement => {
    const css = useStyles();
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
        <CSSTransition in={top} timeout={300} unmountOnExit>
            <button className={css.btn} onClick={handleClick} type="button">
                <FontAwesomeIcon icon={faChevronUp} />
            </button>
        </CSSTransition>
    );
};

export default ScrollTop;
