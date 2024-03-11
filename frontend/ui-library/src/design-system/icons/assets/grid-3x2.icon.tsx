import { FC, SVGProps } from 'react';

export const Grid3x2Icon: FC<SVGProps<SVGSVGElement>> = props => {
    return (
        <svg
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="DragIndicatorIcon"
            style={{ transform: 'rotate(90deg)' }}
            {...props}
        >
            <path
                fill="currentColor"
                d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
            />
        </svg>
    );
};
