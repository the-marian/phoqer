import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { Theme } from '../../../../assets/theme';
import useTrans from '../../../../hooks/trans.hook';
import { IComment, IState } from '../../../../interfaces';
import CommentsItem from './comments-item';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        margin: theme.rem(1, 0),
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
    const trans = useTrans();
    const { data } = useSelector<IState, { data: IComment[] | null }>(state => state.comments);

    return data?.length ? (
        <div className={css.root}>
            {data?.map(item => (
                <CommentsItem key={item.id} comment={item} replies />
            ))}
        </div>
    ) : (
        <p className={clsx(css.text, css.empty)}>{trans('this_offer_has_no_reviews')}</p>
    );
};

export default CommentsList;
