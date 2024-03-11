import { FC, PropsWithChildren } from 'react';

import { Center } from '@chakra-ui/react';

export const FormFooter: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Center
            bg="common.white"
            position="fixed"
            left={0}
            bottom={0}
            w="100%"
            p={2}
            h="85px"
            borderTop="1px solid"
            borderColor="gray.400"
            zIndex="modal"
        >
            {children}
        </Center>
    );
};
