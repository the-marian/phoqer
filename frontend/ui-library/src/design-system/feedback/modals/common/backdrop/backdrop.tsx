import { ComponentPropsWithoutRef, FC, ReactNode } from 'react';

import classNames from 'classnames';

import styles from './backdrop.module.scss';

export interface ModalBackdropProps extends ComponentPropsWithoutRef<'div'> {
    children: ReactNode;
}
export const Backdrop: FC<ModalBackdropProps> = ({ children, className, ...rest }) => {
    return (
        <div className={classNames(styles.backdrop, className)} {...rest}>
            {children}
        </div>
    );
};
