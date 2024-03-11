import { FC, ReactNode, useEffect, useRef, useState } from 'react';

import { Loader } from 'phoqer';

interface Props {
    module: () => Promise<Injectable>;
    children?: ReactNode;
}
export const InjectModule: FC<Props> = ({ module, children }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let unmount: () => void;

        module()
            .then(m => {
                m.mount(ref.current as HTMLElement);
                unmount = m.unmount;
            })
            .catch(e => {
                console.log(e);
                setIsError(true);
            })
            .finally(() => setIsLoading(false));

        return () => {
            unmount?.();
        };
    }, [module]);

    return (
        <>
            <div ref={ref} />
            {isError && children}
            {isLoading && <Loader fixed />}
        </>
    );
};
