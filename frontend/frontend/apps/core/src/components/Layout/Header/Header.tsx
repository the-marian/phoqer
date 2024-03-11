import React, { FC } from 'react';

import { useAuth } from '@app/providers';
import { IconButton, HStack, useColorMode, Icon, useColorModeValue, Tooltip } from '@chakra-ui/react';
import { LogoIcon } from 'common';
import Link from 'next/link';
import { MdLightbulbOutline, MdOutlineLibraryAdd } from 'react-icons/md';

import { Auth } from './Auth';
import { Profile } from './Profile';
import { ProfileLoader } from './ProfileLoader';

export const Header: FC = () => {
    const { toggleColorMode } = useColorMode();
    const { isAuth, isReady } = useAuth();

    return (
        <HStack
            p={4}
            as="header"
            justifyContent="space-between"
            borderBottom="1px solid"
            borderColor={useColorModeValue('gray.400', 'gray.700')}
        >
            <IconButton as={Link} display="flex" alignItems="center" variant="unstyled" href="/" aria-label="Home page">
                <Icon as={LogoIcon} color={useColorModeValue('primary.main', 'green.400')} h="1.5rem" w="auto" mt={0.5} />
            </IconButton>

            <HStack spacing={6}>
                <IconButton variant="icon" aria-label="Toggle theme" onClick={toggleColorMode}>
                    <MdLightbulbOutline />
                </IconButton>

                {isReady ? (
                    isAuth ? (
                        <>
                            <Tooltip label="Create new offer">
                                <IconButton variant="icon" aria-label="Create new offer" as="a" href="/author/offers/new">
                                    <MdOutlineLibraryAdd />
                                </IconButton>
                            </Tooltip>
                            <Profile />
                        </>
                    ) : (
                        <Auth />
                    )
                ) : (
                    <ProfileLoader />
                )}
            </HStack>
        </HStack>
    );
};
