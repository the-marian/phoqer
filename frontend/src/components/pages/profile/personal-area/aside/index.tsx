import React, { ReactElement } from 'react';

import { createUseStyles } from 'react-jss';

import useMedia from '../../../../../hooks/media.hook';
import { Theme } from '../../../../../utils/theming/theme';
import Navigation from '../../../../common/navigation';
import { getBaseNavList } from '../../../../common/navigation/navigation.config';
import ProfilePrivateCard from '../../profile-card';

const useStyles = createUseStyles((theme: Theme) => ({
    sticky: {
        position: 'sticky',
        top: theme.rem(2),
        left: 0,

        ...theme.media(1060).max({
            position: 'unset',
            marginBottom: theme.rem(2),
        }),
    },
    title: {
        margin: theme.rem(4, 1, 1),
        fontWeight: theme.text.weight[3],
        fontSize: theme.rem(1.6),

        ...theme.media(1060).max({
            margin: theme.rem(2, 1, 1),
        }),
    },
    nav: {
        marginTop: theme.rem(4),
        ...theme.media(1060).max({
            marginTop: theme.rem(1),
        }),
    },
}));

const ProfileAside = (): ReactElement => {
    const css = useStyles();
    const media = useMedia(1060);

    return (
        <div className={css.sticky}>
            <ProfilePrivateCard />
            {media && <Navigation className={css.nav} tabs={getBaseNavList()} />}
        </div>
    );
};

export default ProfileAside;
