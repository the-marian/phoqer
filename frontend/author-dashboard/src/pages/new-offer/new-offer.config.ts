import { NewOfferData } from './new-offer.types';

export const MAX_FILE_SIZE = 20_000_000; // 20 mb
export const MAX_FILES = 20;

export const defaultData: NewOfferData = {
    id: 'new',
    title: '',
    description: '',
    category: null,
    price: '',
    images: [],
};

export const STORAGE_KEY = 'new-offer-key';
