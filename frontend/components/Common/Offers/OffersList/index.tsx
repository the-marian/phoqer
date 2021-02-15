import React, { ReactElement } from 'react';

import { IOfferState } from '../../../../interfaces';
import OffersLoader from '../../Preloaders/OffersLoader';
import OfferCard from '../OffersCard';

interface IProps extends IOfferState {
    emptyText?: string;
}

const OffersList = ({ data, loading, emptyText }: IProps): ReactElement => (
    <OffersLoader loading={loading} isEmpty={!data?.data?.length} emptyText={emptyText}>
        {data?.data?.map(product => (
            <OfferCard key={product.id} product={product} />
        ))}
    </OffersLoader>
);

export default OffersList;
