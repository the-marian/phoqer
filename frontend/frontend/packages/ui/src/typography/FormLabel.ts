import { ComponentStyleConfig } from '@chakra-ui/theme';

export const FormLabel: ComponentStyleConfig = {
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
        md: { fontSize: '16px' },
        sm: { fontSize: '14px' },
        xs: { fontSize: '12px' },
    },
    defaultProps: {
        size: 'sm',
    },
};
