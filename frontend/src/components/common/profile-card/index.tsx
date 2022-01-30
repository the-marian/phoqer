import React, { ReactElement } from 'react';

import { faUser } from '@fortawesome/free-regular-svg-icons/faUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import useTrans from '../../../hooks/trans.hook';
import { IPublicProfile, IState } from '../../../interfaces';
import { formatTimestamp, onlineStatus } from '../../../utils/helpers';
import routes from '../../../utils/routes';
import mixin from '../../../utils/theming/mixin';
import { Theme } from '../../../utils/theming/theme';
import UserAvatar from '../user-avatar';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: theme.rem(2),
        borderRadius: theme.radius,
        background: theme.palette.secondary[0],
        transition: theme.transitions[1],

        ...theme.media(450).max({
            flexDirection: 'column',
        }),
    },
    column: {
        flexDirection: 'column',
        '& > a': {
            width: '100%',
            marginBottom: theme.rem(2),
        },
        '& > div': {
            width: '100%',
        },
    },
    svg: {
        padding: theme.rem(3),
    },
    content: {
        width: 'calc(100% - 10rem)',

        ...theme.media(450).max({
            width: '100%',
            marginTop: '0',
        }),
    },
    avatar: {
        display: 'block',
        marginBottom: theme.rem(2),
    },
    name: {
        color: theme.palette.primary[0],
        fontSize: theme.rem(2),
        fontWeight: theme.text.weight[3],

        ...theme.hover({
            textDecoration: 'underline',
        }),

        ...theme.media(768).max({
            fontSize: theme.rem(2.2),
        }),
    },
    info: {
        marginBottom: theme.rem(2),
        color: theme.palette.gray[4],
        fontSize: theme.rem(1.2),

        ...theme.media(768).max({
            fontSize: theme.rem(1.5),
        }),
    },
    btn: {
        ...mixin(theme).btn,
        width: 'max-content',
        color: theme.palette.black[0],
        background: theme.palette.white,

        '& span': {
            marginLeft: theme.rem(1),
        },

        ...theme.media(500).max({
            border: theme.border(0.1, theme.palette.gray[2]),
        }),
    },
}));

interface IProps {
    id?: string | number;
    firstName?: string;
    lastName?: string;
    registerDate?: string;
    avatar?: string | null;
    userLocation?: string | null;
    className?: string;
    lastActivity?: string;
    column?: boolean;
}

const ProfileCard = ({
    id = 0,
    firstName = '_',
    lastName = '_',
    registerDate,
    lastActivity,
    avatar = null,
    userLocation = null,
    className,
    column = false,
}: IProps): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const history = useRouter();
    const user = useSelector<IState, IPublicProfile | null>(state => state.user);

    const isAuthor = user?.id === id;

    return (
        <div className={clsx(css.wrp, className, column && css.column)}>
            <Link href={routes.profile.public(id)}>
                <a className={css.avatar}>
                    <UserAvatar online={isAuthor} firstName={firstName} lastName={lastName} avatar={avatar} />
                </a>
            </Link>
            <div className={css.content}>
                <Link href={routes.profile.public(id)}>
                    <a className={css.name}>{firstName + ' ' + lastName}</a>
                </Link>
                <div className={css.info}>
                    <p>{onlineStatus({ initDate: lastActivity, locale: history.locale, isAuthor })}</p>
                </div>

                <div className={css.info}>
                    <p>{trans('registration_date') + '  ' + formatTimestamp(registerDate, history.locale)}</p>
                    <p>{trans('location') + ':  ' + trans(userLocation || 'not_indicated')}</p>
                </div>

                {isAuthor && (
                    <Link href={routes.profile.private}>
                        <a className={css.btn}>
                            <FontAwesomeIcon icon={faUser} />
                            <span>{trans('personal_area')}</span>
                        </a>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default ProfileCard;
