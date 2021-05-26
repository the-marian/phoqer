import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import config from '../../../../../assets/config';
import routes from '../../../../../assets/routes';
import { Theme } from '../../../../../assets/theme';
import { ITabs } from '../../../../../interfaces';
import types from '../../../../../redux/types';
import NavTabs from '../../index';
import nav from '../profile.styles';

const useStyles = createUseStyles((theme: Theme) => ({
    ...nav(theme),
    chat: {
        margin: theme.rem(0.5, 1.5),
    },
}));

interface IProps {
    active?: number | string;
}

const ProfileChatNav = ({ active }: IProps): ReactElement | null => {
    const css = useStyles();
    const dispatch = useDispatch();

    const profileTabs: ITabs[] = config.userProfileLinks({ messages: 5, reviews: 4 });
    const extraTabs: ITabs[] = [
        {
            id: 'menu',
            text: '',
            icon: faBars,
            onClick: () => {
                dispatch({ type: types.TOGGLE_DRAWER });
            },
        },
        {
            id: 'home',
            text: '',
            link: routes.root,
            icon: faHome,
        },
        {
            id: 'favorite',
            text: '',
            link: routes.favorite,
            icon: faHeart,
        },
    ];

    return (
        <NavTabs
            tabs={[...extraTabs, ...profileTabs]}
            classNameWrp={clsx(css.nav, css.chat)}
            className={css.item}
            activeClass={css.active}
            active={active}
        />
    );
};

export default ProfileChatNav;
