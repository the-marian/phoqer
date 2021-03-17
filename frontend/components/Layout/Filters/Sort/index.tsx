import { useRouter } from 'next/router';
import queryString from 'query-string';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { findCategory } from '../../../../assets/helpers';
import routes from '../../../../assets/routes';
import { IDropList, IDropValue, ISearch, IState } from '../../../../interfaces';
import DropDown from '../../../Common/DropDown';
import useStyles from '../index.styles';

const FILTERS: IDropList[] = [
    { name: 'От новых к старым', slug: 'pud_date' },
    { name: 'От старых к новым', slug: '-pud_date' },
    { name: 'Количество просмотров (по убыванию)', slug: 'views' },
    { name: 'Количество просмотров (по возростанию)', slug: '-views' },
    { name: 'От дешевых к дорогим', slug: 'price' },
    { name: 'От дорогих к дешевым', slug: '-price' },
    { name: 'Сума залога (по убыванию)', slug: '-deposit_val' },
    { name: 'Сума залога (по возростанию)', slug: 'deposit_val' },
];

const Sort = (): ReactElement => {
    const css = useStyles();
    const history = useRouter();

    const search = useSelector<IState, ISearch>(state => state.config.search);
    const defaultValue = search.ordering ? findCategory(FILTERS, search.ordering) : null;

    const handleChange = (value: IDropValue | null): void => {
        history.push(
            {
                pathname: routes.offers.list,
                query: queryString.stringify(
                    { ...search, ordering: value?.slug || null },
                    {
                        skipNull: true,
                    },
                ),
            },
            undefined,
            { shallow: true, scroll: false },
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
