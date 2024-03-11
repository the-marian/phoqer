import { createContext, FC, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';

const REDUCE_ANIMATIONS_KEY = 'REDUCE_ANIMATIONS_KEY';
const ANIMATE_CLASSNAME = 'animate';

interface ReduceAnimationsType {
    isReduceAnimations: boolean;
    toggleIsReduceAnimations: () => void;
}

export const ReduceAnimationsContext = createContext<ReduceAnimationsType>({} as ReduceAnimationsType);

export const ReduceAnimationsProvider: FC<PropsWithChildren> = ({ children }) => {
    const [isReduceAnimations, setIsReduceAnimations] = useState<boolean>(() =>
        JSON.parse(localStorage.getItem(REDUCE_ANIMATIONS_KEY) ?? 'false'),
    );

    const toggleIsReduceAnimations = useCallback((): void => {
        setIsReduceAnimations(prev => {
            localStorage.setItem(REDUCE_ANIMATIONS_KEY, JSON.stringify(!prev));
            return !prev;
        });
    }, []);

    useEffect(() => {
        if (isReduceAnimations) {
            document.body.classList.remove(ANIMATE_CLASSNAME);
        } else {
            document.body.classList.add(ANIMATE_CLASSNAME);
        }
    }, [isReduceAnimations]);

    return (
        <ReduceAnimationsContext.Provider value={{ isReduceAnimations, toggleIsReduceAnimations }}>
            {children}
        </ReduceAnimationsContext.Provider>
    );
};

export const useReduceAnimations = (): ReduceAnimationsType => {
    const context = useContext(ReduceAnimationsContext);
    if (!context) {
        return { isReduceAnimations: false, toggleIsReduceAnimations: () => undefined };
    }

    return context;
};
