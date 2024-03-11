import React from 'react';

import { useFormik } from 'formik';
import { SmallModal, Input, Textarea, Button, Order, OrderStatus } from 'phoqer';
import { useOrdersContext } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';

import { useErrorToast } from 'src/hook/error-toast.hook';
import { useSuccessToast } from 'src/hook/success-toast.hook';
import { ordersService } from 'src/services/orders.service';

import css from './update-order-modal.module.scss';
import { LocationSchema } from './validation';

interface RentPayload {
    country: string;
    city: string;
    zip: string;
    address: string;
    comment?: string | null;
}

export const initialValues: RentPayload = {
    country: '',
    city: '',
    zip: '',
    address: '',
    comment: '',
};

export interface Props {
    open: boolean;
    onClose: () => void;
    order: Order | null;
}
export const UpdateOrderModal = ({ order, open, onClose }: Props): JSX.Element => {
    const { country, city, zip, address, comment } = order || initialValues;

    const { t } = useTranslation();
    const errorToast = useErrorToast();
    const successToast = useSuccessToast();
    const { updateOrders } = useOrdersContext();

    const from = useFormik<RentPayload>({
        initialValues: { country, city, zip, address, comment },
        enableReinitialize: true,
        validationSchema: LocationSchema,
        onSubmit: (value: RentPayload) => {
            if (order) {
                ordersService
                    .updateOrderById(order.id, { ...value, status: OrderStatus.PENDING })
                    .then(data => {
                        updateOrders(data);
                        successToast(t('You have successfully re-submit your order'));
                    })
                    .catch(errorToast)
                    .finally(onClose);
            }
        },
    });

    return (
        <SmallModal
            open={open}
            onClose={onClose}
            title={t('Resend your order request')}
            footer={
                <div className={css.flex}>
                    <Button className={css.btn} outline onClick={onClose}>
                        {t('Cancel')}
                    </Button>
                    <Button className={css.btn} primary onClick={() => from.handleSubmit()}>
                        {t('Submit')}
                    </Button>
                </div>
            }
        >
            <form action="#" method="POST" onSubmit={from.handleSubmit}>
                <p className={css.description}>{t('You can update your order information')}</p>

                <label className={css.label}>
                    <p className={css.text}>{t('Country')}</p>
                    <Input
                        name="country"
                        placeholder={t('Country')}
                        value={from.values.country}
                        onChange={from.handleChange}
                        error={from.errors.country}
                    />
                </label>

                <div className={css.flex}>
                    <label className={css.label}>
                        <p className={css.text}>{t('City')}</p>
                        <Input
                            name="city"
                            placeholder={t('City')}
                            value={from.values.city}
                            onChange={from.handleChange}
                            error={from.errors.city}
                        />
                    </label>

                    <label className={css.label}>
                        <p className={css.text}>{t('Zip Code')}</p>
                        <Input
                            name="zip"
                            placeholder={t('Zip Code')}
                            value={from.values.zip}
                            onChange={from.handleChange}
                            error={from.errors.zip}
                        />
                    </label>
                </div>

                <label className={css.label}>
                    <p className={css.text}>{t('Address')}</p>
                    <Input
                        name="address"
                        placeholder={t('Street, Apt, Floor, etc.')}
                        value={from.values.address}
                        onChange={from.handleChange}
                        error={from.errors.address}
                    />
                </label>

                <label className={css.label}>
                    <p className={css.text}>{t('Your comment (optional)')}</p>
                    <Textarea
                        name="comment"
                        maxLength={500}
                        placeholder="Start typing ..."
                        value={from.values.comment || ''}
                        onChange={from.handleChange}
                        error={from.errors.comment}
                    />
                </label>
            </form>
        </SmallModal>
    );
};
