import { FC, ReactNode, useRef } from 'react';

import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { ChevronDownIcon } from 'src/design-system/icons';
import { Button } from 'src/design-system/inputs/button';
import { useActiveOption } from 'src/design-system/inputs/dropdown/dropdown.hooks';
import { useIsOpen } from 'src/hooks';
import { BaseSizes } from 'src/types/sizes.type';

import css from './dropdown.module.scss';
import { useClickOutside, useEscape } from './hooks';

export interface DropdownProps {
    size?: BaseSizes;
    isOpen: boolean;
    className?: string;
    children: ReactNode;
    onClose?: () => void;
    position?: 'left' | 'right';
}
export const Dropdown: FC<DropdownProps> = ({ isOpen, onClose, children, className, size = 'md', position = 'left' }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEscape({ onClose, isOpen });
    useClickOutside({ onClose, isOpen, ref });

    useActiveOption(ref, isOpen);

    return (
        <CSSTransition in={isOpen} timeout={200} unmountOnExit>
            <div className={classNames(css.dropdown, css[size], css[position], className)} ref={ref}>
                {children}
            </div>
        </CSSTransition>
    );
};

interface DropdownContainerProps {
    size?: BaseSizes;
    label: string;
    children: ReactNode;
}
export const DropdownContainer: FC<DropdownContainerProps> = ({ size = 'md', label, children }) => {
    const { isOpen, onOpen, onClose } = useIsOpen();

    return (
        <div className={css.wrp}>
            <Button
                size={size}
                onClick={onOpen}
                variant="secondary"
                rightIcon={<ChevronDownIcon className={isOpen ? css.open : undefined} />}
            >
                {label}
            </Button>

            <Dropdown size={size} isOpen={isOpen} onClose={onClose}>
                {children}
            </Dropdown>
        </div>
    );
};
