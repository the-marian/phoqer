import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import routes from '../../../../assets/routes';
import template from '../../../../assets/template';
import { Theme } from '../../../../assets/theme';
import useTrans from '../../../../hooks/trans.hook';
import { ITabs } from '../../../../interfaces';
import NavTabs from '../';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        position: 'relative',

        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: theme.rem(-0.1),
            height: '100%',
            width: theme.rem(3),
            background: 'linear-gradient(90deg,rgba(255,255,255,0) 0%,#fff 100%)',
        },

        ...theme.media(768).max({
            width: '92.5vw',
            marginLeft: '-2.5%',

            '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: theme.rem(-0.1),
                height: '100%',
                width: theme.rem(2),
                background: 'linear-gradient(-90deg,rgba(255,255,255,0) 0%,#fff 100%)',
            },
        }),
        ...theme.media(475).max({
            width: '95vw',
            marginLeft: '-5%',
        }),
    },
    nav: {
        overflow: 'auto',

        '& ul': {
            display: 'flex',
            justifyContent: 'flex-start',
            margin: theme.rem(0, -1, 1),

            ...theme.media(768).max({
                width: 'max-content',
                margin: theme.rem(0, 1, 0, 1),

                '& li:nth-last-of-type(1)': {
                    marginRight: theme.rem(4),
                },
            }),
        },
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        minHeight: theme.rem(5.5),
        margin: theme.rem(1),
        padding: theme.rem(1, 1.8),
        background: theme.palette.gray[0],
        color: theme.palette.black[0],
        fontSize: theme.rem(1.4),
        transition: theme.transitions[0],
        borderRadius: theme.radius,
        whiteSpace: 'nowrap',
        ...template(theme).outline,

        ...theme.media(560).max({
            padding: theme.rem(1, 2),
            margin: theme.rem(0, 0.5, 2),
            minHeight: theme.rem(5.5),
            background: theme.palette.gray[1],
        }),
    },
    active: {
        color: theme.palette.trueWhite,
        background: theme.palette.primary[0],
        pointerEvents: 'none',

        ...theme.media(560).max({
            background: theme.palette.primary[0],
        }),
    },
}));

interface IProps {
    active?: number | string;
}

const ProfileOffersNav = ({ active }: IProps): ReactElement | null => {
    const T = useTrans();
    const css = useStyles();

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
        <div className={css.wrp}>
            <NavTabs tabs={offersTab} classNameWrp={css.nav} className={css.item} activeClass={css.active} active={active} />
        </div>
    );
};

export default ProfileOffersNav;
