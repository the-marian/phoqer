import { useRouter } from 'next/router';
import queryString from 'query-string';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { findCategory } from '../../../../../assets/helpers';
import routes from '../../../../../assets/routes';
import useTrans from '../../../../../hooks/trans.hook';
import { IDropList, IDropValue, ISearch, IState } from '../../../../../interfaces';
import DropDown from '../../../../common/drop-down';
import useStyles from '../filters.styles';

const Sort = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const history = useRouter();

    const FILTERS: IDropList[] = [
        { name: trans('from_new_to_old'), slug: '-pub_date' },
        { name: trans('from_old_to_new'), slug: 'pub_date' },
        { name: trans('number_of_views_descending'), slug: '-views' },
        { name: trans('number_of_views_ascending'), slug: 'views' },
        { name: trans('cheap_to_expensive'), slug: 'price' },
        { name: trans('from_expensive_to_cheap'), slug: '-price' },
        { name: trans('deposit_amount_descending'), slug: 'deposit_val' },
        { name: trans('deposit_amount_ascending'), slug: '-deposit_val' },
    ];

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
            <h4 className={css.title}>{trans('sort')}</h4>
            <DropDown
                defaultValue={defaultValue}
                data={FILTERS}
                onChange={handleChange}
                placeholder={trans('specify_sorting_type')}
            />
        </div>
    );
};

export default Sort;
