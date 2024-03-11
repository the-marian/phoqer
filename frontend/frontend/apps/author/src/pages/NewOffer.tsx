import { FC } from 'react';

import { NewOfferController } from '../components/NewOffer';
import { NewOfferProvider } from '../providers';

export const NewOffer: FC = () => {
    return (
        <NewOfferProvider>
            <NewOfferController />
        </NewOfferProvider>
    );
};
