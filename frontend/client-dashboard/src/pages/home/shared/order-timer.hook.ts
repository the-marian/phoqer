import { useEffect, useRef, useState } from 'react';

import { useDate } from 'phoqer';
import { useReduceAnimations } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';

const ONE_SECOND = 1_000;

const addZero = (value: number): string => {
    return value < 10 ? String(value).padStart(2, '0') : String(value);
};

const formatTime = (timeInSeconds: number): string => {
    const seconds = timeInSeconds % 60;
    const minutes = Math.floor(timeInSeconds / 60) % 60;
    const hours = Math.floor(timeInSeconds / 60 / 60);

    return `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
};

type UseOrderTimer = (startDate: string | number) => string;
export const useOrderTimer = (): UseOrderTimer => {
    const data = useDate();
    const { t } = useTranslation();
    const { isReduceAnimations } = useReduceAnimations();

    const timerRef = useRef<NodeJS.Timer | null>(null);
    const [endDate, setEndDate] = useState(() => new Date());

    useEffect(() => {
        if (!isReduceAnimations) {
            timerRef.current = setInterval(() => {
                setEndDate(new Date());
            }, ONE_SECOND);
        }

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [isReduceAnimations]);

    return startDate => {
        const diffSeconds = data(endDate).diff(startDate, 's');
        return t('hours: {{value}}', { value: formatTime(diffSeconds) });
    };
};
