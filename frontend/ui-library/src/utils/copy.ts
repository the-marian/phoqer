const hideElement = (textArea: HTMLElement): void => {
    textArea.style.position = 'fixed';
    textArea.style.zIndex = '-100';
    textArea.style.width = '1px';
    textArea.style.height = '1px';
    textArea.style.overflow = 'hidden';
};

export const copyToClipboard = (textToCopy: string): Promise<void> => {
    if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(textToCopy);
    } else {
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        hideElement(textArea);

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        return new Promise((res, rej) => {
            document.execCommand('copy') ? res() : rej();
            textArea.remove();
        });
    }
};
