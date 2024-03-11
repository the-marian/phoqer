import { GetStaticProps, NextPage } from 'next';
import { Container, IBreadcrumbs, ICategories, OfferCardType } from 'phoqer';

import { About } from '@app/components/about/about';
import { Breadcrumbs } from '@app/components/common/breadcrumbs/breadcrumbs';
import { Layout } from '@app/components/layout/layout';
import { CategoriesList } from '@app/components/pages/categories/categories-list/categories-list';
import { TopOffers } from '@app/components/pages/home/top-offers/top-offers';
import { RecentOffers } from '@app/components/recent-offers/recent-offers';
import { useTranslation } from '@app/hook/translations.hook';
import { categoriesService } from '@app/services/categories.service';
import { offersService } from '@app/services/offers.service';

interface Props {
    topOffers: OfferCardType[];
    categories: ICategories;
}
const Categories: NextPage<Props> = ({ categories, topOffers }) => {
    const { t } = useTranslation();
    const BREADCRUMBS: IBreadcrumbs = [{ title: t('Categories') }];

    return (
        <Layout withFooter>
            <Breadcrumbs value={BREADCRUMBS} />
            <CategoriesList categories={categories} />
            <Container size="md">
                <RecentOffers />
            </Container>
            <TopOffers offers={topOffers} />
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

export default Categories;
