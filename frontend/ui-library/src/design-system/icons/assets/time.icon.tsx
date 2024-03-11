import { FC, SVGProps } from 'react';

export const TimeIcon: FC<SVGProps<SVGSVGElement>> = props => {
    return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <circle cx="50" cy="50" r="46.5" stroke="currentColor" strokeWidth="7" />
            <rect x="48" y="23" width="6" height="30" rx="2" fill="currentColor" />
            <rect x="47" y="47" width="22" height="7" rx="2" fill="currentColor" />
        </svg>
    );
};
