import React, { useEffect, useState } from 'react';

import { Form, Formik } from 'formik';
import { ArrowRightIcon, Button, Container, Loader, Text, useOpen, Offer } from 'phoqer';
import { Appear } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { SubHeader } from 'src/components/sub-header/sub-header';
import { useErrorToast } from 'src/hook/error-toast.hook';
import { useSuccessToast } from 'src/hook/success-toast.hook';
import { offersService } from 'src/services/offers.service';

import { Category } from './category/category';
import { Description } from './description/description';
import css from './edit-offer.module.scss';
import { EditOfferForm } from './edit-offer.types';
import { getDefaultFormValue, normalizeFormData } from './edit-offer.utils';
import { EditOfferFormSchema } from './edit-offer.validation';
import { Images } from './images/images';
import { Price } from './price/price';
import { Sale } from './sale/sale';
import { Title } from './title/title';

const EditOffer = (): JSX.Element => {
    const { t } = useTranslation();

    const { offerId } = useParams();
    const errorToast = useErrorToast();
    const successToast = useSuccessToast();

    const geyOfferLoader = useOpen(true);
    const updateOfferLoader = useOpen(false);
    const [offerData, setOfferData] = useState<Offer>({} as Offer);

    useEffect(() => {
        if (offerId) {
            offersService.getSingleOffer(offerId).then(setOfferData).catch(errorToast).finally(geyOfferLoader.onClose);
        }
    }, [errorToast, geyOfferLoader.onClose, offerId]);

    const handleSubmit = (body: EditOfferForm) => {
        updateOfferLoader.onOpen();
        offersService
            .updateOffer(offerId as string, normalizeFormData(body))
            .then(() =>
                successToast(
                    t('You have successfully updated your offer. Your changes will be applied to the site in a few minutes'),
                ),
            )
            .catch(errorToast)
            .finally(updateOfferLoader.onClose);
    };

    return (
        <>
            <SubHeader>
                <Text as="h3" className={css.title}>
                    {t('Edit offer')}
                </Text>
            </SubHeader>

            <Appear>
                <Container className={css.root}>
                    {geyOfferLoader.open ? (
                        <div className={css.loader}>
                            <Loader />
                        </div>
                    ) : (
                        <Formik<EditOfferForm>
                            initialValues={getDefaultFormValue(offerData)}
                            validationSchema={EditOfferFormSchema}
                            onSubmit={handleSubmit}
                        >
                            <Form id="edit-offer">
                                <Category />

                                <div className={css.flex}>
                                    <div className={css.cell}>
                                        <Price />
                                        <Sale />
                                        <Images />
                                    </div>

                                    <div className={css.cell}>
                                        <Title />
                                        <Description />
                                    </div>
                                </div>

                                <Button
                                    primary
                                    type="submit"
                                    form="edit-offer"
                                    className={css.submit}
                                    loading={updateOfferLoader.open}
                                >
                                    {t('Submit changes')}
                                    <ArrowRightIcon />
                                </Button>
                            </Form>
                        </Formik>
                    )}
                </Container>
            </Appear>
        </>
    );
};

export default EditOffer;
