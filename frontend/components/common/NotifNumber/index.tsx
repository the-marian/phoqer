import React, { CSSProperties, ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../config/theme';

const useStyles = createUseStyles((theme: Theme) => ({
  num: {
    position: 'absolute',
    top: theme.rem(-1.2),
    right: theme.rem(-1.2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.rem(0.2, 0.6),
    background: theme.palette.red[0],
    borderRadius: theme.radius,
    color: theme.palette.white,
    fontSize: theme.rem(0.8),
    fontWeight: theme.text.weight[4],

    '@media (max-width: 600px)': {
      top: theme.rem(-1.6),
      right: theme.rem(-1.2),
      fontSize: theme.rem(1),
    },
  },
}));

interface Props {
  children: string;
  style?: CSSProperties;
}

const NotifNumber = ({ children, style }: Props): ReactElement => {
  const css = useStyles();
  return (
    <span className={css.num} style={style}>
      {children}
    </span>
  );
};

export default NotifNumber;
