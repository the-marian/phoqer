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
import useTheme from '../../../../../hooks/theme.hook';
import useTrans from '../../../../../hooks/trans.hook';
import { ITabs } from '../../../../../interfaces';
import types from '../../../../../redux/types';
import NavTabs from '../../index';
import { itemSvg, nav } from '../index.styles';

const useStyles = createUseStyles((theme: Theme) => ({
    item: itemSvg(theme),
    ...nav(theme),
    chatWrp: {
        margin: theme.rem(2, 0, 0),
    },
}));

interface IProps {
    active?: number | string;
}

const ProfileChatNav = ({ active }: IProps): ReactElement | null => {
    const T = useTrans();
    const css = useStyles();
    const [theme] = useTheme();
    const dispatch = useDispatch();

    const profileTabs: ITabs[] = config.userProfileLinks(T, { messages: 5, reviews: 4 });

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
        <div className={clsx(css.wrp, css.chatWrp, theme === 'black' && css.black)}>
            <NavTabs
                tabs={[...extraTabs, ...profileTabs]}
                classNameWrp={css.nav}
                className={css.item}
                activeClass={css.active}
                active={active}
            />
        </div>
    );
};

export default ProfileChatNav;
