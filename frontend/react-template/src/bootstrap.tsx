import React from 'react';

import 'phoqer/dist/styles/root.css';
import ReactDOM from 'react-dom/client';

import './i18n';

import { Root } from 'src/root/root';

import packageJson from '../package.json';

const mount = (el: HTMLElement): void => {
    const root = ReactDOM.createRoot(el);
    root.render(<Root />);
};

const root = document.getElementById(packageJson.name);

if (root) {
    mount(root);
}

if (!root) {
    throw new Error(`There is no component with id "${packageJson.name}"`);
}

export {};
