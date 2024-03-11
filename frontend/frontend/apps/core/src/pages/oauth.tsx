import { FC, useEffect } from 'react';

import { Center, Spinner } from '@chakra-ui/react';
import { get } from 'lodash-es';
import { useRouter } from 'next/router';
import { jwt } from 'query';

const Oauth: FC = () => {
    const router = useRouter();

    const token = get(router, 'query.token', '') as string;
    const expired = get(router, 'query.expired', 0) as number;

    useEffect(() => {
        if (token && expired) {
            jwt.set({ token, expired });
            window.location.href = '/';
        }
    }, [token, expired]);

    return (
        <Center h="100vh">
            <Spinner />
        </Center>
    );
};

export default Oauth;
