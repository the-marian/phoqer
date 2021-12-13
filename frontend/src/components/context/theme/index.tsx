import React, { createContext, ReactNode, useEffect, useState } from 'react';

import Cookies from 'js-cookie';

import { PHOQER_THEME } from '../../../constant/cookie.constant';
import { Themes } from '../../../interfaces';
import config from '../../../utils/config';
import { addMonthToDate } from '../../../utils/helpers';
import notificationsModal from '../../common/modal/notifications-modal';

export const Theme = createContext<[theme: Themes, setTheme: (v: Themes) => void]>(['white', () => undefined]);

interface IProps {
    initValue: Themes;
    children: ReactNode;
}

const SiteTheme = ({ children, initValue }: IProps): JSX.Element => {
    const [theme, setTheme] = useState<Themes>(config.themes.includes(initValue) ? initValue : 'white');

    useEffect(() => {
        if (process.browser && document.querySelector('html')) {
            document.querySelector('html')?.classList?.add(theme);
        }
    }, [theme]);

    const handleTheme = (value: Themes): void => {
        try {
            Cookies.set(PHOQER_THEME, value, { expires: addMonthToDate(1) });
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
