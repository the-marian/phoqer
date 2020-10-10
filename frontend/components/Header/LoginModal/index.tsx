import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../config/theme';
import LoginForm from '../../Auth/LoginForm';

const useStyles = createUseStyles((theme: Theme) => ({
  root: {
    fontSize: theme.rem(1.6),
  },
}));

const LoginModal = (): ReactElement => {
  const css = useStyles();
  return (
    <div className={css.root}>
      <LoginForm />
    </div>
  );
};

export default LoginModal;
