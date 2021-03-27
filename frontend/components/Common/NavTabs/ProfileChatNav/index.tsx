import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import config from '../../../../assets/config';
import routes from '../../../../assets/routes';
import template from '../../../../assets/template';
import { Theme } from '../../../../assets/theme';
import useTrans from '../../../../hooks/trans.hook';
import { ITabs } from '../../../../interfaces';
import types from '../../../../redux/types';
import NavTabs from '../index';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        position: 'relative',
        width: '100%',

        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: theme.rem(-0.1),
            height: '100%',
            width: theme.rem(3),
            background: 'linear-gradient(90deg,rgba(255,255,255,0) 0%,#fff 100%)',
        },

        ...theme.media(768).max({
            '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: theme.rem(-0.1),
                height: '100%',
                width: theme.rem(2),
                background: 'linear-gradient(-90deg,rgba(255,255,255,0) 0%,#fff 100%)',
            },
        }),
    },
    nav: {
        overflow: 'auto',

        '& ul': {
            display: 'flex',
            justifyContent: 'flex-start',
            margin: theme.rem(0, 1),

            ...theme.media(768).max({
                width: 'max-content',

                '& li:nth-last-of-type(1)': {
                    marginRight: theme.rem(4),
                },
            }),
        },
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        height: theme.rem(4.5),
        margin: theme.rem(2, 1, 2),
        padding: theme.rem(0.5, 1.8),
        background: theme.palette.gray[0],
        color: theme.palette.black[0],
        fontSize: theme.rem(1.4),
        transition: theme.transitions[0],
        borderRadius: theme.radius,
        whiteSpace: 'nowrap',
        ...template(theme).outline,

        '& svg': {
            marginRight: theme.rem(1),
        },

        ...theme.media(768).max({
            margin: theme.rem(2, 0.4, 2),
        }),

        ...theme.media(560).max({
            background: theme.palette.gray[1],
            fontSize: '0',

            '& svg': {
                height: theme.rem(1.8),
                width: theme.rem(1.8),
                margin: 0,
            },
        }),
    },
    active: {
        color: theme.palette.trueWhite,
        background: theme.palette.primary[0],
        pointerEvents: 'none',

        ...theme.media(560).max({
            background: theme.palette.primary[0],
        }),
    },
}));

interface IProps {
    active?: number | string;
}

const ProfileChatNav = ({ active }: IProps): ReactElement | null => {
    const T = useTrans();
    const css = useStyles();
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
        <div className={css.wrp}>
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
