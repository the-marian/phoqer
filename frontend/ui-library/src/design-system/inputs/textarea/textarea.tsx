import { ComponentPropsWithoutRef, forwardRef } from 'react';

import classNames from 'classnames';
import TextareaAutosize from 'react-textarea-autosize';
import { AlertIcon, SpinnerIcon } from 'src/design-system/icons';
import { BaseSizes } from 'src/types/sizes.type';

import css from './textarea.module.scss';

type HTMLTextareaProps = ComponentPropsWithoutRef<'textarea'>;
type Style = Omit<NonNullable<HTMLTextareaProps['style']>, 'maxHeight' | 'minHeight'> & {
    height?: number;
};
export type TextareaHeightChangeMeta = {
    rowHeight: number;
};

export interface TextareaAutosizeProps extends Omit<HTMLTextareaProps, 'style'> {
    maxRows?: number;
    minRows?: number;
    onHeightChange?: (height: number, meta: TextareaHeightChangeMeta) => void;
    cacheMeasurements?: boolean;
    style?: Style;
}

export interface TextareaProps extends TextareaAutosizeProps {
    isFilled?: boolean;
    isLoading?: boolean;
    isDisabled?: boolean;
    isError?: boolean;
    size?: BaseSizes;
}
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    (
        {
            value,
            maxLength,
            className,
            minRows = 3,
            size = 'md',
            isFilled = false,
            isLoading = false,
            isDisabled = false,
            isError = false,
            ...props
        },
        ref,
    ) => {
        return (
            <div
                className={classNames(css.root, className, css[size], {
                    [css.error]: isError,
                    [css.filled]: isFilled,
                    [css.disabled]: isDisabled,
                    [css.maxLength]: maxLength,
                    [css.rightPadding]: isError || isLoading,
                })}
            >
                <TextareaAutosize
                    {...props}
                    ref={ref}
                    value={value}
                    className={css.input}
                    maxLength={maxLength}
                    minRows={maxLength ? minRows - 1 : minRows}
                    disabled={isDisabled || isLoading}
                />
                {maxLength && (
                    <span className={css.length}>
                        {String(value).trim().length} / {maxLength}
                    </span>
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

Textarea.displayName = 'Textarea';
