import { FC } from 'react';

import classNames from 'classnames';
import { SpinnerIcon } from 'src/design-system/icons';

import css from './loader.module.scss';

export interface LoaderProps {
    fixed?: boolean;
    absolute?: boolean;
    color?: 'primary' | 'white' | 'black';
}
export const Loader: FC<LoaderProps> = ({ fixed = false, absolute = false, color = 'primary' }) => {
    return (
        <div className={classNames(css.backdrop, css[color], fixed && css.fixed, absolute && css.absolute)}>
            <SpinnerIcon />
        </div>
    );
};
