import React, { ReactElement, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import OffersLoader from '../../loaders/skeletons/offers';

interface IProps {
    onSubmit: (page: number) => void;
    loading: boolean;
    total: number;
}

const OffersIntersection = ({ onSubmit, total, loading }: IProps): ReactElement | null => {
    const [innerLoading, setInnerLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const { ref, inView } = useInView({
        threshold: 0,
        rootMargin: '400px',
    });

    setTimeout(() => {
        setInnerLoading(false);
    }, 500);

    useEffect(() => {
        let id: NodeJS.Timeout | null = null;
        if (!loading && !innerLoading) {
            setInnerLoading(true);

            id = setTimeout(() => {
                setInnerLoading(false);
                setPage(value => value + 1);
                onSubmit(page + 1);
            }, 500);
        }

        return () => {
            if (id !== null) clearTimeout(id);
        };
    }, [inView]);

    return total > page ? <OffersLoader amount={4} ref={ref} /> : null;
};

export default OffersIntersection;
