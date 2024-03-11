import { FC, SVGProps } from 'react';

export const CheckmarkDoneIcon: FC<SVGProps<SVGSVGElement>> = props => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 512 512" fill="none">
            <rect x="16" y="16" width="480" height="480" rx="240" fill="none" stroke="currentColor" strokeWidth="32" />

            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                d="M368 192L256.13 320l-47.95-48M191.95 320L144 272M305.71 192l-51.55 59"
            />
        </svg>
    );
};
