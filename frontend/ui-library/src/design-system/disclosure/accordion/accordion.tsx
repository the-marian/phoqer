import { FC, ReactNode, useRef, useState } from 'react';

import classNames from 'classnames';
import { Heading } from 'src/design-system/foundation';
import { ChevronRightIcon } from 'src/design-system/icons';

import css from './accordion.module.scss';

export interface AccordionProps {
    title: string;
    className?: string;
    children: ((open: boolean) => ReactNode) | ReactNode;
}
export const Accordion: FC<AccordionProps> = ({ title, className, children }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<number | null>();

    const handleToggle = (): void => {
        setHeight(prev => {
            if (prev) {
                return null;
            }

            return ref.current?.offsetHeight;
        });
    };

    return (
        <div className={classNames(css.root, className)}>
            <button type="button" className={css.head} onClick={handleToggle}>
                <Heading as="h2" className={css.title}>
                    {title}
                </Heading>
                <ChevronRightIcon className={classNames(css.icon, height && css.openIcon)} />
            </button>

            <div className={classNames(css.content, height && css.contentOpen)} style={{ height: height ?? undefined }}>
                <div ref={ref} className={css.inner}>
                    {typeof children === 'function' ? children(Boolean(height)) : children}
                </div>
            </div>
        </div>
    );
};
