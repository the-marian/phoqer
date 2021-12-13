import React, { ReactElement, useState } from 'react';

import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import useAuth from '../../../../../hooks/auth.hook';
import useTrans from '../../../../../hooks/trans.hook';
import { IComment } from '../../../../../interfaces';
import types from '../../../../../redux/types';
import routes from '../../../../../utils/routes';
import { Theme } from '../../../../../utils/theming/theme';
import LikeDislike from '../../../like-dislike';
import CommentsLoader from '../../../loaders/comments-loader';
import { modal } from '../../../modal';
import FullPageGallery from '../../../modal/full-page-gallery';
import MidModalWrp from '../../../modal/mid-modal-wrp';
import CommentsForm from '../../comments-form';
import ReplyModal from '../../reply-modal';

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

            ...theme.media(768).max({
                top: '0',
                height: '100%',
            }),
        },
    },
    flex: {
        display: 'flex',
        alignItems: 'center',
        margin: theme.rem(0, 0, 2),

        ...theme.media(768).max({
            '& > div': {
                margin: theme.rem(0, 1, 0.4),
            },
        }),
    },
    author: {
        display: 'flex',
        alignItems: 'center',
        fontSize: theme.rem(1.6),
        fontWeight: theme.text.weight[3],
        marginBottom: theme.rem(2),
        lineHeight: 1,

        ...theme.media(768).max({
            fontSize: theme.rem(1.2),
            marginBottom: theme.rem(1),
        }),

        '& a': {
            color: theme.palette.black[0],

            ...theme.hover({
                textDecoration: 'underline',
                color: theme.palette.primary[0],
            }),
        },
    },
    link: {
        margin: theme.rem(0, 2, 0.6, 0),
        fontWeight: theme.text.weight[2],
        fontSize: theme.rem(1.4),
        color: theme.palette.primary[0],

        ...theme.media(768).max({
            margin: theme.rem(0, 1, 0, 0),
            fontSize: theme.rem(1.4),
        }),

        ...theme.hover({
            textDecoration: 'underline',
        }),
    },
    date: {
        marginLeft: theme.rem(2),
        fontSize: theme.rem(1.4),
        fontWeight: theme.text.weight[2],
        color: theme.palette.gray[3],

        ...theme.media(768).max({
            fontSize: theme.rem(1.2),
        }),
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

        ...theme.media(768).max({
            fontSize: theme.rem(1.4),
        }),
    },
    img: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',

        '& img': {
            height: theme.rem(5),
            width: theme.rem(9),
            borderRadius: theme.radius,
            margin: theme.rem(0, 1, 1, 0),
            cursor: 'zoom-in',
            objectFit: 'cover',
        },
    },
}));

const CLICK_TYPE = {
    like: types.LIKE_COMMENT_START,
    dislike: types.DISLIKE_COMMENT_START,
};

const SubComment = ({ id, comments }: { id: number; comments: IComment[] }): ReactElement => {
    const { token } = useAuth();
    const css = useStyles();
    const history = useRouter();
    const dispatch = useDispatch();
    const offer_id = String(history.query.offerId);

    const handleSubmit = (body: string, images: string[]): void => {
        dispatch({
            type: types.REPLY_COMMENT_START,
            payload: {
                body,
                images,
                offer_id,
                replies_id: id,
            },
        });
    };

    return (
        <>
            {comments?.map(item => (
                <CommentsItem key={item.id} comment={item} inner />
            ))}
            {token.access_token && (
                <div className={css.inner}>
                    <CommentsForm onSubmit={handleSubmit} />
                </div>
            )}
        </>
    );
};

interface IProps {
    comment: IComment;
    extend?: boolean; // show all translate or only first 200 symbols
    replies?: boolean; // show render replies or not
    inner?: boolean; // if it is inner comment then provide special styles
}

const CommentsItem = ({ comment, extend = false, replies = false, inner = false }: IProps): ReactElement => {
    const css = useStyles();
    const { token } = useAuth();
    const trans = useTrans();
    const history = useRouter();
    const dispatch = useDispatch();
    const offerId = String(history.query.offerId);

    const [deleting, setDeleting] = useState<number | null>(null);

    const handleLike = (value: 'like' | 'dislike'): void => {
        dispatch({ type: CLICK_TYPE[value], payload: comment.id, offerId });
    };

    const handleDelete = (): void => {
        setDeleting(comment.id);
        dispatch({ type: types.DELETE_COMMENT_START, payload: comment.id, offerId });
        modal.close();
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

    const handleClick = (): void => {
        modal.open(<FullPageGallery images={comment.images} />);
    };

    return (
        <div className={clsx(css.item, inner && css.inner)} key={comment.id}>
            <h3 className={css.author}>
                <Link href={routes.profile.public(comment.author_id)}>
                    <a>{`${comment.first_name} ${comment.last_name}`}</a>
                </Link>
                <p className={css.date}>
                    {trans('date')}: {comment.pub_date}
                </p>
            </h3>

            {!extend && comment.body?.length > MAX_LENGTH ? (
                <p className={css.text}>
                    <span>{comment.body.slice(0, MAX_LENGTH) + '...  '}</span>
                    <button className={css.link} type="button" onClick={handleModal}>
                        {trans('read_more')}
                    </button>
                </p>
            ) : (
                <p className={css.text} dangerouslySetInnerHTML={{ __html: comment.body.replace(/\n/gi, '<div></div>') }} />
            )}

            {comment?.images?.length ? (
                <ul className={css.img}>
                    {comment.images?.map(img => (
                        <li key={img}>
                            <img onClick={handleClick} src={img} alt="" aria-hidden="true" />
                        </li>
                    ))}
                </ul>
            ) : null}

            <div className={css.flex}>
                {token.access_token && (
                    <button className={css.link} type="button" onClick={handleDelete}>
                        {trans('delete')}
                    </button>
                )}

                {replies && token.access_token && (
                    <button className={css.link} type="button" onClick={handleReply}>
                        {trans('reply')}
                    </button>
                )}

                <LikeDislike
                    like={comment.likes}
                    dislike={comment.dislikes}
                    active={comment.dislike ? 'dislike' : comment.like ? 'like' : null}
                    onClick={handleLike}
                />
            </div>

            {deleting === comment.id && <CommentsLoader top={-1.5} />}

            {replies && comment.replies?.length ? <SubComment id={comment.id} comments={comment.replies} /> : null}
        </div>
    );
};

export default CommentsItem;
