import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import template from '../../../assets/template';
import { Theme } from '../../../assets/theme';
import OnlineIndicator from './online-indicator';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        position: 'relative',
    },
    avatar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: theme.rem(2.3),
        color: theme.palette.trueWhite,
        background: theme.palette.primary[0],
        borderRadius: '50%',
        objectFit: 'cover',
        ...template(theme).outline,
        border: theme.border(0.2, theme.palette.trueWhite),
    },
    mark: {
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
}));

interface IProps {
    firstName?: string;
    lastName?: string;
    avatar?: string | null;
    width?: number;
    height?: number;
    time?: string | null;
    online?: boolean;
}
const UserAvatar = ({
    firstName = 'A',
    lastName = 'A',
    avatar = null,
    width = 8,
    height = 8,
    online = false,
    time,
}: IProps): ReactElement => {
    const css = useStyles();
    return (
        <div className={css.root}>
            {avatar ? (
                <img
                    className={css.avatar}
                    src={avatar}
                    style={{
                        width: `${width}rem`,
                        height: `${height}rem`,
                        maxWidth: `${width}rem`,
                        maxHeight: `${height}rem`,
                    }}
                    alt=""
                />
            ) : (
                <div
                    style={{
                        width: `${width}rem`,
                        height: `${height}rem`,
                    }}
                    className={css.avatar}
                >
                    {(firstName[0] + lastName[0])?.toUpperCase()}
                </div>
            )}
            <OnlineIndicator className={css.mark} online={online} time={time} />
        </div>
    );
};

export default UserAvatar;
