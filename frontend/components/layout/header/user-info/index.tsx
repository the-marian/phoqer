import { faHeart } from '@fortawesome/free-regular-svg-icons/faHeart';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons/faUserCircle';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import Link from 'next/link';
import { Router } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import routes from '../../../../assets/routes';
import { Theme } from '../../../../assets/theme';
import useTrans from '../../../../hooks/trans.hook';
import { IPublicProfile, IState } from '../../../../interfaces';
import NotifNumber from '../../../common/notif-number';
import DropWindow from './drop-window';

const useStyles = createUseStyles((theme: Theme) => ({
    flex: {
        display: 'flex',
        alignItems: 'center',
        fontSize: theme.rem(1.4),
    },
    item: {
        marginLeft: theme.rem(1),
        borderRadius: theme.radius,

        ...theme.media(768).max({
            marginLeft: theme.rem(0.4),
        }),
    },
    text: {
        position: 'relative',
        marginLeft: theme.rem(1),
    },
    link: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.rem(0.5, 1.5),
        color: theme.palette.black[0],

        ...theme.media(768).max({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: theme.rem(1, 1.5),
            borderRadius: theme.radius,
        }),
        ...theme.media(768).max({
            fontSize: '0',
        }),
        ...theme.hover({
            '& svg': {
                color: theme.palette.primary[0],
            },
        }),

        '& svg': {
            height: theme.rem(1.4),
            width: theme.rem(1.4),

            ...theme.media(750).max({
                height: theme.rem(1.8),
                width: theme.rem(1.8),
            }),
            ...theme.media(350).max({
                height: theme.rem(1.8),
                width: theme.rem(1.6),
            }),
        },
    },
    user: {
        position: 'relative',
        zIndex: 101,
    },
    number: {
        marginRight: theme.rem(0.5),
    },
}));

const UserInfo = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();

    const [drop, setDrop] = useState<boolean>(false);
    const user = useSelector<IState, IPublicProfile | null>(state => state.user);

    useEffect(() => {
        const handleClose = (): void => {
            setDrop(false);
        };
        Router.events.on('routeChangeComplete', handleClose);

        return () => {
            Router.events.off('routeChangeComplete', handleClose);
        };
    }, []);

    const userName = user?.first_name + ' ' + user?.last_name;

    const handleClick = () => {
        setDrop(!drop);
    };

    return (
        <ul className={css.flex}>
            <li className={css.item}>
                <Link href={routes.offers.new(1)}>
                    <a className={css.link}>
                        <FontAwesomeIcon icon={faPlus} />
                        <span className={css.text}>{trans('create_offer')}</span>
                    </a>
                </Link>
            </li>
            <li className={css.item}>
                <Link href={routes.favorite}>
                    <a className={css.link}>
                        <FontAwesomeIcon icon={faHeart} />
                        <span className={css.text}>{trans('favorites')}</span>
                    </a>
                </Link>
            </li>
            <li className={css.item}>
                <button type="button" className={clsx(css.link, drop && css.user)} onClick={handleClick}>
                    <NotifNumber className={css.number}>14</NotifNumber>
                    <FontAwesomeIcon icon={faUserCircle} />
                    <span className={css.text}>{userName.length > 20 ? userName.slice(0, 17) + '...' : userName}</span>
                </button>
                {drop && <DropWindow onClose={handleClick} />}
            </li>
        </ul>
    );
};

export default UserInfo;
