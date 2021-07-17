import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { faMoon } from '@fortawesome/free-solid-svg-icons/faMoon';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faSun } from '@fortawesome/free-solid-svg-icons/faSun';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import useAuth from '../../../../hooks/auth.hook';
import useTheme from '../../../../hooks/theme.hook';
import { IPublicProfile, IState } from '../../../../interfaces';
import routes from '../../../../utils/routes';
import template from '../../../../utils/theming/template';
import { Theme } from '../../../../utils/theming/theme';
import LoginForm from '../../../common/auth/login-form';
import Gift from '../../../common/gift';
import { modal } from '../../../common/modal';
import SmallModalWrp from '../../../common/modal/small-modal-wrp';
import UserNavDropdown from '../../../common/navigation/user-dropdown-nav';
import ProfileCard from '../../../common/profile-card';

const useStyles = createUseStyles((theme: Theme) => ({
    buttons: {
        display: 'flex',
        margin: theme.rem(2, 0),
    },
    btn: {
        ...template(theme).btn,
        height: theme.rem(4.5),
        minWidth: theme.rem(8),
        marginRight: theme.rem(1),
        padding: 0,
        boxShadow: 'none',
        background: theme.palette.gray[0],
        color: theme.palette.primary[0],
        transitions: theme.transitions[0],
        ...template(theme).outline,
    },
    wrp: {
        margin: theme.rem(2, 0, 1),
    },
}));

const AuthDrawer = (): ReactElement | null => {
    const css = useStyles();
    const auth = useAuth();
    const history = useRouter();
    const [theme, setTheme] = useTheme();
    const user = useSelector<IState, IPublicProfile | null>(state => state.user);

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
        linksRedirect(routes.offers.new(1));
    };

    const toggleTheme = (): void => {
        setTheme(theme === 'white' ? 'black' : 'white');
    };

    return (
        <>
            <ProfileCard
                column
                id={user?.id}
                firstName={user?.first_name}
                lastName={user?.last_name}
                avatar={user?.profile_img}
                lastActivity={user?.last_activity}
                userLocation={user?.city}
                registerDate={user?.date_joined}
            />

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

                <button className={css.btn} type="button" onClick={toggleTheme}>
                    {theme === 'white' ? <FontAwesomeIcon icon={faMoon} /> : <FontAwesomeIcon icon={faSun} />}
                </button>
            </div>

            <div className={css.wrp}>
                <UserNavDropdown />
            </div>
            <Gift style={{ margin: '3rem 0' }} />
        </>
    );
};

export default AuthDrawer;
