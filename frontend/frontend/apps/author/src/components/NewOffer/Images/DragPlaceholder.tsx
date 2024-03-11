import { FC } from 'react';

import { Center, Heading, Icon, Stack } from '@chakra-ui/react';
import { LuImagePlus } from 'react-icons/lu';

export const DragPlaceholder: FC = () => {
    return (
        <Center
            position="absolute"
            top={0}
            left="1rem"
            w="calc(100% - 2rem)"
            h="calc(100% - 1rem)"
            borderRadius="md"
            bg="gray.200"
            zIndex="modal"
            border="3px solid"
            borderColor="primary.main"
            _dark={{ bg: 'gray.700', borderColor: 'common.white' }}
        >
            <Stack alignItems="center" spacing={4} color="primary.main" _dark={{ color: 'common.white' }}>
                <Icon as={LuImagePlus} boxSize="40px" />
                <Heading as="h3" color="primary.main">
                    Drop the files here ...
                </Heading>
            </Stack>
        </Center>
    );
};
