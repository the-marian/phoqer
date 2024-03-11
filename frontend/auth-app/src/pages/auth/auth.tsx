import React from 'react';

import classNames from 'classnames';
import { Button, useOpen, Collapse, CloseIcon, MailIcon, Title, Text } from 'phoqer';
import { Appear } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';

import { AuthServices } from 'src/components/auth-services/auth-services';
import { Form } from 'src/components/form/form';
import { Separator } from 'src/components/separator/separator';

import css from './auth.module.scss';

const AuthPage = (): JSX.Element => {
    const { t } = useTranslation();
    const { open, onToggle } = useOpen();

    return (
        <Appear className={css.root}>
            <Title as="h2" className={css.title}>
                {t('Welcome back!')}
            </Title>
            <Text className={css.text}>{t('Log in to your account or create a new one')}</Text>

            <Collapse open={!open} className={css.w100}>
                <AuthServices />

                <Separator>{t('Or log in with email')}</Separator>
            </Collapse>

            <Button onlyIcon className={css.circle} onClick={onToggle}>
                {open ? <CloseIcon /> : <MailIcon />}
            </Button>

            <Collapse open={open} className={classNames(css.w100, css.mt)}>
                <Form />
            </Collapse>
        </Appear>
    );
};

export default AuthPage;
