import { FC } from 'react';

import { useAuthorOffers } from 'query';

export const Dashboard: FC = () => {
    const { data, isLoading } = useAuthorOffers({ status: 'pending' });

    if (isLoading) return <></>;

    console.log(data);
    return <></>;
};
