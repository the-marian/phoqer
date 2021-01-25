import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import { Theme } from '../../../../assets/theme';
import useAuth from '../../../../hooks/auth.hook';
import types from '../../../../redux/types';
import JoinForm from '../../../Common/Auth/JoinForm';
import LoginForm from '../../../Common/Auth/LoginForm';
import { modal } from '../../../Common/Modal';
import SmallModalWrp from '../../../Common/Modal/SmallModalWrp';
import CommentsForm from './CommentsForm';
import CommentsList from './CommentsList';

const useStyles = createUseStyles((theme: Theme) => ({
    text: {
        marginTop: theme.rem(1),
        color: theme.palette.gray[3],
    },

    link: {
        fontWeight: theme.text.weight[3],
        fontSize: theme.rem(1.6),
        color: theme.palette.primary[0],

        '&:hover': {
            textDecoration: 'underline',
        },
    },
}));

const Comments = (): ReactElement => {
    const css = useStyles();
    const history = useRouter();
    const auth = useAuth();
    const dispatch = useDispatch();

    const handleSubmit = (body: string, images: { url: string }[]): void => {
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
        <div>
            {auth?.auth_token ? (
                <CommentsForm onSubmit={handleSubmit} />
            ) : (
                <p className={css.text}>
                    <span>Авторизируйтесь чтобы оставить комментарий </span>
                    <button className={css.link} onClick={handleLogin} type="button">
                        Login
                    </button>
                    <span> or </span>
                    <button className={css.link} onClick={handleJoin} type="button">
                        Join
                    </button>
                </p>
            )}
            <CommentsList />
        </div>
    );
};

export default Comments;
