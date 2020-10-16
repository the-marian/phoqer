import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  mobile: {
    display: 'none',
    visibility: 'hidden',

    '@media (max-width: 900px)': {
      display: 'block',
      visibility: 'visible',
    },
  },

  desktop: {
    display: 'block',
    visibility: 'visible',

    '@media (max-width: 900px)': {
      display: 'none',
      visibility: 'hidden',
    },
  },
});

interface Props {
  children: JSX.Element[] | JSX.Element;
  className?: string;
}

export const Mobile = ({ children, className }: Props): ReactElement => {
  const css = useStyles();
  return <div className={clsx(className, css.mobile)}>{children}</div>;
};

export const Desktop = ({ children, className }: Props): ReactElement => {
  const css = useStyles();
  return <div className={clsx(className, css.desktop)}>{children}</div>;
};
