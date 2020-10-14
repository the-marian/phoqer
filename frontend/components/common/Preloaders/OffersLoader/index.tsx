import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../config/theme';

const useStyles = createUseStyles((theme: Theme) => ({
  '@keyframes loader': {
    '0%': { background: theme.palette.gray[1] },
    '50%': { background: theme.palette.grayblue[0] },
    '100%': { background: theme.palette.gray[1] },
  },
  wrp: {
    '@media (max-width: 560px)': {
      display: 'none',
    },
  },
  img: {
    height: theme.rem(25),
    borderRadius: theme.radius,
    animation: '$loader 3s ease infinite',
  },
  title: {
    height: theme.rem(3),
    margin: theme.rem(1, 0),
    borderRadius: theme.radius,
    animation: '$loader 3s ease infinite',
  },
  text: {
    height: theme.rem(2),
    margin: theme.rem(1, 0),
    borderRadius: theme.radius,
    animation: '$loader 3s ease infinite',
  },
  btnWrp: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shortBtn: {
    height: theme.rem(5),
    width: '10%',
    borderRadius: theme.radius,
    animation: '$loader 3s ease infinite',
  },
  button: {
    height: theme.rem(5),
    width: '40%',
    borderRadius: theme.radius,
    animation: '$loader 3s ease infinite',
  },
}));

const OffersLoader = (): ReactElement => {
  const css = useStyles();
  return (
    <>
      <div>
        <div className={css.img} />
        <div className={css.text} />
        <div className={css.text} />
        <div className={css.text} />
        <div className={css.btnWrp}>
          <div className={css.button} />
          <div className={css.shortBtn} />
          <div className={css.button} />
        </div>
      </div>

      <div>
        <div className={css.img} />
        <div className={css.text} />
        <div className={css.text} />
        <div className={css.text} />
        <div className={css.btnWrp}>
          <div className={css.button} />
          <div className={css.shortBtn} />
          <div className={css.button} />
        </div>
      </div>

      <div className={css.wrp}>
        <div className={css.img} />
        <div className={css.text} />
        <div className={css.text} />
        <div className={css.text} />
        <div className={css.btnWrp}>
          <div className={css.button} />
          <div className={css.shortBtn} />
          <div className={css.button} />
        </div>
      </div>

      <div className={css.wrp}>
        <div className={css.img} />
        <div className={css.text} />
        <div className={css.text} />
        <div className={css.text} />
        <div className={css.btnWrp}>
          <div className={css.button} />
          <div className={css.shortBtn} />
          <div className={css.button} />
        </div>
      </div>

      <div className={css.wrp}>
        <div className={css.img} />
        <div className={css.text} />
        <div className={css.text} />
        <div className={css.text} />
        <div className={css.btnWrp}>
          <div className={css.button} />
          <div className={css.shortBtn} />
          <div className={css.button} />
        </div>
      </div>

      <div className={css.wrp}>
        <div className={css.img} />
        <div className={css.text} />
        <div className={css.text} />
        <div className={css.text} />
        <div className={css.btnWrp}>
          <div className={css.button} />
          <div className={css.shortBtn} />
          <div className={css.button} />
        </div>
      </div>

      <div className={css.wrp}>
        <div className={css.img} />
        <div className={css.text} />
        <div className={css.text} />
        <div className={css.text} />
        <div className={css.btnWrp}>
          <div className={css.button} />
          <div className={css.shortBtn} />
          <div className={css.button} />
        </div>
      </div>

      <div className={css.wrp}>
        <div className={css.img} />
        <div className={css.text} />
        <div className={css.text} />
        <div className={css.text} />
        <div className={css.btnWrp}>
          <div className={css.button} />
          <div className={css.shortBtn} />
          <div className={css.button} />
        </div>
      </div>
    </>
  );
};

export default OffersLoader;
