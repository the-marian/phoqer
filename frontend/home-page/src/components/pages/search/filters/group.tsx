import { FC, ReactNode } from 'react';

import classNames from 'classnames';
import { Flex, Heading, Collapse, ChevronUpIcon, useIsOpen } from 'phoqer';

import css from './group.module.scss';

interface Props {
    title: string;
    children: ReactNode;
}
export const Group: FC<Props> = ({ title, children }) => {
    const { isOpen, onToggle } = useIsOpen(true);
    return (
        <Flex>
            <button type="button" className={css.heading} onClick={onToggle}>
                <Heading size="md">{title}</Heading>
                <ChevronUpIcon className={classNames(css.icon, isOpen && css.isOpen)} />
            </button>

            <Collapse isOpen={isOpen} className={css.group}>
                <div />
                {children}
            </Collapse>
        </Flex>
    );
};
