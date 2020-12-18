import Link from 'next/link';
import React, { FormEvent, ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import router from '../../../../assets/router';
import { Theme } from '../../../../assets/theme';
import { IState } from '../../../../interfaces';
import types from '../../../../redux/types';
import SectionTitle from '../../../Common/SectionTitle';
import Categories from './Categories';
import Checkbox from './Checkbox';
import PriceFilter from './Price';
import Sort from './Sort';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        margin: theme.rem(4, 0),
    },
    form: {
        margin: theme.rem(2, 0, 4),
    },
    formInner: {
        display: 'grid',
        gridTemplateColumns: theme.fr(4),
        gridGap: theme.rem(3, 2),

        '@media (max-width: 1380px)': {
            gridTemplateColumns: theme.fr(3),
        },

        '@media (max-width: 1100px)': {
            gridTemplateColumns: theme.fr(2),
            gridGap: theme.rem(3, 2),
        },

        '@media (max-width: 768px)': {
            gridTemplateColumns: theme.fr(1),
            gridGap: theme.rem(2),
        },
    },
    list: {
        display: 'grid',
        gridTemplateColumns: theme.fr(2),
        gridGap: theme.rem(1.5, 6),
        marginTop: theme.rem(3),

        '@media (max-width: 550px)': {
            gridTemplateColumns: theme.fr(1),
        },
    },
    link: {
        fontSize: theme.rem(1.4),
        color: theme.palette.black[0],
        '&:hover': {
            textDecoration: 'underline',
            color: theme.palette.primary[0],
        },
    },
    wrp: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.rem(2),
    },
    title: {
        fontSize: theme.rem(2),
        fontWeight: theme.text.weight[4],
        color: theme.palette.primary[0],
    },
    close: {
        marginLeft: theme.rem(2.5),
        fontSize: theme.rem(1.4),
        color: theme.palette.primary[0],
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    btn: {
        height: theme.rem(6),
        marginTop: theme.rem(3),
        padding: theme.rem(1.5, 3),
        fontSize: theme.rem(1.4),
        borderRadius: theme.radius,
        background: theme.palette.primary[0],
        color: theme.palette.white,
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
    const dispatch = useDispatch();
    const open = useSelector<IState, boolean>(state => state.filters.open);

    const handleClose = () => {
        dispatch({ type: types.SEARCH_FILTERS, payload: { open: !open } });
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
                        {open ? 'Показать фильтры' : 'Скрыть фильтры'}
                    </button>
                </div>
                <hr />

                {!open && (
                    <form action="#" method="post" className={css.form} onSubmit={handleSubmit}>
                        <div className={css.formInner}>
                            <PriceFilter />
                            <Categories />
                            <Sort />
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
                <hr />
                <ul className={css.list}>
                    {POPULAR.map(query => (
                        <li key={query}>
                            <Link href={`${router.offers}?q=${query}`}>
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
