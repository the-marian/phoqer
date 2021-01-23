import React, { ReactElement, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../../assets/theme';
import useTrans from '../../../../../hooks/trans.hook';
import JoinForm from '../../../../Common/Auth/JoinForm';
import LoginForm from '../../../../Common/Auth/LoginForm';
import { modal } from '../../../../Common/Modal';
import SmallModalWrp from '../../../../Common/Modal/SmallModalWrp';

const useStyles = createUseStyles((theme: Theme) => ({
    drop: {
        position: 'fixed',
        top: theme.rem(10),
        right: theme.rem(1),
        zIndex: 100001,
        padding: theme.rem(2),
        borderRadius: theme.radius,
        background: theme.palette.white,
        border: theme.border(0.1, theme.palette.gray[2]),
    },
    back: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backdropFilter: 'blur(8px)',
        background: theme.palette.modal,
        zIndex: 100000,
    },
    btn: {
        display: 'block',
        width: '100%',
        padding: theme.rem(1.2),
        fontWeight: theme.text.weight[3],
        fontSize: theme.rem(1.3),
        textAlign: 'left',

        '&:hover': {
            color: theme.palette.primary[0],
        },

        '@media (max-width: 768px)': {
            fontWeight: theme.text.weight[2],
            fontSize: theme.rem(1.8),
        },
    },
}));

interface IProps {
    onClick: () => void;
}

const GeneralInfoDrop = ({ onClick }: IProps): ReactElement => {
    const css = useStyles();
    const T = useTrans();

    useEffect(() => {
        const handleClose = (event: KeyboardEvent): void => {
            if (event.code !== 'Escape') return;
            onClick();
        };
        window.addEventListener('keydown', handleClose);

        return () => {
            window.removeEventListener('keydown', handleClose);
        };
    }, []);

    const handleLoginModal = () => {
        onClick();
        modal.open(
            <SmallModalWrp>
                <LoginForm />
            </SmallModalWrp>,
        );
    };
    const handleRegisterModal = () => {
        onClick();
        modal.open(
            <SmallModalWrp>
                <JoinForm />
            </SmallModalWrp>,
        );
    };

    return ReactDOM.createPortal(
        <>
            <div className={css.back} onClick={onClick} aria-hidden />
            <div className={css.drop}>
                <button className={css.btn} type="button" onClick={handleLoginModal}>
                    {T.login}
                </button>
                <button className={css.btn} type="button" onClick={handleRegisterModal}>
                    {T.join}
                </button>
            </div>
        </>,
        document.querySelector('body'),
    );
};

export default GeneralInfoDrop;
