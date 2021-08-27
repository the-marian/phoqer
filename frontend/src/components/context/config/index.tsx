import React, { createContext, ReactElement, useState } from 'react';

import Cookies from 'js-cookie';

import { IConfig } from '../../../interfaces';
import { addMonthToDate } from '../../../utils/helpers';
import notificationsModal from '../../common/modal/notifications-modal';

const init: IConfig = {
    warning: true,
    hideSearchFilters: false,
    hideTopSearchQuery: false,
    hideTopOffers: true,
    offerCardSize: 'big',
};
export type IConfigValue = [config: IConfig, setConfig: (value: IConfig) => void];
export const Config = createContext<IConfigValue>([init, () => undefined]);

interface IProps {
    value?: IConfig | null;
    children: JSX.Element | JSX.Element[] | ReactElement;
}

const ConfigProvider = ({ children, value }: IProps): ReactElement => {
    const [config, setConfig] = useState<IConfig>(value || init);
    const handleConfig = (data: IConfig): void => {
        try {
            Cookies.set('phoqer_config', JSON.stringify(data), { expires: addMonthToDate(1) });
            setConfig(data);
        } catch (error) {
            notificationsModal('error');
            setConfig(init);
        }
    };
    return <Config.Provider value={[config, handleConfig]}>{children}</Config.Provider>;
};

export default ConfigProvider;
