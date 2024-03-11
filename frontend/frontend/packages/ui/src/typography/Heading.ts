import { ComponentStyleConfig } from '@chakra-ui/theme';

export const Heading: ComponentStyleConfig = {
    baseStyle: {
        color: 'text.main',
        fontWeight: 500,
        lineHeight: 1.5,
        fontFamily: 'var(--font-heading)',

        _dark: {
            color: 'common.white',
        },
    },
    sizes: {
        '4xl': { fontSize: '48px' },
        '3xl': { fontSize: '40px' },
        '2xl': { fontSize: '32px' },
        xl: { fontSize: '24px' },
        lg: { fontSize: '20px' },
        md: { fontSize: '18px' },
        sm: { fontSize: '16px' },
        xs: { fontSize: '14px' },
    },
};
