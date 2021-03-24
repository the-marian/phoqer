import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../assets/theme';
import useTrans from '../../../../hooks/trans.hook';
import JoinForm from '../../../Common/Auth/JoinForm';
import LoginForm from '../../../Common/Auth/LoginForm';
import { modal } from '../../../Common/Modal';
import SmallModalWrp from '../../../Common/Modal/SmallModalWrp';

const useStyles = createUseStyles((theme: Theme) => ({
    btn: {
        paddingRight: theme.rem(2),
        fontWeight: theme.text.weight[3],
        fontSize: theme.rem(1.3),
        color: theme.palette.black[0],

        '&:hover': {
            color: theme.palette.primary[0],
        },
    },
    menuWrp: {
        position: 'relative',
    },
    menu: {
        position: 'relative',
        zIndex: 101,
        padding: theme.rem(0, 1),
        fontSize: theme.rem(2),
    },
}));

const NotAuth = (): ReactElement | null => {
    const T = useTrans();
    const css = useStyles();

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
        <div>
            <button className={css.btn} type="button" onClick={handleLoginModal}>
                {T.login}
            </button>
            <button className={css.btn} type="button" onClick={handleRegisterModal}>
                {T.join}
            </button>
        </div>
    );
};

export default NotAuth;
