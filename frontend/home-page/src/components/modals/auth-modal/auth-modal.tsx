import { FC, useEffect } from 'react';

import { useIsOpen, LargeModalHeader, LargeModal, Button, Text, Heading, EmptyState } from 'phoqer';
import { authModal, useAuthContext } from 'phoqer-shared';

import { InjectModule } from '@app/components/inject-module/inject-module';
import { useTranslation } from '@app/hook/translations.hook';

import css from './auth-modal.module.scss';

const service = () => import('auth/root');

export const AuthModal: FC = () => {
    const { t } = useTranslation();
    const auth = useAuthContext();
    const { isOpen, onClose, onToggle } = useIsOpen(false);

    useEffect(() => {
        authModal.subscribe(onToggle as EventListener);
        return () => {
            authModal.unsubscribe(onToggle as EventListener);
        };
    }, []);

    return (
        <LargeModal
            onClose={onClose}
            className={css.modal}
            isOpen={isOpen && !auth.auth}
            header={<LargeModalHeader title={t('Done')} onClose={onClose} />}
        >
            <div className={css.inner}>
                <InjectModule module={service}>
                    <EmptyState className={css.root}>
                        <Heading>{t('Not Found')}</Heading>
                        <Text>{t('This page is not exist')}</Text>

                        <div className="footer">
                            <Button variant="secondary" onClick={authModal.submit}>
                                {t('Close modal')}
                            </Button>
                        </div>
                    </EmptyState>
                </InjectModule>
            </div>
        </LargeModal>
    );
};
