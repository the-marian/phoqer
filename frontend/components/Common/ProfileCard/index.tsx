import Link from 'next/link';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import routes from '../../../assets/routes';
import { Theme } from '../../../assets/theme';
import UserAvatar from '../UserAvatar';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: theme.rem(2),
        borderRadius: theme.radius,
        background: theme.palette.gray[0],
        boxShadow: theme.shadow[1],
    },
    svg: {
        padding: theme.rem(3),
    },
    content: {
        width: 'calc(100% - 10rem)',
    },
    name: {
        fontSize: theme.rem(1.8),
        fontWeight: theme.text.weight[3],

        '@media (max-width: 768px)': {
            fontSize: theme.rem(2),
        },
    },
    info: {
        marginBottom: theme.rem(2),
        color: theme.palette.gray[3],
        fontSize: theme.rem(1.2),

        '@media (max-width: 768px)': {
            fontSize: theme.rem(1.5),
        },
    },
    btn: {
        display: 'block',
        padding: theme.rem(1.5, 3),
        fontSize: theme.rem(1.6),
        color: theme.palette.black[0],
        borderRadius: theme.radius,
        background: theme.palette.white,
        textAlign: 'center',
        boxShadow: theme.shadow[1],
    },
}));

interface IProps {
    firstName: string;
    lastName: string;
    avatar?: string | null;
    userLocation?: string | null;
}

const ProfileCard = ({ firstName, lastName, avatar = null, userLocation = null }: IProps): ReactElement => {
    const css = useStyles();

    return (
        <div className={css.wrp}>
            <UserAvatar firstName={firstName} lastName={lastName} avatar={avatar} />
            <div className={css.content}>
                <div className={css.name}>{firstName + ' ' + lastName}</div>
                <div className={css.info}>
                    <p>Был онлайн 2 часа назад</p>
                </div>

                <div className={css.info}>
                    <p>Зарегистрирован с января 1970 года</p>
                    <p>{userLocation || 'Местоположение пользователя не указано'}</p>
                </div>

                <Link href={routes.root}>
                    <a className={css.btn}>Написать автору</a>
                </Link>
            </div>
        </div>
    );
};

export default ProfileCard;
