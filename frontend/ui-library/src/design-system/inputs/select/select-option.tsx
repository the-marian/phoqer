import { FC, useCallback, useContext, useRef } from 'react';

import { isEqual } from 'lodash-es';
import { Option, OptionProps } from 'src/design-system/inputs/option';
import { SelectContext } from 'src/design-system/inputs/select/select.context';

export interface SelectOptionProps extends Omit<OptionProps, 'value'> {
    value: unknown;
}
export const SelectOption: FC<SelectOptionProps> = ({ children, value, ...props }) => {
    const ref = useRef<HTMLButtonElement>(null);
    const { value: contextValue, onSelect } = useContext(SelectContext);

    const handleSelect = useCallback(() => {
        onSelect?.(value);
    }, [onSelect, value]);

    return (
        <Option ref={ref} isActive={isEqual(value, contextValue)} onClick={onSelect ? handleSelect : undefined} {...props}>
            {children}
        </Option>
    );
};
