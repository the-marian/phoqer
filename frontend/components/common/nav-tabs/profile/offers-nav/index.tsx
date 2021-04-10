import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import routes from '../../../../../assets/routes';
import { Theme } from '../../../../../assets/theme';
import useTheme from '../../../../../hooks/theme.hook';
import useTrans from '../../../../../hooks/trans.hook';
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

const ProfileOffersNav = ({ active }: IProps): ReactElement | null => {
    const T = useTrans();
    const css = useStyles();
    const [theme] = useTheme();

    const offersTab: ITabs[] = [
        {
            id: 'all',
            text: T.all,
            link: routes.profile.private.my_offers('all'),
        },
        {
            id: 'draft',
            text: T.draft,
            link: routes.profile.private.my_offers('draft'),
        },
        {
            id: 'active',
            text: T.active,
            link: routes.profile.private.my_offers('active'),
        },
        {
            id: 'in-rent',
            text: T.in_rent,
            link: routes.profile.private.my_offers('in-rent'),
        },
        {
            id: 'archive',
            text: T.archive,
            link: routes.profile.private.my_offers('archive'),
        },
    ];

    return (
        <div className={clsx(css.wrp, theme === 'black' && css.black)}>
            <NavTabs tabs={offersTab} classNameWrp={css.nav} className={css.item} activeClass={css.active} active={active} />
        </div>
    );
};

export default ProfileOffersNav;
