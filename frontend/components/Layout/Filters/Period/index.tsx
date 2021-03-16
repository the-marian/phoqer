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
    { name: 'Почасовая', slug: 'hour' },
    { name: 'Посуточная', slug: 'day' },
    { name: 'Помесячная', slug: 'month' },
];

const Period = (): ReactElement => {
    const css = useStyles();
    const history = useRouter();

    const search = useSelector<IState, ISearch>(state => state.config.search);
    const defaultValue = search.period ? findCategory(FILTERS, search.period) : null;

    const handleChange = (value: IDropValue | null): void => {
        history.push(
            {
                pathname: routes.offers.list,
                query: queryString.stringify(
                    { ...search, period: value?.slug || null },
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
            <h4 className={css.title}>Период аренды</h4>
            <DropDown defaultValue={defaultValue} data={FILTERS} onChange={handleChange} placeholder="Оплата ..." />
        </div>
    );
};

export default Period;
