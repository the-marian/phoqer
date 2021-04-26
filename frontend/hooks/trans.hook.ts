import { useSelector } from 'react-redux';

import { IState, ITranslations } from '../interfaces';

type UseTransType = (value: string) => string;

const useTrans = (): UseTransType => (value: string): string => {
    const translations = useSelector<IState, ITranslations>(state => state.translations);
    return translations[value] || '...';
};

export default useTrans;
