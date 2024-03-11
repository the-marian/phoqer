import { createContext, Dispatch, SetStateAction, useContext } from 'react';

import { defaultData } from 'src/pages/new-offer/new-offer.config';
import { NewOfferData, Steps } from 'src/pages/new-offer/new-offer.types';

export interface NewOfferContextType {
    step: Steps;
    setStep: Dispatch<SetStateAction<Steps>>;
    data: NewOfferData;
    setData: (value: Partial<NewOfferData>) => void;
}

export const NewOfferContext = createContext<NewOfferContextType>({
    step: Steps.Title,
    setStep: () => undefined,
    data: defaultData,
    setData: () => undefined,
});

export const useNewOfferContext = (): NewOfferContextType => {
    return useContext(NewOfferContext);
};
