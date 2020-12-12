import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../assets/theme';
import LinkArrow from '../../Common/LinkArrow';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: theme.rem(2),
    },
    title: {
        fontSize: theme.rem(2),
        fontWeight: theme.text.weight[3],
    },
    link: {
        color: theme.palette.blue[0],
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
