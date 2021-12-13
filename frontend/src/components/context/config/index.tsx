import React, { createContext, ReactNode, useState } from 'react';

import Cookies from 'js-cookie';

import { PHOQER_CONFIG } from '../../../constant/cookie.constant';
import { IConfig } from '../../../interfaces';
import appConfig from '../../../utils/config';
import { addMonthToDate } from '../../../utils/helpers';
import notificationsModal from '../../common/modal/notifications-modal';

export type IConfigValue = [config: IConfig, setConfig: (value: IConfig) => void];
export const Config = createContext<IConfigValue>([appConfig.siteConfig, () => undefined]);

interface IProps {
    initValue: IConfig;
    children: ReactNode;
}

const ConfigProvider = ({ children, initValue }: IProps): JSX.Element => {
    const [config, setConfig] = useState<IConfig>(initValue);
    const handleConfig = (data: IConfig): void => {
        try {
            Cookies.set(PHOQER_CONFIG, JSON.stringify(data), { expires: addMonthToDate(1) });
            setConfig(data);
        } catch (error) {
            notificationsModal('error');
            setConfig(appConfig.siteConfig);
        }
    };
    return <Config.Provider value={[config, handleConfig]}>{children}</Config.Provider>;
};

export default ConfigProvider;
