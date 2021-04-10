import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import routes from '../../../../../assets/routes';
import { Theme } from '../../../../../assets/theme';
import useTheme from '../../../../../hooks/theme.hook';
import { ITabs } from '../../../../../interfaces';
import NavTabs from '../../index';
import { item, nav } from '../profile.styles';

const useStyles = createUseStyles((theme: Theme) => ({
    item: item(theme),
    ...nav(theme),
}));

interface IProps {
    active?: number | string;
}

const ProfileSettingsNav = ({ active }: IProps): ReactElement | null => {
    const css = useStyles();
    const [theme] = useTheme();

    const offersTab: ITabs[] = [
        {
            id: 'general',
            text: 'general data',
            link: routes.profile.private.settings('general'),
        },
        {
            id: 'privacy',
            text: 'Privacy',
            link: routes.profile.private.settings('privacy'),
        },
    ];

    return (
        <div className={clsx(css.wrp, theme === 'black' && css.black)}>
            <NavTabs tabs={offersTab} classNameWrp={css.nav} className={css.item} activeClass={css.active} active={active} />
        </div>
    );
};

export default ProfileSettingsNav;
