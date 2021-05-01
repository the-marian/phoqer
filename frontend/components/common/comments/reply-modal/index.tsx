import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import routes from '../../../../assets/routes';
import { Theme } from '../../../../assets/theme';
import useTrans from '../../../../hooks/trans.hook';
import { IComment } from '../../../../interfaces';
import types from '../../../../redux/types';
import ButtonClose from '../../button-close';
import { modal } from '../../modal';
import CommentsForm from '../comments-form';

const MAX_LENGTH = 200;

const useStyles = createUseStyles((theme: Theme) => ({
    inner: {
        position: 'relative',
        width: theme.rem(65),
        height: 'max-content',
        margin: theme.rem(2, 0),
        padding: theme.rem(2),
        paddingTop: theme.rem(5),
        borderRadius: theme.radius,
        background: theme.palette.white,
        color: theme.palette.black[0],

        ...theme.media(500).max({
            width: '90%',
        }),
    },
    button: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    author: {
        display: 'flex',
        alignItems: 'center',
        fontSize: theme.rem(2),
        fontWeight: theme.text.weight[3],
        marginBottom: theme.rem(2),
        lineHeight: 1,

        '& a': {
            color: theme.palette.black[0],

            ...theme.hover({
                textDecoration: 'underline',
                color: theme.palette.primary[0],
            }),
        },
    },
    date: {
        marginLeft: theme.rem(2),
        fontSize: theme.rem(1.4),
        fontWeight: theme.text.weight[2],
        color: theme.palette.gray[3],
    },
    text: {
        fontSize: theme.rem(1.6),
        margin: theme.rem(3, 0, 0.5),

        '& div': {
            display: 'block',
            marginBottom: theme.rem(2),
        },
    },
}));

interface IProps {
    comment: IComment;
}

const ReplyModal = ({ comment }: IProps): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const history = useRouter();
    const dispatch = useDispatch();

    const handleSubmit = (body: string, images: string[]): void => {
        dispatch({
            type: types.REPLY_COMMENT_START,
            payload: {
                body,
                images,
                replies_id: comment.id,
                offer_id: history.query.offerId,
            },
        });
    };

    return (
        <div className={css.inner}>
            <ButtonClose className={css.button} onClick={modal.close} />

            <h3 className={css.author}>
                <Link href={routes.profile.public(comment.author_id)}>
                    <a>{`${comment.first_name} ${comment.last_name}`}</a>
                </Link>
                <p className={css.date}>
                    {trans('date')}: {comment.pub_date}
                </p>
            </h3>

            <p className={css.text}>{comment.body.slice(0, MAX_LENGTH) + '...  '}</p>

            <p className={css.text}>{trans('reply_to_comment')}:</p>
            <CommentsForm onSubmit={handleSubmit} />
        </div>
    );
};

export default ReplyModal;
