import Cookies from 'js-cookie';
import React, { createContext, ReactElement, useState } from 'react';

import { Themes } from '../../../interfaces';
import notifications from '../../Common/Notifications';

export const Theme = createContext<[theme: Themes, setTheme: ((v: Themes) => void) | null]>(['white', null]);

interface IProps {
    siteTheme?: Themes;
    children: JSX.Element | JSX.Element[] | ReactElement;
}

const SiteTheme = ({ children, siteTheme = 'white' }: IProps): ReactElement => {
    const [theme, setTheme] = useState<Themes>(siteTheme);

    const handleTheme = (value: Themes): void => {
        try {
            Cookies.set('phoqer_theme', value);
            document.body.style.background = value === 'white' ? '#ffffff' : '#222222';
            setTheme(value);
        } catch (error) {
            notifications('error', error?.message);
        }
    };
    return <Theme.Provider value={[theme, handleTheme]}>{children}</Theme.Provider>;
};

export default SiteTheme;
