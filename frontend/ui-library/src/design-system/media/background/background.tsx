import { DetailedHTMLProps, FC, HTMLAttributes, useEffect, useRef, useState } from 'react';

import classNames from 'classnames';

import css from './background.module.scss';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    border?: boolean;
}

export const Background: FC<Props> = ({ className, border, ...props }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState<number>(0);

    useEffect(() => {
        if (ref.current) {
            setContainerWidth(ref.current?.offsetWidth || 0);
        }
    }, [ref]);

    return (
        <div ref={ref} className={classNames(css.root, border && css.border, className)} {...props}>
            <span style={{ height: containerWidth * 0.4, width: containerWidth * 0.4 }} />
            <span style={{ height: containerWidth * 0.3, width: containerWidth * 0.3 }} />
            <span style={{ height: containerWidth * 0.18, width: containerWidth * 0.18 }} />
        </div>
    );
};
