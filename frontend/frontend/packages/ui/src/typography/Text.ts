import { ComponentStyleConfig } from '@chakra-ui/theme';

export const Text: ComponentStyleConfig = {
    baseStyle: {
        color: 'text.main',
        fontWeight: 400,
        lineHeight: 1.4,
        fontFamily: 'var(--font-body)',

        _dark: {
            color: 'common.white',
        },
    },
    sizes: {
        '4xl': { fontSize: '38px' },
        '3xl': { fontSize: '32px' },
        '2xl': { fontSize: '26px' },
        xl: { fontSize: '22px' },
        lg: { fontSize: '18px' },
        md: { fontSize: '16px' },
        sm: { fontSize: '14px' },
        xs: { fontSize: '12px' },
    },
};
