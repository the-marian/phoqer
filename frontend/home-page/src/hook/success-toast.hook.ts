import { useCallback } from 'react';

import { nanoid } from 'nanoid';
import { toast } from 'phoqer';

import { useTranslation } from '@app/hook/translations.hook';
import { TOAST_SM_TIMEOUT } from 'src/constants/toast.constants';

type SuccessToastType = (content: string) => void;
export const useSuccessToast = (): SuccessToastType => {
    const { t } = useTranslation();

    return useCallback(content => {
        toast.success({
            content,
            id: nanoid(),
            title: t('Success'),
            timeout: TOAST_SM_TIMEOUT,
            button: {
                close: {
                    label: t('Close'),
                },
            },
        });
    }, []);
};
