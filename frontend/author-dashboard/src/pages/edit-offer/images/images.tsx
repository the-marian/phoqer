import React, { useCallback, useMemo, useState } from 'react';

import { useFormikContext } from 'formik';
import { Button, PlusIcon, useOpen, Drawer, ModalHeader, Loader, TypographySize, Title } from 'phoqer';
import { ImageUploadStatus, Uploader } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { useErrorToast } from 'src/hook/error-toast.hook';
import { useUploaderTransition } from 'src/hook/uploader-translation.hook';
import { EditOfferForm } from 'src/pages/edit-offer/edit-offer.types';
import { imagesToOrderType } from 'src/pages/edit-offer/edit-offer.utils';
import { MAX_FILE_SIZE, MAX_FILES } from 'src/pages/new-offer/new-offer.config';
import { ImageOrder } from 'src/pages/new-offer/new-offer.types';
import DragList from 'src/pages/new-offer/sort-offer/drag-list';
import { uploadsService } from 'src/services/uploads.service';

import css from './images.module.scss';

export const Images = (): JSX.Element => {
    const { t } = useTranslation();
    const { offerId } = useParams();

    const formik = useFormikContext<EditOfferForm>();
    const maxFiles = MAX_FILES - formik.values.images.length;
    const labels = useUploaderTransition(maxFiles, MAX_FILE_SIZE);

    const errorToast = useErrorToast();

    const { open, onOpen, onClose } = useOpen();
    const [isLoading, setIsLoading] = useState(false);

    const [uploads, setUploads] = useState<ImageUploadStatus[]>([]);
    const isUploaded = useMemo(() => uploads.some(upload => upload.done), [uploads]);

    const handleChange = useCallback((orders: ImageOrder[]): void => formik.setFieldValue('images', orders), [formik]);
    const handleDelete = useCallback(
        (url: string): void => {
            setIsLoading(false);
            uploadsService
                .deleteOfferImage(offerId as string, [url])
                .then(() => {
                    formik.setFieldValue(
                        'images',
                        formik.values.images.filter(image => image.url !== url),
                    );
                })
                .catch(errorToast)
                .finally(() => setIsLoading(false));
        },
        [errorToast, formik, offerId],
    );

    const addNewImages = useCallback((): void => {
        setIsLoading(false);
        const uploaderImages = uploads.reduce<string[]>((acc, item) => {
            if (item.done) {
                acc.push(item.url);
            }
            return acc;
        }, []);

        const formikImages = formik.values.images.map(image => image.url);

        uploadsService
            .updateOfferImages(offerId as string, [...formikImages, ...uploaderImages])
            .then(offer => {
                formik.setFieldValue('images', imagesToOrderType(offer.images));
                onClose();
            })
            .catch(errorToast)
            .finally(() => setIsLoading(false));
    }, [errorToast, formik, onClose, offerId, uploads]);

    return (
        <>
            <div className={css.root}>
                <Title as="h3" size={TypographySize.SM} className={css.label}>
                    {t('Change images order')}
                </Title>
                <DragList images={formik.values.images} setImages={handleChange} onDelete={handleDelete} isLoading={isLoading} />
            </div>

            <Button outline onClick={onOpen} disabled={maxFiles <= 0}>
                {t('Add more images')}
                <PlusIcon />
            </Button>

            <Drawer open={open} onClose={onClose} className={css.drawer}>
                {isLoading && <Loader absolute />}

                <ModalHeader size="lg" onClose={onClose}>
                    {t('Add new images to offer')}
                </ModalHeader>

                <div className={css.wrp}>
                    <Uploader
                        labels={labels}
                        uploads={uploads}
                        className={css.upload}
                        maxFiles={maxFiles}
                        maxSize={MAX_FILE_SIZE}
                        setUploads={setUploads}
                        onSubmit={uploadsService.upload}
                    />

                    <div className={css.flex}>
                        <Button primary disabled={!isUploaded} onClick={addNewImages}>
                            {t('Add uploaded images to offer')}
                            <PlusIcon />
                        </Button>

                        <Button onClick={onClose}>{t('Cancel')}</Button>
                    </div>
                </div>
            </Drawer>
        </>
    );
};
