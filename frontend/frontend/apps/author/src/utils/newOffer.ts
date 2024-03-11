import { NewOfferData } from '../types';

export const defaultData: NewOfferData = {
    title: '',
    description: '',
    category: null,
    price: '',
    images: [],
};

export const STORAGE_KEY = 'NewOffer-storage-key';

export const getFormData = (): NewOfferData => {
    try {
        const jsonData = localStorage.getItem(STORAGE_KEY);

        if (!jsonData) {
            return defaultData;
        }

        return JSON.parse(jsonData) as NewOfferData;
    } catch {
        console.log('utils/newOffer.ts - getFormData');
        return defaultData;
    }
};

export const setFormData = (value: Partial<NewOfferData>, onSuccess?: () => void): NewOfferData => {
    const prev = getFormData();
    const data = { ...prev, ...value };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    onSuccess?.();
    return data;
};

export const resetFormData = (): void => {
    localStorage.setItem(STORAGE_KEY, '');
};
