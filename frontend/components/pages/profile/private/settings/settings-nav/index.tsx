import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import routes from '../../../../../../assets/routes';
import template from '../../../../../../assets/template';
import { Theme } from '../../../../../../assets/theme';
import useTrans from '../../../../../../hooks/trans.hook';

const useStyles = createUseStyles((theme: Theme) => ({
    list: {
        display: 'flex',
        margin: theme.rem(0, 0, 4),
    },
    link: {
        display: 'block',
        marginRight: theme.rem(1),
        padding: theme.rem(1, 2.5),
        color: theme.palette.black[0],
        fontSize: theme.rem(1.4),
        background: theme.palette.gray[0],
        borderRadius: theme.radius,
        ...template(theme).outline,
    },
    active: {
        background: theme.palette.primary[0],
        color: theme.palette.trueWhite,
        ...theme.hover({
            background: theme.palette.primary[0],
        }),
    },
}));

const SettingsNav = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const { query } = useRouter();
    const activeTab = String(query.activeTab || '');

    return (
        <ul className={css.list}>
            <li>
                <Link href={routes.profile.private.settings('general')}>
                    <a className={clsx(css.link, activeTab === 'general' && css.active)}>{trans('general')}</a>
                </Link>
            </li>
            <li>
                <Link href={routes.profile.private.settings('privacy')}>
                    <a className={clsx(css.link, activeTab === 'privacy' && css.active)}>{trans('privacy')}</a>
                </Link>
            </li>
        </ul>
    );
};

export default SettingsNav;
