import React from 'react';

import classNames from 'classnames';
import { Flex, Text, Tooltip, TypographySize, useTableContext } from 'phoqer';
import { useReduceAnimations } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';

import css from './keyboard-shortcuts.module.scss';

export const KeyboardShortcuts = (): JSX.Element => {
    const { t } = useTranslation();
    const { isFocused } = useTableContext();
    const { isReduceAnimations } = useReduceAnimations();

    const label = (
        <Flex as="ul" align="start" justify="center" direction="column">
            <li>
                <code>Ctrl + A</code>
                <Text size={TypographySize.SM}>{t('Select all elements in table')}</Text>
            </li>
            <li>
                <code>Escape</code>
                <code>Delete</code>
                <code>Backspace</code>

                <Text size={TypographySize.SM}>{t('Unselect all elements in table')}</Text>
            </li>
            <li>
                <code>Shift + Click</code>
                <Text size={TypographySize.SM}>{t('Select/unselect range')}</Text>
            </li>
        </Flex>
    );

    return (
        <>
            <div className={classNames(css.indicator, isFocused && css.isFocused)}>
                <Tooltip label={label} disabled={isReduceAnimations} position="bottom" className={css.tooltip}>
                    <Text>
                        {isFocused
                            ? t('Keyboard shortcuts is active.')
                            : t('Keyboard shortcuts disabled. Select any row in the table to activate shortcuts.')}
                    </Text>
                </Tooltip>
            </div>
        </>
    );
};
