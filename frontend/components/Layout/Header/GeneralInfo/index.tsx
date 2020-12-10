import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../assets/theme';
import JoinForm from '../../../Common/Auth/JoinForm';
import LoginForm from '../../../Common/Auth/LoginForm';
import { Desktop, Mobile } from '../../../Common/Media';
import { modal } from '../../../Common/Modal';
import SmallModalWrp from '../../../Common/Modal/SmallModalWrp';

const useStyles = createUseStyles((theme: Theme) => ({
    btn: {
        padding: theme.rem(1.2),
        fontWeight: theme.text.weight[3],
        fontSize: theme.rem(1.3),
        '&:hover': {
            color: theme.palette.blue[0],
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
    drop: {
        position: 'absolute',
        top: '150%',
        right: theme.rem(1),
        zIndex: 100,
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
        zIndex: 99,
    },
}));

const GeneralInfo = (): ReactElement => {
    const css = useStyles();
    const [drop, setDrop] = useState(false);

    const handleDropClick = () => {
        setDrop(!drop);
    };

    const handleLoginModal = () => {
        setDrop(false);
        modal.open(
            <SmallModalWrp>
                <LoginForm />
            </SmallModalWrp>,
        );
    };
    const handleRegisterModal = () => {
        setDrop(false);
        modal.open(
            <SmallModalWrp>
                <JoinForm />
            </SmallModalWrp>,
        );
    };

    return (
        <>
            <Desktop>
                <div>
                    <button className={css.btn} type="button" onClick={handleLoginModal}>
                        Войти
                    </button>
                    <button className={css.btn} type="button" onClick={handleRegisterModal}>
                        Зарегистрироватся
                    </button>
                </div>
            </Desktop>

            <Mobile>
                <div className={css.menuWrp}>
                    <button className={css.menu} onClick={handleDropClick}>
                        {drop ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
                    </button>

                    {drop && (
                        <>
                            <div className={css.back} onClick={handleDropClick} aria-hidden />
                            <div className={css.drop}>
                                <button className={css.btn} type="button" onClick={handleLoginModal}>
                                    Войти
                                </button>
                                <button className={css.btn} type="button" onClick={handleRegisterModal}>
                                    Зарегистрироватся
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </Mobile>
        </>
    );
};

export default GeneralInfo;
