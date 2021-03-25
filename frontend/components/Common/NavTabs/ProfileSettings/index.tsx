import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import routes from '../../../../assets/routes';
import template from '../../../../assets/template';
import { Theme } from '../../../../assets/theme';
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
        },
        active: {
            background: theme.palette.primary[0],
        },
    },
}));

interface IProps {
    active?: number | string;
}

const ProfileSettings = ({ active }: IProps): ReactElement | null => {
    const css = useStyles();

    const offersTab: ITabs[] = [
        {
            id: 'general',
            text: 'General settings',
            link: routes.profile.private.settings('general'),
        },
        {
            id: 'privacy',
            text: 'Privacy',
            link: routes.profile.private.settings('privacy'),
        },
    ];

    return <NavTabs tabs={offersTab} classNameWrp={css.tabs} className={css.item} activeClass={css.active} active={active} />;
};

export default ProfileSettings;
