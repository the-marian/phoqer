import { useRouter } from 'next/router';

import months from '../utils/months';

const useMonths = (): string[] => {
    const router = useRouter();
    return months[router.locale || 'en'];
};

export default useMonths;
