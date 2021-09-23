import React, { ReactElement } from 'react';

import clsx from 'clsx';
import Link from 'next/link';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { IPublicProfile, IState } from '../../../../interfaces';
import routes from '../../../../utils/routes';
import { Theme } from '../../../../utils/theming/theme';
import UserAvatar from '../../../common/user-avatar';

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
        fontSize: theme.rem(1.4),
        ...theme.hover({
            textDecoration: 'underline',
        }),
    },
    email: {
        color: theme.palette.gray[2],
        fontSize: theme.rem(1.2),
    },
}));

interface IProps {
    className?: string;
}

const ProfilePrivateCard = ({ className }: IProps): ReactElement => {
    const css = useStyles();
    const user = useSelector<IState, IPublicProfile | null>(state => state.user);

    return (
        <Link href={routes.profile.private.personal_area}>
            <a className={clsx(css.flex, className)}>
                <UserAvatar
                    width={5}
                    height={5}
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
    );
};

export default ProfilePrivateCard;
