import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

export const Container = defineStyleConfig({
    sizes: {
        xs: defineStyle({
            maxW: '400px',
        }),
        sm: defineStyle({
            maxW: '500px',
        }),
        md: defineStyle({
            maxW: '800px',
        }),
        lg: defineStyle({
            maxW: '1200px',
        }),
        xl: defineStyle({
            maxW: '1400px',
        }),
        '2xl': defineStyle({
            maxW: '1800px',
        }),
        '3xl': defineStyle({
            maxW: '2056px',
        }),
    },
});
