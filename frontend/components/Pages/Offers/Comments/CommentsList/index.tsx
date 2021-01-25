import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { Theme } from '../../../../../assets/theme';
import { IComment, IState } from '../../../../../interfaces';
import CommentsItem from './CommentsItem';

const useStyles = createUseStyles((theme: Theme) => ({
    '@keyframes loader': {
        '0%': {
            left: 0,
            width: '0%',
        },
        '50%': {
            width: '20%',
        },
        '100%': {
            left: '100%',
            width: 0,
        },
    },
    root: {
        position: 'relative',
        paddingTop: theme.rem(1),
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
    empty: {
        margin: theme.rem(4, 0),
    },
    text: {
        fontSize: theme.rem(1.6),
        marginBottom: theme.rem(0.5),

        '& div': {
            display: 'block',
            marginBottom: theme.rem(2),
        },
    },
}));

const CommentsList = (): ReactElement => {
    const css = useStyles();

    const { data, loading } = useSelector<IState, { loading: boolean; data: IComment[] | null }>(state => state.comments);

    return data?.length ? (
        <div className={css.root}>
            {loading && <div className={css.loading} />}

            {data?.map(item => (
                <CommentsItem key={item.id} comment={item} />
            ))}
        </div>
    ) : (
        <p className={clsx(css.text, css.empty)}>
            У этого объявления пока нету отзывов. Вы можете быть первым, кто оставит комментарий
        </p>
    );
};

export default CommentsList;
