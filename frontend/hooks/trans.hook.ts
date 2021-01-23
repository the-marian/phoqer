import { useRouter } from 'next/router';

import content from '../public/content';

interface IContent {
    [key: string]: string;
}

const useTrans = (): IContent => {
    const router = useRouter();
    return content[router.locale];
};

export default useTrans;
