import { ImageUploadStatus } from 'phoqer-shared';

import { defaultData, STORAGE_KEY } from 'src/pages/new-offer/new-offer.config';
import { NewOfferData } from 'src/pages/new-offer/new-offer.types';

export const getFormData = (): NewOfferData => {
    try {
        const jsonData = localStorage.getItem(STORAGE_KEY);

        if (!jsonData) {
            return defaultData;
        }

        return JSON.parse(jsonData) as NewOfferData;
    } catch {
        console.log('new-offer.utils.ts - getFormData');
        return defaultData;
    }
};

export const setFormData = (value: Partial<NewOfferData>): NewOfferData => {
    try {
        const prev = getFormData();
        const data = { ...prev, ...value };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

        return data;
    } catch {
        console.log('new-offer.utils.ts - setFormData');
        return defaultData;
    }
};

export const replaceHeadingTag = (value: string): string => {
    return value.replace(/h2>/, 'h3/>').replace(/h1>/, 'h2/>');
};

export const generateUploadImageFromUrl = (value: string): ImageUploadStatus => {
    const urlSplit = value.split('/');
    const fileName = urlSplit[urlSplit.length - 1] || '-';

    return {
        loading: false,
        error: false,
        done: true,
        url: value,
        file: new File([], fileName),
    };
};

export const reorder = <T>(list: T[], startIndex: number, endIndex: number): T[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};
