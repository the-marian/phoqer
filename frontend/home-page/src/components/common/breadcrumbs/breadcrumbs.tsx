import { memo } from 'react';

import Link from 'next/link';
import { IBreadcrumbs, Container, BreadcrumbWrp, Breadcrumb, Text } from 'phoqer';

import { useTranslation } from '@app/hook/translations.hook';
import { routes } from '@app/utils/routes';

import css from './breadcrumbs.module.scss';

interface Props {
    size?: 'sm' | 'md' | 'lg';
    value: IBreadcrumbs;
}

export const Breadcrumbs = memo<Props>(({ size = 'lg', value }) => {
    const { t } = useTranslation();

    return (
        <Container size={size} className={css.container}>
            <BreadcrumbWrp>
                <Breadcrumb>
                    <Link href={routes.home}>{t('Home')}</Link>
                </Breadcrumb>
                {value.map(({ url, title }, index, array) => {
                    const isLast = array.length === index + 1;
                    return (
                        <Breadcrumb key={index} isLast={isLast}>
                            {isLast ? (
                                <Text as="span" size="sm">
                                    {t(title)}
                                </Text>
                            ) : (
                                <Link href={url || routes.home}>{t(title)}</Link>
                            )}
                        </Breadcrumb>
                    );
                })}
            </BreadcrumbWrp>
        </Container>
    );
});

Breadcrumbs.displayName = 'Breadcrumbs';
