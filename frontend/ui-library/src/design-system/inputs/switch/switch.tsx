import { ComponentPropsWithoutRef, forwardRef } from 'react';

import classNames from 'classnames';
import { Text } from 'src/design-system/foundation';
import { BaseSizes } from 'src/types/sizes.type';

import css from './switch.module.scss';

export interface SwitchProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size'> {
    label?: string;
    type?: 'checkbox' | 'radio';
    size?: BaseSizes;
}
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
    ({ size = 'md', name, label, className, type = 'checkbox', disabled = false, ...props }, ref) => {
        return (
            <label className={classNames(css.switch, css[size], { [css.disabled]: disabled })}>
                <input
                    {...props}
                    ref={ref}
                    type={type}
                    name={name}
                    value={name}
                    disabled={disabled}
                    className={classNames(className, css.input)}
                />
                <span className={css.mark} />
                {label && (
                    <Text size={size} className={css.label}>
                        {label}
                    </Text>
                )}
            </label>
        );
    },
);

Switch.displayName = 'Switch';
