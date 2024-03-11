import { FC } from 'react';

import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, SlideFade, useColorModeValue } from '@chakra-ui/react';

import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

interface Props {
    index: number;
}
export const Controller: FC<Props> = ({ index }) => {
    const selectedStyles = {
        bg: useColorModeValue('gray.100', 'gray.800'),
        color: useColorModeValue('primary.main', 'green.400'),
    };

    return (
        <Box pt={6}>
            <Tabs
                py={8}
                isLazy
                size="lg"
                borderRadius={9}
                defaultIndex={index}
                variant="soft-rounded"
                border="1px solid"
                borderColor="gray.500"
            >
                <TabList justifyContent="center">
                    <Tab px={10} fontSize="14px" _selected={selectedStyles}>
                        Log In
                    </Tab>
                    <Tab px={10} fontSize="14px" _selected={selectedStyles}>
                        Sign Up
                    </Tab>
                </TabList>

                <TabPanels px={4}>
                    <TabPanel>
                        <SlideFade in offsetY="10%" transition={{ enter: { duration: 0.5 } }}>
                            <LoginForm />
                        </SlideFade>
                    </TabPanel>
                    <TabPanel>
                        <SlideFade in offsetY="10%" transition={{ enter: { duration: 0.5 } }}>
                            <SignupForm />
                        </SlideFade>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
};
