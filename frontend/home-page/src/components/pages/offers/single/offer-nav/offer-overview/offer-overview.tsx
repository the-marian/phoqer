import { FC } from 'react';

import { Overflow } from 'phoqer';

import { useSingleOfferContext } from '@app/context/offers/single-offer.context';

import css from './offer-overview.module.scss';

export const OfferOverview: FC = () => {
    const { offer } = useSingleOfferContext();

    return (
        <Overflow className={css.overflow} key={offer.id}>
            <div className={css.description} dangerouslySetInnerHTML={{ __html: offer.description }} />
        </Overflow>
    );
};
