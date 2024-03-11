import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { FC, useEffect } from 'react';

import { RecentOffers, OffersGrid } from '@app/components/Common';
import { MainLayout } from '@app/components/Layout';
import { Meta } from '@app/components/Meta';
import {
    CategoryOffersContainer,
    Author,
    RentButton,
    AuthorOffers,
    Description,
    OfferActions,
    Slider,
} from '@app/components/Pages';
import { useSetRecentOffer } from '@app/hook';
import { errorHandler } from '@app/utils';
import { getEmptyPagination } from '@app/utils/getEmptyPagination';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Container, Grid, GridItem, Heading, Stack } from '@chakra-ui/react';
import { get, isEmpty } from 'lodash-es';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { ID, geOfferByCategoryFetcher, getOfferByIdFetcher, getUserOfferFetcher, OfferItem, OfferList } from 'query';

interface Props {
    item: OfferItem;
    authorOffers: OfferList;
    categoryOffers: OfferList;
}
const OffersPage: FC<Props> = ({ item, authorOffers, categoryOffers }) => {
    const setRecentOffer = useSetRecentOffer();

    useEffect(() => {
        setRecentOffer(item);
    }, [setRecentOffer, item]);

    return (
        <MainLayout spacing={10}>
            <Meta title={item.title} description={item.description.slice(0, 250)} />
            <Container size="2xl" pt={8}>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink as={Link} href="/">
                            Home
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <BreadcrumbLink as={Link} href="/categories">
                            Categories
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <BreadcrumbLink as={Link} href={`/search?category=${item.category.slug}`}>
                            {item.category.title}
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink color="gray.600" href={`/offers/${item.id}`}>
                            {item.title}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </Container>

            <Container size="2xl" as={Stack} spacing={8}>
                <Heading noOfLines={2} size="2xl">
                    {item.title}
                </Heading>

                <Grid gridGap={10} gridTemplateColumns={{ base: '3fr 1fr' }}>
                    <GridItem>
                        <Slider images={item.images} title={item.title} />
                    </GridItem>
                    <GridItem as={Stack} spacing={5} alignItems="flex-start">
                        <Author author={item.author} />

                        <OfferActions />

                        <RentButton data={item} />

                        <Description data={item} />
                    </GridItem>
                </Grid>
            </Container>

            {authorOffers?.totalItems > 0 && <AuthorOffers data={authorOffers?.data ?? []} />}

            {categoryOffers?.data?.length > 0 && (
                <CategoryOffersContainer category={{ ...item.category, description: 'Offers of the same category' }}>
                    <OffersGrid key={item.id} data={categoryOffers.data} />
                </CategoryOffersContainer>
            )}

            <RecentOffers />
        </MainLayout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking',
    };
};

export const getStaticProps: GetStaticProps = async context => {
    try {
        const offerId = get(context, 'params.offerId') as ID;
        const item = await errorHandler(() => getOfferByIdFetcher(offerId), {} as OfferItem);

        const authorOffers = await errorHandler(() => getUserOfferFetcher(item.author.id), getEmptyPagination());
        const categoryOffers = await errorHandler(() => geOfferByCategoryFetcher(item.category.slug), getEmptyPagination());

        if (isEmpty(item)) return { notFound: true };

        return { props: { item, authorOffers, categoryOffers }, revalidate: 5 };
    } catch (e) {
        console.log(e);
        return { notFound: true };
    }
};

export default OffersPage;
