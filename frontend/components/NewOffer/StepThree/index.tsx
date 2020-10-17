import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React, { FormEvent, ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { Theme } from '../../../config/theme';
import { ICategories, IDropList, IState } from '../../../interfaces';
import { openModal } from '../../../redux/modal/actions';
import * as helpers from '../../../utils/helpers';
import DropDown from '../../common/DropDown';
import DropDownMobile from '../../common/DropDownMobile';
import { Desktop, Mobile } from '../../common/Media';
import RegionModal from '../../common/RegionModal';

const useStyles = createUseStyles((theme: Theme) => ({
  form: {
    padding: theme.rem(3, 10),
    borderRadius: theme.radius,
    background: theme.palette.gray[0],
    maxWidth: theme.rem(80),
    margin: '0 auto',

    '@media (max-width: 580px)': {
      padding: theme.rem(3),
    },
  },
  inner: {
    margin: theme.rem(3, 0),
  },
  title: {
    marginBottom: theme.rem(1),
    fontSize: theme.rem(1.4),
    fontWeight: theme.text.weight[2],
  },
  input: {
    display: 'flex',
    alignItems: 'center',
    height: theme.rem(5),
    width: '100%',
    padding: theme.rem(1, 2),
    background: theme.palette.blue[2],
    border: theme.border(0.1, theme.palette.gray[3]),
    borderRadius: theme.radius,
    fontSize: theme.rem(1.2),
    '& span': {
      marginLeft: theme.rem(1.5),
      fontSize: theme.rem(1.3),
    },
  },
  wrp: {
    display: 'grid',
    gridTemplateColumns: theme.fr(3),
    gridGap: theme.rem(1),
    marginBottom: theme.rem(2.5),

    '@media (max-width: 500px)': {
      gridTemplateColumns: theme.fr(1),
    },
  },
  btnWrp: {
    display: 'flex',
    justifyContent: 'flex-end',

    '@media (max-width: 470px)': {
      flexDirection: 'column',
    },
  },
  next: {
    padding: theme.rem(1, 4),
    marginLeft: theme.rem(2),
    background: theme.palette.grad[0],
    fontSize: theme.rem(1.4),
    color: theme.palette.white,
    borderRadius: theme.radius,

    '@media (max-width: 470px)': {
      margin: theme.rem(2, 0, 0),
      padding: theme.rem(2, 4),
    },
  },
  btn: {
    padding: theme.rem(1, 4),
    marginLeft: theme.rem(2),
    background: theme.palette.grayblue[0],
    fontSize: theme.rem(1.4),
    color: theme.palette.black,
    borderRadius: theme.radius,

    '@media (max-width: 470px)': {
      margin: theme.rem(1.6, 0, 0),
      padding: theme.rem(1.6, 4),
    },
  },
}));

const CURRENCY: IDropList[] = [
  { name: 'грн', slug: 'uah' },
  { name: '$', slug: 'usd' },
  { name: '€', slug: 'eur' },
];

const TIME: IDropList[] = [
  { name: 'За 1 час', slug: 'hour' },
  { name: 'За 1 день', slug: 'day' },
  { name: 'За 1 неделю', slug: 'week' },
  { name: 'За 1 месяц', slug: 'month' },
];

const StepThree = (): ReactElement => {
  const css = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();

  const data = useSelector<IState, ICategories[]>(state => state.categories);
  const categories = helpers.formateCatList(data);

  const handleRegionModal = () => {
    dispatch(openModal({ dom: <RegionModal /> }));
  };

  const handleBack = () => {
    router.push('/new_offer/1');
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    router.push('/new_offer/done');
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.inner}>
        <h4 className={css.title}>Придумайте название объявления *</h4>
        <input
          className={css.input}
          name="name"
          type="text"
          placeholder="Название"
        />
      </div>

      <div className={css.inner}>
        <h4 className={css.title}>Укажите ваше местоположение *</h4>
        <button type="button" className={css.input} onClick={handleRegionModal}>
          <FontAwesomeIcon icon={faChevronDown} />
          <span>Киев, Киевская область</span>
        </button>
      </div>

      {!!categories?.length && (
        <div className={css.inner}>
          <h4 className={css.title}>Выберите категорию товара *</h4>
          <Desktop>
            <DropDown value={categories} onSubmit={console.log} toRight />
          </Desktop>

          <Mobile>
            <DropDownMobile value={categories} onSubmit={console.log} toRight />
          </Mobile>
        </div>
      )}

      <div className={css.inner}>
        <h4 className={css.title}>Цена *</h4>
        <div className={css.wrp}>
          <input className={css.input} type="text" placeholder="Цена" />
          <DropDown value={CURRENCY} onSubmit={console.log} />
          <DropDown value={TIME} onSubmit={console.log} />
        </div>
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
