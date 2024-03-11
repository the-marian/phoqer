import { FC, ReactNode, useCallback } from 'react';

import { ChevronDownIcon } from 'src/design-system/icons';
import { Button } from 'src/design-system/inputs/button';
import { Dropdown } from 'src/design-system/inputs/dropdown';
import { SelectContext } from 'src/design-system/inputs/select/select.context';
import { useIsOpen } from 'src/hooks';
import { BaseSizes } from 'src/types/sizes.type';

import css from '../dropdown/dropdown.module.scss';

interface SelectProps {
    label: string;
    size?: BaseSizes;
    children: ReactNode;
    closeOnSelect?: boolean;
    value?: any;
    onSelect?: (value: any) => void;
}
export const Select: FC<SelectProps> = ({ value, children, label, onSelect, closeOnSelect = true, size = 'md' }) => {
    const { isOpen, onOpen, onClose } = useIsOpen();

    const handleSelect = useCallback(
        (value: unknown) => {
            onSelect?.(value);
            onClose();
        },
        [onClose, onSelect],
    );

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

            <Dropdown isOpen={isOpen} onClose={onClose}>
                <SelectContext.Provider value={{ value, onSelect: closeOnSelect ? handleSelect : onSelect }}>
                    {children}
                </SelectContext.Provider>
            </Dropdown>
        </div>
    );
};
