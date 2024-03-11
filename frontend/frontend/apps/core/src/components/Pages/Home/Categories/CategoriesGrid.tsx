import { FC } from 'react';

import { Grid, GridItem, SlideFade, Center, Heading, Image, HStack, Box, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';
import { Category } from 'query';

const gridTemplateAreas = `
    "area-1 area-1 area-2 area-3"
    "area-1 area-1 area-4 area-5"
    "area-6 area-7 area-8 area-8"
    "area-9 area-9 area-8 area-8" 
    "area-10 area-11 area-12 area-13" 
`;

interface Props {
    categories: Category[];
}
export const CategoriesGrid: FC<Props> = ({ categories }) => {
    const bg = useColorModeValue('gray.200', 'gray.700');
    const boxShadow = useColorModeValue('0 0 0 1px var(--chakra-colors-common-black)', '0 0 0 1px var(--chakra-colors-gray-600)');

    return (
        <Grid gridGap={4} gridTemplateColumns="repeat(4, 1fr)" gridTemplateAreas={gridTemplateAreas}>
            {categories.map((category, index) => (
                <GridItem key={category.slug} gridArea={`area-${index + 1}`} h="100%" minH={28}>
                    <SlideFade
                        in
                        offsetY="20px"
                        style={{ height: '100%' }}
                        transition={{ enter: { delay: index / 15, duration: 0.2 } }}
                    >
                        <Center
                            as={Link}
                            h="100%"
                            bg={bg}
                            borderRadius="lg"
                            href={`/search?category=${category.slug}`}
                            _hover={{ boxShadow }}
                        >
                            <HStack spacing={4} p={4}>
                                <Image
                                    h={8}
                                    w={8}
                                    src={category.emoji}
                                    alt={category.title}
                                    fallback={<Box h={8} w={8} bg="gray.400" borderRadius="md" />}
                                />
                                <Heading size="xs" noOfLines={1} wordBreak="break-all">
                                    {category.title}
                                </Heading>
                            </HStack>
                        </Center>
                    </SlideFade>
                </GridItem>
            ))}
        </Grid>
    );
};
