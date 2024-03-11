import { FC, ReactNode } from 'react';

import { useNewOffer } from '@author/providers';
import { Steps } from '@author/types';

import { Description } from './Description';
import { Done } from './Done';
import { Images } from './Images';
import { Parameters } from './Parameters';
import { Title } from './Title';

const stepsMap: Record<string, ReactNode> = {
    [Steps.Title]: <Title />,
    [Steps.Description]: <Description />,
    [Steps.Parameters]: <Parameters />,
    [Steps.Images]: <Images />,
    [Steps.Done]: <Done />,
};

export const NewOfferController: FC = () => {
    const { step } = useNewOffer();
    return <>{stepsMap[step]}</>;
};
