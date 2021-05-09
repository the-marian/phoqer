import { faEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope';
import { faHeart } from '@fortawesome/free-regular-svg-icons/faHeart';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons/faUserCircle';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import routes from '../../../assets/routes';
import { Theme } from '../../../assets/theme';
import useAuth from '../../../hooks/auth.hook';
import useMedia from '../../../hooks/media.hook';
import { IPublicProfile, IState } from '../../../interfaces';
import NotifNumber from '../notif-number';

const useStyles = createUseStyles((theme: Theme) => ({
    list: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        zIndex: 10000,
        display: 'flex',
        width: '100%',
        background: theme.palette.white,
    },
    item: {
        position: 'relative',
        width: '25%',
        minHeight: theme.rem(5),
        borderTop: theme.border(0.1, theme.palette.gray[1]),
        borderRight: theme.border(0.1, theme.palette.gray[1]),
        borderBottom: theme.border(0.1, theme.palette.gray[1]),
        transition: theme.transitions[0],

        ...theme.hover({
            background: theme.palette.gray[0],
        }),
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        padding: theme.rem(0.5),
        color: theme.palette.black[0],
    },
    number: {
        marginLeft: theme.rem(0.5),
        height: theme.rem(2),
        width: theme.rem(2),
        minWidth: theme.rem(2),
        fontSize: theme.rem(1),

        ...theme.media(768).max({
            position: 'absolute',
            top: theme.rem(0.5),
            right: theme.rem(1),
            marginLeft: '0',
        }),
    },
    text: {
        fontSize: theme.rem(1.2),
        textAlign: 'center',
    },
    icon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: theme.rem(2.5),
        width: '100%',
        fontSize: theme.rem(1.4),
    },
}));

const MAX_LENGTH = 12;

const MobileNav = (): ReactElement | null => {
    const css = useStyles();
    const auth = useAuth();
    const media = useMedia(1060);

    const user = useSelector<IState, IPublicProfile | null>(state => state.user);
    const userName = `${user?.first_name || ''} ${user?.last_name || ''}`;

    return auth?.access_token && !media && user ? (
        <ul className={css.list}>
            <li className={css.item}>
                <Link href={routes.profile.private.messages()}>
                    <a className={css.button}>
                        <div className={css.icon}>
                            <FontAwesomeIcon icon={faEnvelope} />
                            <NotifNumber className={css.number}>2</NotifNumber>
                        </div>
                        <span className={css.text}>Chat</span>
                    </a>
                </Link>
            </li>
            <li className={css.item}>
                <Link href={routes.favorite}>
                    <a className={css.button}>
                        <div className={css.icon}>
                            <FontAwesomeIcon icon={faHeart} />
                        </div>
                        <span className={css.text}>favorite</span>
                    </a>
                </Link>
            </li>
            <li className={css.item}>
                <Link href={routes.offers.new(1)}>
                    <a className={css.button}>
                        <div className={css.icon}>
                            <FontAwesomeIcon icon={faPlus} />
                        </div>
                        <span className={css.text}>Create offer</span>
                    </a>
                </Link>
            </li>
            <li className={css.item}>
                <Link href={routes.profile.private.personal_area}>
                    <a className={css.button}>
                        <div className={css.icon}>
                            <FontAwesomeIcon icon={faUserCircle} />
                            <NotifNumber className={css.number}>14</NotifNumber>
                        </div>
                        <span className={css.text}>
                            {userName.length > MAX_LENGTH ? userName.slice(0, MAX_LENGTH - 3) + '...' : userName}
                        </span>
                    </a>
                </Link>
            </li>
        </ul>
    ) : null;
};

export default MobileNav;
