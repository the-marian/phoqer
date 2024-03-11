import React from 'react';

import classNames from 'classnames';
import { Container, Confetti, Link, ChevronRightIcon } from 'phoqer';
import { Appear } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';

import { SubHeader } from 'src/components/sub-header/sub-header';
import { useNewOfferContext } from 'src/context/new-offer.context';
import { useLinkClick } from 'src/hook/link-click.hook';
import { useNavigate } from 'src/hook/navigate.hook';
import { Heading } from 'src/pages/new-offer/shared/heading';

import css from './done.module.scss';

export const Done = (): JSX.Element => {
    const { t, i18n } = useTranslation();
    const navigation = useNavigate();
    const handleClick = useLinkClick();
    const { data } = useNewOfferContext();

    const goBack = (): void => {
        navigation('/author');
    };

    return (
        <>
            <SubHeader onBack={goBack} />

            <Confetti />

            <Appear key="Done">
                <Container className={css.root}>
                    <Heading
                        title={t('Success!')}
                        description={t(
                            'You have successfully created a offer. Now it is available on the site for other users. You can change it or disable it at any time.',
                        )}
                    />

                    <div className={classNames(css.inner, css.flex)}>
                        <Link
                            primary
                            format="button"
                            onClick={handleClick}
                            href={data.id ? `/${i18n.language}/offers/${data.id}` : `/${i18n.language}/author/offers`}
                        >
                            {t('View offer')}
                            <ChevronRightIcon />
                        </Link>
                    </div>
                </Container>
            </Appear>
        </>
    );
};
