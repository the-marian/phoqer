import { FC, SVGProps } from 'react';

export const GridIcon: FC<SVGProps<SVGSVGElement>> = props => {
    return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M10 3.5H35C38.5899 3.5 41.5 6.41015 41.5 10V35C41.5 38.5899 38.5899 41.5 35 41.5H10C6.41015 41.5 3.5 38.5899 3.5 35V10C3.5 6.41015 6.41015 3.5 10 3.5Z"
                stroke="currentColor"
                strokeWidth="7"
            />
            <path
                d="M10 58.5H35C38.5899 58.5 41.5 61.4101 41.5 65V90C41.5 93.5899 38.5899 96.5 35 96.5H10C6.41015 96.5 3.5 93.5899 3.5 90V65C3.5 61.4101 6.41015 58.5 10 58.5Z"
                stroke="currentColor"
                strokeWidth="7"
            />
            <path
                d="M65 58.5H90C93.5899 58.5 96.5 61.4101 96.5 65V90C96.5 93.5899 93.5899 96.5 90 96.5H65C61.4101 96.5 58.5 93.5899 58.5 90V65C58.5 61.4101 61.4101 58.5 65 58.5Z"
                stroke="currentColor"
                strokeWidth="7"
            />
            <path
                d="M65 3.5H90C93.5899 3.5 96.5 6.41015 96.5 10V35C96.5 38.5899 93.5899 41.5 90 41.5H65C61.4101 41.5 58.5 38.5899 58.5 35V10C58.5 6.41015 61.4101 3.5 65 3.5Z"
                stroke="currentColor"
                strokeWidth="7"
            />
        </svg>
    );
};
