import Cookies from 'js-cookie';
import React, { createContext, ReactElement, useEffect, useState } from 'react';

import config from '../../../assets/config';
import { Themes } from '../../../interfaces';
import notificationsModal from '../../common/modal/notifications-modal';

export const Theme = createContext<[theme: Themes, setTheme: (v: Themes) => void]>(['blue', () => undefined]);

interface IProps {
    siteTheme?: Themes;
    children: JSX.Element | JSX.Element[] | ReactElement;
}

const SiteTheme = ({ children, siteTheme = 'blue' }: IProps): ReactElement => {
    const [theme, setTheme] = useState<Themes>(config.themes.includes(siteTheme) ? siteTheme : 'blue');

    useEffect(() => {
        if (process.browser && document.querySelector('html')) {
            document.querySelector('html')?.classList?.add(siteTheme);
        }
    }, []);

    const handleTheme = (value: Themes): void => {
        try {
            Cookies.set('phoqer_theme', value);
            if (document.querySelector('html')) {
                document.querySelector('html')?.classList?.remove(theme);
                document.querySelector('html')?.classList?.add(value);
            }
            setTheme(value);
        } catch (error) {
            notificationsModal('error', error?.message);
        }
    };
    return <Theme.Provider value={[theme, handleTheme]}>{children}</Theme.Provider>;
};

export default SiteTheme;
