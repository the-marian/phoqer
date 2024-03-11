import { FC, PropsWithChildren } from 'react';

import { usePrevLocation } from '@app/providers';
import { Center, HStack, Icon, IconButton, Stack, useColorModeValue } from '@chakra-ui/react';
import { LogoIcon } from 'common';
import Link from 'next/link';
import { MdClose, MdArrowBack } from 'react-icons/md';

export const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
    const { path } = usePrevLocation();

    return (
        <Stack minH="100vh">
            <HStack
                px={5}
                py={2}
                h="65px"
                borderBottom="1px solid"
                borderColor="chakra-border-color"
                justifyContent="space-between"
            >
                <HStack spacing={6}>
                    <IconButton as={Link} size="sm" href={path} variant="icon" aria-label="Close">
                        <MdArrowBack />
                    </IconButton>
                    <IconButton as={Link} display="flex" alignItems="center" variant="unstyled" href="/" aria-label="Home page">
                        <Icon as={LogoIcon} color={useColorModeValue('primary.main', 'green.400')} h="1.5rem" w="auto" mt={0.5} />
                    </IconButton>
                </HStack>

                <IconButton as={Link} size="sm" href={path} variant="icon" aria-label="Close">
                    <MdClose />
                </IconButton>
            </HStack>
            <Center flex={1}>{children}</Center>
        </Stack>
    );
};
