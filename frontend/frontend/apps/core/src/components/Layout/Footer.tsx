import { FC } from 'react';

import { Box, useColorModeValue } from '@chakra-ui/react';

export const Footer: FC = () => {
    return <Box as="footer" h={100} bg={useColorModeValue('gray.100', 'gray.800')} mt={20}></Box>;
};
