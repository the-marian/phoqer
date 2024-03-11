import { FC, ReactNode, useEffect, useRef } from 'react';

import { Box, BoxProps, Collapse, useBoolean } from '@chakra-ui/react';

interface Props extends BoxProps {
    toggler: ReactNode;
    isOpen?: boolean;
    startingHeight?: number;
    overlayBg?: string;
    overlayBgDark?: string;
}
export const Overflow: FC<Props> = ({ overlayBg, overlayBgDark, children, isOpen, toggler, startingHeight = 30, ...props }) => {
    const [withOverflow, { on }] = useBoolean();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        if (ref.current.scrollHeight - startingHeight > 0) {
            on();
        }
    }, [on, startingHeight]);

    return (
        <>
            <Collapse in={isOpen} startingHeight={withOverflow ? `${startingHeight}px` : '100%'} style={{ position: 'relative' }}>
                <Box ref={ref} {...props}>
                    {children}
                </Box>
                {!isOpen && withOverflow && (
                    <Box
                        h={32}
                        w="100%"
                        left={0}
                        bottom={0}
                        position="absolute"
                        bg={`linear-gradient(180deg, rgba(0,0,0,0) 8.29%, ${overlayBg || 'rgb(255, 255, 255)'} 100%)`}
                        _dark={{
                            bg: `linear-gradient(180deg, rgba(0,0,0,0) 8.29%, ${overlayBgDark || 'rgb(32,33,36)'} 100%)`,
                        }}
                    />
                )}
            </Collapse>

            {withOverflow && toggler}
        </>
    );
};
