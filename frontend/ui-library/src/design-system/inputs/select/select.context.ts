import { createContext } from 'react';

export interface SelectContextType {
    value?: any;
    onSelect?: (value: any) => void;
}
export const SelectContext = createContext<SelectContextType>({});
