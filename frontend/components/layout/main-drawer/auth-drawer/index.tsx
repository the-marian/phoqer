import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { IPublicProfile, IState } from '../../../../interfaces';
import Gift from '../../../common/gift';
import UserNav from '../../../common/nav-tabs/user-nav';
import ProfileCard from '../../../common/profile-card';

const AuthDrawer = (): ReactElement | null => {
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
                userLocation={user?.location}
                registerDate={user?.date_joined}
            />
            <Gift style={{ margin: '4rem 0' }} />
            <UserNav />
        </>
    );
};

export default AuthDrawer;
