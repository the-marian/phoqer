import { FC } from 'react';

import { useFormik } from 'formik';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import { Button, Drawer, ErrorLabel, Flex, ID, Input, Label, ModalHeader, Scroll, Text, Textarea, toast } from 'phoqer';
import { createPortal } from 'react-dom';

import { RentPayload } from '@app/components/modals/rent-drawer/type';
import { getInitialValues, setInitialValues } from '@app/components/modals/rent-drawer/utils';
import { LocationSchema } from '@app/components/modals/rent-drawer/validation';
import { useErrorToast } from '@app/hook/error-toast.hook';
import { useTranslation } from '@app/hook/translations.hook';
import { privateApiClient } from '@app/http/http';
import { routes } from '@app/utils/routes';

import css from './rent-drawer.module.scss';

export interface RentDrawerProps {
    offerId: ID;
    isOpen: boolean;
    onClose: () => void;
}
export const RentDrawer: FC<RentDrawerProps> = ({ offerId, isOpen, onClose }) => {
    const router = useRouter();
    const { t, locale } = useTranslation();

    const errorToast = useErrorToast();

    const openOrders = (): void => {
        router.push(routes.client.orders(locale));
    };

    const from = useFormik<RentPayload>({
        initialValues: getInitialValues(),
        enableReinitialize: true,
        validationSchema: LocationSchema,
        onSubmit: (value: RentPayload) => {
            setInitialValues(value);
            privateApiClient
                .post('/orders', { ...value, offerId: +offerId })
                .then(() => {
                    toast.success({
                        id: nanoid(),
                        title: t('Success!'),
                        content: t('You have successfully submit your rent request'),
                        button: {
                            close: {
                                label: t('Close'),
                            },
                            extra: {
                                label: t('View Orders'),
                                onClick: openOrders,
                            },
                        },
                    });
                })
                .catch(errorToast)
                .finally(onClose);
        },
    });

    return createPortal(
        <Drawer isOpen={isOpen} onClose={onClose} className={css.drawer} direction="right">
            <ModalHeader onClose={onClose}>{t('Send a rental request')}</ModalHeader>

            <Scroll className={css.scroll}>
                <form action="#" method="POST" className={css.form} onSubmit={from.handleSubmit}>
                    <Text size="sm" className={css.description}>
                        {t('Provide additional information so that the author of the offer can make a decision')}
                    </Text>

                    <Label label={t('Country')}>
                        <Input
                            name="country"
                            placeholder={t('Country')}
                            value={from.values.country}
                            onChange={from.handleChange}
                        />
                        {from.touched.country && from.errors.country && (
                            <ErrorLabel isFilled size="sm">
                                {from.errors.country}
                            </ErrorLabel>
                        )}
                    </Label>

                    <Flex className={css.group} align="flex-start" justify="space-between">
                        <Label label={t('City')}>
                            <Input name="city" placeholder={t('City')} value={from.values.city} onChange={from.handleChange} />
                            {from.touched.city && from.errors.city && (
                                <ErrorLabel isFilled size="sm">
                                    {from.errors.city}
                                </ErrorLabel>
                            )}
                        </Label>

                        <Label label={t('Zip Code')}>
                            <Input name="zip" placeholder={t('Zip Code')} value={from.values.zip} onChange={from.handleChange} />
                            {from.touched.zip && from.errors.zip && (
                                <ErrorLabel isFilled size="sm">
                                    {from.errors.zip}
                                </ErrorLabel>
                            )}
                        </Label>
                    </Flex>

                    <Label label={t('Address')}>
                        <Input
                            name="address"
                            placeholder={t('Street, Apt, Floor, etc.')}
                            value={from.values.address}
                            onChange={from.handleChange}
                        />
                        {from.touched.address && from.errors.address && (
                            <ErrorLabel isFilled size="sm">
                                {from.errors.address}
                            </ErrorLabel>
                        )}
                    </Label>

                    <Label label={t('Your comment (optional)')}>
                        <Textarea
                            name="comment"
                            maxLength={500}
                            placeholder={t('Start typing ...')}
                            value={from.values.comment}
                            onChange={from.handleChange}
                        />
                        {from.touched.comment && from.errors.comment && (
                            <ErrorLabel isFilled size="sm">
                                {from.errors.comment}
                            </ErrorLabel>
                        )}
                    </Label>
                </form>
            </Scroll>

            <div className={css.footer}>
                <Button variant="primary" className={css.btn} onClick={() => from.handleSubmit()}>
                    {t('Submit')}
                </Button>
            </div>
        </Drawer>,
        document.body,
    );
};
