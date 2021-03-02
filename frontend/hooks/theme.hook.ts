import { useContext } from 'react';

import { Theme } from '../components/HOC/SiteTheme';
import { Themes } from '../interfaces';

const useTheme = (): [theme: Themes, setTheme: ((v: Themes) => void) | null] => {
    return useContext(Theme);
};

export default useTheme;
