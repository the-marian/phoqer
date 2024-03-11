import { useRouter } from 'next/router';

import { LANGUAGE_ENUM } from '@app/types/language.type';

interface NavigationType {
    navigate: (path?: string) => void;
    locale: LANGUAGE_ENUM;
}
export const useNavigation = (onClose: () => void): NavigationType => {
    const router = useRouter();

    return {
        locale: router.locale as LANGUAGE_ENUM,
        navigate: (path?: string): void => {
            if (path) {
                router.push(path).finally(onClose);
            } else {
                onClose();
            }
        },
    };
};
