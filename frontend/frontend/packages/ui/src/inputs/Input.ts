import { ComponentStyleConfig } from '@chakra-ui/theme';

export const Input: ComponentStyleConfig = {
    baseStyle: {
        field: {
            border: '1px solid',
        },
    },
    variants: {
        base: {
            field: {
                borderColor: 'gray.500',

                _hover: {
                    borderColor: 'gray.600',
                },

                _focus: {
                    borderColor: 'primary.main',
                    boxShadow: '0 0 0 2px var(--chakra-colors-primary-main)',
                },

                _dark: {
                    bg: 'dark.body',
                    borderColor: 'gray.700',

                    _hover: {
                        borderColor: 'gray.100',
                    },

                    _focus: {
                        _hover: {
                            borderColor: 'primary.main',
                        },
                    },
                },
            },
        },
    },
    sizes: {
        sm: {
            field: {
                borderRadius: '5px',
                fontSize: '0.7rem',
            },
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
            field: {
                px: 5,
                h: '4rem',
                borderRadius: '15px',
            },
        },
    },
    defaultProps: {
        variant: 'base',
    },
};
