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

const Status = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const history = useRouter();

    const FILTERS: IDropList[] = [
        { name: trans('active'), slug: 'active' },
        { name: trans('temporarily_inactive'), slug: 'inactive' },
        { name: trans('currently_rented'), slug: 'in_rent' },
    ];

    const search = useSelector<IState, ISearch>(state => state.config.searchParams);
    const defaultValue = search.status ? findCategory(FILTERS, search.status) : null;

    const handleChange = (value: IDropValue | null): void => {
        history.push(
            {
                pathname: routes.offers.list,
                query: queryString.stringify({ ...search, status: value?.slug || null, page: 1 }, { skipNull: true }),
            },
            undefined,
            { scroll: false },
        );
    };

    return (
        <div className={css.root}>
            <h4 className={css.title}>{trans('status')}</h4>
            <DropDown defaultValue={defaultValue} data={FILTERS} onChange={handleChange} placeholder={trans('offer_status')} />
        </div>
    );
};

export default Status;
