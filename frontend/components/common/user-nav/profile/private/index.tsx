import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import config from '../../../../../assets/config';
import { Theme } from '../../../../../assets/theme';
import { ITabs } from '../../../../../interfaces';
import NavTabs from '../../index';
import nav from '../profile.styles';

const useStyles = createUseStyles((theme: Theme) => ({
    ...nav(theme),
    nav: {
        maxWidth: '100vw',
        marginTop: theme.rem(2),

        '& ul': {
            display: 'flex',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
            marginBottom: theme.rem(0.6),

            ...theme.media(1060).max({
                marginBottom: theme.rem(2),
            }),
        },

        '& li': {
            width: '100%',

            ...theme.media(1060).max({
                width: 'auto',
            }),
        },
    },
}));

const ProfilePrivateNav = (): ReactElement => {
    const css = useStyles();
    const profileTabs: ITabs[] = config.userProfileLinks({ messages: 5, reviews: 4 });
    return <NavTabs tabs={profileTabs} classNameWrp={css.nav} className={css.item} activeClass={css.active} />;
};

export default ProfilePrivateNav;
