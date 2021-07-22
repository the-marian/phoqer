import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { IPublicProfile, IState } from '../../../../interfaces';
import { Theme } from '../../../../utils/theming/theme';
import Gift from '../../../common/gift';
import UserNavDropdown from '../../../common/navigation/user-dropdown-nav';
import ProfileCard from '../../../common/profile-card';
import ControlButtons from '../control-buttons';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        margin: theme.rem(2, 0, 1),
    },
}));

const AuthDrawer = (): ReactElement | null => {
    const css = useStyles();
    const user = useSelector<IState, IPublicProfile | null>(state => state.user);

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
                <UserNavDropdown />
            </div>
            <Gift style={{ margin: '3rem 0' }} />
        </>
    );
};

export default AuthDrawer;
