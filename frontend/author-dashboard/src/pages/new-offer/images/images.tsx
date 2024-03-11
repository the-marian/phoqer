import React, { useEffect, useState } from 'react';

import classNames from 'classnames';
import { Button, ChevronRightIcon, Container } from 'phoqer';
import { Uploader, ImageUploadStatus, Appear } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';

import { SubHeader } from 'src/components/sub-header/sub-header';
import { useNewOfferContext } from 'src/context/new-offer.context';
import { useUploaderTransition } from 'src/hook/uploader-translation.hook';
import { MAX_FILE_SIZE, MAX_FILES } from 'src/pages/new-offer/new-offer.config';
import { Steps } from 'src/pages/new-offer/new-offer.types';
import { generateUploadImageFromUrl } from 'src/pages/new-offer/new-offer.utils';
import { Actions } from 'src/pages/new-offer/shared/actions';
import { Heading } from 'src/pages/new-offer/shared/heading';
import { uploadsService } from 'src/services/uploads.service';

import css from './images.module.scss';

export const Images = (): JSX.Element => {
    const { t } = useTranslation();
    const labels = useUploaderTransition(MAX_FILES, MAX_FILE_SIZE);

    const { data, setData, setStep } = useNewOfferContext();
    const [uploads, setUploads] = useState<ImageUploadStatus[]>([]);

    useEffect(() => {
        if (data?.images?.length) {
            setUploads(data.images.map(generateUploadImageFromUrl));
        }
    }, [data.images]);

    const handleReset = (): void => {
        setUploads([]);
    };

    const goBack = (): void => {
        setStep(Steps.Parameters);
    };

    const isImagesUploaded = uploads.some(item => item.done);
    const isLoading = uploads.some(item => item.loading);

    const handleSave = (): void => {
        if (isImagesUploaded && !isLoading) {
            setData({
                images: uploads.reduce<string[]>((acc, item) => {
                    if (item.done && item.url) {
                        acc.push(item.url);
                    }
                    return acc;
                }, []),
            });
        }
    };

    const handleSubmit = (): void => {
        handleSave();
        setStep(uploads.length > 1 ? Steps.SortOffer : Steps.Preview);
    };

    return (
        <>
            <SubHeader onBack={goBack}>
                <Actions onReset={handleReset} onSave={handleSave} />
            </SubHeader>

            <Appear key="Images">
                <Container className={css.root}>
                    <Heading
                        title={t('Images')}
                        description={t(
                            'This is an important step. The better the images of your product, the more likely it is to be rented',
                        )}
                    />

                    <Uploader
                        labels={labels}
                        uploads={uploads}
                        maxFiles={MAX_FILES}
                        maxSize={MAX_FILE_SIZE}
                        setUploads={setUploads}
                        onSubmit={uploadsService.upload}
                        className={classNames(css.inner, css.uploader, css.mb)}
                    />

                    <div className={classNames(css.inner, css.flex)}>
                        <Button primary onClick={handleSubmit} disabled={!isImagesUploaded || isLoading}>
                            {t('Next')}
                            <ChevronRightIcon />
                        </Button>
                    </div>
                </Container>
            </Appear>
        </>
    );
};
