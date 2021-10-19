import { useEffect } from 'react';

import { Router } from 'next/router';

import { AdType } from '../interfaces';

type AdTypeMap = { [key in AdType]: number };

const adsIndexMap: AdTypeMap = {
    horizontal: 0,
    square: 0,
};

const useAdsIndex = (type: 'horizontal' | 'square'): number => {
    useEffect(() => {
        const handleClear = () => {
            adsIndexMap.horizontal = 0;
            adsIndexMap.square = 0;
        };
        Router.events.on('routeChangeStart', handleClear);
        return () => {
            Router.events.off('routeChangeStart', handleClear);
        };
    }, []);

    adsIndexMap[type] = adsIndexMap[type] + 1;
    return adsIndexMap[type] - 1;
};

export default useAdsIndex;
