import { FC } from 'react';

import { Avatar, Heading, HStack, Stack, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { User } from 'query';

interface Props {
    author: User;
}
export const Author: FC<Props> = ({ author }) => {
    const authorName = `${author.firstName} ${author.lastName}`;

    return (
        <HStack spacing={4}>
            <Avatar name={authorName} src={author.avatar ?? undefined} />
            <Stack spacing={1}>
                <Heading size="sm">{authorName}</Heading>
                <Text size="xs">Joined Phoqer: {dayjs(author.createdAt).format('MMMM D, YYYY')}</Text>
            </Stack>
        </HStack>
    );
};
