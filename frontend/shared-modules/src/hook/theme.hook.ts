import { useCallback, useEffect, useState } from 'react';

import { ThemeEnum } from 'src/types/theme';
import { changeTheme } from 'src/utils/change-theme';

interface ThemeType {
    theme: string;
    toggleTheme: () => void;
    setTheme: (value: string) => void;
}

type ThemeParam = string | (() => string);

export const useTheme = (value: ThemeParam): ThemeType => {
    const [theme, setTheme] = useState<string>(value);

    useEffect(() => {
        const handler = ({ detail }: CustomEvent<ThemeEnum>): void => {
            setTheme(detail);
        };

        changeTheme.subscribe(handler as EventListener);
        return () => changeTheme.unsubscribe(handler as EventListener);
    }, []);

    const toggleTheme = useCallback((): void => {
        changeTheme.submit(theme === ThemeEnum.Black ? ThemeEnum.White : ThemeEnum.Black);
    }, [theme]);

    return { theme, setTheme, toggleTheme };
};
