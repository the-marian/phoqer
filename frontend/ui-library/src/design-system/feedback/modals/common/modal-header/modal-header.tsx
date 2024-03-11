import { FC, ReactNode } from 'react';

import classNames from 'classnames';
import { Heading } from 'src/design-system/foundation';
import { CloseIcon } from 'src/design-system/icons';
import { IconButton } from 'src/design-system/inputs';

import css from './modal-header.module.scss';

export interface ModalHeaderProps {
    children?: ReactNode;
    onClose: () => void;
    autoFocus?: boolean;
    className?: string;
}
export const ModalHeader: FC<ModalHeaderProps> = ({ children, onClose, className, autoFocus = false }) => {
    return (
        <div className={classNames(css.header, className)}>
            {children ? (
                <Heading as="h2" size="md">
                    {children}
                </Heading>
            ) : (
                <span />
            )}
            <IconButton size="lg" label="Close" autoFocus={autoFocus} onClick={onClose}>
                <CloseIcon />
            </IconButton>
        </div>
    );
};
