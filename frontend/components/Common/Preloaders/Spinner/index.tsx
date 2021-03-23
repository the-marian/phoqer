import clsx from 'clsx';
import React, { CSSProperties, ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    wrap: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 'inherit',
    },
    img: {
        height: theme.em(1.3),
        width: theme.em(1.3),
    },
}));

interface IProps {
    className?: string;
    style?: CSSProperties;
}

const Spinner = ({ className, style = {} }: IProps): ReactElement => {
    const css = useStyles();
    return (
        <div className={clsx(css.wrap, className)}>
            <img style={style} className={css.img} src="/spinner.gif" alt="spinner" />
        </div>
    );
};

export default Spinner;
