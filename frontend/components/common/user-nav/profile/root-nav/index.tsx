import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import config from '../../../../../assets/config';
import { ITabs } from '../../../../../interfaces';
import NavTabs from '../../index';
import nav from '../profile.styles';

const useStyles = createUseStyles(nav);

interface IProps {
    active?: number | string;
}

const ProfileNav = ({ active }: IProps): ReactElement => {
    const css = useStyles();
    const profileTabs: ITabs[] = config.userProfileLinks({ messages: 5, reviews: 4 });
    return <NavTabs tabs={profileTabs} classNameWrp={css.nav} className={css.item} activeClass={css.active} active={active} />;
};

export default ProfileNav;
