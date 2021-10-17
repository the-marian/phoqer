import React, { ReactElement } from 'react';

import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../../utils/theming/theme';

const useStyles = createUseStyles((theme: Theme) => ({}));

const NotificationsItem = (): ReactElement => {
    const css = useStyles();
    return (
        <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eligendi error est fugiat iure maxime molestiae nobis
            odit, pariatur reiciendis rem sit, unde velit? Earum labore magnam quas quos voluptas!
        </div>
    );
};

export default NotificationsItem;
