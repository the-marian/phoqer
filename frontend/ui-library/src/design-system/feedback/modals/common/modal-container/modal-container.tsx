import { FC } from 'react';

import classNames from 'classnames';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { Scroll } from 'src/design-system/layout';

import { Backdrop } from '../backdrop/backdrop';
import { useModal } from '../modal-container/modal-container.hook';
import { ModalHeader } from '../modal-header/modal-header';

import css from './modal-container.module.scss';
import { ModalProps } from './modal-container.type';

export const ModalContainer: FC<ModalProps> = ({ isOpen, onClose, children, className, title, footer, ...rest }) => {
    const { mobileRef, containerRef, onBackdropClick } = useModal(isOpen, onClose);

    return ReactDOM.createPortal(
        <CSSTransition in={isOpen} timeout={300} unmountOnExit>
            <Backdrop className={classNames(mobileRef.current && css.bottom)} onClick={onBackdropClick}>
                <div {...rest} ref={containerRef} id="modal-container" className={classNames(css.container, className, 'white')}>
                    <ModalHeader onClose={onClose}>{title}</ModalHeader>

                    <Scroll id="modal-scroll" className={classNames(css.scroll, footer && css.withFooter)}>
                        <div className={css.inner} id="modal-inner">
                            {children}
                        </div>
                    </Scroll>

                    {footer && <div className={css.footer}>{footer}</div>}
                </div>
            </Backdrop>
        </CSSTransition>,
        document.body,
    );
};
