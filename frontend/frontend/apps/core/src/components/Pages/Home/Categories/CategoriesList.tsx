import { FC } from 'react';

import { Grid, GridItem, Image, SlideFade, Stack, Text, Tooltip } from '@chakra-ui/react';
import Link from 'next/link';
import { Category } from 'query';

interface Props {
    categories: Category[];
}
export const CategoriesList: FC<Props> = ({ categories }) => {
    return (
        <Grid gridRowGap={8} gridColumnGap={4} gridTemplateColumns={{ base: 'repeat(7, 1fr)' }}>
            {categories.map((category, index) => (
                <SlideFade in offsetY="20px" key={category.slug} transition={{ enter: { delay: index / 15, duration: 0.2 } }}>
                    <GridItem
                        as={Link}
                        href={`/search?category=${category.slug}`}
                        _hover={{ img: { boxShadow: '0 0 0 2px var(--chakra-colors-primary-main)' } }}
                    >
                        <Tooltip label={category.title} placement="top">
                            <Stack spacing={4}>
                                <Image
                                    h={24}
                                    w="100%"
                                    objectFit="cover"
                                    borderRadius="md"
                                    src={category.image}
                                    alt={category.title}
                                />
                                <Text size="xs" fontWeight={500} noOfLines={1}>
                                    {category.title}
                                </Text>
                            </Stack>
                        </Tooltip>
                    </GridItem>
                </SlideFade>
            ))}
        </Grid>
    );
};
