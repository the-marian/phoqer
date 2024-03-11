import { ReactNode, useState, useEffect, FC, PropsWithChildren } from 'react';

import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { AlertIcon, CheckmarkDoneIcon } from 'src/design-system/icons';

import EventEmitter from 'events';

import css from './toast.module.scss';

interface ToastButton {
    label: string;
    onClick: () => void;
}

export interface Toast {
    id: string;
    title?: string;
    timeout?: number;
    content: ReactNode;
    button?: {
        close?: Partial<ToastButton>;
        extra?: Partial<ToastButton>;
    };
}

export type ToastWithType = Toast & { type: 'error' | 'success' | 'info' };

class ToastManager extends EventEmitter {
    public toasts: ToastWithType[] = [];

    constructor() {
        super();
    }

    add = (toast: ToastWithType): void => {
        if (this.toasts.some(({ id }) => toast.id !== id)) {
            this.toasts = this.toasts.filter(({ id }) => toast.id !== id);
        }

        this.toasts = [...this.toasts, toast];
        this.emit('toast', this.toasts);
    };

    error = (toast: Toast): void => {
        this.add({ ...toast, type: 'error' });
    };

    success = (toast: Toast): void => {
        this.add({ ...toast, type: 'success' });
    };

    info = (toast: Toast): void => {
        this.add({ ...toast, type: 'info' });
    };

    remove = (id: string): void => {
        this.toasts = this.toasts.filter(toast => toast.id !== id);
        this.emit('toast', this.toasts);
    };
}

export const toast = new ToastManager();

const ToastComponent: FC<ToastWithType> = ({ id, title, content, type, timeout, button }) => {
    useEffect(() => {
        if (timeout || !button) {
            const timeoutId = setTimeout(() => {
                toast.remove(id);
            }, timeout || 5000);

            return () => {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
            };
        }
    }, [button, id, timeout]);

    const handleClose = (): void => {
        if (button?.close) {
            button.close?.onClick?.();
            toast.remove(id);
        }
    };

    const handleOther = (): void => {
        if (button?.extra) {
            button.extra?.onClick?.();
            toast.remove(id);
        }
    };

    return (
        <CSSTransition timeout={200} in unmountOnExit appear exit>
            <div className={css.toast}>
                <div className={classNames(css.icon, css[type])}>
                    {type === 'error' && <AlertIcon />}
                    {type === 'success' && <CheckmarkDoneIcon />}
                </div>

                <div className={css.center}>
                    {title && <h3 className={css.title}>{title}</h3>}
                    <div className={css.content}>{content}</div>
                </div>

                {button && (
                    <div className={classNames(css.btnWrp, { [css.btnGroup]: button.close && button.extra })}>
                        {button.close && (
                            <button className={css.close} type="button" onClick={handleClose}>
                                {button.close.label || 'Close'}
                            </button>
                        )}

                        {button.extra && (
                            <button className={css.extra} type="button" onClick={handleOther}>
                                {button.extra.label || 'Other'}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </CSSTransition>
    );
};

export const ToastProvider: FC<PropsWithChildren> = ({ children }) => {
    const [toasts, setToasts] = useState<ToastWithType[]>([]);

    useEffect(() => {
        toast.on('toast', setToasts);
        return () => {
            toast.off('toast', setToasts);
        };
    }, []);

    return (
        <>
            {children}
            <div className={css.root}>
                {toasts.length ? toasts.map(item => <ToastComponent key={item.id} {...item} />) : null}
            </div>
        </>
    );
};
