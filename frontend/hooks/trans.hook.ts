import { useRouter } from 'next/router';

import content from '../assets/translations';

interface IContent {
    [key: string]: string;
}

interface ILocales {
    [key: string]: IContent;
}

type UseTransType = (value: string) => string;

const useTrans = (): UseTransType => {
    const router = useRouter();
    return (value: string): string => {
        return (content as ILocales)[router?.locale || 'en'][value] || String(value);
    };
};
export default useTrans;
