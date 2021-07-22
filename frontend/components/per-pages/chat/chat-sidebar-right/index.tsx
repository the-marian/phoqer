import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { width } from '../chat.config';

const useStyles = createUseStyles({
    root: {
        width: width.desktopLg.sidebar,
        height: '100%',
    },
});

const ChatSidebarRight = (): ReactElement => {
    const css = useStyles();
    return (
        <div className={css.root}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eligendi error est fugiat iure maxime molestiae nobis
            odit, pariatur reiciendis rem sit, unde velit? Earum labore magnam quas quos voluptas!
        </div>
    );
};

export default ChatSidebarRight;
