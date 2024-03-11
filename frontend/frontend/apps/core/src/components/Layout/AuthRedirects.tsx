import { FC, ReactNode } from 'react';

import { useAuth } from '@app/providers';
import { Center, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';

interface Props {
    children: ReactNode;
}
export const PrivatePage: FC<Props> = ({ children }) => {
    const { replace } = useRouter();
    const { isAuth, isReady } = useAuth();

    if (!isReady) {
        return (
            <Center h="100vh" w="100%">
                <Spinner />
            </Center>
        );
    }

    if (!isAuth && isReady) {
        replace('/');
        return <></>;
    }

    return children;
};

export const ProtectedPage: FC<Props> = ({ children }) => {
    const { replace } = useRouter();
    const { isAuth, isReady } = useAuth();

    if (!isReady) {
        return (
            <Center h="100vh" w="100%">
                <Spinner />
            </Center>
        );
    }

    if (isAuth && isReady) {
        replace('/');
        return <></>;
    }

    return children;
};
