import { faHeart, faUser } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import Link from 'next/link';
import { Router } from 'next/router';
import React, { ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';

import router from '../../../../assets/router';
import { Theme } from '../../../../assets/theme';
import NotifNumber from '../../../Common/NotifNumber';
import DropWindow from './DropWindow';

const useStyles = createUseStyles((theme: Theme) => ({
    flex: {
        display: 'flex',
        fontSize: theme.rem(1.4),
    },
    item: {
        marginLeft: theme.rem(4.5),

        '@media (max-width: 500px)': {
            marginLeft: theme.rem(2),
        },

        '@media (max-width: 450px)': {
            marginLeft: theme.rem(2.5),
        },
    },
    text: {
        position: 'relative',
        marginLeft: theme.rem(1),

        '@media (max-width: 750px)': {
            fontSize: 0,
            marginLeft: 0,
        },
    },
    link: {
        position: 'relative',
        color: theme.palette.black[0],

        '&:hover': {
            color: theme.palette.primary[0],
        },

        '@media (max-width: 750px)': {
            fontSize: theme.rem(2.2),
        },
    },
    user: {
        position: 'relative',
        zIndex: 101,
    },
}));

const UserInfo = (): ReactElement => {
    const css = useStyles();
    const [drop, setDrop] = useState<boolean>(false);

    Router.events.on('routeChangeComplete', () => {
        setDrop(false);
    });

    const handleClick = () => {
        setDrop(!drop);
    };

    return (
        <ul className={css.flex}>
            <li className={css.item}>
                <Link href={`${router.new_offer}/:step`} as={`${router.new_offer}/1`}>
                    <a className={css.link}>
                        <FontAwesomeIcon icon={faPlus} />
                        <span className={css.text}>Сдать в аренду</span>
                    </a>
                </Link>
            </li>
            <li className={css.item}>
                <Link href={router.favorite}>
                    <a className={css.link}>
                        <FontAwesomeIcon icon={faHeart} />
                        <span className={css.text}>Избранное</span>
                    </a>
                </Link>
            </li>
            <li className={css.item}>
                <button type="button" className={clsx(css.link, drop && css.user)} onClick={handleClick}>
                    <FontAwesomeIcon icon={faUser} />
                    <span className={css.text}>Влад Василенко</span>
                    <NotifNumber>14</NotifNumber>
                </button>
                {drop && <DropWindow onClose={handleClick} />}
            </li>
        </ul>
    );
};

export default UserInfo;
