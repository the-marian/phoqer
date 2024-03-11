import { FC, ReactNode, useEffect, useRef } from 'react';

import classNames from 'classnames';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { Scroll } from 'src/design-system/layout';

import { ModalProps } from '../common';

import css from './large-modal.module.scss';

type Props = Omit<ModalProps, 'title'> & { header?: ReactNode };

export const LargeModal: FC<Props> = ({ header, footer, children, isOpen, onClose, className, ...props }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (event: KeyboardEvent): void => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handler);
        }

        return () => window.removeEventListener('keydown', handler);
    }, [isOpen, onClose]);

    return ReactDOM.createPortal(
        <CSSTransition in={isOpen} timeout={300} unmountOnExit>
            <div {...props} ref={containerRef} id="modal-container" className={classNames(css.container, className)}>
                {header}

                <Scroll
                    id="modal-inner"
                    className={classNames({
                        [css.withHeader]: header && !footer,
                        [css.withFooter]: footer && !header,
                        [css.withBoth]: footer && header,
                    })}
                >
                    <div id="large-modal" className={css.inner}>
                        {children}
                    </div>
                </Scroll>

                {footer && <div className={css.footer}>{footer}</div>}
            </div>
        </CSSTransition>,
        document.body,
    );
};
