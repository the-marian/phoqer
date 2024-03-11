import { ComponentStyleConfig } from '@chakra-ui/theme';

export const Button: ComponentStyleConfig = {
    baseStyle: {
        fontWeight: 500,
    },
    variants: {
        primary: {
            bg: 'common.black',
            border: '1px solid',
            borderColor: 'gray.400',
            color: 'common.white',
            borderRadius: '6px',
            svg: {
                fontSize: '1.4em',
            },

            _hover: {
                bg: 'gray.600',
            },

            _active: {
                borderColor: 'common.black',
                bg: 'common.black',
            },

            _dark: {
                bg: 'gray.100',
                borderColor: 'gray.100',
                color: 'common.black',

                _hover: {
                    bg: 'gray.400',
                },
                _active: {
                    bg: 'gray.300',
                },
            },
        },
        green: {
            bg: 'green.600',
            border: '1px solid',
            borderColor: 'green.600',
            color: 'common.white',
            svg: {
                fontSize: '1.4em',
            },

            _hover: {
                bg: 'green.500',
            },

            _active: {
                borderColor: 'common.black',
                bg: 'green.700',
            },
        },
        pill: {
            bg: 'primary.main',
            border: '1px solid',
            borderColor: 'primary.main',
            color: 'common.white',
            borderRadius: '3rem',

            _disabled: {
                bg: 'primary.main !important',

                _hover: {
                    bg: 'primary.main !important',
                },
            },

            svg: {
                fontSize: '1.4em',
            },

            _hover: {
                bg: 'primary.hover',
            },

            _active: {
                bg: 'common.black',
            },
        },
        link: {
            p: 0,
            bg: 'transparent',
            border: 'none',
            color: 'text.main',
            fontSize: '0.9em',
            fontWeight: 600,
            _hover: {
                color: 'gray.800',
            },
            _dark: {
                color: 'gray.500',

                _hover: {
                    color: 'gray.400',
                },
            },
        },
        secondary: {
            bg: 'common.white',
            border: '1px solid',
            borderColor: 'gray.500',
            color: 'common.black',
            borderRadius: '6px',

            _hover: {
                borderColor: 'gray.700',
            },
            _active: {
                borderColor: 'common.black',
            },

            _dark: {
                bg: 'dark.body',
                borderColor: 'gray.700',
                color: 'common.white',

                _hover: {
                    bg: 'gray.700',
                    borderColor: 'gray.100',
                },
                _active: {
                    borderColor: 'gray.400',
                },
            },
        },
        ghost: {
            position: 'relative',
            color: 'common.black',
            bg: 'transparent',

            _before: {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                height: '100%',
                width: '100%',
                borderRadius: 'md',
                bg: 'gray.100',
                zIndex: -1,
            },

            _after: {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) scale(0)',
                height: '100%',
                width: '100%',
                borderRadius: 'md',
                bg: 'gray.300',
                zIndex: -1,
                transition: '0.1s ease-in-out',
            },

            _hover: {
                bg: 'transparent',
                _after: {
                    transform: 'translate(-50%, -50%) scale(1)',
                },
            },

            _active: {
                bg: 'transparent',
                _after: {
                    bg: 'gray.400',
                },
            },

            _dark: {
                color: 'common.white',

                _before: {
                    bg: 'gray.700',
                },

                _after: {
                    bg: 'gray.700',
                },

                _hover: {
                    _after: {
                        bg: 'gray.600',
                    },
                },

                _active: {
                    _after: {
                        bg: 'gray.500',
                    },
                },
            },
        },
        icon: {
            position: 'relative',
            borderRadius: '50%',
            color: 'common.black',

            svg: {
                position: 'relative',
                zIndex: 1,
                boxSize: '1.75em',
            },

            _before: {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) scale(0)',
                height: '120%',
                width: '120%',
                borderRadius: '50%',
                bg: 'gray.200',
                transition: '0.1s ease-in-out',
            },

            _hover: {
                _before: {
                    transform: 'translate(-50%, -50%) scale(1)',
                },
            },

            _active: {
                _before: {
                    bg: 'gray.400',
                },
            },

            _dark: {
                color: 'common.white',

                _before: {
                    bg: 'gray.700',
                },

                _hover: {
                    _before: {
                        bg: 'gray.600',
                    },
                },

                _active: {
                    _before: {
                        bg: 'gray.500',
                    },
                },
            },
        },
        'icon-ghost': {
            position: 'relative',
            borderRadius: '50%',
            color: 'common.black',

            svg: {
                position: 'relative',
                zIndex: 1,
                boxSize: '1.75em',
            },

            _before: {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) scale(0.8)',
                height: '120%',
                width: '120%',
                borderRadius: '50%',
                bg: 'gray.200',
                transition: '0.1s ease-in-out',
            },

            _hover: {
                _before: {
                    bg: 'gray.300',
                    transform: 'translate(-50%, -50%) scale(1)',
                },
            },

            _active: {
                _before: {
                    bg: 'gray.400',
                },
            },

            _dark: {
                color: 'common.white',

                _before: {
                    bg: 'gray.700',
                },

                _hover: {
                    _before: {
                        bg: 'gray.600',
                    },
                },

                _active: {
                    _before: {
                        bg: 'gray.500',
                    },
                },
            },
        },
    },
    sizes: {
        md: {
            fontSize: '0.85rem',
        },
        lg: {
            fontSize: '1rem',
        },
    },
    defaultProps: {
        size: 'sm',
        variant: 'primary',
    },
};
