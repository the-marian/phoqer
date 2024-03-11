import React from 'react';

import 'quill/dist/quill.core.css';
import 'quill/dist/quill.bubble.css';
import classNames from 'classnames';
import { Button, ChevronRightIcon, Container, InfoIcon, Text, Tooltip, TypographySize } from 'phoqer';
import { Appear } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';

import { SubHeader } from 'src/components/sub-header/sub-header';
import { env } from 'src/config/env.config';
import { COMMON_ERROR_TITLE } from 'src/constants/error.constants';
import { useNewOfferContext } from 'src/context/new-offer.context';
import { useQuillEditor } from 'src/hook/quill-editor.hook';
import { DescriptionSchema } from 'src/pages/new-offer/description/description.validation';
import { Steps } from 'src/pages/new-offer/new-offer.types';
import { Actions } from 'src/pages/new-offer/shared/actions';
import { ErrorText } from 'src/pages/new-offer/shared/error-text';
import { Heading } from 'src/pages/new-offer/shared/heading';

import css from './description.module.scss';

export const Description = (): JSX.Element => {
    const { t } = useTranslation();
    const { data, setData, setStep } = useNewOfferContext();
    const { content, ref, quill, error, setError } = useQuillEditor(data.description);

    const handleReset = (): void => {
        setData({ description: '' });
        setError('');

        if (quill.current) {
            quill.current?.setText(t(''));
        }
    };

    const handleSave = async (): Promise<void> => {
        return new Promise((resolve, reject) => {
            if (quill.current) {
                setData({ description: quill.current.root.innerHTML });
                resolve();
            } else {
                reject(t(COMMON_ERROR_TITLE));
            }
        });
    };

    const goBack = async (): Promise<void> => {
        try {
            await handleSave();
            setStep(Steps.Title);
        } catch (error) {
            setError((error as { message?: string })?.message || t(COMMON_ERROR_TITLE));
        }
    };

    const handleSubmit = async (): Promise<void> => {
        try {
            const description = quill.current?.getText()?.trim() || '';
            await DescriptionSchema.validate({ description });

            await handleSave();
            setStep(Steps.Parameters);
        } catch (error) {
            setError((error as { message?: string })?.message || t(COMMON_ERROR_TITLE));
        }
    };

    return (
        <>
            <SubHeader onBack={goBack}>
                <Actions onReset={handleReset} onSave={handleSave} />
            </SubHeader>

            <Appear key="Description">
                <Container className={css.root}>
                    <Heading
                        title={t('Keep going!')}
                        description={t(
                            'Write a detailed description of your offer. Try to answer all the questions that your client may have.',
                        )}
                    />

                    <div className={classNames(css.inner, css.mb)}>
                        <Tooltip
                            position="right"
                            className={css.tooltip}
                            label={<img className={css.img} src={`${env.PHOQER_APP_HOST}/text-editor.gif`} alt="" />}
                        >
                            <div className={css.info}>
                                <InfoIcon />
                                <Text size={TypographySize.SM}>{t('How to edit content?')}</Text>
                            </div>
                        </Tooltip>
                        <div
                            className={css.input}
                            ref={ref}
                            tabIndex={0}
                            dangerouslySetInnerHTML={{ __html: content.current as string }}
                        />

                        <ErrorText error={error} />
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
