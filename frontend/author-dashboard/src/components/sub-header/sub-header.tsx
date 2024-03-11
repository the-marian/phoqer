import React, { ReactNode } from 'react';

import { useMedia } from 'phoqer';
import { SubHeader as PhoqerSubHeader } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { useNavigate } from 'src/hook/navigate.hook';

import css from './sub-header.module.scss';

interface Props {
    onBack?: () => void;
    children?: ReactNode;
}
export const SubHeader = ({ onBack, children }: Props): JSX.Element => {
    const { t } = useTranslation();
    const navigation = useNavigate();
    const location = useLocation();

    const isMobile = useMedia(540);

    const onHome = (): void => {
        navigation('/author');
    };

    const handleBack = (): void => {
        navigation((location.state as Record<'from', Location>)?.from ?? '/author');
    };

    return (
        <PhoqerSubHeader
            className={css.container}
            backLabel={t('Back')}
            onBack={onBack || handleBack}
            onHome={isMobile ? undefined : onHome}
        >
            {children}
        </PhoqerSubHeader>
    );
};
