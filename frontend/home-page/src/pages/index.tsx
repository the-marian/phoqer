import { GetStaticProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { Container, ICategories, OfferCardType } from 'phoqer';

import { About } from '@app/components/about/about';
import { Layout } from '@app/components/layout/layout';
import { Categories } from '@app/components/pages/home/categories/categories';
import { Hero } from '@app/components/pages/home/hero/hero';
import { TopSearch } from '@app/components/pages/home/search/top-search/top-search';
import { TopOffers } from '@app/components/pages/home/top-offers/top-offers';
import { RecentOffers } from '@app/components/recent-offers/recent-offers';
import { categoriesService } from '@app/services/categories.service';
import { offersService } from '@app/services/offers.service';

const TopCategory = dynamic(
    () => import('../components/pages/home/top-category/top-category').then(module => module.TopCategory),
    { ssr: false },
);

const PrevSearch = dynamic(
    () => import('../components/pages/home/search/prev-search/prev-search').then(module => module.PrevSearch),
    { ssr: false },
);

interface Props {
    topOffers: OfferCardType[];
    categories: ICategories;
}
const HomePage: NextPage<Props> = ({ topOffers, categories }) => {
    return (
        <Layout withFooter>
            <Hero />

            <Container size="md">
                <RecentOffers />
            </Container>

            <Categories categories={categories} />

            <TopOffers offers={topOffers} />

            {categories.slice(0, 3).map(category => (
                <TopCategory key={category.slug} category={category} />
            ))}

            <TopSearch />
            <PrevSearch />

            <About />
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    try {
        const categories = await categoriesService.getCategories();
        const topOffers = await offersService.topOffers();

        return { props: { categories, topOffers } };
    } catch (e) {
        console.log(e);
        return { notFound: true };
    }
};

export default HomePage;
