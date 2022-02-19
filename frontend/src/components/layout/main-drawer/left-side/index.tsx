import React, { ReactElement } from 'react';

import { faFlag } from '@fortawesome/free-regular-svg-icons/faFlag';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import useAuth from '../../../../hooks/auth.hook';
import { IPublicProfile, IState } from '../../../../interfaces';
import routes from '../../../../utils/routes';
import { Theme } from '../../../../utils/theming/theme';
import Navigation from '../../../common/navigation';
import { getBaseNavList } from '../../../common/navigation/navigation.config';
import ProfileCard from '../../../common/profile-card';

import ControlButtons from './control-buttons';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        margin: theme.rem(2, 0, 1),
    },
    profile: {
        background: theme.palette.white,

        '& .btn': {
            background: theme.palette.secondary[0],
        },
    },
}));

const LeftSide = (): ReactElement | null => {
    const css = useStyles();
    const { logout } = useAuth();
    const user = useSelector<IState, IPublicProfile | null>(state => state.user);

    const handleLogout = () => {
        logout();
        window.location.reload();
    };

    return (
        <>
            <ProfileCard
                column
                id={user?.id}
                className={css.profile}
                firstName={user?.first_name}
                lastName={user?.last_name}
                avatar={user?.profile_img}
                lastActivity={user?.last_activity}
                userLocation={user?.city}
                registerDate={user?.date_joined}
            />

            <ControlButtons />

            <div className={css.wrp}>
                <Navigation
                    tabs={[
                        {
                            id: 'personal-area',
                            text: 'personal_area',
                            link: routes.profile.private,
                            icon: faFlag,
                        },
                        ...getBaseNavList(),
                        {
                            id: 'logout',
                            text: 'logout',
                            onClick: handleLogout,
                            icon: faSignOutAlt,
                        },
                    ]}
                />
            </div>
        </>
    );
};

export default LeftSide;
