import React, { ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';

import template from '../../../../assets/template';
import { Theme } from '../../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        padding: theme.rem(2),
        background: theme.palette.yellow[0],
        color: theme.palette.trueBlack,
        textAlign: 'center',
        fontSize: theme.rem(1.6),
    },
    btn: {
        marginLeft: theme.rem(2),
        padding: theme.rem(0.5, 2),
        background: theme.palette.trueWhite,
        color: theme.palette.trueBlack,
        borderRadius: theme.radius,
        ...template(theme).outline,
    },
}));

const Warning = (): ReactElement | null => {
    const css = useStyles();
    const [open, setOpen] = useState<boolean>(true);

    return open && process.env.NODE_ENV === 'production' ? (
        <div className={css.root}>
            <span>The website is under construction. Coming soon...</span>
            <button
                className={css.btn}
                type="button"
                onClick={() => {
                    setOpen(false);
                }}
            >
                Ok
            </button>
        </div>
    ) : null;
};

export default Warning;
