import { useContext } from 'react';

import { Theme } from '../components/context/theme';
import { Themes } from '../interfaces';

const useTheme = (): [theme: Themes, setTheme: (v: Themes) => void] => useContext(Theme);

export default useTheme;
