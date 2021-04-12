import { faTrashAlt } from '@fortawesome/free-regular-svg-icons/faTrashAlt';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import React, { FormEvent, ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import routes from '../../../../assets/routes';
import template from '../../../../assets/template';
import { Theme } from '../../../../assets/theme';
import useConfig from '../../../../hooks/config.hook';
import { ISearch, IState } from '../../../../interfaces';
import initState from '../../../../redux/state';
import types from '../../../../redux/types';
import Checkboxes from '../../../common/checkbox/checkboxes';
import Period from './period';
import PriceFilter from './price';
import Sort from './sort';
import Status from './status';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        margin: theme.rem(4, 0),

        ...theme.media(768).max({
            margin: theme.rem(2, 0),
        }),
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

        ...theme.media(1100).max({
            '& > div': {
                width: '32%',
                margin: theme.rem(2, 0),
            },
        }),
        ...theme.media(768).max({
            '& > div:nth-of-type(1)': {
                width: '100%',
            },

            '& > div': {
                width: '48%',
                margin: theme.rem(1, 0),
            },
        }),
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

        ...theme.media(550).max({
            gridTemplateColumns: theme.fr(1),
        }),
    },
    link: {
        fontSize: theme.rem(1.4),
        color: theme.palette.black[0],

        ...theme.hover({
            textDecoration: 'underline',
            color: theme.palette.primary[0],
        }),

        ...theme.media(768).max({
            fontSize: theme.rem(1.6),
        }),
    },
    wrp: {
        display: 'flex',
        alignItems: 'flex-end',
        marginBottom: theme.rem(1),

        ...theme.media(768).max({
            alignItems: 'center',
        }),
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
        ...theme.hover({
            textDecoration: 'underline',
        }),
    },
    btnWrp: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: theme.rem(3),
    },
    btn: {
        ...template(theme).btn,

        ...theme.media(500).max({
            width: '100%',
            fontSize: theme.rem(1.6),
        }),
    },
    reset: {
        ...template(theme).btn,
        marginRight: theme.rem(2),
        background: theme.palette.gray[1],
        color: theme.palette.black[0],

        '& span': {
            marginLeft: theme.rem(1),
        },

        ...theme.media(500).max({
            width: '100%',
            margin: theme.rem(0, 0, 2),
            fontSize: theme.rem(1.6),
        }),
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
    const history = useRouter();
    const dispatch = useDispatch();
    const [config, setConfig] = useConfig();

    const [price, setPrice] = useState<[number, number]>([0, 200_000]);
    const searchParams = useSelector<IState, ISearch>(state => state.config.searchParams);

    // hide elements
    const handleCloseFilters = () => {
        setConfig({ ...config, hideSearchFilters: !config.hideSearchFilters });
    };
    const handleCloseSearch = () => {
        setConfig({ ...config, hideTopSearchQuery: !config.hideTopSearchQuery });
    };

    const handleCheckboxes = (value: ICheckbox): void => {
        dispatch({ type: types.OFFERS_SEARCH_LOCAL_PARAMS, payload: { ...searchParams, ...value } });
    };

    const handleReset = (): void => {
        history.push({
            pathname: routes.offers.list,
            query: queryString.stringify({ ...initState.config.searchParams, page: 1 }, { skipNull: true }),
        });
        dispatch({ type: types.OFFERS_SEARCH_LOCAL_PARAMS, payload: initState.config.searchParams });
        dispatch({ type: types.SEARCH_OFFERS_START, payload: null });
    };

    // submit form
    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        dispatch({ type: types.SEARCH_OFFERS_START, payload: searchParams });
        history.push(
            {
                pathname: routes.offers.list,
                query: queryString.stringify({ ...searchParams, page: 1 }, { skipNull: true }),
            },
            undefined,
            { shallow: true },
        );
    };

    return (
        <>
            <div className={css.root}>
                <div className={css.wrp}>
                    <h2 className={css.title}>Фильтры</h2>
                    <button type="button" className={css.close} onClick={handleCloseFilters}>
                        {config.hideSearchFilters ? (
                            <>
                                <FontAwesomeIcon icon={faChevronDown} />
                                <span>Показать</span>
                            </>
                        ) : (
                            <>
                                <FontAwesomeIcon icon={faChevronUp} />
                                <span>Скрыть</span>
                            </>
                        )}
                    </button>
                </div>
                <hr />
                <CSSTransition timeout={200} unmountOnExit in={!config.hideSearchFilters}>
                    <form action="#" method="post" className={css.form} onSubmit={handleSubmit}>
                        <div className={css.formInner}>
                            <PriceFilter data={price} initValue={[0, 200_000]} onChange={setPrice} />
                            <Period />
                            <Sort />
                            <Status />
                        </div>

                        <Checkboxes
                            values={{
                                top: searchParams.top,
                                no_deposit: searchParams.no_deposit,
                                is_deliverable: searchParams.is_deliverable,
                            }}
                            labels={['Только ТОП объявления', 'Без залога', 'C доставкой']}
                            onChange={handleCheckboxes}
                        />

                        <div className={css.btnWrp}>
                            <button className={css.reset} type="button" onClick={handleReset}>
                                <FontAwesomeIcon icon={faTrashAlt} />
                                <span>Очистить все фильтры</span>
                            </button>
                            <button className={css.btn} type="submit">
                                Применить фильтры
                            </button>
                        </div>
                    </form>
                </CSSTransition>
            </div>

            <div className={css.root}>
                <div className={css.wrp}>
                    <h2 className={css.title}>Популярные запросы</h2>
                    <button type="button" className={css.close} onClick={handleCloseSearch}>
                        {config.hideTopSearchQuery ? (
                            <>
                                <FontAwesomeIcon icon={faChevronDown} />
                                <span>Показать</span>
                            </>
                        ) : (
                            <>
                                <FontAwesomeIcon icon={faChevronUp} />
                                <span>Скрыть</span>
                            </>
                        )}
                    </button>
                </div>
                <hr />
                <CSSTransition timeout={200} unmountOnExit in={!config.hideTopSearchQuery}>
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
