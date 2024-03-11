import { FC, SVGProps } from 'react';

export const StarIcon: FC<SVGProps<SVGSVGElement>> = props => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 512 512">
            <path
                d="M480 208H308L256 48l-52 160H32l140 96-54 160 138-100 138 100-54-160z"
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="32"
            />
        </svg>
    );
};
