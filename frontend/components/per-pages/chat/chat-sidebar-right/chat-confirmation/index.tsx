import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import mixin from '../../../../../utils/theming/mixin';
import { Theme } from '../../../../../utils/theming/theme';
import Button from '../../../../common/button';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        padding: theme.rem(2),
        borderRadius: theme.radius,
        border: theme.border(0.1, theme.palette.gray[2]),
    },
    flex: {
        display: 'flex',
        marginTop: theme.rem(2),
    },
    approve: {
        ...mixin(theme).btn,
        marginRight: theme.rem(1),
    },
    cancel: {
        ...mixin(theme).btn,
        backgroundColor: theme.palette.gray[0],
        color: theme.palette.black[0],
    },
}));

const ChatConfirmation = (): ReactElement => {
    const css = useStyles();
    return (
        <div className={css.root}>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eligendi error est fugiat iure maxime molestiae nobis
                odit, pariatur reiciendis rem sit, unde velit? Earum labore magnam quas quos voluptas!{' '}
            </p>

            <div className={css.flex}>
                <Button className={css.approve}>Approve</Button>
                <Button className={css.cancel}>Cancel</Button>
            </div>
        </div>
    );
};

export default ChatConfirmation;
