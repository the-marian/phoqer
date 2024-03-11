import { FC, PropsWithChildren } from 'react';

import { Button, Container, Heading, HStack, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { Category } from 'query';
import { MdArrowForward } from 'react-icons/md';

interface Props extends PropsWithChildren {
    category: Partial<Category>;
}
export const CategoryOffersContainer: FC<Props> = ({ category, children }) => {
    return (
        <Container as="section" size="lg" key={category?.slug} mt={10}>
            <Stack spacing={6}>
                <HStack justifyContent="space-between" alignItems="flex-end">
                    <Stack spacing={1}>
                        <Heading size="md">{category.title}</Heading>
                        {category.description && (
                            <Text size="sm" color="text.secondary">
                                {category.description}
                            </Text>
                        )}
                    </Stack>

                    <HStack spacing={4}>
                        <Button
                            size="sm"
                            as={Link}
                            variant="secondary"
                            href={`/search?category=${category.slug}`}
                            rightIcon={<MdArrowForward />}
                        >
                            View more
                        </Button>
                    </HStack>
                </HStack>

                {children}
            </Stack>
        </Container>
    );
};
