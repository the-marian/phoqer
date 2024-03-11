import { ImgHTMLAttributes, DetailedHTMLProps, useState, SyntheticEvent, useRef, useEffect, FC } from 'react';

import classNames from 'classnames';

import css from './image.module.scss';
import { placeholderImage } from './placeholder';

export interface ImageProps extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
    placeholder?: string;
    color?: 'light' | 'dark' | 'blue' | 'green';
}
export const Image: FC<ImageProps> = ({
    src,
    alt = '',
    onError,
    className,
    color = 'blue',
    placeholder = placeholderImage,
    ...props
}) => {
    const ref = useRef<HTMLImageElement>(null);
    const [loading, setLoading] = useState(true);

    const onLoaded = (): void => {
        setLoading(false);
    };

    const handleError = (event: SyntheticEvent<HTMLImageElement, Event>): void => {
        setLoading(false);
        event.currentTarget.src = placeholder;

        if (onError) {
            onError(event);
        }
    };

    useEffect(() => {
        if (ref.current && ref.current.complete) {
            onLoaded();
        }
    });

    return (
        <div className={classNames(css.root, className, loading && css.loading)}>
            <img
                {...props}
                ref={ref}
                alt={alt}
                loading="lazy"
                onLoad={onLoaded}
                onError={handleError}
                src={src || placeholder}
                className={classNames(css.image, css[color])}
            />
        </div>
    );
};
