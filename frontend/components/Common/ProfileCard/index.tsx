import Link from 'next/link';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { formatTimestemp } from '../../../assets/helpers';
import routes from '../../../assets/routes';
import template from '../../../assets/template';
import { Theme } from '../../../assets/theme';
import useAuth from '../../../hooks/auth.hook';
import useMonths from '../../../hooks/month.hook';
import LoginForm from '../Auth/LoginForm';
import { modal } from '../Modal';
import SmallModalWrp from '../Modal/SmallModalWrp';
import UserAvatar from '../UserAvatar';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: theme.rem(2),
        borderRadius: theme.radius,
        background: theme.palette.gray[1],

        '@media (max-width: 450px)': {
            flexDirection: 'column',
        },
    },
    svg: {
        padding: theme.rem(3),
    },
    content: {
        width: 'calc(100% - 10rem)',
        '@media (max-width: 450px)': {
            width: '100%',
            marginTop: theme.rem(2),
        },
    },
    name: {
        color: theme.palette.black[0],
        fontSize: theme.rem(2),
        fontWeight: theme.text.weight[3],

        '&:hover': {
            textDecoration: 'underline',
        },

        '@media (max-width: 768px)': {
            fontSize: theme.rem(2.2),
        },
    },
    info: {
        marginBottom: theme.rem(2),
        color: theme.palette.gray[4],
        fontSize: theme.rem(1.2),

        '@media (max-width: 768px)': {
            fontSize: theme.rem(1.5),
        },
    },
    btn: {
        display: 'block',
        width: 'max-content',
        padding: theme.rem(1.5, 3),
        fontSize: theme.rem(1.6),
        color: theme.palette.black[0],
        borderRadius: theme.radius,
        background: theme.palette.white,
        textAlign: 'center',
        boxShadow: theme.shadow[1],
        transition: theme.transitions[0],
        ...template(theme).outline,

        '@media (max-width: 500px)': {
            border: theme.border(0.1, theme.palette.gray[2]),
        },
    },
}));

interface IProps {
    id?: string | number;
    firstName?: string;
    lastName?: string;
    registerDate?: string;
    avatar?: string | null;
    userLocation?: string | null;
}

const ProfileCard = ({
    id = 0,
    firstName = '_',
    lastName = '_',
    registerDate,
    avatar = null,
    userLocation = null,
}: IProps): ReactElement => {
    const css = useStyles();
    const auth = useAuth();
    const M = useMonths();

    const handleOpenChat = (): void => {
        if (!auth?.access_token) {
            modal.open(
                <SmallModalWrp>
                    <LoginForm />
                </SmallModalWrp>,
            );
            return;
        }

        alert('fuck you!');
    };

    return (
        <div className={css.wrp}>
            <Link href={routes.profile.public()} as={routes.profile.public(id)}>
                <a>
                    <UserAvatar firstName={firstName} lastName={lastName} avatar={avatar} />
                </a>
            </Link>
            <div className={css.content}>
                <Link href={routes.profile.public()} as={routes.profile.public(id)}>
                    <a className={css.name}>{firstName + ' ' + lastName}</a>
                </Link>
                <div className={css.info}>
                    <p>Был онлайн 2 часа назад</p>
                </div>

                <div className={css.info}>
                    <p>Дата регистрации: {formatTimestemp(registerDate, M)}</p>
                    <p>Локация: {userLocation || 'Не указано'}</p>
                </div>

                {auth?.id === id ? (
                    <button className={css.btn} type="button" onClick={handleOpenChat}>
                        Написать автору
                    </button>
                ) : null}
            </div>
        </div>
    );
};

export default ProfileCard;
