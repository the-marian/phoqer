import React, { ReactElement } from 'react';

import { IOfferPopular } from '../../../../interfaces';
import OffersLoader from '../../Preloaders/OffersLoader';
import OfferCard from '../OffersCard';

interface IProps extends IOfferPopular {
    emptyText?: string;
}

const OffersList = ({ data, loading, emptyText }: IProps): ReactElement => (
    <OffersLoader loading={loading} isEmpty={!data?.length} emptyText={emptyText}>
        {data?.map(product => (
            <OfferCard key={product.id} product={product} />
        ))}
    </OffersLoader>
);

export default OffersList;
