import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    '@keyframes loader': {
        '0%': {
            left: 0,
            transform: 'translateX(-100%)',
        },
        '50%': {
            left: '100%',
        },
    },
    loading: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: theme.rem(0.5),
        width: '100%',
        background: theme.palette.gray[1],
        overflow: 'hidden',

        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            background: theme.palette.primary[0],
            transition: theme.transitions[0],
            animation: '$loader 1s ease-in-out infinite',
        },
    },
}));

interface IProps {
    top?: number;
}

const CommentsLoader = ({ top = 0 }: IProps): ReactElement => {
    const css = useStyles();
    return <div className={css.loading} style={{ top: `${top}rem` }} />;
};

export default CommentsLoader;
