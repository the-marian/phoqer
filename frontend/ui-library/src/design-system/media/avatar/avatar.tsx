import { DetailedHTMLProps, FC, ImgHTMLAttributes } from 'react';

import classNames from 'classnames';
import { Image } from 'src/design-system/media/image/image';

import css from './avatar.module.scss';
import { placeholderImage } from './placeholder';

export interface AvatarProps extends Omit<DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, 'src'> {
    src?: string | null;
    size?: 'sm' | 'md' | 'lg';
    color?: 'light' | 'dark' | 'blue' | 'green';
}

export const Avatar: FC<AvatarProps> = ({ className, src, size = 'sm', color = 'blue', ...props }) => {
    return (
        <Image
            {...props}
            color={color}
            draggable="false"
            src={src || placeholderImage}
            placeholder={placeholderImage}
            className={classNames(className, css.avatar, css[size])}
        />
    );
};
