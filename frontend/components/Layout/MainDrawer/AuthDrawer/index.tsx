import React, { ReactElement } from 'react';

import { IAuth } from '../../../../interfaces';
import UserNavLinks from '../../../Common/NavTabs/UserNavLinks';
import ProfileCard from '../../../Common/ProfileCard';

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
            <UserNavLinks />
        </>
    );
};

export default AuthDrawer;
