import Cookies from 'js-cookie';
import React, { createContext, ReactElement, useEffect, useState } from 'react';

import { Themes } from '../../../interfaces';
import config from '../../../utils/config';
import { addMonthToDate } from '../../../utils/helpers';
import notificationsModal from '../../common/modal/notifications-modal';

export const Theme = createContext<[theme: Themes, setTheme: (v: Themes) => void]>(['white', () => undefined]);

interface IProps {
    siteTheme?: Themes | null;
    children: JSX.Element | JSX.Element[] | ReactElement;
}

const SiteTheme = ({ children, siteTheme = 'white' }: IProps): ReactElement => {
    const [theme, setTheme] = useState<Themes>(siteTheme && config.themes.includes(siteTheme) ? siteTheme : 'white');

    useEffect(() => {
        if (process.browser && document.querySelector('html')) {
            document.querySelector('html')?.classList?.add(theme);
        }
    }, [theme]);

    const handleTheme = (value: Themes): void => {
        try {
            Cookies.set('phoqer_theme', value, { expires: addMonthToDate(1) });
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
