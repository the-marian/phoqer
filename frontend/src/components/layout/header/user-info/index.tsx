import React, { ReactElement, useEffect, useState } from 'react';

import { faFlag } from '@fortawesome/free-regular-svg-icons/faFlag';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { faMoon } from '@fortawesome/free-solid-svg-icons/faMoon';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import { faSun } from '@fortawesome/free-solid-svg-icons/faSun';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import Link from 'next/link';
import { Router } from 'next/router';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import useMedia from '../../../../hooks/media.hook';
import useTheme from '../../../../hooks/theme.hook';
import useTrans from '../../../../hooks/trans.hook';
import { IPublicProfile, IState } from '../../../../interfaces';
import types from '../../../../redux/types';
import routes from '../../../../utils/routes';
import mixin from '../../../../utils/theming/mixin';
import { Theme } from '../../../../utils/theming/theme';
import Badge from '../../../common/badge';
import { modal } from '../../../common/modal';
import SmallModalWrp from '../../../common/modal/small-modal-wrp';
import Navigation from '../../../common/navigation';
import { getBaseNavList } from '../../../common/navigation/navigation.config';
import Tooltip from '../../../common/tooltip';
import UserAvatar from '../../../common/user-avatar';

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
    textWrp: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
        maxWidth: theme.rem(20),
        fontSize: theme.rem(1.2),

        ...theme.media(560).max({
            display: 'none',
        }),
    },
    text: {
        width: '100%',
        marginLeft: theme.rem(1),
        ...mixin(theme).cutString,
    },
    small: {
        width: '100%',
        marginLeft: theme.rem(1),
        color: theme.palette.gray[2],
        ...mixin(theme).cutString,
    },
    user: {
        position: 'relative',
        zIndex: 101,
    },
    number: {
        marginRight: theme.rem(0.5),
    },
    tooltip: {
        minWidth: theme.rem(10),
    },
}));

const UserInfo = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const dispatch = useDispatch();
    const tablet = useMedia(650);
    const desktop = useMedia(900);
    const [theme, setTheme] = useTheme();

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

    const handleLogout = () => {
        dispatch({ type: types.LOGOUT_INIT });
    };

    const handleClick = (): void => {
        tablet
            ? setDrop(!drop)
            : modal.open(
                  <SmallModalWrp>
                      <Navigation
                          tabs={[
                              {
                                  id: 'personal-area',
                                  text: 'personal_area',
                                  link: routes.profile.private.personal_area,
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
                  </SmallModalWrp>,
              );
    };

    const toggleTheme = (): void => {
        setTheme(theme === 'white' ? 'black' : 'white');
    };

    return (
        <ul className={css.flex}>
            {tablet && (
                <li className={css.item}>
                    <Tooltip className={css.tooltip} content={trans('Change theme')}>
                        <button type="button" className={css.link} onClick={toggleTheme}>
                            {theme === 'white' ? <FontAwesomeIcon icon={faMoon} /> : <FontAwesomeIcon icon={faSun} />}
                        </button>
                    </Tooltip>
                </li>
            )}

            {desktop && (
                <>
                    <li className={css.item}>
                        <Tooltip className={css.tooltip} content={trans('create_offer')}>
                            <Link href={routes.offers.new(1)}>
                                <a className={css.link}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </a>
                            </Link>
                        </Tooltip>
                    </li>
                    <li className={css.item}>
                        <Tooltip className={css.tooltip} content={trans('favorites')}>
                            <Link href={routes.favorite}>
                                <a className={css.link}>
                                    <FontAwesomeIcon icon={faHeart} />
                                </a>
                            </Link>
                        </Tooltip>
                    </li>
                </>
            )}

            <li className={css.item}>
                <button type="button" className={clsx(css.link, drop && css.user)} onClick={handleClick}>
                    <Badge className={css.number}>14</Badge>
                    <UserAvatar
                        width={3.5}
                        height={3.5}
                        firstName={user?.first_name}
                        lastName={user?.first_name}
                        avatar={user?.profile_img}
                    />
                    <div className={css.textWrp}>
                        <span className={css.text}>{userName}</span>
                        <span className={css.small}>{user?.email || 'no email'}</span>
                    </div>
                </button>

                {drop && <DropWindow onClose={handleClick} />}
            </li>
        </ul>
    );
};

export default UserInfo;
