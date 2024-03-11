import React from 'react';

import classNames from 'classnames';
import { Button, Dropdown, SelectOption, useTableContext, Tooltip, useOpen, ChevronDownIcon } from 'phoqer';
import { useReduceAnimations, useOrdersContext } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';

import css from './per-page.module.scss';

export const PerPage = (): JSX.Element => {
    const { t } = useTranslation();

    const { unselectAll } = useTableContext();
    const { perPage, setPerPage } = useOrdersContext();
    const { isReduceAnimations } = useReduceAnimations();

    const { open, onOpen, onToggle, onClose } = useOpen();

    const handleClick = (value?: number): void => {
        if (value) {
            setPerPage(value);
        }
        unselectAll();
        onClose();
    };

    return (
        <div className={css.root}>
            <Tooltip disabled={isReduceAnimations} label={t('Select items per page')}>
                <Button outline white onClick={onOpen} className={css.btn}>
                    1 - {perPage}
                    <ChevronDownIcon className={classNames(css.icon, open && css.open)} />
                </Button>
            </Tooltip>

            <Dropdown onToggle={onToggle} open={open} position="left">
                <SelectOption<number> active={perPage === 10} value={10} onClick={handleClick}>
                    1 - 10
                </SelectOption>
                <SelectOption<number> active={perPage === 15} value={15} onClick={handleClick}>
                    1 - 15
                </SelectOption>
                <SelectOption<number> active={perPage === 25} value={25} onClick={handleClick}>
                    1 - 25
                </SelectOption>
                <SelectOption<number> active={perPage === 30} value={30} onClick={handleClick}>
                    1 - 30
                </SelectOption>
                <SelectOption<number> active={perPage === 50} value={50} onClick={handleClick}>
                    1 - 50
                </SelectOption>
            </Dropdown>
        </div>
    );
};
