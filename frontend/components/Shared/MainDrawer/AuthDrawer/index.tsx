import React, { ReactElement } from 'react';

import { IAuth } from '../../../../interfaces';
import UserNav from '../../../Common/NavTabs/UserNav';
import ProfileCard from '../../../Common/ProfileCard';
import Gift from '../Gift';

interface IProps {
    auth: IAuth;
}
const AuthDrawer = ({ auth }: IProps): ReactElement | null => {
    return (
        <>
            <ProfileCard
                id={auth?.id}
                firstName={auth?.first_name}
                lastName={auth?.last_name}
                avatar={auth?.profile_img}
                userLocation={auth?.location}
                registerDate={auth?.date_joined}
            />
            <Gift />
            <UserNav />
        </>
    );
};

export default AuthDrawer;
