import { RecentOffers } from '@app/components/Common';
import { MainLayout } from '@app/components/Layout';
import { Meta } from '@app/components/Meta';
import { About, TopOffers } from '@app/components/Pages';
import { errorHandler } from '@app/utils';
import {
    BreadcrumbLink,
    Breadcrumb,
    BreadcrumbItem,
    Container,
    Box,
    Heading,
    Stack,
    Grid,
    GridItem,
    Image,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import { SlideInView } from 'common';
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { Category, getCategoriesFetcher, getTopOffersFetcher, OfferCard } from 'query';

interface Props {
    topOffers: OfferCard[];
    categories: Category[];
}
const Categories: NextPage<Props> = ({ categories, topOffers }) => {
    return (
        <MainLayout spacing={10}>
            <Meta title="Phoqer - Categories" />

            <Container size="2xl" pt={8}>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink as={Link} href="/">
                            Home
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href="/categories" color="gray.600">
                            Categories
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </Container>

            <Box bg={useColorModeValue('gray.200', 'gray.800')} py={10}>
                <Container size="2xl" as={Stack} spacing={10}>
                    <Heading as="h1">Categories</Heading>

                    <Grid gridGap={10} gridTemplateColumns={{ base: 'repeat(4, 1fr)' }}>
                        {categories.map(category => (
                            <GridItem
                                key={category.slug}
                                _hover={{ img: { boxShadow: '0 0 0 2px var(--chakra-colors-green-600)' } }}
                            >
                                <SlideInView>
                                    <Stack as={Link} href={`/search?category=${category.slug}`} spacing={6}>
                                        <Image
                                            w="100%"
                                            h="250px"
                                            objectFit="cover"
                                            borderRadius="0.8rem"
                                            src={category.image}
                                            alt={category.title}
                                        />

                                        <Stack>
                                            <Heading as="h2" fontSize="lg" fontWeight="semibold">
                                                {category.title}
                                            </Heading>
                                            <Text color="text.secondary" noOfLines={2}>
                                                {category.description}
                                            </Text>
                                        </Stack>
                                    </Stack>
                                </SlideInView>
                            </GridItem>
                        ))}
                    </Grid>
                </Container>
            </Box>

            <RecentOffers />
            <TopOffers data={topOffers} />
            <About />
        </MainLayout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const categories = await errorHandler(getCategoriesFetcher, []);
    const topOffers = await errorHandler(getTopOffersFetcher, []);

    return {
        props: { categories, topOffers },
    };
};

export default Categories;
