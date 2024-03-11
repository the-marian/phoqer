import { FC, SVGProps } from 'react';

export const AlertIcon: FC<SVGProps<SVGSVGElement>> = props => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 512 512">
            <rect x="16" y="16" width="480" height="480" rx="240" fill="none" stroke="currentColor" strokeWidth="32" />
            <path
                fill="none"
                strokeWidth="32"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M250.26 166.05L256 288l5.73-121.95a5.74 5.74 0 00-5.79-6h0a5.74 5.74 0 00-5.68 6z"
            />
            <path fill="currentColor" d="M256 367.91a20 20 0 1120-20 20 20 0 01-20 20z" />
        </svg>
    );
};
