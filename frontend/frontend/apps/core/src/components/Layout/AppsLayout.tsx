import { FC } from 'react';

import { StackProps, Stack } from '@chakra-ui/react';

import { Header } from './Header';

export const AppsLayout: FC<StackProps> = ({ children, ...props }) => {
    return (
        <>
            <Header />

            <Stack h="100%" flex={1} {...props}>
                {children}
            </Stack>
        </>
    );
};
