import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../assets/theme';
import useMedia from '../../../../hooks/media.hook';
import JoinForm from '../../../Common/Auth/JoinForm';
import LoginForm from '../../../Common/Auth/LoginForm';
import { modal } from '../../../Common/Modal';
import SmallModalWrp from '../../../Common/Modal/SmallModalWrp';
import GeneralInfoDrop from './GeneralInfoDrop/indes';

const useStyles = createUseStyles((theme: Theme) => ({
    btn: {
        padding: theme.rem(1.2),
        fontWeight: theme.text.weight[3],
        fontSize: theme.rem(1.3),
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

        '& svg': {
            height: theme.rem(2),
            width: theme.rem(2),
        },
    },
}));

const GeneralInfo = (): ReactElement => {
    const css = useStyles();
    const mobile = useMedia(900);
    const [drop, setDrop] = useState(false);

    const handleDropClick = () => {
        setDrop(!drop);
    };

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

    const handleCLose = (): void => {
        setDrop(false);
    };

    return mobile ? (
        <div>
            <button className={css.btn} type="button" onClick={handleLoginModal}>
                Войти
            </button>
            <button className={css.btn} type="button" onClick={handleRegisterModal}>
                Зарегистрироватся
            </button>
        </div>
    ) : (
        <div className={css.menuWrp}>
            <button className={css.menu} onClick={handleDropClick}>
                <FontAwesomeIcon icon={faBars} />
            </button>

            {drop && <GeneralInfoDrop onClick={handleCLose} />}
        </div>
    );
};

export default GeneralInfo;
