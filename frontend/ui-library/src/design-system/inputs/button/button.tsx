import { ComponentProps, forwardRef, ReactNode } from 'react';

import classNames from 'classnames';
import { Text } from 'src/design-system/foundation';
import { SpinnerIcon } from 'src/design-system/icons';
import { BaseSizes } from 'src/types/sizes.type';

import css from './button.module.scss';

type Variant = 'primary' | 'secondary' | 'link' | 'text' | 'ghost';

export interface ButtonProps extends ComponentProps<'button'> {
    isLoading?: boolean;
    isDisabled?: boolean;
    variant?: Variant;
    size?: BaseSizes;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            type = 'button',
            children,
            className,
            leftIcon,
            rightIcon,
            size = 'md',
            isLoading = false,
            isDisabled = false,
            variant = 'primary',
            onClick,
            ...props
        },
        ref,
    ) => {
        const isLeftIcon = Boolean(variant !== 'link' && leftIcon);
        const isRightIcon = Boolean(variant !== 'link' && rightIcon);
        const isOnClick = !isLoading && !isDisabled && onClick;

        return (
            <button
                {...props}
                ref={ref}
                type={type}
                disabled={isDisabled}
                onClick={isOnClick ? onClick : undefined}
                className={classNames(
                    className,
                    css.button,
                    css[size],
                    css[variant],
                    isLoading && css.loading,
                    isDisabled && css.disabled,
                    isLeftIcon && css.left,
                    isRightIcon && css.right,
                )}
            >
                {isLeftIcon && <div className={css.leftIcon}>{leftIcon}</div>}
                {isRightIcon && <div className={css.rightIcon}>{rightIcon}</div>}

                <Text as="div" weight={500} size={size} className={css.children}>
                    {children}
                </Text>
                {isLoading && <SpinnerIcon className={css.spinner} />}
            </button>
        );
    },
);

Button.displayName = 'Button';
