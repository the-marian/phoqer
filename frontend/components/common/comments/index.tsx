import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { Theme } from '../../../assets/theme';
import useAuth from '../../../hooks/auth.hook';
import useTrans from '../../../hooks/trans.hook';
import { IState } from '../../../interfaces';
import types from '../../../redux/types';
import JoinForm from '../auth/join-form';
import LoginForm from '../auth/login-form';
import CommentsLoader from '../loaders/comments-loader';
import { modal } from '../modal';
import SmallModalWrp from '../modal/small-modal-wrp';
import CommentsForm from './comments-form';
import CommentsList from './comments-list';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        position: 'relative',
    },
    text: {
        marginTop: theme.rem(1),
        color: theme.palette.gray[3],
    },
    title: {
        margin: theme.rem(4, 0, 2),
        fontSize: theme.rem(2),
        fontWeight: theme.text.weight[3],

        ...theme.media(768).max({
            margin: theme.rem(3, 0, 1),
            fontSize: theme.rem(2.5),
        }),
    },
    link: {
        fontWeight: theme.text.weight[3],
        fontSize: theme.rem(1.6),
        color: theme.palette.primary[0],

        ...theme.hover({
            textDecoration: 'underline',
        }),
    },
}));

const Comments = (): ReactElement => {
    const css = useStyles();
    const history = useRouter();
    const auth = useAuth();
    const trans = useTrans();
    const dispatch = useDispatch();

    const { loading } = useSelector<IState, { loading: boolean }>(state => state.comments);

    const handleSubmit = (body: string, images: string[]): void => {
        if (!body.trim().length) return;
        dispatch({
            type: types.CREATE_COMMENT_START,
            payload: {
                body,
                images,
                offer_id: history.query.offerId,
            },
        });
    };

    const handleLogin = (): void => {
        modal.open(
            <SmallModalWrp>
                <LoginForm />
            </SmallModalWrp>,
        );
    };

    const handleJoin = (): void => {
        modal.open(
            <SmallModalWrp>
                <JoinForm />
            </SmallModalWrp>,
        );
    };

    return (
        <>
            {auth?.access_token ? (
                <div className={css.root}>
                    {loading && <CommentsLoader top={-1.5} />}

                    <h2 className={css.title}>{trans('leave_your_comment')}</h2>
                    <CommentsForm onSubmit={handleSubmit} />
                </div>
            ) : (
                <p className={css.text}>
                    <span>{trans('login_to_leave_comment')}</span>
                    <button className={css.link} onClick={handleLogin} type="button">
                        {trans('Login')}
                    </button>
                    <span> or </span>
                    <button className={css.link} onClick={handleJoin} type="button">
                        {trans('join')}
                    </button>
                </p>
            )}

            <h2 className={css.title}>{trans('users_comments')}</h2>
            <CommentsList />
        </>
    );
};

export default Comments;
