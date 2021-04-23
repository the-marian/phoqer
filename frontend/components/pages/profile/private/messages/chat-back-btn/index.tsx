import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../../../assets/theme';
import useMedia from '../../../../../../hooks/media.hook';
import SiteMenu from '../../../../../common/site-menu';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 10,
        width: '100%',
        display: 'flex',
        padding: theme.rem(1.5),
        background: theme.palette.white,
    },
    back: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: theme.rem(2),
        color: theme.palette.primary[0],
        fontWeight: theme.text.weight[3],
        fontSize: theme.rem(1.4),

        '& span': {
            marginLeft: theme.rem(0.5),
            fontSize: theme.rem(1.6),
        },

        ...theme.hover({
            textDecoration: 'underline',
        }),
    },
}));

interface IChatBackBtn {
    children: string;
    href: string;
}

const ChatBackBtn = ({ children, href }: IChatBackBtn): ReactElement | null => {
    const css = useStyles();
    const media = useMedia(1060);

    return media ? null : (
        <div className={css.wrp}>
            <SiteMenu />
            <Link href={href}>
                <a className={css.back}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                    <span>{children}</span>
                </a>
            </Link>
        </div>
    );
};

export default ChatBackBtn;
