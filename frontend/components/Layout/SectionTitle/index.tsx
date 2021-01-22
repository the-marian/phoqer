import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../assets/theme';
import LinkArrow from '../LinkArrow';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.rem(2.5),

        '@media (max-width: 768px)': {
            fontSize: theme.rem(1.6),
        },
    },
    title: {
        fontSize: theme.rem(2),
        fontWeight: theme.text.weight[4],
        color: theme.palette.primary[0],
    },
    link: {
        color: theme.palette.primary[0],
    },
}));

interface Props {
    link?: string;
    href?: string;
    children: string;
}

const SectionTitle = ({ children, link, href }: Props): ReactElement => {
    const css = useStyles();
    return (
        <div className={css.wrp}>
            <h2 className={css.title}>{children}</h2>
            <div className={css.link}>{!!link && !!href && <LinkArrow href={href}>{link}</LinkArrow>}</div>
        </div>
    );
};

export default SectionTitle;
