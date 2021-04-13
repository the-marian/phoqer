import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { findCategory, findSubCategory, moneyFormat } from '../../../../assets/helpers';
import routes from '../../../../assets/routes';
import template from '../../../../assets/template';
import { Theme } from '../../../../assets/theme';
import { ICategories, ISearch, IState } from '../../../../interfaces';
import Container from '../../../common/container';

const useStyles = createUseStyles((theme: Theme) => ({
    flex: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        margin: theme.rem(0.5, 1, 0.5, 0),
        padding: theme.rem(0.4, 1.4, 0.4, 0.4),
        background: theme.palette.gray[0],
        borderRadius: theme.radius,
        fontSize: theme.rem(1.4),
        color: theme.palette.black[0],
    },
    btn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: theme.rem(2.5),
        width: theme.rem(2.5),
        marginRight: theme.rem(0.6),
        borderRadius: theme.radius,
        background: theme.palette.gray[1],
        fontSize: theme.rem(1),
        color: theme.palette.black[0],

        ...template(theme).outline,
    },
}));

type Filter = [string, string | number];

const PERIOD: { [key: string]: string } = { hour: 'Почасовая', day: 'Посуточная', month: 'Помесячная' };
const STATUS: { [key: string]: string } = {
    active: 'Активное',
    inactive: 'Временно не активно',
    in_rent: 'На данный момент арендуется',
};
const SORT: { [key: string]: string } = {
    '-pub_date': 'От новых к старым',
    pub_date: 'От старых к новым',
    '-views': 'Количество просмотров (по убыванию)',
    views: 'Количество просмотров (по возростанию)',
    price: 'От дешевых к дорогим',
    '-price': 'От дорогих к дешевым',
    deposit_val: 'Сума залога (по убыванию)',
    '-deposit_val': 'Сума залога (по возростанию)',
};

const filtersToText = (filter: Filter, categories: ICategories[]): string => {
    switch (filter[0]) {
        case 'search':
            return filter[1] as string;

        case 'category':
            return findCategory(categories, filter[1] as string)?.name || '...';

        case 'sub_category':
            return findSubCategory(categories, filter[1] as string)?.name || '...';

        case 'period':
            return PERIOD[filter[1] as string];

        case 'status':
            return STATUS[filter[1] as string];

        case 'ordering':
            return SORT[filter[1] as string];

        case 'top':
            return 'Только ТОП объявления';

        case 'no_deposit':
            return 'Без залога';

        case 'is_deliverable':
            return 'C доставкой';

        case 'min_price':
            return 'минимальная цена: ' + moneyFormat(filter[1]) + '.00';

        case 'max_price':
            return 'максимальная цена: ' + moneyFormat(filter[1]) + '.00';

        default:
            return '';
    }
};

interface IProps {
    filter: Filter;
}
const ActiveFiltersItem = ({ filter }: IProps): ReactElement => {
    const css = useStyles();
    const history = useRouter();
    const searchParams = useSelector<IState, ISearch>(state => state.config.searchParams);
    const categories = useSelector<IState, ICategories[]>(state => state.categories);

    const handleClick = (): void => {
        history.push(
            {
                pathname: routes.offers.list,
                query: queryString.stringify({ ...searchParams, [filter[0]]: null, page: 1 }, { skipNull: true }),
            },
            undefined,
            { scroll: false },
        );
    };

    return (
        <li className={css.item}>
            <button className={css.btn} type="button" onClick={handleClick}>
                <FontAwesomeIcon icon={faTimes} />
            </button>
            <span>{filtersToText(filter, categories)}</span>
        </li>
    );
};

const ActiveFilters = (): ReactElement | null => {
    const css = useStyles();
    const searchParams = useSelector<IState, ISearch>(state => state.config.searchParams);
    const openFilters = Object.entries(searchParams).filter(item => item[1] !== null && item[0] !== 'page');

    return openFilters.length ? (
        <Container>
            <ul className={css.flex}>
                {openFilters.map<ReactElement>(item => (
                    <ActiveFiltersItem key={item[0]} filter={item} />
                ))}
            </ul>
        </Container>
    ) : null;
};

export default ActiveFilters;
