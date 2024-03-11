import { useMemo } from 'react';

import { useTranslation } from 'react-i18next';

export const useStatusText = (): Record<string, string> => {
    const { t } = useTranslation();

    return useMemo(
        () => ({
            Done: t('Done'),
            Rejected: t('Rejected'),
            Pending: t('Pending'),
            Accepted: t('Accepted'),
            Progress: t('Progress'),
            Active: t('Active'),
            Disabled: t('Disabled'),
        }),
        [t],
    );
};
