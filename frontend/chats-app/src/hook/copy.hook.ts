import { nanoid } from 'nanoid';
import { toast, copyToClipboard } from 'phoqer';
import { useTranslation } from 'react-i18next';

type Copy = (text?: string) => Promise<void>;

export const useCopy = (): Copy => {
    const { t } = useTranslation();

    return async (text = '') => {
        try {
            await copyToClipboard(text);
            toast.success({
                id: nanoid(),
                title: t('Success'),
                content: t('Content copied to clipboard'),
                button: {
                    close: t('Close'),
                },
            });
        } catch (err) {
            console.log(err);
            toast.error({
                id: nanoid(),
                title: t('Error'),
                content: t('Oops. Failed to copy'),
                button: {
                    close: t('Close'),
                },
            });
        }
    };
};
