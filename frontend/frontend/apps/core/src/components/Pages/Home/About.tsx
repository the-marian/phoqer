import { FC } from 'react';

import { Image, Container, Heading, Text, Stack } from '@chakra-ui/react';

export const About: FC = () => {
    return (
        <Container as="section" size="lg" mt={10}>
            <Stack spacing={8}>
                <Image h="60vh" minH="40rem" w="100%" src="/about.jpeg" alt="phoqer" borderRadius="1rem" />

                <Stack>
                    <Heading size="lg">PHOQER</Heading>
                    <Text maxW="30rem">
                        Is an online advertising platform that brings people together to exchange goods and services
                    </Text>
                </Stack>
            </Stack>
        </Container>
    );
};
