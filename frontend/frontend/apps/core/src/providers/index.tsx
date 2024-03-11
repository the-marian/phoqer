import React, { FC, PropsWithChildren } from 'react';

import { Font, Icons } from '@app/components/Meta';
import { AuthProvider } from '@app/providers/AuthProvider';
import { PrevLocationProvider } from '@app/providers/PrevLocationProvider';
import { ChakraProvider, ColorModeScript, Flex, localStorageManager, cookieStorageManagerSSR } from '@chakra-ui/react';
import { Noto_Sans } from 'next/font/google';
import { QueryProvider } from 'query';
import { theme } from 'ui';

export * from './PrevLocationProvider';
export * from './AuthProvider';

const font = Noto_Sans({ subsets: ['latin'], weight: ['400', '500', '500', '600', '700'], style: ['normal', 'italic'] });

type Props = PropsWithChildren<{ cookies?: string }>;
export const Providers: FC<Props> = ({ children, cookies }) => {
    const colorModeManager = typeof cookies === 'string' ? cookieStorageManagerSSR(cookies) : localStorageManager;

    return (
        <QueryProvider>
            <PrevLocationProvider>
                <AuthProvider>
                    <ChakraProvider theme={theme} colorModeManager={colorModeManager}>
                        <ColorModeScript initialColorMode={theme.config.initialColorMode} />

                        <Font heading={font.style.fontFamily} body={font.style.fontFamily} />
                        <Icons />

                        <Flex as="main" flexDirection="column" minH="100vh" className={font.className}>
                            {children}
                        </Flex>
                    </ChakraProvider>
                </AuthProvider>
            </PrevLocationProvider>
        </QueryProvider>
    );
};
