import { FC, SVGProps } from 'react';

export const ChevronRightIcon: FC<SVGProps<SVGSVGElement>> = props => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="48"
                d="M184 112l144 144-144 144"
            />
        </svg>
    );
};
