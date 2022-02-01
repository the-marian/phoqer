import React, { ReactElement } from 'react';

import Link from 'next/link';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { IPublicProfile, IState } from '../../../../interfaces';
import routes from '../../../../utils/routes';
import mixin from '../../../../utils/theming/mixin';
import { Theme } from '../../../../utils/theming/theme';
import Badge from '../../../common/badge';
import UserAvatar from '../../../common/user-avatar';

const useStyles = createUseStyles((theme: Theme) => ({
    flex: {
        display: 'flex',
        alignItems: 'center',
        fontSize: theme.rem(1.4),
        ...theme.media(500).max({
            marginRight: theme.rem(2),
        }),
    },
    item: {
        marginLeft: theme.rem(1),
        borderRadius: theme.radius,

        ...theme.media(768).max({
            marginLeft: theme.rem(0.4),
        }),
    },
    user: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: theme.rem(1.4),
        padding: theme.rem(0.5, 1.5),
        color: theme.palette.black[0],

        ...theme.media(500).max({
            padding: theme.rem(0.5),
        }),

        ...theme.hover({
            '& svg': {
                color: theme.palette.primary[0],
            },
        }),
    },
    badge: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 10,
    },
    textWrp: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
        maxWidth: theme.rem(20),
        fontSize: theme.rem(1.2),

        ...theme.media(560).max({
            display: 'none',
        }),
    },
    text: {
        width: '100%',
        marginLeft: theme.rem(1),
        ...mixin(theme).cutString,
    },
    small: {
        width: '100%',
        marginLeft: theme.rem(1),
        color: theme.palette.gray[2],
        ...mixin(theme).cutString,
    },
}));

const UserInfo = (): ReactElement => {
    const css = useStyles();

    const user = useSelector<IState, IPublicProfile | null>(state => state.user);

    return (
        <Link href={routes.profile.private}>
            <a className={css.user}>
                <Badge className={css.badge}>14</Badge>
                <UserAvatar
                    width={3.5}
                    height={3.5}
                    firstName={user?.first_name}
                    lastName={user?.last_name}
                    avatar={user?.profile_img}
                />
            </a>
        </Link>
    );
};

export default UserInfo;
