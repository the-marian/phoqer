import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { declOfNum, moneyFormat } from '../../../../assets/helpers';
import { Theme } from '../../../../assets/theme';
import useTrans from '../../../../hooks/trans.hook';
import { IOfferCard, IState } from '../../../../interfaces';

const useStyles = createUseStyles((theme: Theme) => ({
    req: {
        '& li': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: theme.rem(2, 0),
        },
    },
    dots: {
        flexGrow: 2,
        margin: theme.rem(0, 2),
        borderBottom: '0.1rem dashed #aaa',
    },
    emoji: {
        '& li': {
            display: 'flex',
            alignItems: 'center',
            margin: theme.rem(2, 0),
        },
        '& img': {
            height: theme.rem(3),
            width: theme.rem(3),
            marginRight: theme.rem(2),
        },
    },
    gray: {
        filter: 'grayscale(100%)',
        color: theme.palette.gray[3],
    },
    value: {
        whiteSpace: 'nowrap',
    },
}));

const Requirements = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const offer = useSelector<IState, IOfferCard | null>(state => state.offers.single);

    return (
        <>
            <ul className={css.req}>
                <li>
                    <span>{trans('deposit')}:</span>
                    <span className={css.dots} />
                    <span className={css.value}>
                        {offer?.deposit_val ? `${moneyFormat(offer?.deposit_val)}.00 ${trans('uah')}` : trans('not_indicated')}
                    </span>
                </li>
                <li>
                    <span>{trans('minimum_rental_period')}:</span>
                    <span className={css.dots} />
                    <span className={css.value}>
                        {offer?.min_rent_period
                            ? `${moneyFormat(offer?.min_rent_period)} ${declOfNum(offer?.min_rent_period, [
                                  trans('day'),
                                  trans('day_2'),
                                  trans('day_3'),
                              ])}`
                            : trans('not_indicated')}
                    </span>
                </li>
                <li>
                    <span>{trans('maximum_rental_period')}:</span>
                    <span className={css.dots} />
                    <span className={css.value}>
                        {offer?.max_rent_period
                            ? `${moneyFormat(offer?.max_rent_period)} ${declOfNum(offer?.max_rent_period, [
                                  trans('day'),
                                  trans('day_2'),
                                  trans('day_3'),
                              ])}`
                            : trans('not_indicated')}
                    </span>
                </li>
            </ul>
            <ul className={css.emoji}>
                <li className={offer?.is_deliverable ? undefined : css.gray}>
                    <img src="/emoji/delivery.png" alt="" />
                    <span>{offer?.is_deliverable ? trans('owner_delivers_good') : trans('owner_not_deliver_goods')}</span>
                </li>
                <li className={offer?.doc_needed ? undefined : css.gray}>
                    <img src="/emoji/documents.png" alt="" />
                    <span>{offer?.doc_needed ? trans('client_provide_documents') : trans('client_dont_provide_documents')}</span>
                </li>
            </ul>
        </>
    );
};

export default Requirements;
