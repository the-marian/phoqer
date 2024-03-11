import React, { useState } from 'react';

import { NewOfferContext } from 'src/context/new-offer.context';
import { Description } from 'src/pages/new-offer/description/description';
import { Done } from 'src/pages/new-offer/done/done';
import { Images } from 'src/pages/new-offer/images/images';
import { NewOfferData, Steps } from 'src/pages/new-offer/new-offer.types';
import { getFormData, setFormData } from 'src/pages/new-offer/new-offer.utils';
import { Parameters } from 'src/pages/new-offer/parameters/parameters';
import { Preview } from 'src/pages/new-offer/preview/preview';
import { SortOffer } from 'src/pages/new-offer/sort-offer/sort-offer';
import { Title } from 'src/pages/new-offer/title/title';

const stepsMap: Record<string, JSX.Element> = {
    [Steps.Title]: <Title />,
    [Steps.Description]: <Description />,
    [Steps.Parameters]: <Parameters />,
    [Steps.Images]: <Images />,
    [Steps.SortOffer]: <SortOffer />,
    [Steps.Preview]: <Preview />,
    [Steps.Done]: <Done />,
};

export const NewOfferPage = (): JSX.Element => {
    const [step, setStep] = useState<Steps>(Steps.Title);
    const [data, setData] = useState<NewOfferData>(getFormData());

    const handleSetData = (value: Partial<NewOfferData>): void => {
        const newData = setFormData(value);
        setData(newData);
    };

    return (
        <NewOfferContext.Provider value={{ step, setStep, data, setData: handleSetData }}>
            {stepsMap[step]}
        </NewOfferContext.Provider>
    );
};

export default NewOfferPage;
