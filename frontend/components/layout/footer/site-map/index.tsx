import Link from 'next/link';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import routes from '../../../../assets/routes';
import { Theme } from '../../../../assets/theme';
import useTrans from '../../../../hooks/trans.hook';

const LINKS: { text: string; href: string }[] = [
    {
        text: 'help_and_feedback',
        href: routes.static.help,
    },
    {
        text: 'advertisment_on_site',
        href: routes.static.business,
    },
    {
        text: 'terms_of_service',
        href: routes.static.rules,
    },
    {
        text: 'privacy_statement',
        href: routes.static.politic,
    },
    {
        text: 'FAQ',
        href: routes.static.faq,
    },
    {
        text: 'safety_rules',
        href: routes.static.safety,
    },
    {
        text: 'site_map',
        href: routes.static.map,
    },
];

const useStyles = createUseStyles((theme: Theme) => ({
    list: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '60%',

        ...theme.media(1100).max({
            width: '100%',
            marginBottom: theme.rem(9),
        }),
    },
    item: {
        display: 'block',
        width: '48%',

        ...theme.media(1100).max({
            width: '100%',
        }),
    },
    link: {
        display: 'block',
        margin: theme.rem(2, 0),
        fontSize: theme.rem(1.4),
        fontWeight: theme.text.weight[3],
        color: theme.palette.black[0],
        lineHeight: 1,

        ...theme.hover({
            textDecoration: 'underline',
            color: theme.palette.primary[0],
        }),

        ...theme.media(1100).max({
            fontSize: theme.rem(1.6),
        }),
        ...theme.media(640).max({
            margin: theme.rem(2, 0),
        }),
    },
}));

const SiteMap = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    return (
        <ul className={css.list}>
            {LINKS.map(({ text, href }) => (
                <li key={href} className={css.item}>
                    <Link href={href} passHref>
                        <a className={css.link}>{trans(text)}</a>
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default SiteMap;
