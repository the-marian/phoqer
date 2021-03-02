import React, { createContext, ReactElement, useState } from 'react';

import { Themes } from '../../../interfaces';

export const Theme = createContext<[theme: Themes, setTheme: ((v: Themes) => void) | null]>(['white', null]);

interface IProps {
    siteTheme?: Themes;
    children: JSX.Element | JSX.Element[] | ReactElement;
}

const SiteTheme = ({ children, siteTheme = 'white' }: IProps): ReactElement => {
    const [theme, setTheme] = useState<Themes>(siteTheme);

    return <Theme.Provider value={[theme, setTheme]}>{children}</Theme.Provider>;
};

export default SiteTheme;
