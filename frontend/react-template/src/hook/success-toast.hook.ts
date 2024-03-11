import { useCallback } from 'react';

import { nanoid } from 'nanoid';
import { toast } from 'phoqer';
import { useTranslation } from 'react-i18next';

import { TOAST_SM_TIMEOUT } from 'src/constants/toast.constants';

interface ToastButton {
    label: string;
    onClick: () => void;
}

type SuccessToastType = (content: string, extra?: Partial<ToastButton>) => void;
export const useSuccessToast = (): SuccessToastType => {
    const { t } = useTranslation();

    return useCallback(
        (content, extra) => {
            toast.success({
                content,
                id: nanoid(),
                title: t('Success'),
                timeout: TOAST_SM_TIMEOUT,
                button: {
                    close: {
                        label: t('Close'),
                    },
                    extra,
                },
            });
        },
        [t],
    );
};
