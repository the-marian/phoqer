import Link from 'next/link';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { IPublicProfile, IState } from '../../../../interfaces';
import routes from '../../../../utils/routes';
import { Theme } from '../../../../utils/theming/theme';
import ProfilePrivateNav from '../../../common/navigation/profile-nav/private';
import UserAvatar from '../../../common/user-avatar';

const useStyles = createUseStyles((theme: Theme) => ({
    sticky: {
        position: 'sticky',
        top: theme.rem(8),
        left: 0,

        ...theme.media(1060).max({
            position: 'unset',
        }),
    },
    flex: {
        display: 'flex',
        alignItems: 'center',
    },
    user: {
        marginLeft: theme.rem(1),
    },
    name: {
        color: theme.palette.black[0],
        fontSize: theme.rem(1.8),
        ...theme.hover({
            textDecoration: 'underline',
        }),
    },
    email: {
        color: theme.palette.gray[2],
        fontSize: theme.rem(1.4),
    },
}));

const ProfileAside = (): ReactElement => {
    const css = useStyles();
    const user = useSelector<IState, IPublicProfile | null>(state => state.user);

    return (
        <div className={css.sticky}>
            <Link href={routes.profile.public(user?.id)}>
                <a className={css.flex}>
                    <UserAvatar
                        width={6}
                        height={6}
                        online={true}
                        firstName={user?.first_name}
                        lastName={user?.last_name}
                        avatar={user?.profile_img}
                    />
                    <div className={css.user}>
                        <p className={css.name}>{user?.first_name + ' ' + user?.last_name}</p>
                        <p className={css.email}>{user?.email || 'no email'}</p>
                    </div>
                </a>
            </Link>
            <ProfilePrivateNav />
        </div>
    );
};

export default ProfileAside;
