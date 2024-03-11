import { FC, useEffect, useRef } from 'react';

import { Heading, Switch, useReduceAnimations } from 'phoqer';

import { SubHeader as Wrapper } from '@app/components/common/sub-header/sub-header';
import css from '@app/components/pages/favorite/shared/styles.module.scss';
import { useFavoriteContext } from '@app/context/favorite.context';
import { useTranslation } from '@app/hook/translations.hook';

export const SubHeader: FC = () => {
    const initRef = useRef<boolean>(true);
    const { initTable } = useFavoriteContext();

    const { t } = useTranslation();
    const { isReduceAnimations, toggleIsReduceAnimations } = useReduceAnimations();

    useEffect(() => {
        if (initRef.current) {
            initTable();
            initRef.current = false;
        }
    }, [initTable]);

    return (
        <Wrapper>
            <Heading as="h3" size="sm" className={css.title}>
                {t('Your favorite offers')}
            </Heading>

            <div className={css.switch}>
                <Switch
                    size="sm"
                    checked={isReduceAnimations}
                    onChange={toggleIsReduceAnimations}
                    label={t('Reduce animations')}
                />
            </div>
        </Wrapper>
    );
};
