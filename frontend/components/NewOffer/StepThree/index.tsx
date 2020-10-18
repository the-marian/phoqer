import { useRouter } from 'next/router';
import React, { FormEvent, ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../config/theme';
import ImgInput from '../../common/ImgInput';

const useStyles = createUseStyles((theme: Theme) => ({
  form: {
    padding: theme.rem(3, 10),
    borderRadius: theme.radius,
    background: theme.palette.soft[2],
    maxWidth: theme.rem(80),
    margin: '0 auto',

    '@media (max-width: 580px)': {
      padding: theme.rem(3),
    },
  },
  title: {
    margin: theme.rem(3, 0, 1),
    fontSize: theme.rem(1.4),
    fontWeight: theme.text.weight[2],
  },
  imgWrp: {
    display: 'grid',
    gridTemplateColumns: theme.fr(3),
    gridGap: theme.rem(2),
    margin: theme.rem(3, 0),
  },
  btnWrp: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: theme.rem(6, 0, 4),

    '@media (max-width: 470px)': {
      flexDirection: 'column',
    },
  },
  next: {
    padding: theme.rem(1, 4),
    marginLeft: theme.rem(2),
    background: theme.palette.blue[0],
    fontSize: theme.rem(1.4),
    color: theme.palette.white,
    borderRadius: theme.radius,

    '@media (max-width: 470px)': {
      margin: theme.rem(2, 0, 0),
      padding: theme.rem(2, 4),
    },
  },
  btn: {
    height: theme.rem(6),
    padding: theme.rem(1, 4),
    marginLeft: theme.rem(2),
    background: theme.palette.white,
    fontSize: theme.rem(1.4),
    color: theme.palette.black,
    borderRadius: theme.radius,

    '@media (max-width: 470px)': {
      margin: theme.rem(1.6, 0, 0),
      padding: theme.rem(1.6, 4),
    },
  },
}));

const StepThree = (): ReactElement => {
  const css = useStyles();
  const router = useRouter();

  const handleBack = () => {
    router.push('/new_offer/2');
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    router.push('/new_offer/done');
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <h4 className={css.title}>Добавьте фото вашего товара</h4>
      <p>Не больше 3мб (.png .jpg .jpeg)</p>

      <div className={css.imgWrp}>
        <ImgInput />
      </div>

      <div className={css.btnWrp}>
        <button type="button" className={css.btn}>
          Сохранить
        </button>
        <button type="button" className={css.btn} onClick={handleBack}>
          Назад
        </button>
        <button type="submit" className={css.next}>
          Далее
        </button>
      </div>
    </form>
  );
};

export default StepThree;
