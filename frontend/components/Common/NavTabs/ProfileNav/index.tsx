import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import config from '../../../../assets/config';
import template from '../../../../assets/template';
import { Theme } from '../../../../assets/theme';
import useTheme from '../../../../hooks/theme.hook';
import useTrans from '../../../../hooks/trans.hook';
import { ITabs } from '../../../../interfaces';
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
            width: '91vw',
            marginLeft: '-2.5%',

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
        ...theme.media(475).max({
            width: '95vw',
            marginLeft: '-5%',
        }),
    },
    black: {
        '&::before': {
            background: 'linear-gradient(90deg,rgba(34,34,34,0) 0%,#222 100%)',
        },
        ...theme.media(768).max({
            '&::after': {
                background: 'linear-gradient(-90deg,rgba(34,34,34,0) 0%,#222 100%)',
            },
        }),
    },
    nav: {
        overflow: 'auto',

        '& ul': {
            display: 'flex',
            justifyContent: 'flex-start',
            margin: theme.rem(0, -1),

            ...theme.media(768).max({
                width: 'max-content',
                margin: theme.rem(0, 1),

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
        margin: theme.rem(0, 1, 2),
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
            margin: theme.rem(0, 0.4, 2),
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

const ProfileNav = ({ active }: IProps): ReactElement | null => {
    const T = useTrans();
    const css = useStyles();
    const [theme] = useTheme();
    const profileTabs: ITabs[] = config.userProfileLinks(T, { messages: 5, reviews: 4 });

    return (
        <div className={clsx(css.wrp, theme === 'black' && css.black)}>
            <NavTabs tabs={profileTabs} classNameWrp={css.nav} className={css.item} activeClass={css.active} active={active} />
        </div>
    );
};

export default ProfileNav;
