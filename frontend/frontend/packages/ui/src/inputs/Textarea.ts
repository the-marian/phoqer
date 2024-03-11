import { ComponentStyleConfig } from '@chakra-ui/theme';

export const Textarea: ComponentStyleConfig = {
    baseStyle: {
        border: '1px solid',
    },
    variants: {
        base: {
            borderColor: 'gray.400',

            _hover: {
                borderColor: 'gray.700',
            },

            _focus: {
                borderColor: 'primary.main',
                boxShadow: '0 0 0 2px var(--chakra-colors-primary-main)',
            },

            _dark: {
                bg: 'dark.body',
                borderColor: 'gray.800',

                _hover: {
                    borderColor: 'gray.500',
                },

                _focus: {
                    _hover: {
                        borderColor: 'primary.main',
                    },
                },
            },
        },
    },
    sizes: {
        sm: {
            borderRadius: '5px',
            fontSize: '0.7rem',
        },
        md: {
            field: {
                borderRadius: '6px',
                fontSize: '0.8rem',
            },
        },
        lg: {
            field: {
                fontSize: '0.9rem',
            },
        },
        xl: {
            px: 5,
            h: '4rem',
            borderRadius: '15px',
        },
    },
    defaultProps: {
        variant: 'base',
    },
};
