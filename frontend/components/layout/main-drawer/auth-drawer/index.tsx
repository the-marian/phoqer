import { faFlag } from '@fortawesome/free-regular-svg-icons/faFlag';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { IPublicProfile, IState } from '../../../../interfaces';
import types from '../../../../redux/types';
import routes from '../../../../utils/routes';
import { Theme } from '../../../../utils/theming/theme';
import Gift from '../../../common/advertising/gift';
import Navigation from '../../../common/navigation';
import { getBaseNavList } from '../../../common/navigation/navigation.config';
import ProfileCard from '../../../common/profile-card';
import ControlButtons from '../control-buttons';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        margin: theme.rem(2, 0, 1),
    },
}));

const AuthDrawer = (): ReactElement | null => {
    const css = useStyles();
    const dispatch = useDispatch();
    const user = useSelector<IState, IPublicProfile | null>(state => state.user);

    const handleLogout = () => {
        dispatch({ type: types.LOGOUT_INIT });
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

            <ControlButtons />

            <div className={css.wrp}>
                <Navigation
                    tabs={[
                        {
                            id: 'personal-area',
                            text: 'personal_area',
                            link: routes.profile.private.personal_area,
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

            <Gift style={{ margin: '3rem 0' }} />
        </>
    );
};

export default AuthDrawer;
