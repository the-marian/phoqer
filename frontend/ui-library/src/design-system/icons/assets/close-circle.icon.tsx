import { FC, SVGProps } from 'react';

export const CloseCircleIcon: FC<SVGProps<SVGSVGElement>> = props => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 512 512">
            <rect x="16" y="16" width="480" height="480" rx="240" fill="none" stroke="currentColor" strokeWidth="32" />

            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                d="M320 320L192 192M192 320l128-128"
            />
        </svg>
    );
};
