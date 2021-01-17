import { EventEmitter } from 'events';
import React, { Component, MouseEvent, ReactElement } from 'react';

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
        this.emitChange();
    }

    close(): void {
        this.dom = null;
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

    handleKeyClose = (e: KeyboardEvent): void => {
        if (e.code !== 'Escape') return;
        modal.close();
    };

    handleClickClose = (e: MouseEvent<HTMLDivElement>): void => {
        if (e.target !== e.currentTarget) return;
        modal.close();
    };

    render(): ReactElement | boolean {
        const { dom } = this.state;
        return (
            !!dom && (
                <div className="react-modal-backdrop" onMouseDown={this.handleClickClose} aria-hidden>
                    <div className="react-modal-scroll" onMouseDown={this.handleClickClose} aria-hidden>
                        {dom}
                    </div>
                </div>
            )
        );
    }
}
