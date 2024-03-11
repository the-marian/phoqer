import { FC, useEffect } from 'react';

import { useNewOffer } from '@author/providers';
import { Center, Heading, Stack, Text, Button } from '@chakra-ui/react';
import { useReward } from 'react-rewards';
import { Link } from 'react-router-dom';

export const Done: FC = () => {
    const { onReset } = useNewOffer();
    const { reward } = useReward('rewardId', 'confetti');

    useEffect(() => {
        reward();
        onReset();
    }, []);

    return (
        <Center pb="85px" h="calc(100vh - 65px)">
            <Stack p={20} maxW="600px" alignItems="center" textAlign="center" bg="green.200" borderRadius="xl">
                <Heading id="rewardId">Success!</Heading>
                <Text>
                    You have successfully created a offer. Now it is available on the site for other users. You can change it or
                    disable it at any time.
                </Text>

                <Button variant="pill" mt={8} size="lg" as={Link} to="/">
                    View offer
                </Button>
            </Stack>
        </Center>
    );
};
