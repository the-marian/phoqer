import { createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useCallback, useContext, useState } from 'react';

import { useToast } from '@chakra-ui/react';

import { Steps, NewOfferData } from '../types';
import { getFormData, resetFormData, setFormData } from '../utils';

export interface NewOfferContextType {
    step: Steps;
    setStep: Dispatch<SetStateAction<Steps>>;
    data: NewOfferData;
    setData: (value: Partial<NewOfferData>) => void;
    showToastMessage: () => void;
    errorWrapper: (callback: () => void) => void;
    onReset: () => void;
}

export const NewOfferContext = createContext<NewOfferContextType>({} as NewOfferContextType);

export const NewOfferProvider: FC<PropsWithChildren> = ({ children }) => {
    const toast = useToast();

    const [step, setStep] = useState<Steps>(Steps.Title);
    const [data, setData] = useState<NewOfferData>(getFormData);

    const handleSetData = (value: Partial<NewOfferData>): void => {
        setData(setFormData(value));
    };

    const showToastMessage = useCallback(() => {
        toast({
            status: 'success',
            variant: 'success',
            description: 'Data saved successfully',
        });
    }, []);

    const errorWrapper = useCallback((callback: () => void) => {
        toast.closeAll();
        try {
            callback();
        } catch (err) {
            console.dir(err);
            toast({
                status: 'error',
                variant: 'error',
                description: 'Error while saving data',
            });
        }
    }, []);

    const onReset = useCallback(() => {
        resetFormData();
        setData({} as NewOfferData);
    }, []);

    return (
        <NewOfferContext.Provider
            value={{ step, setStep, data, setData: handleSetData, showToastMessage, errorWrapper, onReset }}
        >
            {children}
        </NewOfferContext.Provider>
    );
};

export const useNewOffer = (): NewOfferContextType => {
    return useContext(NewOfferContext);
};
