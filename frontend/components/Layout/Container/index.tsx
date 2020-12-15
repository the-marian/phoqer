import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    container: {
        width: '100%',
        maxWidth: theme.rem(120),
        margin: '0 auto',

        '@media (max-width: 1300px)': {
            width: '90%',
            maxWidth: 'unset',
        },
    },
}));

interface Props {
    children: JSX.Element[] | JSX.Element;
}

const Container = ({ children }: Props): ReactElement => {
    const css = useStyles();
    return <div className={css.container}>{children}</div>;
};

export default Container;
