import { FC } from 'react';

import classNames from 'classnames';

import { ModalContainer, ModalProps } from '../common';

import css from './small-modal.module.scss';

export const SmallModal: FC<ModalProps> = ({ className, children, ...props }) => {
    return (
        <ModalContainer className={classNames(css.small, className)} {...props}>
            {children}
        </ModalContainer>
    );
};
