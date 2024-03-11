import { FC } from 'react';

import { Stack, Center, Container, Heading, Text, Button, useColorModeValue } from '@chakra-ui/react';
import { AnimatedBackground } from 'common';
import Link from 'next/link';
import { MdSearch } from 'react-icons/md';

export const Banner: FC = () => {
    return (
        <Container size="3xl" as="section" pt={6}>
            <AnimatedBackground
                p={10}
                as={Center}
                h="70vh"
                minH="700px"
                borderRadius="1rem"
                bg={useColorModeValue('common.white', 'common.black')}
                overflow="unset"
            >
                <Container as={Stack} spacing={6} textAlign="center" alignItems="center">
                    <Heading size="2xl" as="h1">
                        # Share with others and earn
                    </Heading>
                    <Text size="lg">
                        Phoqer - Is an online advertising platform that brings people together to exchange goods and services
                    </Text>
                    <Button as={Link} href="/search" variant="pill" size="lg" leftIcon={<MdSearch />}>
                        Search offers
                    </Button>
                </Container>
            </AnimatedBackground>
        </Container>
    );
};
