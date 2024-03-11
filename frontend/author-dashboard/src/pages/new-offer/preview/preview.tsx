import React, { useState } from 'react';

import classNames from 'classnames';
import { Button, ChevronRightIcon, Container, OfferCard, OfferCardType } from 'phoqer';
import { Appear } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';

import { SubHeader } from 'src/components/sub-header/sub-header';
import { useNewOfferContext } from 'src/context/new-offer.context';
import { useErrorToast } from 'src/hook/error-toast.hook';
import { defaultData } from 'src/pages/new-offer/new-offer.config';
import { NewOfferData, Steps } from 'src/pages/new-offer/new-offer.types';
import { Heading } from 'src/pages/new-offer/shared/heading';
import { offersService } from 'src/services/offers.service';

import css from './preview.module.scss';

const getOfferInfo = (data: NewOfferData): OfferCardType => ({
    id: 'new',
    title: data.title,
    price: data.price as number,
    image: data.images[0],
    authorId: '1',
    category: data.category?.title || '',
});

export const Preview = (): JSX.Element => {
    const { t, i18n } = useTranslation();
    const errorToast = useErrorToast();
    const [loading, setLoading] = useState(false);
    const { data, setStep, setData } = useNewOfferContext();

    const getPlaceholderOffer = (id: string): OfferCardType => ({
        id,
        authorId: '1',
        price: Number(data.price),
        image: '/placeholder.jpeg',
        title: t('Other offer'),
        category: data.category?.title || '',
    });

    const placeholderOffers = [getOfferInfo(data), getPlaceholderOffer('1')];

    const goBack = (): void => {
        setStep(data.images.length > 1 ? Steps.SortOffer : Steps.Images);
    };

    const handleSubmit = async (): Promise<void> => {
        setLoading(true);
        offersService
            .newOffer(data)
            .then(newOffer => {
                setStep(Steps.Done);
                setData({ ...defaultData, id: newOffer.id });
            })
            .catch(errorToast)
            .finally(() => setLoading(false));
    };

    return (
        <>
            <SubHeader onBack={goBack} />

            <Appear key="Preview">
                <Container className={css.root}>
                    <Heading
                        title={t('Done')}
                        description={t(
                            "This is how other users will see your offer on the site. You can still go back and change something or click 'next' if you want to publish your offer",
                        )}
                    />

                    <div className={classNames(css.inner, css.mb, css.grid)}>
                        {placeholderOffers.map(item => (
                            <div key={item.id} className={css.card}>
                                <OfferCard offer={item} locale={i18n.language} />
                            </div>
                        ))}
                    </div>

                    <div className={classNames(css.inner, css.flex)}>
                        <Button primary onClick={handleSubmit} loading={loading}>
                            {t('Publish')}
                            <ChevronRightIcon />
                        </Button>
                    </div>
                </Container>
            </Appear>
        </>
    );
};
