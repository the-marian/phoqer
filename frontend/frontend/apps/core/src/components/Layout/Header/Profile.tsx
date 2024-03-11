import React, { FC } from 'react';

import { useAuth } from '@app/providers';
import { Menu, MenuItem, MenuButton, MenuList, Avatar, MenuDivider, Icon, Stack, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useGetProfile } from 'query';
import { MdOutlineBookmarks, MdOutlineLogout, MdOutlineManageAccounts, MdOutlinePersonOutline } from 'react-icons/md';
import { PiChatsBold } from 'react-icons/pi';

import { ProfileLoader } from './ProfileLoader';

export const Profile: FC = () => {
    const { onLogout } = useAuth();
    const { data, isLoading } = useGetProfile();

    if (isLoading || !data) {
        return <ProfileLoader />;
    }

    return (
        <Menu isLazy size="lg">
            <MenuButton>
                <Avatar size="sm" src={data.avatar ?? undefined} name={`${data.firstName} ${data.lastName}`} />
            </MenuButton>

            <MenuList minW="300px">
                <Stack p={4} spacing={1}>
                    <Heading size="sm">
                        {data.firstName} {data.lastName}
                    </Heading>
                    <Text size="sm" color="gray.600" _dark={{ color: 'gray.500' }}>
                        {data.email}
                    </Text>
                </Stack>

                <MenuDivider />

                <MenuItem as={Link} href="/chats" icon={<Icon as={PiChatsBold} boxSize="20px" />}>
                    Messages
                </MenuItem>

                <MenuItem as={Link} href="/favorite" icon={<Icon as={MdOutlineBookmarks} boxSize="20px" />}>
                    Favorite offers
                </MenuItem>

                <MenuDivider />

                <MenuItem as="a" href="/author" icon={<Icon as={MdOutlineManageAccounts} boxSize="20px" />}>
                    Author account
                </MenuItem>

                <MenuItem as="a" href="/client" icon={<Icon as={MdOutlinePersonOutline} boxSize="20px" />}>
                    Your account
                </MenuItem>

                <MenuDivider />
                <MenuItem onClick={onLogout} icon={<Icon as={MdOutlineLogout} boxSize="20px" />}>
                    Log Out
                </MenuItem>
            </MenuList>
        </Menu>
    );
};
