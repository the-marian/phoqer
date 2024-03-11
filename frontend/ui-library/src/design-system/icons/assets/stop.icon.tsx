import { FC, SVGProps } from 'react';

export const StopIcon: FC<SVGProps<SVGSVGElement>> = props => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 512 512">
            <rect
                x="96"
                y="96"
                width="320"
                height="320"
                rx="24"
                ry="24"
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="32"
            />
        </svg>
    );
};
