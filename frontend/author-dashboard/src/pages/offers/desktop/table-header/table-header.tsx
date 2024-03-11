import React from 'react';

import { Flex } from 'phoqer';
import { StickyContainer } from 'phoqer-shared';

import { KeyboardShortcuts } from 'src/components/keyboard-shortcuts/keyboard-shortcuts';
import { Pagination } from 'src/pages/offers/shared/pagination/pagination';

import { StatusTabs } from '../../shared/status-tabs/status-tabs';

import css from './table-header.module.scss';

export const TableHeader = (): JSX.Element => {
    return (
        <>
            <StickyContainer zIndex={12} className={css.root}>
                <Flex align="center" justify="between" className={css.header}>
                    <StatusTabs />
                    <KeyboardShortcuts />
                </Flex>
            </StickyContainer>

            <StickyContainer zIndex={11} className={css.root}>
                <Pagination />
            </StickyContainer>
        </>
    );
};
