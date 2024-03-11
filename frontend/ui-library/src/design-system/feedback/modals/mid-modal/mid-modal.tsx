import { FC } from 'react';

import classNames from 'classnames';

import { ModalContainer, ModalProps } from '../common';

import css from './mid-modal.module.scss';

export const MidModal: FC<ModalProps> = ({ className, children, ...props }) => {
    return (
        <ModalContainer className={classNames(css.mid, className)} {...props}>
            {children}
        </ModalContainer>
    );
};
