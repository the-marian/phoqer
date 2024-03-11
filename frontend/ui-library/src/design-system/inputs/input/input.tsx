import { ReactNode, useState, ComponentPropsWithoutRef, forwardRef } from 'react';

import classNames from 'classnames';
import { AlertIcon, EyeIcon, EyeOffIcon, SpinnerIcon } from 'src/design-system/icons';
import { BaseSizes } from 'src/types/sizes.type';

import css from './input.module.scss';

export interface InputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size'> {
    isFilled?: boolean;
    isLoading?: boolean;
    isDisabled?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    isError?: boolean;
    size?: BaseSizes;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            leftIcon,
            rightIcon,
            className,
            size = 'md',
            type = 'text',
            isError = false,
            isFilled = false,
            isLoading = false,
            isDisabled = false,
            ...props
        },
        ref,
    ) => {
        const [inputType, setInputType] = useState(type);
        const isPassword = type === 'password';
        const handleChangeInputType = (): void => setInputType(prev => (prev === 'password' ? 'text' : 'password'));

        return (
            <div
                className={classNames(css.root, css[size], className, {
                    [css.error]: isError,
                    [css.filled]: isFilled,
                    [css.left]: leftIcon,
                    [css.disabled]: isDisabled,
                    [css.right]: rightIcon || isLoading || isPassword,
                })}
            >
                {leftIcon && <div className={css.leftIcon}>{leftIcon}</div>}
                <input ref={ref} className={css.input} {...props} disabled={isDisabled || isLoading} type={inputType} />
                {rightIcon && !isLoading && !isError && !isPassword && <div className={css.rightIcon}>{rightIcon}</div>}

                {isPassword && !isError && !isLoading && (
                    <button className={css.password} type="button" disabled={isDisabled} onClick={handleChangeInputType}>
                        {inputType === 'password' ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                )}

                {isError && !isLoading && <AlertIcon className={css.errorIcon} />}
                {isLoading && (
                    <div className={classNames(css.rightIcon, css.spinner)}>
                        <SpinnerIcon />
                    </div>
                )}
            </div>
        );
    },
);

Input.displayName = 'Input';
