import { ComponentProps, forwardRef } from 'react';

import classNames from 'classnames';
import { SpinnerIcon } from 'src/design-system/icons';
import { BaseSizes } from 'src/types/sizes.type';

import css from '../icon-button/icon-button.module.scss';

export interface IconLinkProps extends ComponentProps<'a'> {
    label: string;
    size?: BaseSizes;
    isLoading?: boolean;
    isDisabled?: boolean;
    isFilled?: boolean;
    isRect?: boolean;
}
export const IconLink = forwardRef<HTMLAnchorElement, IconLinkProps>(
    (
        {
            label,
            href,
            children,
            onClick,
            className,
            size = 'md',
            isLoading = false,
            isDisabled = false,
            isFilled = false,
            isRect = false,
            ...props
        },
        ref,
    ) => {
        const isOnClick = !isLoading && !isDisabled && onClick;

        return (
            <a
                {...props}
                ref={ref}
                onClick={isOnClick ? onClick : undefined}
                href={isOnClick ? href : undefined}
                aria-label={label}
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
            </a>
        );
    },
);

IconLink.displayName = 'IconLink';
