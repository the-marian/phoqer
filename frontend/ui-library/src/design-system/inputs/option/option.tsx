import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react';

import classNames from 'classnames';
import { Text } from 'src/design-system/foundation';
import { BaseSizes } from 'src/types/sizes.type';

import css from './option.module.scss';

export interface OptionProps extends ComponentPropsWithoutRef<'button'> {
    children: ReactNode;
    isActive?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    size?: BaseSizes;
}
export const Option = forwardRef<HTMLButtonElement, OptionProps>(
    ({ size = 'md', children, className, leftIcon, rightIcon, isActive = false, ...props }, ref) => {
        return (
            <button
                ref={ref}
                type="button"
                data-option=""
                className={classNames(css.option, className, css[size], {
                    [css.active]: isActive,
                    [css.left]: leftIcon,
                    [css.right]: rightIcon,
                })}
                {...props}
            >
                {leftIcon && <div className={css.leftIcon}>{leftIcon}</div>}
                <Text as="div" size={size}>
                    {children}
                </Text>
                {rightIcon && <div className={css.rightIcon}>{rightIcon}</div>}
            </button>
        );
    },
);

Option.displayName = 'Option';
