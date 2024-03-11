import { ComponentStyleConfig } from '@chakra-ui/theme';

export const Checkbox: ComponentStyleConfig = {
    baseStyle: {
        control: {
            borderRadius: '3px',
            border: '1px solid',
            borderColor: 'common.black',
            bg: 'common.white',

            _hover: {
                bg: 'common.white',
            },

            _checked: {
                bg: 'common.black',

                _hover: {
                    bg: 'common.black',
                },
            },
            _active: {
                bg: 'common.black',
            },
            _disabled: {
                bg: 'gray.300',
                borderColor: 'gray.400',
            },

            _dark: {
                _checked: {
                    bg: 'common.white',

                    _hover: {
                        bg: 'common.white',
                    },
                },
                _active: {
                    bg: 'common.white',
                },
            },
        },
    },
    sizes: {
        sm: {
            control: {
                h: 3.5,
                w: 3.5,
            },
        },
        md: {
            control: {
                h: 5,
                w: 5,
            },
        },
        lg: {
            control: {
                h: 7,
                w: 7,
            },
        },
    },
    defaultProps: {
        size: 'md',
    },
};
