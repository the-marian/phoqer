import { FC } from 'react';

import dynamic from 'next/dynamic';
import { Button, ID, Text, Heading, useIsOpen } from 'phoqer';
import { authModal, useAuthContext } from 'phoqer-shared';

import { RentDrawerProps } from '@app/components/modals/rent-drawer/rent-drawer';
import { useTranslation } from '@app/hook/translations.hook';

const RentDrawer = dynamic<RentDrawerProps>(
    () => import('@app/components/modals/rent-drawer/rent-drawer').then(module => module.RentDrawer),
    { ssr: false },
);

interface Props {
    offerId: ID;
}
export const EmptyField: FC<Props> = ({ offerId }) => {
    const { t } = useTranslation();
    const { auth } = useAuthContext();
    const { isOpen, onClose, onOpen } = useIsOpen();

    return (
        <>
            <Heading as="h3">{t('Nothing to show')}</Heading>
            <Text size="sm">{t('There is no information yet.')}</Text>
            <Text size="sm">{t('If you have any questions, you can ask the author directly.')}</Text>

            <div className="footer">
                <Button variant="secondary" size="sm">
                    {t('Message')}
                </Button>
                <Button size="sm" onClick={auth ? onOpen : authModal.submit}>
                    {t('Rent now')}
                </Button>
            </div>

            <RentDrawer offerId={offerId} isOpen={isOpen} onClose={onClose} />
        </>
    );
};
