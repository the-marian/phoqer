import { FC, SVGProps } from 'react';

export const CheckmarkIcon: FC<SVGProps<SVGSVGElement>> = props => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 512 512">
            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                d="M464 128L240 384l-96-96M144 384l-96-96M368 128L232 284"
            />
        </svg>
    );
};
