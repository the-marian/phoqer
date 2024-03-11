import {
    createContext,
    Dispatch,
    FC,
    MouseEvent,
    PropsWithChildren,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';

import { uniq } from 'lodash-es';

export interface TableContextType {
    selected: number[];
    selectAll: () => void;
    setSelected: Dispatch<SetStateAction<number[]>>;
    isFocused: boolean;
    onBlur: () => void;
    onFocus: () => void;
    unselectAll: () => void;
    toggle: (index: number) => () => void;
    eventToggle: (index: number) => (event: MouseEvent<HTMLElement>) => void;
    setData: (data: unknown[]) => void;
}

export const TableContext = createContext<TableContextType>({} as TableContextType);

export const TableContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const dataRef = useRef<unknown[]>([]);
    const lastSelectedRef = useRef<number>(0);

    const [selected, setSelected] = useState<number[]>([]);
    const [isMetaPressed, setIsMetaPressed] = useState(false);
    const [isFocused, setIsFocused] = useState(true);

    const setData = (data: unknown[]): void => {
        dataRef.current = data;
    };

    const onBlur = (): void => setIsFocused(false);
    const onFocus = (): void => setIsFocused(true);

    const unselectAll = (): void => {
        setSelected([]);
        lastSelectedRef.current = 0;
    };

    const toggle = (index: number) => () => {
        setSelected(prev => {
            if (prev.includes(index)) {
                return prev.filter(i => i !== index);
            }

            return [...prev, index];
        });

        lastSelectedRef.current = index;
    };

    const eventToggle = (index: number) => (event: MouseEvent<HTMLElement>) => {
        if (event.shiftKey) {
            const start = lastSelectedRef.current > index ? index : lastSelectedRef.current;
            const end = lastSelectedRef.current > index ? lastSelectedRef.current : index;

            setSelected(prev => {
                if (prev.includes(index)) {
                    return dataRef.current.reduce<number[]>((acc, _, i) => {
                        if (i >= start && i <= end) {
                            return acc;
                        }

                        if (prev.includes(i)) {
                            acc.push(i);
                        }
                        return acc;
                    }, []);
                }

                const range = dataRef.current.reduce<number[]>((acc, _, i) => {
                    if (i >= start && i <= end) {
                        acc.push(i);
                    }
                    return acc;
                }, []);

                return uniq([...prev, ...range]);
            });

            lastSelectedRef.current = index;
            return;
        }

        toggle(index)();
    };

    const selectAll = useCallback((): void => {
        setSelected(dataRef.current.map((_, index) => index));
        lastSelectedRef.current = dataRef.current.length - 1;
    }, []);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent): void => {
            if (event.key === 'Meta' || event.key === 'Control') {
                setIsMetaPressed(true);
            }

            if (event.key === 'Escape' || event.key === 'Backspace' || event.key === 'Delete') {
                setSelected([]);
                lastSelectedRef.current = 0;
            }

            if (event.key === 'a' && isMetaPressed) {
                event.preventDefault();
                selectAll();
            }

            if (event.key === 'z' && isMetaPressed) {
                setSelected(prev => {
                    lastSelectedRef.current = prev[prev.length - 1];
                    return prev.slice(0, prev.length - 1);
                });
            }
        };

        const handleKeyUp = (event: KeyboardEvent): void => {
            if (event.key === 'Meta' || event.key === 'Control') {
                setIsMetaPressed(false);
            }
        };

        if (isFocused) {
            window.addEventListener('keydown', handleKeyDown);
            window.addEventListener('keyup', handleKeyUp);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [selectAll, dataRef.current.length, isMetaPressed, isFocused]);

    return (
        <TableContext.Provider
            value={{ selected, setSelected, eventToggle, toggle, unselectAll, selectAll, isFocused, onFocus, onBlur, setData }}
        >
            {children}
        </TableContext.Provider>
    );
};

export const useTableContext = (): TableContextType => {
    return useContext(TableContext);
};
