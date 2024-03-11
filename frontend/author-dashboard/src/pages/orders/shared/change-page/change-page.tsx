import React from 'react';

import classNames from 'classnames';
import { Button, ChevronDownIcon, Dropdown, SelectOption, useTableContext, useOpen } from 'phoqer';
import { useOrdersContext } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';

import css from './change-page.module.scss';

export const ChangePage = (): JSX.Element => {
    const { t } = useTranslation();
    const { open, onOpen, onToggle, onClose } = useOpen();

    const { unselectAll } = useTableContext();
    const { setCurrentPage, currentPage, orders } = useOrdersContext();

    const handleClick = (value?: number): void => {
        if (value) {
            setCurrentPage(value);
        }
        unselectAll();
        onClose();
    };

    return (
        <div className={css.root}>
            <Button outline white onClick={onOpen} className={css.btn}>
                {t('Current page: {{page}}', { page: currentPage })}
                <ChevronDownIcon className={classNames(css.icon, open && css.open)} />
            </Button>
            <Dropdown onToggle={onToggle} open={open} position="left">
                {[...Array(orders.totalPages || 1)].map((_, index) => (
                    <SelectOption<number> key={index} active={currentPage === index + 1} value={index + 1} onClick={handleClick}>
                        {index + 1}
                    </SelectOption>
                ))}
            </Dropdown>
        </div>
    );
};
