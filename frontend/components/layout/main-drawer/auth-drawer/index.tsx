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
import template from '../../../../assets/template';
import { Theme } from '../../../../assets/theme';
import useAuth from '../../../../hooks/auth.hook';
import { IPublicProfile, IState } from '../../../../interfaces';
import LoginForm from '../../../common/auth/login-form';
import Gift from '../../../common/gift';
import { modal } from '../../../common/modal';
import SmallModalWrp from '../../../common/modal/small-modal-wrp';
import UserNav from '../../../common/nav-tabs/user-nav';
import ProfileCard from '../../../common/profile-card';

const useStyles = createUseStyles((theme: Theme) => ({
    buttons: {
        display: 'flex',
        margin: theme.rem(4, 0),
    },
    btn: {
        ...template(theme).btn,
        height: theme.rem(4.5),
        minWidth: theme.rem(8),
        marginRight: theme.rem(1),
        padding: 0,
        background: theme.palette.primary[0],
        color: theme.palette.trueWhite,
        transitions: theme.transitions[0],

        ...theme.hover({
            background: theme.palette.primary[1],
        }),
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
                userLocation={user?.location}
                registerDate={user?.date_joined}
            />
            <Gift style={{ margin: '4rem 0' }} />
            <UserNav />
        </>
    );
};

export default AuthDrawer;
