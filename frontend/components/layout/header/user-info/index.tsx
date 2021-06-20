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
import useMedia from '../../../../hooks/media.hook';
import useTrans from '../../../../hooks/trans.hook';
import { IPublicProfile, IState } from '../../../../interfaces';
import template from '../../../../theming/template';
import { Theme } from '../../../../theming/theme';
import { modal } from '../../../common/modal';
import SmallModalWrp from '../../../common/modal/small-modal-wrp';
import UserNavDropdown from '../../../common/navigation/user-dropdown-nav';
import NotifNumber from '../../../common/notif-number';
import DropWindow from './drop-window';

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
    link: {
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
    text: {
        position: 'relative',
        marginLeft: theme.rem(1),
        maxWidth: theme.rem(20),
        ...template(theme).cutString,

        ...theme.media(1200).max({
            fontSize: '0',
            margin: '0',
        }),
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
    const media = useMedia(410);

    const [drop, setDrop] = useState<boolean>(false);
    const user = useSelector<IState, IPublicProfile | null>(state => state.user);

    useEffect(() => {
        const handleClose = (): void => {
            if (drop) setDrop(false);
        };
        Router.events.on('routeChangeComplete', handleClose);

        return () => {
            Router.events.off('routeChangeComplete', handleClose);
        };
    }, [drop]);

    const userName = user?.first_name + ' ' + user?.last_name;

    const handleClick = (): void => {
        window.innerHeight > 660
            ? setDrop(!drop)
            : modal.open(
                  <SmallModalWrp>
                      <UserNavDropdown />
                  </SmallModalWrp>,
              );
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
            {media && (
                <li className={css.item}>
                    <Link href={routes.favorite}>
                        <a className={css.link}>
                            <FontAwesomeIcon icon={faHeart} />
                            <span className={css.text}>{trans('favorites')}</span>
                        </a>
                    </Link>
                </li>
            )}
            <li className={css.item}>
                <button type="button" className={clsx(css.link, drop && css.user)} onClick={handleClick}>
                    <NotifNumber className={css.number}>14</NotifNumber>
                    <FontAwesomeIcon icon={faUserCircle} />
                    <span className={css.text}>{userName}</span>
                </button>
                {drop && <DropWindow onClose={handleClick} />}
            </li>
        </ul>
    );
};

export default UserInfo;
