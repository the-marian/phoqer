import React, { ReactElement } from 'react';

import { createUseStyles } from 'react-jss';

import { Theme } from '../../../utils/theming/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    main: {
        minHeight: '50vh',
        background: theme.palette.white,
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
