import React from 'react';

import classNames from 'classnames';
import { Text, Title } from 'phoqer';
import { Appear } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Separator } from 'src/components/separator/separator';

import css from './forgot.module.scss';

const ForgotPage = (): JSX.Element => {
    const { t } = useTranslation();

    return (
        <Appear className={css.root}>
            <Title as="h2" className={css.title}>
                {t('Reset your password')}
            </Title>
            <Text className={css.text}>{t('We will send you email with recovery link')}</Text>

            <Separator>{t('Or')}</Separator>

            <Link to="#login" className={css.link}>
                <Text>{t('Login into existing account')}</Text>
            </Link>

            <Link to="#signup" className={classNames(css.link, css.mt)}>
                <Text>{t('Create account')}</Text>
            </Link>
        </Appear>
    );
};

export default ForgotPage;
