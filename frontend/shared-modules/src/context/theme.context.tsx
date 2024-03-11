import { createContext, FC, ReactNode, useContext, useEffect } from 'react';

import { useTheme } from 'src/hook/theme.hook';
import { ThemeEnum } from 'src/types/theme';
import { Cookies } from 'src/utils/cookies';

export const THEME_KEY = 'themeKey';

interface ThemeType {
    theme: string;
    toggleTheme: () => void;
    setTheme: (value: string) => void;
}

export const ThemeContext = createContext<ThemeType>({} as ThemeType);

interface Props {
    value?: string;
    children: ReactNode;
}
export const ThemeContextProvider: FC<Props> = ({ value = ThemeEnum.White, children }) => {
    const state = useTheme(value);

    useEffect(() => {
        Cookies.set(THEME_KEY, state.theme);
        const html = document.querySelector('html') as HTMLElement;
        html.className = state.theme;
    }, [state.theme]);

    return <ThemeContext.Provider value={state}>{children}</ThemeContext.Provider>;
};

export const useThemeContext = (): ThemeType => {
    return useContext(ThemeContext);
};
