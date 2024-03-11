import { useEffect } from 'react';

import { get } from 'lodash-es';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { IBreadcrumbs, ID } from 'phoqer';

import { Breadcrumbs } from '@app/components/common/breadcrumbs/breadcrumbs';
import { Layout } from '@app/components/layout/layout';
import { Meta } from '@app/components/meta/meta';
import { SingleOffer } from '@app/components/pages/offers/single/single-offer';
import { AuthorOffersContext } from '@app/context/offers/author-offers.context';
import { CategoryOffersContext } from '@app/context/offers/category-offers.context';
import { OfferMetaContextProvider } from '@app/context/offers/offer-meta.cpontext';
import { SingleOfferContext } from '@app/context/offers/single-offer.context';
import { useSetRecentOffers } from '@app/hook/recent-offers.hook';
import { useTranslation } from '@app/hook/translations.hook';
import { offersService } from '@app/services/offers.service';
import { SingleOfferData } from '@app/types/single-offer.type';
import { routes } from '@app/utils/routes';

const OfferPage: NextPage<SingleOfferData> = ({ offer, authorOffers, categoryOffers }) => {
    const { t } = useTranslation();
    const setRecentOffers = useSetRecentOffers();

    const breadcrumbs: IBreadcrumbs = [
        { url: routes.categories.list, title: t('Categories') },
        { url: routes.search({ category: offer.category.slug }), title: offer.category.title },
        { title: offer.title },
    ];

    useEffect(() => {
        setRecentOffers(offer);
    }, [setRecentOffers, offer]);

    return (
        <OfferMetaContextProvider>
            <SingleOfferContext.Provider value={{ offer }}>
                <CategoryOffersContext.Provider value={categoryOffers}>
                    <AuthorOffersContext.Provider value={authorOffers}>
                        <Meta title={offer.title} description={offer.description} />
                        <Layout withFooter>
                            <Breadcrumbs value={breadcrumbs} />
                            <SingleOffer />
                        </Layout>
                    </AuthorOffersContext.Provider>
                </CategoryOffersContext.Provider>
            </SingleOfferContext.Provider>
        </OfferMetaContextProvider>
    );
};

export default OfferPage;

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking',
    };
};

export const getStaticProps: GetStaticProps = async context => {
    try {
        const offerId = get(context, 'params.offerId');
        const props = await offersService.singleOffer(offerId as ID);

        return { props, revalidate: 5 };
    } catch (e) {
        console.log(e);
        return { notFound: true };
    }
};
