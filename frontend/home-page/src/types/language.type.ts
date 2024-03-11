export enum LANGUAGE_ENUM {
    EN = 'en-US',
    PL = 'pl',
    UA = 'uk',
}

export interface IContent {
    [key: string]: string;
}

export type IVocabulary = Record<LANGUAGE_ENUM, IContent>;
