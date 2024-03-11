import { ComponentProps, forwardRef, ReactNode } from 'react';

import classNames from 'classnames';
import { Text } from 'src/design-system/foundation';
import { SpinnerIcon } from 'src/design-system/icons';
import { BaseSizes } from 'src/types/sizes.type';

import css from '../button/button.module.scss';

type Variant = 'primary' | 'secondary' | 'link' | 'text' | 'ghost';

export interface LinkProps extends ComponentProps<'a'> {
    isLoading?: boolean;
    isDisabled?: boolean;
    variant?: Variant;
    size?: BaseSizes;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
    (
        {
            href,
            onClick,
            children,
            leftIcon,
            className,
            rightIcon,
            size = 'md',
            isLoading = false,
            isDisabled = false,
            variant = 'primary',
            ...props
        },
        ref,
    ) => {
        const isLeftIcon = Boolean(variant !== 'link' && leftIcon);
        const isRightIcon = Boolean(variant !== 'link' && rightIcon);
        const isOnClick = !isLoading && !isDisabled && onClick;

        return (
            <a
                {...props}
                ref={ref}
                onClick={isOnClick ? onClick : undefined}
                href={isOnClick ? href : undefined}
                className={classNames(
                    className,
                    css.button,
                    css[size],
                    css[variant],
                    isDisabled && css.disabled,
                    isLoading && css.loading,
                    isLeftIcon && css.left,
                    isRightIcon && css.right,
                )}
            >
                {isLeftIcon && <div className={css.leftIcon}>{leftIcon}</div>}
                {isRightIcon && <div className={css.rightIcon}>{rightIcon}</div>}

                <Text as="div" size={size} weight={500} className={css.children}>
                    {children}
                </Text>
                {isLoading && <SpinnerIcon className={css.spinner} />}
            </a>
        );
    },
);

Link.displayName = 'Link';
