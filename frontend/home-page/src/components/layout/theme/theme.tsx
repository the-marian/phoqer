import { FC } from 'react';

import { IconButton, LightIcon } from 'phoqer';
import { useThemeContext } from 'phoqer-shared';

import { useTranslation } from '@app/hook/translations.hook';

import css from './theme.module.scss';

export const Theme: FC = () => {
    const { t } = useTranslation();
    const { toggleTheme } = useThemeContext();

    return (
        <IconButton className={css.btn} onClick={toggleTheme} label={t('Toggle theme')}>
            <LightIcon />
        </IconButton>
    );
};
