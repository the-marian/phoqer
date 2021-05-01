import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../../../assets/theme';
import useMedia from '../../../../../../hooks/media.hook';
import SiteMenu from '../../../../../common/site-menu';
import MobileBackBtn from '../../mobile-back-btn';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 10,
        width: '100%',
        display: 'flex',
        padding: theme.rem(0.8, 1.5),
        background: theme.palette.white,
    },
    back: {
        margin: theme.rem(0, 0, 0, 2),
    },
}));

interface IProps {
    children: string;
    href: string;
}

const ChatBackBtn = ({ children, href }: IProps): ReactElement | null => {
    const css = useStyles();
    const media = useMedia(1060);

    return media ? null : (
        <div className={css.wrp}>
            <SiteMenu />
            <MobileBackBtn className={css.back} href={href}>
                {children}
            </MobileBackBtn>
        </div>
    );
};

export default ChatBackBtn;
