import React from 'react';

import 'phoqer/dist/styles/root.css';
import ReactDOM from 'react-dom/client';

import './i18n';

import { Root } from 'src/root/root';

let root: ReactDOM.Root;

export const mount = (el: HTMLElement): void => {
    root = ReactDOM.createRoot(el);
    root.render(<Root />);
};

export const unmount = (): void => {
    root?.unmount();
};

const node = document.getElementById('#root');

if (node) {
    mount(node);
}
