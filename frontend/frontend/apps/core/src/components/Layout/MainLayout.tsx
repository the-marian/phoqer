import { FC } from 'react';

import { Footer } from '@app/components/Layout/Footer';
import { StackProps, Stack } from '@chakra-ui/react';

import { Header } from './Header';

export const MainLayout: FC<StackProps> = ({ children, ...props }) => {
    return (
        <>
            <Header />

            <Stack h="100%" flex={1} {...props}>
                {children}
            </Stack>

            <Footer />
        </>
    );
};
