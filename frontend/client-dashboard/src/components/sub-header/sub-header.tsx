import React, { ReactNode } from 'react';

import { SubHeader as PhoqerSubHeader } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';

import { useNavigate } from 'src/hook/navigate.hook';

import css from './sub-header.module.scss';

interface Props {
    children?: ReactNode;
    onBack?: () => void;
}
export const SubHeader = ({ children, onBack }: Props): JSX.Element => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const onHome = (): void => {
        navigate('/client');
    };

    return (
        <PhoqerSubHeader onHome={onHome} onBack={onHome || onBack} backLabel={t('Back')} className={css.container}>
            {children}
        </PhoqerSubHeader>
    );
};
