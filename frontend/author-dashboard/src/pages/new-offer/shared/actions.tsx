import React, { ReactNode } from 'react';

import { nanoid } from 'nanoid';
import { SaveIcon, Button, DeleteIcon, toast, Tooltip } from 'phoqer';
import { useTranslation } from 'react-i18next';

import { TOAST_SM_TIMEOUT } from 'src/constants/toast.constants';

import css from './shared.module.scss';

interface Props {
    onReset?: () => void;
    onSave?: () => void;
    children?: ReactNode;
}

export const Actions = ({ onReset, onSave, children }: Props): JSX.Element => {
    const { t } = useTranslation();

    const handleSave = (): void => {
        if (!onSave) return;

        onSave();
        toast.success({
            id: nanoid(),
            content: t('You have successfully saved your offer. Now you can go back and finish it at any time'),
            timeout: TOAST_SM_TIMEOUT,
            button: {
                close: {
                    label: t('Close'),
                },
            },
        });
    };

    return (
        <div className={css.actions}>
            {onSave && (
                <Tooltip label={t('Save your changes. Once saved, you can return to this form at any time')} position="bottom">
                    <Button className={css.actionsBtn} onlyIcon format="link" onClick={handleSave}>
                        <SaveIcon />
                    </Button>
                </Tooltip>
            )}

            {onReset && (
                <Tooltip label={t('Delete your changes')} position="bottom">
                    <Button className={css.actionsBtn} onlyIcon format="link" onClick={onReset}>
                        <DeleteIcon />
                    </Button>
                </Tooltip>
            )}

            {children}
        </div>
    );
};
