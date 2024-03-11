import { FC } from 'react';

import { Center, Stack, Text } from '@chakra-ui/react';

import { UploadButton } from './UploadButton';

export const EmptyState: FC = () => {
    return (
        <Center>
            <Stack spacing={4} alignItems="center">
                <Text maxW="350px" textAlign="center">
                    Upload images for your offer. Drag &apos;n&apos; drop some files here, or click to select files
                </Text>

                <UploadButton />
            </Stack>
        </Center>
    );
};
