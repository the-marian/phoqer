import { FC } from 'react';

import { DrawerContent as ChakraDrawerContent, DrawerContentProps } from '@chakra-ui/react';

export const DrawerContent: FC<DrawerContentProps> = props => {
    return (
        <ChakraDrawerContent
            m={5}
            minW="500px"
            borderRadius="0.8rem"
            border="1px solid"
            borderColor="gray.400"
            bg="light.body"
            _dark={{
                borderColor: 'gray.800',
                bg: 'dark.body',
            }}
            {...props}
        />
    );
};
