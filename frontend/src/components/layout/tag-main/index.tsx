import React, { ReactElement } from 'react';

import clsx from 'clsx';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../utils/theming/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    main: {
        minHeight: '50vh',
        padding: theme.rem(2, 0, 6),
        background: theme.palette.white,
    },
}));

interface Props {
    children: JSX.Element[] | JSX.Element;
    className?: string;
}

const Main = ({ children, className }: Props): ReactElement => {
    const css = useStyles();
    return <main className={clsx(css.main, className)}>{children}</main>;
};

export default Main;
