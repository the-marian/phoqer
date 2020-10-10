import React, { ReactElement } from 'react';
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
  },
}));

const UserInfo = (): ReactElement => {
  const css = useStyles();
  const dispatch = useDispatch();

  const handleLoginModal = () => {
    dispatch(openModal({ dom: <LoginForm /> }));
  };
  const handleRegisterModal = () => {
    dispatch(openModal({ dom: <JoinForm /> }));
  };

  return (
    <div>
      <button className={css.btn} type="button" onClick={handleLoginModal}>
        Войти
      </button>
      <button className={css.btn} type="button" onClick={handleRegisterModal}>
        Зарегистрироватся
      </button>
    </div>
  );
};

export default UserInfo;
