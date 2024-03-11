import { FC, SVGProps } from 'react';

export const ExpandIcon: FC<SVGProps<SVGSVGElement>> = props => {
    return (
        <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M161 32H63C45.3269 32 31 46.3269 31 64V162" stroke="currentColor" strokeWidth="32" />
            <path d="M31 351V449C31 466.673 45.3269 481 63 481H163" stroke="currentColor" strokeWidth="32" />
            <path d="M480 351V449C480 466.673 465.673 481 448 481H348" stroke="currentColor" strokeWidth="32" />
            <path d="M350 32H448C465.673 32 480 46.3269 480 64V162" stroke="currentColor" strokeWidth="32" />
        </svg>
    );
};
