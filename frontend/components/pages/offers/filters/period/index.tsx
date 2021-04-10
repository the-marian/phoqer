import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { findCategory } from '../../../../../assets/helpers';
import { IDropList, IDropValue, ISearch, IState } from '../../../../../interfaces';
import types from '../../../../../redux/types';
import DropDown from '../../../../common/drop-down';
import useStyles from '../filters.styles';

const FILTERS: IDropList[] = [
    { name: 'Почасовая', slug: 'hour' },
    { name: 'Посуточная', slug: 'day' },
    { name: 'Помесячная', slug: 'month' },
];

const Period = (): ReactElement => {
    const css = useStyles();
    const dispatch = useDispatch();

    const search = useSelector<IState, ISearch>(state => state.config.searchParams);
    const defaultValue = search.period ? findCategory(FILTERS, search.period) : null;

    const handleChange = (value: IDropValue | null): void => {
        dispatch({ type: types.OFFERS_SEARCH_LOCAL_PARAMS, payload: { ...search, period: value?.slug || null } });
    };

    return (
        <div className={css.root}>
            <h4 className={css.title}>Период аренды</h4>
            <DropDown defaultValue={defaultValue} data={FILTERS} onChange={handleChange} placeholder="Оплата ..." />
        </div>
    );
};

export default Period;
