import { FC } from 'react';

import { Button, ButtonGroup, Container, Heading, HStack, Stack, useBoolean } from '@chakra-ui/react';
import Link from 'next/link';
import { Category } from 'query';
import { MdArrowForward, MdOutlineApps, MdOutlineSplitscreen } from 'react-icons/md';

import { CategoriesGrid } from './CategoriesGrid';
import { CategoriesList } from './CategoriesList';

const activeStyles = {
    sx: {
        bg: 'common.black',
        borderColor: 'common.black',
        color: 'common.white',
        pointerEvents: 'none',

        _dark: {
            bg: 'common.white',
            borderColor: 'common.white',
            color: 'common.black',
        },
    },
};

interface Props {
    categories: Category[];
}
export const CategoriesController: FC<Props> = ({ categories }) => {
    const [isListSelected, { on, off }] = useBoolean(true);

    return (
        <Container as="section" size="lg">
            <Stack spacing={4}>
                <HStack justifyContent="space-between" alignItems="flex-end">
                    <Heading size="md">Categories</Heading>

                    <HStack spacing={4}>
                        <ButtonGroup size="sm" variant="secondary" isAttached>
                            <Button onClick={on} {...(isListSelected ? activeStyles : {})} aria-label="List">
                                <MdOutlineApps />
                            </Button>
                            <Button onClick={off} {...(isListSelected ? {} : activeStyles)} aria-label="Grid">
                                <MdOutlineSplitscreen />
                            </Button>
                        </ButtonGroup>

                        <Button size="sm" variant="secondary" as={Link} href="/categories" rightIcon={<MdArrowForward />}>
                            View more
                        </Button>
                    </HStack>
                </HStack>

                {isListSelected ? <CategoriesList categories={categories} /> : <CategoriesGrid categories={categories} />}
            </Stack>
        </Container>
    );
};
