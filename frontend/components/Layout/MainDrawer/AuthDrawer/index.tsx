import React, { ReactElement } from 'react';

import { IAuth } from '../../../../interfaces';
import ProfileCard from '../../../Common/ProfileCard';
import UserLinks from '../../../Common/UserLinks';

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
            <UserLinks />
        </>
    );
};

export default AuthDrawer;
