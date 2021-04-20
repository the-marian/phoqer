import React, { CSSProperties, ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../assets/theme';
import LinkArrow from '../link-arrow';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.rem(2.5),

        ...theme.media(768).max({
            fontSize: theme.rem(1.6),
        }),
    },
    title: {
        fontSize: theme.rem(2),
        fontWeight: theme.text.weight[4],
        color: theme.palette.primary[0],
        marginRight: theme.rem(1),

        ...theme.media(768).max({
            fontSize: theme.rem(1.8),
        }),
    },
    link: {
        color: theme.palette.primary[0],
        lineHeight: 1,

        ...theme.media(768).max({
            fontSize: theme.rem(1.6),
        }),
    },
}));

interface Props {
    link?: string;
    href?: string;
    children: string;
    style?: CSSProperties;
}

const SectionTitle = ({ children, link, href, style }: Props): ReactElement => {
    const css = useStyles();
    return (
        <div className={css.wrp}>
            <h2 className={css.title} style={style}>
                {children}
            </h2>
            <div className={css.link}>{!!link && !!href && <LinkArrow href={href}>{link}</LinkArrow>}</div>
        </div>
    );
};

export default SectionTitle;
