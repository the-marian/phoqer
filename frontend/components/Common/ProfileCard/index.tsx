import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../assets/theme';
import useAuth from '../../../hooks/auth.hook';
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
        background: theme.palette.gray[0],
        boxShadow: theme.shadow[1],

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
        fontSize: theme.rem(2),
        fontWeight: theme.text.weight[3],

        '@media (max-width: 768px)': {
            fontSize: theme.rem(2),
        },
    },
    info: {
        marginBottom: theme.rem(2),
        color: theme.palette.gray[3],
        fontSize: theme.rem(1.4),

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

        '&:hover': {
            boxShadow: theme.shadow[2],
        },
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
    const auth = useAuth();

    const handleOpenChat = (): void => {
        if (!auth.auth_token) {
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
            <UserAvatar firstName={firstName} lastName={lastName} avatar={avatar} />
            <div className={css.content}>
                <div className={css.name}>{firstName + ' ' + lastName}</div>
                <div className={css.info}>
                    <p>Был онлайн 2 часа назад</p>
                </div>

                <div className={css.info}>
                    <p>Дата регистрации: 2021-10-10</p>
                    <p>Локация: {userLocation || 'Не указано'}</p>
                </div>

                <button className={css.btn} type="button" onClick={handleOpenChat}>
                    Написать автору
                </button>
            </div>
        </div>
    );
};

export default ProfileCard;
