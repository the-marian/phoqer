import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from 'react';

import classNames from 'classnames';

import css from './sticky-container.module.scss';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children: ReactNode;
    zIndex?: number;
}
export const StickyContainer: FC<Props> = ({ children, className, zIndex = 10, ...props }) => {
    return (
        <div className={classNames(css.root, className)} style={{ zIndex }} {...props}>
            {children}
        </div>
    );
};
