import { useRouter } from 'next/router';
import queryString from 'query-string';
import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { findCategory } from '../../../../../assets/helpers';
import routes from '../../../../../assets/routes';
import { IDropList, IDropValue, ISearch, IState } from '../../../../../interfaces';
import DropDown from '../../../../common/drop-down';
import useStyles from '../filters.styles';

const FILTERS: IDropList[] = [
    { name: 'От новых к старым', slug: '-pub_date' },
    { name: 'От старых к новым', slug: 'pub_date' },
    { name: 'Количество просмотров (по убыванию)', slug: '-views' },
    { name: 'Количество просмотров (по возростанию)', slug: 'views' },
    { name: 'От дешевых к дорогим', slug: 'price' },
    { name: 'От дорогих к дешевым', slug: '-price' },
    { name: 'Сума залога (по убыванию)', slug: 'deposit_val' },
    { name: 'Сума залога (по возростанию)', slug: '-deposit_val' },
];

const Sort = (): ReactElement => {
    const css = useStyles();
    const history = useRouter();

    const searchParams = useSelector<IState, ISearch>(state => state.config.searchParams);
    const defaultValue = searchParams.ordering ? findCategory(FILTERS, searchParams.ordering) : null;

    const handleChange = (value: IDropValue | null): void => {
        history.push(
            {
                pathname: routes.offers.list,
                query: queryString.stringify({ ...searchParams, ordering: value?.slug || null, page: 1 }, { skipNull: true }),
            },
            undefined,
            { scroll: false },
        );
    };

    return (
        <div className={css.root}>
            <h4 className={css.title}>Cортировать</h4>
            <DropDown defaultValue={defaultValue} data={FILTERS} onChange={handleChange} placeholder="Укажите тип сортировки" />
        </div>
    );
};

export default Sort;
