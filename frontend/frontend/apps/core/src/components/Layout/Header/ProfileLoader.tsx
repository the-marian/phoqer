import React, { FC } from 'react';

import { Skeleton } from '@chakra-ui/react';

export const ProfileLoader: FC = () => {
    return (
        <>
            <Skeleton boxSize="32px" borderRadius="50%" />
            <Skeleton boxSize="32px" borderRadius="50%" />
        </>
    );
};
