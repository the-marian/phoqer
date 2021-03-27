import { faHeart } from '@fortawesome/free-regular-svg-icons/faHeart';
import { faUser } from '@fortawesome/free-regular-svg-icons/faUser';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import Link from 'next/link';
import { Router } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';

import routes from '../../../../assets/routes';
import { Theme } from '../../../../assets/theme';
import useAuth from '../../../../hooks/auth.hook';
import useMedia from '../../../../hooks/media.hook';
import useTrans from '../../../../hooks/trans.hook';
import NotifNumber from '../../../Common/NotifNumber';
import DropWindow from './DropWindow';

const useStyles = createUseStyles((theme: Theme) => ({
    flex: {
        display: 'flex',
        alignItems: 'center',
        fontSize: theme.rem(1.4),

        ...theme.media(768).max({
            fontSize: theme.rem(1.8),
        }),
    },
    item: {
        marginLeft: theme.rem(4.5),

        ...theme.media(768).max({
            marginLeft: theme.rem(1.2),
        }),
    },
    text: {
        position: 'relative',
        marginLeft: theme.rem(1),
    },
    link: {
        position: 'relative',
        color: theme.palette.black[0],

        ...theme.media(768).max({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: theme.rem(1, 1.5),
            borderRadius: theme.radius,
        }),
        ...theme.media(500).max({
            fontSize: '0',
        }),
        ...theme.hover({
            color: theme.palette.primary[0],
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
}));

const UserInfo = (): ReactElement => {
    const T = useTrans();
    const auth = useAuth();
    const css = useStyles();
    const media = useMedia(1060);
    const [drop, setDrop] = useState<boolean>(false);

    useEffect(() => {
        const handleClose = (): void => {
            setDrop(false);
        };
        Router.events.on('routeChangeComplete', handleClose);

        return () => {
            Router.events.off('routeChangeComplete', handleClose);
        };
    }, []);

    const handleClick = () => {
        setDrop(!drop);
    };

    return (
        <ul className={css.flex}>
            {media ? (
                <>
                    <li className={css.item}>
                        <Link href={routes.new_offer(1)}>
                            <a className={css.link}>
                                <FontAwesomeIcon icon={faPlus} />
                                <span className={css.text}>{T.create_offer}</span>
                            </a>
                        </Link>
                    </li>
                    <li className={css.item}>
                        <Link href={routes.favorite}>
                            <a className={css.link}>
                                <FontAwesomeIcon icon={faHeart} />
                                <span className={css.text}>{T.favorites}</span>
                            </a>
                        </Link>
                    </li>
                </>
            ) : null}
            <li className={css.item}>
                <button type="button" className={clsx(css.link, drop && css.user)} onClick={handleClick}>
                    <FontAwesomeIcon icon={faUser} />
                    <span className={css.text}>{auth?.first_name + ' ' + auth?.last_name}</span>
                    <NotifNumber>14</NotifNumber>
                </button>
                {drop && <DropWindow onClose={handleClick} />}
            </li>
        </ul>
    );
};

export default UserInfo;
