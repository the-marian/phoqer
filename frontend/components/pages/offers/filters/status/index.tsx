import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { findCategory } from '../../../../../assets/helpers';
import { IDropList, IDropValue, ISearch, IState } from '../../../../../interfaces';
import types from '../../../../../redux/types';
import DropDown from '../../../../common/drop-down';
import useStyles from '../filters.styles';

const FILTERS: IDropList[] = [
    { name: 'Активное', slug: 'active' },
    { name: 'Временно не активно', slug: 'inactive' },
    { name: 'На данный момент арендуется', slug: 'in_rent' },
];

const Status = (): ReactElement => {
    const css = useStyles();
    const dispatch = useDispatch();

    const search = useSelector<IState, ISearch>(state => state.config.searchParams);
    const defaultValue = search.status ? findCategory(FILTERS, search.status) : null;

    const handleChange = (value: IDropValue | null): void => {
        dispatch({ type: types.OFFERS_SEARCH_LOCAL_PARAMS, payload: { ...search, status: value?.slug || null } });
    };

    return (
        <div className={css.root}>
            <h4 className={css.title}>Статус</h4>
            <DropDown defaultValue={defaultValue} data={FILTERS} onChange={handleChange} placeholder="Статус объявления" />
        </div>
    );
};

export default Status;
