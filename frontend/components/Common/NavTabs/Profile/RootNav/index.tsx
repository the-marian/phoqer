import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import config from '../../../../../assets/config';
import { Theme } from '../../../../../assets/theme';
import useTheme from '../../../../../hooks/theme.hook';
import useTrans from '../../../../../hooks/trans.hook';
import { ITabs } from '../../../../../interfaces';
import NavTabs from '../../index';
import { itemSvg, nav } from '../index.styles';

const useStyles = createUseStyles((theme: Theme) => ({
    item: itemSvg(theme),
    ...nav(theme),
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
