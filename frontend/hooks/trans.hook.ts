import { useRouter } from 'next/router';

import content from '../translations';

interface IContent {
    [key: string]: string;
}

interface ILocales {
    [key: string]: IContent;
}

type UseTransType = (value: string) => string;

const useTrans =
    (): UseTransType =>
    (value: string): string => {
        const router = useRouter();
        return (content as ILocales)[router?.locale || 'en'][value] || String(value);
    };

export default useTrans;
