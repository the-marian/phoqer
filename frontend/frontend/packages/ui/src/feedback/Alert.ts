import { ComponentStyleConfig } from '@chakra-ui/theme';

export const Alert: ComponentStyleConfig = {
    parts: ['container', 'title', 'description', 'icon'],
    baseStyle: {
        container: {
            position: 'relative',

            bg: 'common.white',
            color: 'common.black',

            display: 'flex',
            borderColor: 'neutral.200',
            borderWidth: '1px',
            borderRadius: 6,
            width: '100%',
            maxWidth: '400px',
            p: 4,

            '[aria-label="Close"]': {
                position: 'absolute',
                right: 3,
                top: 3,
            },

            _dark: {
                bg: 'gray.700',
                color: 'common.white',
                borderColor: 'gray.700',
            },
        },
        title: {
            mr: 8,
            fontWeight: 500,
            fontSize: '18px',
        },
        icon: {
            mr: '10px',
            mt: '5px',
            boxSize: '16px',
        },
        description: {
            fontSize: '14px',
            color: 'text.secondary',
        },
    },
    variants: {
        warning: {
            icon: {
                color: 'yellow.700',

                _dark: {
                    color: 'yellow.200',
                },
            },
        },
        success: {
            description: {
                color: 'common.black',

                _dark: {
                    color: 'common.white',
                },
            },
            icon: {
                color: 'green.700',

                _dark: {
                    color: 'green.200',
                },
            },
        },
        error: {
            description: {
                color: 'common.black',

                _dark: {
                    color: 'common.white',
                },
            },
            icon: {
                color: 'red.700',

                _dark: {
                    color: 'red.200',
                },
            },
        },
    },
};
