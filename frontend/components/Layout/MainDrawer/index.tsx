import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import routes from '../../../assets/routes';
import template from '../../../assets/template';
import { Theme } from '../../../assets/theme';
import useAuth from '../../../hooks/auth.hook';
import useTheme from '../../../hooks/theme.hook';
import { IState } from '../../../interfaces';
import types from '../../../redux/types';
import LoginForm from '../../Common/Auth/LoginForm';
import Drawer from '../../Common/Drawer';
import Logo from '../../Common/Logo';
import { modal } from '../../Common/Modal';
import SmallModalWrp from '../../Common/Modal/SmallModalWrp';
import Socials from '../../Common/Socials';
import Switcher from '../../Common/Switcher';
import AuthDrawer from './AuthDrawer';
import NotAuthDrawer from './NotAuthDrawer';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        maxWidth: theme.rem(35),
        minWidth: theme.rem(35),
    },
    link: {
        marginBottom: theme.rem(2),
    },
    content: {
        margin: theme.rem(4, 0),
    },
    buttons: {
        display: 'flex',
        margin: theme.rem(4, 0),
    },
    btn: {
        ...template(theme).btn,
        height: theme.rem(4.5),
        marginRight: theme.rem(2),
        padding: theme.rem(1.8, 3),
        background: theme.palette.primary[0],
        color: theme.palette.trueWhite,
        transitions: theme.transitions[0],

        ...theme.hover({
            background: theme.palette.primary[1],
        }),
    },
}));

const MainDrawer = (): ReactElement => {
    const css = useStyles();
    const auth = useAuth();
    const history = useRouter();
    const dispatch = useDispatch();

    const [theme, setTheme] = useTheme();
    const drawer = useSelector<IState, boolean>(state => state.config.drawer);

    const handleTheme = (value: boolean): void => {
        setTheme && setTheme(value ? 'black' : 'white');
    };

    const handleToggle = (payload: boolean): void => {
        dispatch({ type: types.TOGGLE_DRAWER, payload });
    };

    const linksRedirect = (route: string): void => {
        if (!auth?.access_token) {
            modal.open(
                <SmallModalWrp>
                    <LoginForm />
                </SmallModalWrp>,
            );
            return;
        }
        history.push(route);
    };

    const handleFavorite = (): void => {
        linksRedirect(routes.favorite);
    };

    const handleNewOffer = (): void => {
        linksRedirect(routes.new_offer(1));
    };

    return (
        <Drawer onToggle={handleToggle} open={drawer}>
            <Logo className={css.link} link />
            <Switcher onClick={handleTheme} value={theme === 'black'} off="white" on="dark">
                Toggle color theme
            </Switcher>

            <div className={css.buttons}>
                <Link href={routes.root}>
                    <a className={css.btn} type="button">
                        <FontAwesomeIcon icon={faHome} />
                    </a>
                </Link>

                <button className={css.btn} type="button" onClick={handleFavorite}>
                    <FontAwesomeIcon icon={faHeart} />
                </button>

                <button className={css.btn} type="button" onClick={handleNewOffer}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>

            <div className={css.content}>{auth?.access_token ? <AuthDrawer auth={auth} /> : <NotAuthDrawer />}</div>

            <Socials style={{ marginTop: '8rem' }} />
        </Drawer>
    );
};

export default MainDrawer;
