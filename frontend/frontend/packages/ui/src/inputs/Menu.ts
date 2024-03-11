import { ComponentStyleConfig } from '@chakra-ui/theme';

export const Menu: ComponentStyleConfig = {
    baseStyle: {
        list: {
            p: 2,
            borderRadius: 'lg',
            _dark: { bg: 'dark.body' },
        },
        divider: {
            borderColor: 'gray.400',
            _dark: { borderColor: 'gray.700' },
        },
        item: {
            py: 3,
            px: 4,
            fontWeight: 500,
            borderRadius: 'lg',
            _dark: { bg: 'dark.body', _hover: { bg: 'gray.800' }, _focus: { bg: 'gray.800' } },
        },
    },
};
