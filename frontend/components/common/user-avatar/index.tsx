import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import mixin from '../../../utils/theming/mixin';
import { Theme } from '../../../utils/theming/theme';
import OnlineIndicator from './online-indicator';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        position: 'relative',
    },
    avatar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'inherit',
        color: theme.palette.trueWhite,
        background: theme.palette.primary[0],
        borderRadius: '50%',
        objectFit: 'cover',
        ...mixin(theme).outline,
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
    fontSize?: number;
}
const UserAvatar = ({
    firstName = 'A',
    lastName = 'A',
    avatar = null,
    width = 8,
    height = 8,
    online = false,
    time,
    fontSize,
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
                        fontSize: fontSize || (width + height) / 6 + 'rem',
                    }}
                    className={css.avatar}
                >
                    {(firstName[0] + lastName[0])?.toUpperCase()}
                </div>
            )}
            {time || online ? <OnlineIndicator className={css.mark} online={online} time={time} /> : null}
        </div>
    );
};

export default UserAvatar;
