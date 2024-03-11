import { FC } from 'react';

import { Container, Background, Text, Skeleton, Heading } from 'phoqer';

import { useSearch } from '@app/context/search.context';
import { useTranslation } from '@app/hook/translations.hook';

import css from './category-head.module.scss';

export const CategoryHead: FC = () => {
    const { t } = useTranslation();
    const {
        category: { isLoading, data },
    } = useSearch();

    return (
        <Container size="lg">
            <div className={css.category}>
                <Background />

                <div className={css.inner}>
                    <div className={css.box}>
                        {isLoading ? (
                            <>
                                <Skeleton style={{ height: '2rem', width: '20rem' }} />
                                <Skeleton style={{ height: '1.6rem', width: '28rem', margin: '1.5rem 0 0.8rem' }} />
                                <Skeleton style={{ height: '1.6rem', width: '23rem' }} />
                            </>
                        ) : data ? (
                            <>
                                <Heading>{data.title}</Heading>
                                <Text size="sm">{data.description}</Text>
                            </>
                        ) : (
                            <>
                                <Heading>{t('What are you looking for?')}</Heading>
                                <Text size="sm">{t('Use filters to find product you need')}</Text>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Container>
    );
};
