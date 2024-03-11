import { useCallback } from 'react';

import { nanoid } from 'nanoid';
import { toast } from 'phoqer';
import { useTranslation } from 'react-i18next';

import { COMMON_ERROR_TEXT, COMMON_ERROR_TITLE } from 'src/constants/error.constants';
import { TOAST_SM_TIMEOUT } from 'src/constants/toast.constants';

type ErrorToastType = () => void;
export const useErrorToast = (): ErrorToastType => {
    const { t } = useTranslation();

    return useCallback(() => {
        toast.error({
            id: nanoid(),
            title: t(COMMON_ERROR_TITLE),
            content: t(COMMON_ERROR_TEXT),
            timeout: TOAST_SM_TIMEOUT,
            button: {
                close: {
                    label: t('Close'),
                },
            },
        });
    }, [t]);
};
