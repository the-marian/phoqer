import { forwardRef } from 'react';

import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react';

import { one, two, three } from './keyframes';

type Props = BoxProps & {
    delta?: number;
};
export const AnimatedBackground = forwardRef<HTMLDivElement, Props>(({ children, delta = 1, ...props }, ref) => {
    return (
        <Box
            ref={ref}
            position="relative"
            zIndex={0}
            overflow="hidden"
            boxShadow={useColorModeValue(
                '1px 1px 0px 0px var(--chakra-colors-gray-200)',
                '-1px -1px 0px 0px var(--chakra-colors-gray-600)',
            )}
            sx={{
                _after: {
                    content: '""',
                    position: 'absolute',
                    top: '-20px',
                    left: '-20px',
                    h: 'calc(100% + 40px)',
                    w: 'calc(100% + 40px)',
                    zIndex: 2,
                    bg: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(100px)',
                },
                ...(props.sx || {}),
            }}
            {...props}
        >
            <Box
                as="span"
                position="absolute"
                zIndex={1}
                transform="translate(-50%, -50%)"
                borderRadius="50%"
                h={`${20 * delta}vw`}
                w={`${20 * delta}vw`}
                bg="green"
                opacity={0.35}
                animation={`${one} 20s ease-in-out infinite`}
            />
            <Box
                as="span"
                position="absolute"
                zIndex={1}
                transform="translate(-50%, -50%)"
                borderRadius="50%"
                h={`${15 * delta}vw`}
                w={`${15 * delta}vw`}
                bg="blue"
                opacity={0.35}
                animation={`${two} 16s ease-in-out infinite`}
            />
            <Box
                as="span"
                position="absolute"
                zIndex={1}
                transform="translate(-50%, -50%)"
                borderRadius="50%"
                h={`${12 * delta}vw`}
                w={`${12 * delta}vw`}
                bg="red"
                opacity={0.35}
                animation={`${three} 22s ease-in-out infinite`}
            />

            <Box position="relative" zIndex={3}>
                {children}
            </Box>
        </Box>
    );
});

AnimatedBackground.displayName = 'AnimatedBackground';
