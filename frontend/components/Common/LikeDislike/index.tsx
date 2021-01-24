import { faThumbsDown, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    action: {
        display: 'flex',
        alignItems: 'flex-end',
        margin: theme.rem(1, 0, 2),

        '& span': {
            lineHeight: 1,
        },

        '& svg': {
            height: theme.rem(2),
            width: theme.rem(2),
            marginRight: theme.rem(1),
            fill: theme.palette.primary[0],
        },
    },
    like: {
        display: 'flex',
        alignItems: 'flex-end',
        color: theme.palette.gray[4],
        fontSize: theme.rem(1.6),

        '&:hover': {
            color: theme.palette.primary[0],
        },
    },
    dislike: {
        display: 'flex',
        alignItems: 'flex-end',
        marginLeft: theme.rem(4),
        color: theme.palette.gray[4],
        fontSize: theme.rem(1.6),

        '&:hover': {
            color: theme.palette.primary[0],
        },
    },
    active: {
        color: theme.palette.primary[0],
    },
}));

interface IProps {
    like: number;
    dislike: number;
    active?: 'like' | 'dislike';
    onClick: (type: 'like' | 'dislike') => void;
}

const LikeDislike = ({ like, dislike, active, onClick }: IProps): ReactElement => {
    const css = useStyles();

    const handleClick = (type: 'like' | 'dislike') => (): void => {
        onClick(type);
    };

    return (
        <div className={css.action}>
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
