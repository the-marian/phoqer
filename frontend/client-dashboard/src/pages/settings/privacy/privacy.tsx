import React, { lazy, Suspense } from 'react';

import { Button, Link, PassIcon, MailIcon, useOpen } from 'phoqer';
import { useTranslation } from 'react-i18next';

import { Cell } from 'src/pages/settings/common/cell/cell';

import css from './privacy.module.scss';

const ChangePassword = lazy(() => import('./change-password/change-password'));

export const Privacy = (): JSX.Element => {
    const { t, i18n } = useTranslation();

    const { open, onOpen, onClose } = useOpen();

    return (
        <Cell title={t('Privacy')}>
            <div className={css.inner}>
                <p className={css.text}>
                    {t(
                        'If you suspect that someone may have gained access to your password, you should urgently change it to a new one. If you know your old password, click on the button below',
                    )}
                </p>
                <Button outline onClick={onOpen}>
                    {t('Change password')}
                    <PassIcon />
                </Button>

                <p className={css.text}>
                    {t("Don't remember your old password? Click here to receive an email and change your password")}
                </p>
                <Link outline href={`/${i18n.language}/auth/login`}>
                    {t('Send email')}
                    <MailIcon />
                </Link>

                <Suspense fallback={null}>
                    <ChangePassword open={open} onClose={onClose} />
                </Suspense>
            </div>
        </Cell>
    );
};
