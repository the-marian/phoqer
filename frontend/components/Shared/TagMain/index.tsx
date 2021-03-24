import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    main: {
        minHeight: '50vh',
        padding: theme.rem(12, 0),
        background: theme.palette.white,

        '@media (max-width: 900px)': {
            padding: theme.rem(10, 0),
        },
    },
}));

interface Props {
    children: JSX.Element[] | JSX.Element;
}

const Main = ({ children }: Props): ReactElement => {
    const css = useStyles();
    return <main className={css.main}>{children}</main>;
};

export default Main;
