import { ComponentPropsWithoutRef, forwardRef, useCallback } from 'react';

import classNames from 'classnames';
import { Text } from 'src/design-system/foundation';
import { BaseSizes } from 'src/types/sizes.type';

import css from './checkbox.module.scss';

export interface CheckboxProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size' | 'value' | 'onChange'> {
    label?: string;
    size?: BaseSizes;
    isDisabled?: boolean;
    type?: 'checkbox' | 'radio';
    onChange?: (value: boolean) => void;
}
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ size = 'md', label, onChange, className, checked = false, type = 'checkbox', isDisabled = false, ...props }, ref) => {
        const handleChange = useCallback((): void => {
            if (!isDisabled && onChange) {
                onChange(!checked);
            }
        }, [checked, isDisabled, onChange]);

        return label ? (
            <label
                className={classNames(css.withLabel, className, css[size], {
                    [css.disabled]: isDisabled,
                    [css.checked]: checked,
                })}
            >
                <input
                    ref={ref}
                    type={type}
                    checked={checked}
                    disabled={isDisabled}
                    className={css.input}
                    onChange={handleChange}
                    {...props}
                />
                <Text size={size}>{label}</Text>
            </label>
        ) : (
            <div
                className={classNames(css.checkbox, className, css[size], { [css.disabled]: isDisabled, [css.checked]: checked })}
            >
                <input
                    ref={ref}
                    type={type}
                    checked={checked}
                    disabled={isDisabled}
                    className={css.input}
                    onChange={handleChange}
                    {...props}
                />
            </div>
        );
    },
);

Checkbox.displayName = 'Checkbox';
