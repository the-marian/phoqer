import Link from 'next/link';
import React, { FormEvent, ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../config/theme';
import SectionTitle from '../common/SectionTitle';
import Categories from './Categories';
import Checkbox from './Checkbox';
import PriceFilter from './Price';
import Region from './Region';
import Sort from './Sort';

const useStyles = createUseStyles((theme: Theme) => ({
  root: {
    margin: theme.rem(4, 0),
  },
  form: {
    margin: theme.rem(4, 0, 6),
  },
  formInner: {
    display: 'grid',
    gridTemplateColumns: theme.fr(4),
    gridGap: theme.rem(5),
  },
  list: {
    display: 'grid',
    gridTemplateColumns: theme.fr(2),
    gridGap: theme.rem(1.5, 6),
  },
  link: {
    fontSize: theme.rem(1.4),
    color: theme.palette.blue[0],
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  wrp: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.rem(2),
  },
  title: {
    fontSize: theme.rem(2),
    fontWeight: theme.text.weight[3],
  },
  close: {
    marginLeft: theme.rem(2.5),
    fontSize: theme.rem(1.4),
    color: theme.palette.blue[0],
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  btn: {
    marginTop: theme.rem(6),
    padding: theme.rem(1.5, 3),
    fontSize: theme.rem(1.4),
    borderRadius: theme.radius,
    background: theme.palette.grayblue[0],
  },
}));

const POPULAR: string[] = [
  'Задний винт Владика',
  'Заднее сальто Владика 3',
  'Кто такой Влад Василенко?',
  'Задний винт Владика скачать без смс и регистрации',
  'Владислав! Бейби донт хьорт ми,  донт хьорт ми, но мор!',
  'Заднее сальто Владика 2',
];

const Filters = (): ReactElement => {
  const css = useStyles();
  const [close, setClose] = useState<boolean>(false);

  const handleClose = () => {
    setClose(!close);
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    alert('fuck you');
  };

  return (
    <>
      <div className={css.root}>
        <div className={css.wrp}>
          <h2 className={css.title}>Фильтры</h2>
          <button type="button" className={css.close} onClick={handleClose}>
            {close ? 'Показать фильтры' : 'Скрыть фильтры'}
          </button>
        </div>

        {!close && (
          <form
            action="#"
            method="post"
            className={css.form}
            onSubmit={handleSubmit}
          >
            <div className={css.formInner}>
              <PriceFilter />
              <Categories />
              <Sort />
              <Region />
            </div>

            <Checkbox />

            <button className={css.btn} type="submit">
              Применить фильтры
            </button>
          </form>
        )}
      </div>

      <div className={css.root}>
        <SectionTitle>Популярные запросы</SectionTitle>
        <ul className={css.list}>
          {POPULAR.map(query => (
            <li key={query}>
              <Link href={`products?q=${query}`}>
                <a className={css.link}>{query}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Filters;