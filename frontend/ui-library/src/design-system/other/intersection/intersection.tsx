import { FC, ReactNode, useEffect, useRef, useState } from 'react';

export interface IntersectionProps {
    once?: boolean;
    className?: string;
    threshold?: number;
    children: (value: boolean) => ReactNode;
}
export const Intersection: FC<IntersectionProps> = ({ children, className, once = false, threshold = 0.5 }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        if (ref.current) {
            const handler = (entries: IntersectionObserverEntry[]): void => {
                setIsIntersecting(entries[0].isIntersecting);

                if (once && entries[0].isIntersecting) {
                    observer.unobserve(ref.current as Element);
                }
            };

            const observer = new IntersectionObserver(handler, { threshold });
            observer.observe(ref.current);

            return () => {
                observer.disconnect();
            };
        }
    }, [once, threshold]);

    return (
        <div ref={ref} className={className}>
            {children(isIntersecting)}
        </div>
    );
};
