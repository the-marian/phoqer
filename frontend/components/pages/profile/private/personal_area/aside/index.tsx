import { router } from 'next/client';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import routes from '../../../../../../assets/routes';
import { Theme } from '../../../../../../assets/theme';
import { IPublicProfile, IState } from '../../../../../../interfaces';
import UserAvatar from '../../../../../common/user-avatar';
import ProfilePrivateNav from '../../../../../common/user-nav/profile/private';

const useStyles = createUseStyles((theme: Theme) => ({
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
        <>
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
        </>
    );
};

export default ProfileAside;
