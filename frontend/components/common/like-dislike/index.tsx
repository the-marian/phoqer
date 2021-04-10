import { faThumbsDown } from '@fortawesome/free-regular-svg-icons/faThumbsDown';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons/faThumbsUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../assets/theme';
import useAuth from '../../../hooks/auth.hook';

const useStyles = createUseStyles((theme: Theme) => ({
    action: {
        display: 'flex',
        alignItems: 'flex-end',
        margin: theme.rem(1, 0, 2),
        fontSize: theme.rem(1.4),

        ...theme.media(500).max({
            fontSize: theme.rem(1.8),
        }),

        '& span': {
            lineHeight: 1,
        },

        '& svg': {
            marginRight: theme.rem(1),
            fill: theme.palette.primary[0],
        },
    },
    none: {
        pointerEvents: 'none',
    },
    like: {
        display: 'flex',
        alignItems: 'flex-end',
        color: theme.palette.gray[4],
        fontSize: theme.rem(1.4),

        ...theme.media(500).max({
            fontSize: theme.rem(1.6),
        }),

        ...theme.hover({
            color: theme.palette.primary[0],
        }),
    },
    dislike: {
        display: 'flex',
        alignItems: 'flex-end',
        marginLeft: theme.rem(2),
        color: theme.palette.gray[4],
        fontSize: theme.rem(1.4),

        ...theme.media(500).max({
            fontSize: theme.rem(1.6),
        }),

        ...theme.hover({
            color: theme.palette.primary[0],
        }),
    },
    active: {
        color: theme.palette.primary[0],
        fontWeight: theme.text.weight[4],
    },
}));

interface IProps {
    like: number;
    dislike: number;
    active?: 'like' | 'dislike' | null;
    onClick: (type: 'like' | 'dislike') => void;
}

const LikeDislike = ({ like, dislike, active, onClick }: IProps): ReactElement => {
    const auth = useAuth();
    const css = useStyles();

    const handleClick = (type: 'like' | 'dislike') => (): void => {
        if (!auth?.access_token) return;
        onClick(type);
    };

    return (
        <div className={clsx(css.action, !auth?.access_token && css.none)}>
            <button className={clsx(css.like, active === 'like' && css.active)} type="button" onClick={handleClick('like')}>
                <FontAwesomeIcon icon={faThumbsUp} />
                <span>{like}</span>
            </button>
            <button
                className={clsx(css.dislike, active === 'dislike' && css.active)}
                type="button"
                onClick={handleClick('dislike')}
            >
                <FontAwesomeIcon icon={faThumbsDown} />
                <span>{dislike}</span>
            </button>
        </div>
    );
};

export default LikeDislike;
