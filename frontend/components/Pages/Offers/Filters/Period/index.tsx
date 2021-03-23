import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';

<<<<<<< HEAD:frontend/components/Pages/Offers/Filters/Period/index.tsx
import { findCategory } from '../../../../../assets/helpers';
import { IDropList, IDropValue, ISearch, IState } from '../../../../../interfaces';
import types from '../../../../../redux/types';
import DropDown from '../../../../Common/DropDown';
=======
import { findCategory } from '../../../../assets/helpers';
import { IDropList, IDropValue, ISearch, IState } from '../../../../interfaces';
import types from '../../../../redux/types';
import DropDown from '../../../Common/DropDown';
>>>>>>> d0a04e15059ac5becb15b02e2ee23426aae0c9ad:frontend/components/Layout/Filters/Period/index.tsx
import useStyles from '../index.styles';

const FILTERS: IDropList[] = [
    { name: 'Почасовая', slug: 'hour' },
    { name: 'Посуточная', slug: 'day' },
    { name: 'Помесячная', slug: 'month' },
];

const Period = (): ReactElement => {
    const css = useStyles();
    const dispatch = useDispatch();

    const search = useSelector<IState, ISearch>(state => state.config.search);
    const defaultValue = search.period ? findCategory(FILTERS, search.period) : null;

    const handleChange = (value: IDropValue | null): void => {
        dispatch({ type: types.OFFERS_SEARCH, payload: { ...search, period: value?.slug || null } });
    };

    return (
        <div className={css.root}>
            <h4 className={css.title}>Период аренды</h4>
            <DropDown defaultValue={defaultValue} data={FILTERS} onChange={handleChange} placeholder="Оплата ..." />
        </div>
    );
};

export default Period;
