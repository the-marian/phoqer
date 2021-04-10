import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    container: {
        width: '100%',
        maxWidth: theme.rem(120),
        margin: '0 auto',

        ...theme.media(1300).max({
            width: '90%',
            maxWidth: 'unset',
        }),
    },
}));

interface Props {
    id?: string;
    className?: string;
    children: JSX.Element[] | JSX.Element;
}

const Container = ({ id, children, className }: Props): ReactElement => {
    const css = useStyles();
    return (
        <div id={id} className={clsx(css.container, className)}>
            {children}
        </div>
    );
};

export default Container;
