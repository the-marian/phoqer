import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import config from '../../../../assets/config';
import template from '../../../../assets/template';
import { Theme } from '../../../../assets/theme';
import useTrans from '../../../../hooks/trans.hook';
import { ITabs } from '../../../../interfaces';
import NavTabs from '../index';

const useStyles = createUseStyles((theme: Theme) => ({
    tabs: {
        '& ul': {
            display: 'flex',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
            margin: theme.rem(0, -1, 1),
        },
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        margin: theme.rem(1),
        padding: theme.rem(1, 1.8),
        background: theme.palette.gray[0],
        color: theme.palette.black[0],
        fontSize: theme.rem(1.4),
        transition: theme.transitions[0],
        borderRadius: theme.radius,
        ...template(theme).outline,

        '& svg': {
            marginRight: theme.rem(1),
        },
    },
    active: {
        color: theme.palette.trueWhite,
        background: theme.palette.primary[0],
        pointerEvents: 'none',
    },

    '@media (max-width: 560px)': {
        item: {
            padding: theme.rem(1, 2),
            margin: theme.rem(0.5),
            minHeight: theme.rem(5.5),
            background: theme.palette.gray[1],
            fontSize: 0,

            '& svg': {
                height: theme.rem(1.8),
                width: theme.rem(1.8),
                margin: 0,
            },
        },
        active: {
            background: theme.palette.primary[0],
        },
    },
}));

interface IProps {
    active?: number | string;
    profileId: string | string[];
}

const ProfileNav = ({ active, profileId }: IProps): ReactElement => {
    const T = useTrans();
    const css = useStyles();

    const profileTabs: ITabs[] = config.userProfileLinks(String(profileId), T, { messages: 5, reviews: 4 });

    return <NavTabs tabs={profileTabs} classNameWrp={css.tabs} className={css.item} activeClass={css.active} active={active} />;
};

export default ProfileNav;
