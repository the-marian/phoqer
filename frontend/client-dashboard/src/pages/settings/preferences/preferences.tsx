import React from 'react';

import { Switch, useOpen, DropdownButton, Dropdown, SelectOption } from 'phoqer';
import { Cookies, THEME_KEY, ThemeEnum, useReduceAnimations, useTheme } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';

import { useChangeLocale } from 'src/hook/change-locale.hook';
import { Cell } from 'src/pages/settings/common/cell/cell';
import { LANGUAGE_ENUM } from 'src/types/language.type';

import css from './preferences.module.scss';

export const Preferences = (): JSX.Element => {
    const { t, i18n } = useTranslation();
    const { open, onOpen, onToggle } = useOpen();

    const changeLanguage = useChangeLocale();
    const { theme, toggleTheme } = useTheme(() => Cookies.get()[THEME_KEY]);
    const { isReduceAnimations, toggleIsReduceAnimations } = useReduceAnimations();

    const languages: Record<string, string> = {
        [LANGUAGE_ENUM.EN]: t('English'),
        [LANGUAGE_ENUM.PL]: t('Polish'),
        [LANGUAGE_ENUM.UA]: t('Ukrainian'),
    };
    const handleChangeLanguage = (values?: string): void => {
        if (values) {
            changeLanguage(values);
            onToggle();
        }
    };

    return (
        <Cell title={t('Site preferences')}>
            <div className={css.inner}>
                <div className={css.mb}>
                    <Switch checked={theme === ThemeEnum.Black} onChange={toggleTheme} label={t('Change theme')} />
                </div>

                <div className={css.mb}>
                    <Switch checked={isReduceAnimations} onChange={toggleIsReduceAnimations} label={t('Reduce animations')} />
                </div>
            </div>

            <div className={css.inner}>
                <p className={css.label}>{t('Change site language')}</p>
                <div className={css.dropdown}>
                    <DropdownButton open={open} onClick={onOpen}>
                        {languages[i18n.language]}
                    </DropdownButton>

                    <Dropdown open={open} onToggle={onToggle}>
                        {Object.entries(languages).map(([locale, title]) => (
                            <SelectOption<string>
                                key={locale}
                                value={locale}
                                onClick={handleChangeLanguage}
                                active={i18n.language === locale}
                            >
                                {title}
                            </SelectOption>
                        ))}
                    </Dropdown>
                </div>
            </div>
        </Cell>
    );
};
