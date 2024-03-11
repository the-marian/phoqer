import { FC, useMemo } from 'react';

import { Button, Menu, MenuButton, MenuList, MenuItem, HStack, Text, Image, Box, Icon } from '@chakra-ui/react';
import { ID, useGetCategories } from 'query';
import { MdOutlineExpandMore } from 'react-icons/md';

const Emoji: FC<{ emoji?: string }> = ({ emoji }) => (
    <Image h={6} w={6} src={emoji} fallback={<Box h={6} w={6} borderRadius="md" bg="gray.500" />} />
);

interface Props {
    slug?: ID | null;
    onChange: (id: string) => void;
}
export const Categories: FC<Props> = ({ slug, onChange }) => {
    const { data, isLoading } = useGetCategories();
    const selected = useMemo(() => (slug && data ? data.find(item => item.slug === slug) : null), [data, slug]);

    return (
        <Menu>
            <MenuButton
                size="lg"
                w="100%"
                as={Button}
                variant="secondary"
                isLoading={Boolean(selected) && isLoading}
                rightIcon={<Icon as={MdOutlineExpandMore} boxSize="25px" />}
            >
                <HStack spacing={4}>
                    {selected && <Emoji emoji={selected?.emoji} />}
                    <Text>{selected?.title || 'Select a category'}</Text>
                </HStack>
            </MenuButton>

            <MenuList maxH="400px" overflow="auto">
                {data?.map(category => (
                    <MenuItem key={category.slug} onClick={() => onChange(category.slug)}>
                        <HStack spacing={4}>
                            <Emoji emoji={selected?.emoji} />
                            <Text>{category.title}</Text>
                        </HStack>
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
};
