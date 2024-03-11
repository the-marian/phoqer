import { FC } from 'react';

import { MainLayout } from '@app/components/Layout';
import { Button, Center, Heading, HStack, Stack } from '@chakra-ui/react';
import Link from 'next/link';

const NotFoundPage: FC = () => {
    return (
        <MainLayout spacing={10}>
            <Center h="100vh" w="100vw">
                <Stack alignItems="center" spacing={10}>
                    <Heading size="lg">This page is not exist</Heading>

                    <HStack>
                        <Button as={Link} size="lg" variant="pill" href="/">
                            Go to home page
                        </Button>
                    </HStack>
                </Stack>
            </Center>
        </MainLayout>
    );
};

export default NotFoundPage;
