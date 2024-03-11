import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface ModalProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    title?: string;
    footer?: ReactNode;
    children: ReactNode;
    isOpen: boolean;
    onClose: () => void;
}
