import { FC } from 'react';

import { RecentOffers, OffersGrid } from '@app/components/Common';
import { MainLayout } from '@app/components/Layout';
import { Meta } from '@app/components/Meta';
import {
    Banner,
    CategoriesController,
    CategoryOffersContainer,
    TopOffers,
    About,
    CategoryOffersList,
} from '@app/components/Pages';
import { errorHandler } from '@app/utils';
import { getEmptyPagination } from '@app/utils/getEmptyPagination';
import { Category, getCategoriesFetcher, geOfferByCategoryFetcher, getTopOffersFetcher, OfferCard, OfferList } from 'query';

interface Props {
    topOffers: OfferCard[];
    categories: Category[];
    topCategoryOffers: OfferList;
}
const Home: FC<Props> = ({ categories, topOffers, topCategoryOffers }) => {
    return (
        <MainLayout spacing={10}>
            <Meta title="Phoqer - Home" />
            <Banner />

            <CategoriesController categories={categories} />

            {topCategoryOffers?.data?.length > 0 && (
                <CategoryOffersContainer category={categories[0]}>
                    <OffersGrid data={topCategoryOffers.data} />
                </CategoryOffersContainer>
            )}

            <TopOffers data={topOffers} />
            <CategoryOffersContainer category={categories[1]}>
                <CategoryOffersList slug={categories[1].slug} />
            </CategoryOffersContainer>

            <RecentOffers />
            <CategoryOffersContainer category={categories[2]}>
                <CategoryOffersList slug={categories[2].slug} />
            </CategoryOffersContainer>

            <About />
        </MainLayout>
    );
};
export const getStaticProps = async () => {
    const categories = await errorHandler(getCategoriesFetcher, []);
    const topOffers = await errorHandler(getTopOffersFetcher, []);
    const topCategoryOffers = await errorHandler(() => geOfferByCategoryFetcher(categories[0].slug), getEmptyPagination());

    return {
        props: { categories, topOffers, topCategoryOffers },
    };
};

export default Home;
