import React from 'react';

import classNames from 'classnames';
import { SyncIcon, CloseIcon, Button } from 'phoqer';
import { useTranslation } from 'react-i18next';

import { Cell } from 'src/pages/settings/common/cell/cell';

import css from './auth-services.module.scss';
import { Facebook } from './icons/facebook';
import { Google } from './icons/google';

export const AuthServices = (): JSX.Element => {
    const { t } = useTranslation();

    return (
        <Cell title={t('Auth services')}>
            <div className={css.flex}>
                <div className={css.google}>
                    <Google />
                </div>

                <div className={classNames(css.status, css.active)} />
                <p className={css.title}>{t('Google')}</p>

                <Button className={css.btn} outline>
                    {t('Disconnect')}
                    <CloseIcon />
                </Button>
            </div>

            <div className={css.flex}>
                <div className={css.facebook}>
                    <Facebook />
                </div>

                <div className={classNames(css.status, css.disabled)} />
                <p className={css.title}>{t('Facebook')}</p>

                <Button className={css.btn} outline>
                    {t('Connect')}
                    <SyncIcon />
                </Button>
            </div>
        </Cell>
    );
};
