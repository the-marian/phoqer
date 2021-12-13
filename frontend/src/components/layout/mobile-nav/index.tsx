import React, { ReactElement } from 'react';

import { faEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope';
import { faFlag } from '@fortawesome/free-regular-svg-icons/faFlag';
import { faHeart } from '@fortawesome/free-regular-svg-icons/faHeart';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons/faUserCircle';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import useAuth from '../../../hooks/auth.hook';
import useMedia from '../../../hooks/media.hook';
import { IPublicProfile, IState } from '../../../interfaces';
import routes from '../../../utils/routes';
import mixin from '../../../utils/theming/mixin';
import { Theme } from '../../../utils/theming/theme';
import Badge from '../../common/badge';
import { modal } from '../../common/modal';
import StickyModal from '../../common/modal/sticky-modal';
import Navigation from '../../common/navigation';
import { getBaseNavList } from '../../common/navigation/navigation.config';

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
        padding: theme.rem(0, 0.5, 1.65),
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
        ...mixin(theme).cutString,
        width: '21vw',
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

const MobileNav = (): ReactElement | null => {
    const css = useStyles();
    const { token, logout } = useAuth();
    const media = useMedia(1060);

    const user = useSelector<IState, IPublicProfile | null>(state => state.user);
    const userName = `${user?.first_name || ''} ${user?.last_name || ''}`;

    const handleLogout = () => {
        logout();
        window.location.reload();
    };

    const openUserNav = (): void => {
        modal.open(
            <StickyModal>
                <Navigation
                    tabs={[
                        {
                            id: 'personal-area',
                            text: 'personal_area',
                            link: routes.profile.private,
                            icon: faFlag,
                        },
                        ...getBaseNavList(),
                        {
                            id: 'logout',
                            text: 'logout',
                            onClick: handleLogout,
                            icon: faSignOutAlt,
                        },
                    ]}
                />
            </StickyModal>,
        );
    };

    return token.access_token && !media && user ? (
        <ul className={css.list}>
            <li className={css.item}>
                <Link href={routes.chat.item()}>
                    <a className={css.button}>
                        <div className={css.icon}>
                            <FontAwesomeIcon icon={faEnvelope} />
                            <Badge className={css.number}>2</Badge>
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
                <button type="button" className={css.button} onClick={openUserNav}>
                    <div className={css.icon}>
                        <FontAwesomeIcon icon={faUserCircle} />
                        <Badge className={css.number}>14</Badge>
                    </div>
                    <span className={css.text}>{userName}</span>
                </button>
            </li>
        </ul>
    ) : null;
};

export default MobileNav;
