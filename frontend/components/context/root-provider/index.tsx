import React, { ReactElement } from 'react';

import { IAuth, IConfig, Themes } from '../../../interfaces';
import AuthProvider from '../auth/auth-context';
import ConfigProvider from '../config';
import MediaProvider from '../media';
import SiteTheme from '../theme';

interface IProps {
    width: number;
    auth: IAuth | null;
    theme: Themes | null;
    config: IConfig | null;
    children: ReactElement;
}

const RootProvider = ({ children, width, auth, theme, config }: IProps): ReactElement => {
    return (
        <SiteTheme siteTheme={theme}>
            <ConfigProvider value={config}>
                <AuthProvider authServer={auth}>
                    <MediaProvider width={width}>{children}</MediaProvider>
                </AuthProvider>
            </ConfigProvider>
        </SiteTheme>
    );
};

export default RootProvider;
