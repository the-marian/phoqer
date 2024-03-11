declare interface Injectable {
    mount: (el: HTMLElement) => void;
    unmount: () => void;
}

declare module '*/root' {
    declare const mount: Injectable['mount'];
    declare const unmount: Injectable['unmount'];

    export { mount, unmount };
}
