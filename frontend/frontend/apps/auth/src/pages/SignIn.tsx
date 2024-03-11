import { FC } from 'react';

import { Stack, Collapse, useDisclosure, SlideFade } from '@chakra-ui/react';

import { Controller, Services, ToggleEmail } from '../components';

export const SignIn: FC = () => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <SlideFade
            in
            offsetY="15%"
            style={{ height: '100%', width: '100%', maxWidth: '500px' }}
            transition={{ enter: { duration: 0.5, delay: 0.2 } }}
        >
            <Stack w="100%" spacing={0} py={16}>
                <Collapse in={!isOpen} animateOpacity>
                    <Services />
                </Collapse>

                <ToggleEmail isOpen={isOpen} onToggle={onToggle} />

                <Collapse in={isOpen} animateOpacity>
                    <Controller index={1} />
                </Collapse>
            </Stack>
        </SlideFade>
    );
};
