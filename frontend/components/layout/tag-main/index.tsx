import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    main: {
        minHeight: '50vh',
        background: theme.palette.white,
    },
    padding: {
        padding: theme.rem(10, 0),

        ...theme.media(900).max({
            padding: theme.rem(6, 0),
        }),
    },
}));

interface Props {
    children: JSX.Element[] | JSX.Element;
    padding?: boolean;
}

const Main = ({ children, padding }: Props): ReactElement => {
    const css = useStyles();
    return <main className={clsx(css.main, padding && css.padding)}>{children}</main>;
};

export default Main;
