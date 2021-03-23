import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { FormEvent, ReactElement, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import routes from '../../../../assets/routes';
import template from '../../../../assets/template';
import { Theme } from '../../../../assets/theme';
import useShallowRouter from '../../../../hooks/routing.hook';
import { ISearch, IState } from '../../../../interfaces';
import { IOffers } from '../../../../redux/config/offers/interfaces';
import types from '../../../../redux/types';
import Checkboxes from '../../../Common/Checkboxes';
import Period from './Period';
import PriceFilter from './Price';
import Sort from './Sort';
import Status from './Status';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        margin: theme.rem(4, 0),

        '@media (max-width: 768px)': {
            margin: theme.rem(2, 0),
        },
    },
    form: {
        margin: theme.rem(2, 0, 4),
        maxHeight: theme.rem(100),
        opacity: 1,
        transition: theme.transitions[0],

        '&.enter': {
            margin: 0,
            maxHeight: 0,
            opacity: 0,
        },
        '&.enter-done': {
            margin: theme.rem(2, 0, 4),
            maxHeight: theme.rem(100),
            opacity: 1,
        },
        '&.exit': {
            maxHeight: 0,
            opacity: 0,
        },
    },
    formInner: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',

        '& > div': {
            width: '24%',
        },

        '@media (max-width: 1100px)': {
            '& > div': {
                width: '32%',
                margin: theme.rem(2, 0),
            },
        },

        '@media (max-width: 768px)': {
            '& > div:nth-of-type(1)': {
                width: '100%',
            },

            '& > div': {
                width: '48%',
                margin: theme.rem(1, 0),
            },
        },
    },
    list: {
        display: 'grid',
        gridTemplateColumns: theme.fr(2),
        gridGap: theme.rem(1.5, 6),
        maxHeight: theme.rem(100),
        marginTop: theme.rem(3),
        transition: theme.transitions[0],

        '&.enter': {
            maxHeight: 0,
            marginTop: 0,
            opacity: 0,
        },
        '&.enter-done': {
            maxHeight: theme.rem(100),
            marginTop: theme.rem(3),
            opacity: 1,
        },
        '&.exit': {
            maxHeight: 0,
            opacity: 0,
        },

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

        '@media (max-width: 768px)': {
            fontSize: theme.rem(1.6),
        },
    },
    wrp: {
        display: 'flex',
        alignItems: 'flex-end',
        marginBottom: theme.rem(1),

        '@media (max-width: 768px)': {
            alignItems: 'center',
        },
    },
    title: {
        fontSize: theme.rem(2),
        fontWeight: theme.text.weight[4],
        color: theme.palette.black[0],
    },
    close: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: theme.rem(2.5),
        fontSize: theme.rem(1.6),
        color: theme.palette.primary[0],
        '& svg': {
            fontSize: theme.rem(1.2),
            marginRight: theme.rem(1),
        },
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    btn: {
        ...template(theme).btn,
        marginTop: theme.rem(3),

        '@media (max-width: 500px)': {
            fontSize: theme.rem(1.8),
        },
    },
}));

const POPULAR: string[] = [
    'Задний винт Владика',
    'Заднее сальто Владика 3',
    'Кто такой Влад Василенко?',
    'Задний винт Владика скачать без смс и регистрации',
    'Владислав! Бейби донт хьорт ми, донт хьорт ми, но мор!',
    'Заднее сальто Владика 2',
];

interface ICheckbox {
    [key: string]: boolean | null;
}

const Filters = (): ReactElement => {
    const css = useStyles();
    const dispatch = useDispatch();
    const shallow = useShallowRouter();

    const [price, setPrice] = useState<[number, number]>([0, 200_000]);

    const config = useSelector<IState, IOffers>(state => state.config.offers);
    const search = useSelector<IState, ISearch>(state => state.config.search);

    useEffect(() => {
        shallow(search);
    }, [search]);

    // hide elements
    const handleCloseFilters = () => {
        dispatch({ type: types.OFFERS_HIDE_FILTERS });
    };
    const handleCloseSearch = () => {
        dispatch({ type: types.OFFERS_HIDE_POPULAR_SEARCH });
    };

    const handleCheckboxes = (value: ICheckbox): void => {
        dispatch({ type: types.OFFERS_SEARCH, payload: { ...search, ...value } });
    };

    // submit form
    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        window.scrollTo({ top: document.getElementById('products')?.offsetTop || 0, behavior: 'smooth' });
        dispatch({ type: types.SEARCH_OFFERS_START, payload: search });
    };

    return (
        <>
            <div className={css.root}>
                <div className={css.wrp}>
                    <h2 className={css.title}>Фильтры</h2>
                    <button type="button" className={css.close} onClick={handleCloseFilters}>
                        {config.filters ? (
                            <>
                                <FontAwesomeIcon icon={faChevronUp} />
                                <span>Скрыть</span>
                            </>
                        ) : (
                            <>
                                <FontAwesomeIcon icon={faChevronDown} />
                                <span>Показать</span>
                            </>
                        )}
                    </button>
                </div>
                <hr />
                <CSSTransition timeout={200} unmountOnExit in={config.filters}>
                    <form action="#" method="post" className={css.form} onSubmit={handleSubmit}>
                        <div className={css.formInner}>
                            <PriceFilter data={price} initValue={[0, 200_000]} onChange={setPrice} />
                            <Period />
                            <Sort />
                            <Status />
                        </div>

                        <Checkboxes
                            values={{ top: search.top, no_deposit: search.no_deposit, is_deliverable: search.is_deliverable }}
                            labels={['Только ТОП объявления', 'Без залога', 'C доставкой']}
                            onChange={handleCheckboxes}
                        />

                        <button className={css.btn} type="submit">
                            Применить фильтры
                        </button>
                    </form>
                </CSSTransition>
            </div>

            <div className={css.root}>
                <div className={css.wrp}>
                    <h2 className={css.title}>Популярные запросы</h2>
                    <button type="button" className={css.close} onClick={handleCloseSearch}>
                        {config.popularSearch ? (
                            <>
                                <FontAwesomeIcon icon={faChevronUp} />
                                <span>Скрыть</span>
                            </>
                        ) : (
                            <>
                                <FontAwesomeIcon icon={faChevronDown} />
                                <span>Показать</span>
                            </>
                        )}
                    </button>
                </div>
                <hr />
                <CSSTransition timeout={200} unmountOnExit in={config.popularSearch}>
                    <ul className={css.list}>
                        {POPULAR.map(query => (
                            <li key={query}>
                                <Link href={routes.offers.single(`?search=${query}`)}>
                                    <a className={css.link}>{query}</a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </CSSTransition>
            </div>
        </>
    );
};

export default Filters;
