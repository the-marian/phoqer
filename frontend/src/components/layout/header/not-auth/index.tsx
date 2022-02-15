import React, { ReactElement } from 'react';

import { createUseStyles } from 'react-jss';

import useMedia from '../../../../hooks/media.hook';
import useTrans from '../../../../hooks/trans.hook';
import { Theme } from '../../../../utils/theming/theme';
import JoinForm from '../../../common/auth/forms/join-form';
import LoginForm from '../../../common/auth/forms/login-form';
import { modal } from '../../../common/modal';
import SmallModalWrp from '../../../common/modal/small-modal-wrp';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    btn: {
        paddingRight: theme.rem(2),
        fontWeight: theme.text.weight[3],
        fontSize: theme.rem(1.3),
        color: theme.palette.black[0],

        ...theme.hover({
            color: theme.palette.primary[0],
        }),
    },
}));

const NotAuth = (): ReactElement | null => {
    const css = useStyles();
    const trans = useTrans();
    const media = useMedia(768);

    const handleLoginModal = () => {
        modal.open(
            <SmallModalWrp>
                <LoginForm />
            </SmallModalWrp>,
        );
    };
    const handleRegisterModal = () => {
        modal.open(
            <SmallModalWrp>
                <JoinForm />
            </SmallModalWrp>,
        );
    };

    return (
        <div className={css.root}>
            <button className={css.btn} type="button" onClick={handleLoginModal}>
                {trans('login')}
            </button>
            {media && (
                <button className={css.btn} type="button" onClick={handleRegisterModal}>
                    {trans('join')}
                </button>
            )}
        </div>
    );
};

export default NotAuth;
