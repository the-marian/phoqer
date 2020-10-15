import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import { Theme } from '../../../config/theme';
import { openModal } from '../../../redux/modal/actions';
import JoinForm from '../../Auth/JoinForm';
import LoginForm from '../../Auth/LoginForm';

const useStyles = createUseStyles((theme: Theme) => ({
  btn: {
    padding: theme.rem(1.2),
    fontWeight: theme.text.weight[3],
    fontSize: theme.rem(1.6),
<<<<<<< HEAD
=======
  },
  menuWrp: {
    position: 'relative',
  },
  menu: {
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
    background: theme.palette.modal,
    zIndex: 99,
>>>>>>> homepage
  },
}));

const UserInfo = (): ReactElement => {
  const css = useStyles();
  const dispatch = useDispatch();
  const [drop, setDrop] = useState(false);

  const handleDropClick = () => {
    setDrop(!drop);
  };

  const handleLoginModal = () => {
<<<<<<< HEAD
    dispatch(openModal({ dom: <LoginForm /> }));
  };
  const handleRegisterModal = () => {
=======
    setDrop(false);
    dispatch(openModal({ dom: <LoginForm /> }));
  };
  const handleRegisterModal = () => {
    setDrop(false);
>>>>>>> homepage
    dispatch(openModal({ dom: <JoinForm /> }));
  };

  return (
    <>
      <BrowserView>
        <div>
          <button className={css.btn} type="button" onClick={handleLoginModal}>
            Войти
          </button>
          <button
            className={css.btn}
            type="button"
            onClick={handleRegisterModal}
          >
            Зарегистрироватся
          </button>
        </div>
      </BrowserView>

      <MobileView>
        <div className={css.menuWrp}>
          <button className={css.menu} onClick={handleDropClick}>
            {drop ? (
              <FontAwesomeIcon icon={faTimes} />
            ) : (
              <FontAwesomeIcon icon={faBars} />
            )}
          </button>

          {drop && (
            <>
              <div className={css.back} onClick={handleDropClick} aria-hidden />
              <div className={css.drop}>
                <button
                  className={css.btn}
                  type="button"
                  onClick={handleLoginModal}
                >
                  Войти
                </button>
                <button
                  className={css.btn}
                  type="button"
                  onClick={handleRegisterModal}
                >
                  Зарегистрироватся
                </button>
              </div>
            </>
          )}
        </div>
      </MobileView>
    </>
  );
};

export default UserInfo;
