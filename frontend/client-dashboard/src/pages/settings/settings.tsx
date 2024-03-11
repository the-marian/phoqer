import React from 'react';

import { Container } from 'phoqer';
import { Appear } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';

import { SubHeader } from 'src/components/sub-header/sub-header';

import { AuthServices } from './auth-services/auth-services';
import { Preferences } from './preferences/preferences';
import { Privacy } from './privacy/privacy';
import css from './settings.module.scss';
import { UserData } from './user-data/user-data';

const SettingsPage = (): JSX.Element => {
    const { t } = useTranslation();

    return (
        <div className={css.root}>
            <SubHeader>
                <h3 className={css.title}>{t('Your settings')}</h3>
            </SubHeader>

            <Appear timeout={100}>
                <Container className={css.flex}>
                    <div className={css.column}>
                        <UserData />
                        <Privacy />
                    </div>

                    <div className={css.column}>
                        <Preferences />
                        <AuthServices />
                    </div>
                </Container>
            </Appear>
        </div>
    );
};

export default SettingsPage;
