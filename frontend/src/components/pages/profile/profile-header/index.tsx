import React, { ReactElement } from 'react';

import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../utils/theming/theme';
import ProfilePrivateCard from '../profile-card';

const useStyles = createUseStyles((theme: Theme) => ({
    flex: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: theme.rem(4),
    },
    title: {
        fontSize: theme.rem(1.8),
        fontWeight: theme.text.weight[3],
    },
}));

const ProfileHeader = (): ReactElement => {
    const css = useStyles();
    return (
        <div className={css.flex}>
            <ProfilePrivateCard />
            {/*<h2 className={css.title}>Мой профиль арендодателя</h2>*/}
        </div>
    );
};

export default ProfileHeader;
