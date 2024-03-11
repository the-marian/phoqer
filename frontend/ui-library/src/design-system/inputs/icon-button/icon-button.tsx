import { ComponentProps, forwardRef } from 'react';

import classNames from 'classnames';
import { SpinnerIcon } from 'src/design-system/icons';
import { BaseSizes } from 'src/types/sizes.type';

import css from './icon-button.module.scss';

export interface IconButtonProps extends ComponentProps<'button'> {
    label: string;
    size?: BaseSizes;
    isLoading?: boolean;
    isDisabled?: boolean;
    isFilled?: boolean;
    isRect?: boolean;
}
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    (
        {
            label,
            children,
            className,
            size = 'md',
            type = 'button',
            isLoading = false,
            isDisabled = false,
            isFilled = false,
            isRect = false,
            onClick,
            ...props
        },
        ref,
    ) => {
        const isOnClick = !isLoading && !isDisabled && onClick;

        return (
            <button
                {...props}
                ref={ref}
                type={type}
                aria-label={label}
                onClick={isOnClick ? onClick : undefined}
                className={classNames(
                    className,
                    css.button,
                    css[size],
                    isLoading && css.loading,
                    isDisabled && css.disabled,
                    isFilled && css.filled,
                    isRect && css.rect,
                )}
            >
                <div className={css.children}>{children}</div>
                {isLoading && <SpinnerIcon className={css.spinner} />}
            </button>
        );
    },
);

IconButton.displayName = 'IconButton';
