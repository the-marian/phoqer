import { FC, SVGProps } from 'react';

export const EllipsisHorizontalIcon: FC<SVGProps<SVGSVGElement>> = props => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 512 512">
            <circle cx="256" cy="256" r="32" fill="currentColor" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32" />
            <circle cx="416" cy="256" r="32" fill="currentColor" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32" />
            <circle cx="96" cy="256" r="32" fill="currentColor" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32" />
        </svg>
    );
};
