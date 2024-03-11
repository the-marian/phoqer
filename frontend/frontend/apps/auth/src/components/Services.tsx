import { FC } from 'react';

import { StackProps, HStack, Stack, useColorModeValue, Heading, useBoolean, Spinner } from '@chakra-ui/react';

import * as process from 'process';

import { FacebookIcon, GoogleIcon } from './Icons';

const ServiceButton: FC<StackProps & { provider: 'google' | 'facebook' }> = ({ provider, children, ...props }) => {
    const [isLoading, { on }] = useBoolean();

    const onLinkClick = () => {
        on();
        document.body.style.opacity = '0.5';
        document.body.style.pointerEvents = 'none';
    };

    return (
        <HStack
            p={4}
            w="100%"
            as="a"
            h="unset"
            border="1px solid"
            onClick={onLinkClick}
            borderRadius="0.4rem"
            justifyContent="center"
            borderColor={useColorModeValue('gray.400', 'gray.700')}
            href={`${process.env.NEXT_PUBLIC_BACK_URL}/auth?provider=${provider}`}
            _hover={{
                borderColor: useColorModeValue('gray.600', 'gray.500'),
            }}
            {...props}
        >
            {isLoading ? <Spinner size="sm" /> : children}
        </HStack>
    );
};

export const Services: FC = () => {
    return (
        <Stack w="100%" spacing={4} pb={10}>
            <ServiceButton provider="google">
                <GoogleIcon boxSize="20px" />
                <Heading size="sm">Login with Google</Heading>
            </ServiceButton>
            <ServiceButton provider="facebook">
                <FacebookIcon boxSize="20px" color="facebook.500" />
                <Heading size="sm">Login with Facebook</Heading>
            </ServiceButton>
        </Stack>
    );
};
