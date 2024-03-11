import { FC, ReactNode } from 'react';

import { useRouter } from 'next/router';
import { SubHeader as PhoqerSubHeader } from 'phoqer-shared';

import { useTranslation } from '@app/hook/translations.hook';
import { routes } from '@app/utils/routes';

import css from './sub-header.module.scss';

interface Props {
    onBack?: () => void;
    children?: ReactNode;
}
export const SubHeader: FC<Props> = ({ onBack, children }) => {
    const { t } = useTranslation();
    const router = useRouter();

    const onHome = (): void => {
        router.push(routes.home);
    };

    return (
        <PhoqerSubHeader onHome={onHome} onBack={onBack || onHome} backLabel={t('Back')} className={css.container}>
            {children}
        </PhoqerSubHeader>
    );
};
