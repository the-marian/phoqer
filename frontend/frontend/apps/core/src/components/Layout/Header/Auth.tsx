import { FC } from 'react';

import { Button } from '@chakra-ui/react';
import Link from 'next/link';

export const Auth: FC = () => {
    return (
        <>
            <Button variant="secondary" as={Link} href="/auth/login">
                Log In
            </Button>
            <Button as={Link} href="/auth/signin">
                Sign In
            </Button>
        </>
    );
};
