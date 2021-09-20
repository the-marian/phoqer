import React, { ReactElement } from 'react';

import Link from 'next/link';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { IPublicProfile, IState } from '../../../../../interfaces';
import routes from '../../../../../utils/routes';
import { Theme } from '../../../../../utils/theming/theme';
import Navigation from '../../../../common/navigation';
import { getBaseNavList } from '../../../../common/navigation/navigation.config';
import UserAvatar from '../../../../common/user-avatar';

const useStyles = createUseStyles((theme: Theme) => ({
    sticky: {
        position: 'sticky',
        top: theme.rem(8),
        left: 0,

        ...theme.media(1060).max({
            position: 'unset',
            marginBottom: theme.rem(2),
        }),
    },
    flex: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.rem(4),

        ...theme.media(1060).max({
            marginBottom: theme.rem(1),
        }),
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

            <Navigation tabs={getBaseNavList()} />
        </div>
    );
};

export default ProfileAside;
