import React from 'react';

import classNames from 'classnames';
import { useTableContext, Tooltip } from 'phoqer';
import { useReduceAnimations } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';

import css from './keyboard-shortcuts.module.scss';

export const KeyboardShortcuts = (): JSX.Element => {
    const { t } = useTranslation();
    const { isFocused } = useTableContext();
    const { isReduceAnimations } = useReduceAnimations();

    const label = (
        <ul>
            <li>
                <code>Ctrl + A</code>
                <p>{t('Select all elements in table')}</p>
            </li>
            <li>
                <code>Escape</code>
                <code>Delete</code>
                <code>Backspace</code>
                <p>{t('Unselect all elements in table')}</p>
            </li>
            <li>
                <code>Shift + Click</code>
                <p>{t('Select/unselect range')}</p>
            </li>
        </ul>
    );

    return (
        <Tooltip disabled={isReduceAnimations} label={label} position="bottom" className={css.tooltip}>
            <div className={classNames(css.indicator, isFocused && css.isFocused)}>
                <p>
                    {isFocused
                        ? t('Keyboard shortcuts is active.')
                        : t('Keyboard shortcuts disabled. Select any row in the table to activate shortcuts.')}
                </p>
            </div>
        </Tooltip>
    );
};
