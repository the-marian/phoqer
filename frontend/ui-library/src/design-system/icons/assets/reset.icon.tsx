import { FC, SVGProps } from 'react';

export const ResetIcon: FC<SVGProps<SVGSVGElement>> = props => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 512 512">
            <path
                d="M320 146s24.36-12-64-12a160 160 0 10160 160"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="32"
            />
            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                d="M256 58l80 80-80 80"
            />
        </svg>
    );
};
