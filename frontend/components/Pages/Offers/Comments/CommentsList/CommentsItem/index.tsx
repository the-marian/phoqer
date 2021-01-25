import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
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
import ReplyModal from '../../ReplyModal';

const MAX_LENGTH = 200;

const useStyles = createUseStyles((theme: Theme) => ({
    item: {
        margin: theme.rem(4, 0),
        fontSize: theme.rem(1.6),
    },
    flex: {
        display: 'flex',
        alignItems: 'center',
        margin: theme.rem(0, 0, 1),

        '@media (max-width: 550px)': {
            display: 'block',
        },
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

            '&:hover': {
                textDecoration: 'underline',
                color: theme.palette.primary[0],
            },
        },
    },
    link: {
        margin: theme.rem(0, 4, 0.6, 0),
        fontWeight: theme.text.weight[3],
        fontSize: theme.rem(1.6),
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

interface IProps {
    comment: IComment;
    extend?: boolean;
}

const CommentsItem = ({ comment, extend = false }: IProps): ReactElement => {
    const css = useStyles();
    const auth = useAuth();
    const history = useRouter();
    const dispatch = useDispatch();

    const handleLike = (value: 'like' | 'dislike'): void => {
        dispatch({ type: CLICK_TYPE[value], payload: comment.id, offerId: history.query.offerId });
    };

    const handleDelete = (): void => {
        modal.close();
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
        <div className={css.item} key={comment.id}>
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
                <p className={css.text} dangerouslySetInnerHTML={{ __html: comment.body.replace(/\n/, '<div></div>') }} />
            )}

            <div className={css.flex}>
                {auth && (
                    <>
                        <button className={css.link} type="button" onClick={handleDelete}>
                            Удалить
                        </button>
                        <button className={css.link} type="button">
                            Редактировать
                        </button>
                    </>
                )}

                <button className={css.link} type="button" onClick={handleReply}>
                    Ответить
                </button>

                <LikeDislike like={comment.likes} dislike={comment.dislikes} onClick={handleLike} />
            </div>
        </div>
    );
};

export default CommentsItem;
