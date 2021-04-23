import Cookies from 'js-cookie';
import React, { createContext, ReactElement, useEffect, useState } from 'react';

import { Themes } from '../../../interfaces';
import notificationsModal from '../../common/modal/notifications-modal';

export const Theme = createContext<[theme: Themes, setTheme: ((v: Themes) => void) | null]>(['white', null]);

interface IProps {
    siteTheme?: Themes;
    children: JSX.Element | JSX.Element[] | ReactElement;
}

const SiteTheme = ({ children, siteTheme = 'white' }: IProps): ReactElement => {
    const [theme, setTheme] = useState<Themes>(siteTheme);

    useEffect(() => {
        if (process.browser && document.querySelector('html')) {
            document.querySelector('html')?.classList?.add(siteTheme);
        }
    }, []);

    const handleTheme = (value: Themes): void => {
        try {
            Cookies.set('phoqer_theme', value);
            setTheme(value);
            if (document.querySelector('html')) {
                document.querySelector('html')?.classList?.remove(value === 'white' ? 'black' : 'white');
                document.querySelector('html')?.classList?.add(value);
            }
        } catch (error) {
            notificationsModal('error', error?.message);
        }
    };
    return <Theme.Provider value={[theme, handleTheme]}>{children}</Theme.Provider>;
};

export default SiteTheme;
