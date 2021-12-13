import React, { useCallback, useEffect } from 'react';

import { useRouter } from 'next/router';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import useTrans from '../../../hooks/trans.hook';
import { IOfferDynamic, IState } from '../../../interfaces';
import types from '../../../redux/types';
import routes from '../../../utils/routes';
import { Theme } from '../../../utils/theming/theme';
import Pagination from '../../common/load-more/pagination';
import OffersList from '../../common/offers/offers-list';
import SegmentedControl from '../../common/segmented-control';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        margin: theme.rem(4, 0, 0),
    },
    title: {
        margin: theme.rem(3, 0, 1),
        fontSize: theme.rem(1.4),
        fontWeight: theme.text.weight[2],
        color: theme.palette.black[0],

        ...theme.media(1060).max({
            margin: theme.rem(0, 0, 1),
        }),
    },
}));

const offersTab = [
    {
        id: 'all',
        text: 'all',
    },
    {
        id: 'active',
        text: 'active',
    },
    {
        id: 'draft',
        text: 'draft',
    },
    {
        id: 'archive',
        text: 'archive',
    },
];

const UserOffersContent = (): JSX.Element => {
    const css = useStyles();
    const trans = useTrans();
    const dispatch = useDispatch();
    const history = useRouter();

    const offerStatus = String(history.query.offerStatus || '');

    const { data, loading, pagination } = useSelector<IState, IOfferDynamic>(state => state.offers.my_offers);

    useEffect(() => {
        dispatch({
            type: types.MY_OFFERS_START,
            payload: { tab: offerStatus, params: { page: String(history.query.page || '1') } },
        });
    }, [offerStatus, dispatch, history.query.page, history.locale]);

    const handleClick = useCallback(
        (page: number): void => {
            dispatch({ type: types.MY_OFFERS_START, payload: { tab: offerStatus, params: { page } } });
        },
        [dispatch, offerStatus],
    );
    const handleMore = useCallback(
        (page: number): void => {
            dispatch({ type: types.MY_OFFERS_PAGINATION_START, payload: { tab: offerStatus, params: { page } } });
        },
        [dispatch, offerStatus],
    );

    const handleTab = useCallback(
        (value: string): void => {
            history.push(routes.my_offers(value));
        },
        [history],
    );

    return (
        <>
            <h3 className={css.title}>{trans('select_offer_status')}</h3>
            <SegmentedControl tabs={offersTab} active={offerStatus} onClick={handleTab} />
            <div className={css.root}>
                <OffersList loading={loading} data={data?.data} showFavoriteBtn={false} />
                <Pagination loading={pagination} total={data.total} onClick={handleClick} onMore={handleMore} />
            </div>
        </>
    );
};

export default UserOffersContent;
