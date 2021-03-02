import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../assets/theme';

const COLORS: { [key: string]: string } = {
    A: 'rgba(8,139,226,0.2)',
    B: 'rgba(124,8,226,0.2)',
    C: 'rgba(2,217,192,0.2)',
    D: 'rgba(2,56,248,0.2)',
    E: 'rgba(2,162,248,0.2)',
    F: 'rgba(2,248,199,0.2)',
    G: 'rgba(248,2,100,0.2)',
    H: 'rgba(248,39,2,0.2)',
    I: 'rgba(47,2,248,0.2)',
    J: 'rgba(8,139,226,0.2)',
    K: 'rgba(124,8,226,0.2)',
    L: 'rgba(2,217,192,0.2)',
    M: 'rgba(2,56,248,0.2)',
    N: 'rgba(2,162,248,0.2)',
    O: 'rgba(2,248,199,0.2)',
    P: 'rgba(248,2,100,0.2)',
    Q: 'rgba(248,39,2,0.2)',
    R: 'rgba(47,2,248,0.2)',
    S: 'rgba(8,139,226,0.2)',
    T: 'rgba(124,8,226,0.2)',
    U: 'rgba(2,217,192,0.2)',
    V: 'rgba(2,56,248,0.2)',
    W: 'rgba(2,162,248,0.2)',
    X: 'rgba(2,248,199,0.2)',
    Y: 'rgba(248,2,100,0.2)',
    Z: 'rgba(248,39,2,0.2)',
};

const useStyles = createUseStyles((theme: Theme) => ({
    avatar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: theme.rem(2.3),
        color: theme.palette.black[0],
        borderRadius: '50%',
        objectFit: 'cover',
        ...theme.outline,
    },
}));

interface IProps {
    firstName: string;
    lastName: string;
    avatar?: string | null;
    width?: number;
    height?: number;
}
const UserAvatar = ({ firstName = 'A', lastName = 'A', avatar = null, width = 8, height = 8 }: IProps): ReactElement => {
    const css = useStyles();
    return avatar ? (
        <img
            className={css.avatar}
            src={avatar}
            style={{ width: `${width}rem`, height: `${height}rem`, maxWidth: `${width}rem`, maxHeight: `${height}rem` }}
            alt=""
        />
    ) : (
        <div
            style={{
                width: `${width}rem`,
                height: `${height}rem`,
                background: COLORS[firstName[0]] || 'rgba(8,139,226,0.2)',
            }}
            className={css.avatar}
        >
            {(firstName[0] + lastName[0]).toUpperCase()}
        </div>
    );
};

export default UserAvatar;
