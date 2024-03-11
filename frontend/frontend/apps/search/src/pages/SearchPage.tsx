import { FC } from 'react';

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Container, Skeleton, Grid, GridItem } from '@chakra-ui/react';
import { AppLink } from 'common';
import { useGetCategoryBySlug } from 'query';
import { useSearchParams } from 'react-router-dom';

import { Filters, OffersList, SearchInput } from '../components';

export const SearchPage: FC = () => {
    const [searchParams] = useSearchParams();
    const slug = searchParams.get('category');

    const { data, isLoading } = useGetCategoryBySlug(slug);

    return (
        <>
            <Container size="2xl" pt={8}>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink as={AppLink} href="/">
                            Home
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <BreadcrumbLink as={AppLink} href="/categories">
                            Categories
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href="/search" color="gray.600">
                            {slug && isLoading ? <Skeleton h={4} w="160px" /> : data?.title}
                            {!slug && 'Search'}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </Container>

            <SearchInput />

            <Container size="2xl" flex={1}>
                <Grid gridGap={4} gridTemplateColumns="1fr 4fr">
                    <GridItem>
                        <Filters />
                    </GridItem>
                    <GridItem>
                        <OffersList />
                    </GridItem>
                </Grid>
            </Container>
        </>
    );
};
