import { FC, SVGProps } from 'react';

export const HappyIcon: FC<SVGProps<SVGSVGElement>> = props => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 512 512">
            <circle cx="184" cy="232" r="30" fill="currentColor" />
            <path
                d="M256.05 384c-45.42 0-83.62-29.53-95.71-69.83a8 8 0 017.82-10.17h175.69a8 8 0 017.82 10.17c-11.99 40.3-50.2 69.83-95.62 69.83z"
                fill="currentColor"
            />
            <circle cx="328" cy="232" r="30" fill="currentColor" />
            <circle cx="256" cy="256" r="208" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32" />
        </svg>
    );
};
