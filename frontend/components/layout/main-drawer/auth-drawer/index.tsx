import React, { ReactElement } from 'react';

import { IAuth } from '../../../../interfaces';
import Gift from '../../../common/gift';
import UserNav from '../../../common/nav-tabs/user-nav';
import ProfileCard from '../../../common/profile-card';

interface IProps {
    auth: IAuth;
}
const AuthDrawer = ({ auth }: IProps): ReactElement | null => {
    return (
        <>
            <ProfileCard
                column
                id={auth?.id}
                firstName={auth?.first_name}
                lastName={auth?.last_name}
                avatar={auth?.profile_img}
                lastActivity={auth?.last_activity}
                userLocation={auth?.location}
                registerDate={auth?.date_joined}
            />
            <Gift style={{ margin: '4rem 0' }} />
            <UserNav />
        </>
    );
};

export default AuthDrawer;
