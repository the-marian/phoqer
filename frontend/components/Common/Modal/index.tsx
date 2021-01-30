import { EventEmitter } from 'events';
import React, { Component, MouseEvent, ReactElement, TouchEvent } from 'react';

type Element = JSX.Element[] | JSX.Element | null;

class ModalManagement extends EventEmitter {
    public dom: Element;

    constructor() {
        super();
        this.dom = null;

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    open(dom: Element): void {
        this.dom = dom;
        if (process.browser) document.body.style.overflow = 'hidden';
        this.emitChange();
    }

    close(): void {
        this.dom = null;
        if (process.browser) document.body.style.overflow = 'auto';
        this.emitChange();
    }

    emitChange(): void {
        this.emit('modal', this.dom);
    }
}

export const modal = new ModalManagement();

interface IState {
    dom: Element;
}

export default class ModalComponent extends Component<unknown, IState> {
    state = {
        dom: null,
    };

    componentDidMount(): void {
        modal.addListener('modal', this.handleModal);
        window.addEventListener('keydown', this.handleKeyClose);
    }

    componentWillUnmount(): void {
        modal.removeListener('modal', this.handleModal);
        window.removeEventListener('keydown', this.handleKeyClose);
    }

    handleModal = (dom: Element): void => {
        this.setState({ dom });
    };

    handleKeyClose = (event: KeyboardEvent): void => {
        if (event.code !== 'Escape') return;
        modal.close();
    };

    handleClickClose = (event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>): void => {
        if (event.target !== event.currentTarget) return;
        modal.close();
    };

    render(): ReactElement | boolean {
        const { dom } = this.state;
        return (
            !!dom && (
                <div
                    className="react-modal-backdrop"
                    onTouchEnd={this.handleClickClose}
                    onMouseDown={this.handleClickClose}
                    aria-hidden
                >
                    <div
                        className="react-modal-scroll"
                        onTouchEnd={this.handleClickClose}
                        onMouseDown={this.handleClickClose}
                        aria-hidden
                    >
                        {dom}
                    </div>
                </div>
            )
        );
    }
}
