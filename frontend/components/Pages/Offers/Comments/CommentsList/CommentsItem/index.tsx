import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import routes from '../../../../../../assets/routes';
import { Theme } from '../../../../../../assets/theme';
import useAuth from '../../../../../../hooks/auth.hook';
import { IComment } from '../../../../../../interfaces';
import types from '../../../../../../redux/types';
import LikeDislike from '../../../../../Common/LikeDislike';
import { modal } from '../../../../../Common/Modal';
import MidModalWrp from '../../../../../Common/Modal/MidModalWrp';
import CommentsForm from '../../CommentsForm';
import CommentsLoader from '../../CommentsLoader';
import ReplyModal from '../../ReplyModal';

const MAX_LENGTH = 200;

const useStyles = createUseStyles((theme: Theme) => ({
    item: {
        position: 'relative',
        margin: theme.rem(2.5, 0),
        fontSize: theme.rem(1.6),
        borderBottom: theme.border(0.1, theme.palette.gray[2]),

        '&:nth-last-of-type(1)': {
            borderBottom: 'none',
        },
    },
    inner: {
        position: 'relative',
        margin: theme.rem(2, 0),
        padding: theme.rem(0, 0, 0, 3),
        borderBottom: 'none',

        '&::before': {
            content: '""',
            position: 'absolute',
            top: '-5%',
            left: 0,
            height: '92%',
            width: theme.rem(0.15),
            background: theme.palette.gray[2],

            '@media (max-width: 768px)': {
                top: 0,
                height: '100%',
            },
        },
    },
    flex: {
        display: 'flex',
        alignItems: 'center',
        margin: theme.rem(0, 0, 2),

        '@media (max-width: 550px)': {
            display: 'block',
        },
    },
    author: {
        display: 'flex',
        alignItems: 'center',
        fontSize: theme.rem(1.6),
        fontWeight: theme.text.weight[3],
        marginBottom: theme.rem(2),
        lineHeight: 1,

        '& a': {
            color: theme.palette.black[0],

            '&:hover': {
                textDecoration: 'underline',
                color: theme.palette.primary[0],
            },
        },
    },
    link: {
        margin: theme.rem(0, 2, 0.6, 0),
        fontWeight: theme.text.weight[2],
        fontSize: theme.rem(1.4),
        color: theme.palette.primary[0],

        '@media (max-width: 550px)': {
            margin: theme.rem(0, 1, 1.6, 0),
        },

        '&:hover': {
            textDecoration: 'underline',
        },
    },
    date: {
        marginLeft: theme.rem(2),
        fontSize: theme.rem(1.4),
        fontWeight: theme.text.weight[2],
        color: theme.palette.gray[3],
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

const CLICK_TYPE = {
    like: types.LIKE_COMMENT_START,
    dislike: types.DISLIKE_COMMENT_START,
};

const SubComment = ({ id, comments }: { id: number; comments: IComment[] }): ReactElement => {
    const auth = useAuth();
    const css = useStyles();
    const history = useRouter();
    const dispatch = useDispatch();

    const handleSubmit = (body: string, images: { url: string }[]): void => {
        dispatch({
            type: types.REPLY_COMMENT_START,
            payload: {
                body,
                images,
            },
            offerId: history.query.offerId,
            comment: id,
        });
    };

    return (
        <>
            {comments?.map(item => (
                <CommentsItem key={item.id} comment={item} inner />
            ))}
            {auth?.auth_token && (
                <div className={css.inner}>
                    <CommentsForm onSubmit={handleSubmit} />
                </div>
            )}
        </>
    );
};

interface IProps {
    comment: IComment;
    extend?: boolean; // show all content or only first 200 symbols
    replies?: boolean; // show render replies or not
    inner?: boolean; // if it is inner comment then provide special styles
}

const CommentsItem = ({ comment, extend = false, replies = false, inner = false }: IProps): ReactElement => {
    const css = useStyles();
    const auth = useAuth();
    const history = useRouter();
    const dispatch = useDispatch();

    const [deleting, setDeleting] = useState<number | null>(null);

    const handleLike = (value: 'like' | 'dislike'): void => {
        dispatch({ type: CLICK_TYPE[value], payload: comment.id, offerId: history.query.offerId });
    };

    const handleDelete = (): void => {
        modal.close();
        setDeleting(comment.id);
        dispatch({ type: types.DELETE_COMMENT_START, payload: comment.id, offerId: history.query.offerId });
    };

    const handleReply = (): void => {
        modal.open(<ReplyModal comment={comment} />);
    };

    const handleModal = (): void => {
        modal.open(
            <MidModalWrp>
                <CommentsItem comment={comment} extend />
            </MidModalWrp>,
        );
    };

    return (
        <div className={clsx(css.item, inner && css.inner)} key={comment.id}>
            <h3 className={css.author}>
                <Link href={routes.profile.single(comment.author)}>
                    <a>{comment.author}</a>
                </Link>
                <p className={css.date}>Дата: {comment.pub_date}</p>
            </h3>

            {!extend && comment.body?.length > MAX_LENGTH ? (
                <p className={css.text}>
                    <span>{comment.body.slice(0, MAX_LENGTH) + '...  '}</span>
                    <button className={css.link} type="button" onClick={handleModal}>
                        Read more
                    </button>
                </p>
            ) : (
                <p className={css.text} dangerouslySetInnerHTML={{ __html: comment.body.replace(/\n/gi, '<div></div>') }} />
            )}

            <div className={css.flex}>
                {auth?.auth_token && (
                    <>
                        <button className={css.link} type="button" onClick={handleDelete}>
                            Удалить
                        </button>
                        <button className={css.link} type="button">
                            Редактировать
                        </button>
                    </>
                )}

                {replies && auth?.auth_token && (
                    <button className={css.link} type="button" onClick={handleReply}>
                        Ответить
                    </button>
                )}

                <LikeDislike like={comment.likes} dislike={comment.dislikes} onClick={handleLike} />
            </div>

            {deleting === comment.id && <CommentsLoader top={-1.5} />}

            {replies && !!comment.replies?.length && <SubComment id={comment.id} comments={comment.replies} />}
        </div>
    );
};

export default CommentsItem;