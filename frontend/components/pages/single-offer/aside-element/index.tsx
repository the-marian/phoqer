import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { Theme } from '../../../../assets/theme';
import { IPublicProfile, IState } from '../../../../interfaces';
import ProfileCard from '../../../common/profile-card';
import Price from '../price';

const useStyles = createUseStyles((theme: Theme) => ({
    aside: {
        position: 'relative',
        width: theme.rem(45),
        marginTop: theme.rem(1),

        ...theme.media(768).max({
            width: '100%',
        }),
    },
    sticky: {
        position: 'sticky',
        top: theme.rem(10),
        left: 0,

        ...theme.media(768).max({
            position: 'static',
        }),
    },
}));

const AsideElement = (): ReactElement => {
    const css = useStyles();
    const profile = useSelector<IState, IPublicProfile | null>(state => state.profiles.public);

    return (
        <aside className={css.aside}>
            <div className={css.sticky}>
                <ProfileCard
                    id={profile?.id}
                    firstName={profile?.first_name}
                    lastName={profile?.last_name}
                    lastActivity={profile?.last_activity}
                    avatar={profile?.profile_img}
                    userLocation={profile?.location}
                    registerDate={profile?.date_joined}
                />
                <Price />
            </div>
        </aside>
    );
};

export default AsideElement;
