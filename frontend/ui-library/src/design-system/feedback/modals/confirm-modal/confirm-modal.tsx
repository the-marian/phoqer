import { FC } from 'react';

import classNames from 'classnames';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { Button } from 'src/design-system/inputs';
import { Flex } from 'src/design-system/layout';

import { Backdrop, useModal, ModalProps } from '../common';

import { ConfirmModalIcon } from './confirm-modal-icon';
import css from './confirm-modal.module.scss';

export interface ConfirmModalProps extends Omit<ModalProps, 'footer' | 'title'> {
    cancelLabel: string;
    confirmLabel: string;
    onSubmit: () => void;
}

export const ConfirmModal: FC<ConfirmModalProps> = ({
    isOpen,
    onClose,
    children,
    className,
    cancelLabel,
    confirmLabel,
    onSubmit,
    ...rest
}) => {
    const { mobileRef, containerRef, onBackdropClick } = useModal(isOpen, onClose);

    return ReactDOM.createPortal(
        <CSSTransition in={isOpen} timeout={300} unmountOnExit>
            <Backdrop className={classNames(mobileRef.current && css.bottom)} onClick={onBackdropClick}>
                <div {...rest} ref={containerRef} id="modal-container" className={classNames(css.container, className, 'white')}>
                    <div className={css.inner} id="modal-inner">
                        <Flex direction="column" align="center" justify="center">
                            <ConfirmModalIcon />

                            <h2 className={css.text}>{children}</h2>
                        </Flex>
                    </div>

                    <Flex className={css.flex} align="center" justify="space-between">
                        <Button size="sm" className={css.btn} variant="secondary" onClick={onClose}>
                            {cancelLabel}
                        </Button>

                        <Button size="sm" className={css.btn} variant="primary" onClick={onSubmit}>
                            {confirmLabel}
                        </Button>
                    </Flex>
                </div>
            </Backdrop>
        </CSSTransition>,
        document.body,
    );
};
