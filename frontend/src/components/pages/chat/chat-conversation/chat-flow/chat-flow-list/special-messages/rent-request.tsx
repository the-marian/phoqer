import React, { ReactElement } from 'react';

import Link from 'next/link';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { IChatOfferInfo, IMessages, IPublicProfile, IState } from '../../../../../../../interfaces';
import routes from '../../../../../../../utils/routes';
import mixin from '../../../../../../../utils/theming/mixin';
import { Theme } from '../../../../../../../utils/theming/theme';
import Button from '../../../../../../common/button';
import UserAvatar from '../../../../../../common/user-avatar';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    img: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: theme.rem(20),
        height: theme.rem(20),
        margin: theme.rem(3, 0),
        background: theme.palette.secondary[0],
        borderRadius: '50%',

        '& img': {
            display: 'block',
            width: theme.rem(10),
            height: theme.rem(10),
            objectFit: 'contain',
        },
    },
    text: {
        width: '90%',
        maxWidth: theme.rem(40),
        margin: '0 auto 2rem',
        textAlign: 'center',
        fontSize: theme.rem(1.4),
    },
    flex: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: theme.rem(3),
    },
    approve: {
        ...mixin(theme).btn,
        marginRight: theme.rem(1),
    },
    cancel: {
        ...mixin(theme).btn,
        backgroundColor: theme.palette.gray[0],
        color: theme.palette.black[0],
    },
    user: {
        marginLeft: theme.rem(1),
        textAlign: 'left',
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
        fontSize: theme.rem(1.3),
    },
}));

interface IProps {
    message: IMessages;
}

const RentRequest = ({ message }: IProps): ReactElement | null => {
    const css = useStyles();

    const user = useSelector<IState, IPublicProfile | null>(state => state.user);
    const offerInfo = useSelector<IState, IChatOfferInfo>(state => state.chat.info);
    const profile = useSelector<IState, IPublicProfile | null>(state => state.profiles.public);

    const clientText = (
        <p>
            Вы успешно отправили запрос {message.first_name} {message.last_name} на аренду &quot;{offerInfo.data?.title}&quot;.
        </p>
    );

    const authorText = (
        <>
            <p>
                Пользователь {profile?.first_name} {profile?.last_name} желает арендовать у вас &quot;{offerInfo.data?.title}
                &quot;
            </p>
            {profile && (
                <Link href={routes.profile.public(profile?.id)}>
                    <a className={css.flex}>
                        <UserAvatar
                            width={5}
                            height={5}
                            time={profile?.last_activity}
                            firstName={profile?.first_name}
                            lastName={profile?.last_name}
                            avatar={profile?.profile_img}
                        />
                        <div className={css.user}>
                            <p className={css.name}>{profile?.first_name + ' ' + profile?.last_name}</p>
                            <p className={css.email}>{profile?.email || 'no email'}</p>
                        </div>
                    </a>
                </Link>
            )}
            <div className={css.flex}>
                <Button primary className={css.approve}>
                    Approve
                </Button>
                <Button className={css.cancel}>Cancel</Button>
            </div>
        </>
    );

    return (
        user && (
            <div className={css.root}>
                <div className={css.img}>
                    <img src={message.user_id === user.id ? '/case.png' : '/target.png'} alt="" />
                </div>
                <div className={css.text}>{message.user_id === user.id ? authorText : clientText}</div>
            </div>
        )
    );
};

export default RentRequest;
