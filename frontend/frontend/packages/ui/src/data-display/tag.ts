import { ComponentStyleConfig } from '@chakra-ui/theme';

export const Tag: ComponentStyleConfig = {
    baseStyle: {
        container: {
            borderRadius: '0.8rem',
            fontWeight: 600,
        },
    },
    variants: {
        secondary: ({ colorMode }) => ({
            container: {
                bg: colorMode === 'light' ? 'gray.200' : 'gray.700',
                color: colorMode === 'light' ? 'text.main' : 'common.white',
            },
        }),
        success: ({ colorMode }) => ({
            container: {
                bg: colorMode === 'light' ? 'green.200' : 'green.300',
                color: colorMode === 'light' ? 'green.500' : 'green.600',
            },
        }),
    },
    defaultProps: {
        variant: 'secondary',
    },
};
