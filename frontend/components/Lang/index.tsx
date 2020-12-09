import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../config/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    btn: {
        fontSize: theme.rem(1.2),
        padding: theme.rem(1),
        textTransform: 'uppercase',
    },
}));

const Lang = (): ReactElement => {
    const css = useStyles();
    return (
        <div>
            <button className={css.btn}>ua</button>
            <span>|</span>
            <button className={css.btn}>ru</button>
            <span>|</span>
            <button className={css.btn}>en</button>
        </div>
    );
};

export default Lang;
