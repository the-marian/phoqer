import React, { Suspense, useEffect, useState, lazy } from 'react';

import classNames from 'classnames';
import { Button, ChevronRightIcon, Container, ResetIcon, Tooltip } from 'phoqer';
import { Appear } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';

import { SubHeader } from 'src/components/sub-header/sub-header';
import { useNewOfferContext } from 'src/context/new-offer.context';
import { ImageOrder, Steps } from 'src/pages/new-offer/new-offer.types';
import { Actions } from 'src/pages/new-offer/shared/actions';
import { Heading } from 'src/pages/new-offer/shared/heading';

import css from './sort-offer.module.scss';

const DragList = lazy(() => import('./drag-list'));

const getImageOrder = (value: string[]): ImageOrder[] => {
    return value.map<ImageOrder>(image => {
        const urlSplit = image.split('/');
        const name = urlSplit[urlSplit.length - 1];

        return {
            name,
            id: image,
            url: image,
        };
    });
};

export const SortOffer = (): JSX.Element => {
    const { t } = useTranslation();

    const { data, setData, setStep } = useNewOfferContext();
    const [images, setImages] = useState<ImageOrder[]>([]);

    useEffect(() => {
        if (data.images?.length) {
            setImages(getImageOrder(data.images));
        }
    }, [data.images]);

    const handleReset = (): void => {
        setImages(getImageOrder(data.images));
    };

    const handleSave = (): void => {
        setData({ images: images.map(item => item.url) });
    };

    const goBack = (): void => {
        setStep(Steps.Images);
    };

    const handleSubmit = (): void => {
        handleSave();
        setStep(Steps.Preview);
    };

    return (
        <>
            <SubHeader onBack={goBack}>
                <Actions onSave={handleSave}>
                    <Tooltip label={t('Delete your changes')}>
                        <Button onlyIcon format="link" onClick={handleReset} className={css.actionsBtn}>
                            <ResetIcon />
                        </Button>
                    </Tooltip>
                </Actions>
            </SubHeader>

            <Appear key="Order">
                <Container className={css.root}>
                    <Heading
                        title={t('Images order')}
                        description={t(
                            'Arrange your images in the order you want. The first photo in the list will be used as the main photo of your offer',
                        )}
                    />

                    <div className={classNames(css.inner, css.mb)}>
                        <Suspense fallback={null}>
                            <DragList images={images} setImages={setImages} />
                        </Suspense>
                    </div>

                    <div className={classNames(css.inner, css.flex)}>
                        <Button primary onClick={handleSubmit}>
                            {t('Next')}
                            <ChevronRightIcon />
                        </Button>
                    </div>
                </Container>
            </Appear>
        </>
    );
};
