import { useRouter } from 'next/router';

import content from '../translate';

interface IContent {
    [key: string]: string;
}

interface ILocales {
    [key: string]: IContent;
}

const useTrans = (): IContent => {
    const router = useRouter();
    return (content as ILocales)[router.locale || 'en'];
};

export default useTrans;
