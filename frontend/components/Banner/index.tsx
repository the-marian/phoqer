import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../config/theme';
import LinkArrow from '../common/LinkArrow';

const useStyles = createUseStyles((theme: Theme) => ({
  root: {
    margin: theme.rem(8, 0),
    padding: theme.rem(6, 6, 18),
    borderRadius: theme.radius,
    background: theme.palette.gray[3],
    color: theme.text.color.white,
  },
  title: {
    marginBottom: theme.rem(2),
    fontSize: theme.rem(4),
    fontWeight: theme.text.weight[3],
  },
  link: {
    fontSize: theme.rem(2),
  },
}));

const Banner = (): ReactElement => {
  const css = useStyles();
  return (
    <div className={css.root}>
      <h2 className={css.title}>#Делитесь с другими и зарабатывайте</h2>
      <div className={css.link}>
        <LinkArrow href="/new_product">Сдать вещи в аренду</LinkArrow>
      </div>
    </div>
  );
};

export default Banner;
