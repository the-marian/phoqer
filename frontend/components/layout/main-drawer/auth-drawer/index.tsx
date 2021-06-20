import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import routes from '../../../../assets/routes';
import useAuth from '../../../../hooks/auth.hook';
import { IPublicProfile, IState } from '../../../../interfaces';
import template from '../../../../theming/template';
import { Theme } from '../../../../theming/theme';
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
        background: theme.palette.secondary[0],
        color: theme.palette.black[0],
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

    return (
        <>
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
            <div className={css.wrp}>
                <UserNavDropdown />
            </div>
            <Gift style={{ margin: '3rem 0' }} />
        </>
    );
};

export default AuthDrawer;
