import { FC } from 'react';

import { Container, Heading } from 'phoqer';

import { About } from '@app/components/about/about';
import { OfferFaq } from '@app/components/pages/offers/single/offer-faq/offer-faq';
import { RecentOffers } from '@app/components/recent-offers/recent-offers';
import { useSingleOfferContext } from '@app/context/offers/single-offer.context';

import { AuthorOffers } from './author-offers/author-offers';
import { CategoryOffers } from './category-offers/category-offers';
import { Gallery } from './gallery/gallery';
import { OfferNav } from './offer-nav/offer-nav';
import css from './single-offer.module.scss';

export const SingleOffer: FC = () => {
    const { offer } = useSingleOfferContext();

    return (
        <>
            <Container size="lg" className={css.root}>
                <Heading size="xl" className={css.title}>
                    {offer.title}
                </Heading>
            </Container>

            <Container size="lg" className={css.flex}>
                <Gallery />
                <OfferNav />
            </Container>

            <AuthorOffers />
            <CategoryOffers />

            <Container size="md">
                <RecentOffers />
            </Container>

            <OfferFaq />
            <About />
        </>
    );
};
