import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import config from '../../../../assets/config';
import template from '../../../../assets/template';
import { Theme } from '../../../../assets/theme';
import useTrans from '../../../../hooks/trans.hook';
import { ITabs } from '../../../../interfaces';
import NavTabs from '../index';

const useStyles = createUseStyles((theme: Theme) => ({
    ...template(theme).profileNav,
}));

const ProfileNav = (): ReactElement => {
    const T = useTrans();
    const css = useStyles();
    const history = useRouter();

    const profileTabs: ITabs[] = config.userProfileLinks(String(history.query.profileId), T, { messages: 5, reviews: 4 });

    return <NavTabs tabs={profileTabs} classNameWrp={css.tabs} className={css.item} activeClass={css.active} />;
};

export default ProfileNav;
