import { FC, useEffect } from 'react';

import { useRouter } from 'next/router';

const Auth: FC = () => {
    const router = useRouter();
    useEffect(() => {
        router.push('/authorization/login');
    }, [router]);

    return <></>;
};

export default Auth;
