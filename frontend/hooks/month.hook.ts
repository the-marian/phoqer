import { useRouter } from 'next/router';

import months from '../assets/months';

const useMonths = (): string[] => {
    const router = useRouter();
    return months[router.locale || 'en'];
};

export default useMonths;
