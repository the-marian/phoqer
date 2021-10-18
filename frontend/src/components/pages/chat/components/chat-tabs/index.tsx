import React, { ReactElement } from 'react';

import { useRouter } from 'next/router';
import { createUseStyles } from 'react-jss';

import routes from '../../../../../utils/routes';
import { Theme } from '../../../../../utils/theming/theme';
import Tabs from '../../../../common/tabs';
import { userPrivateTabs } from '../../../../common/tabs/tabs.config';
import SiteMenu from '../../../../layout/header/site-menu';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: theme.rem(1, 2),
    },
}));

const routesMap: { [key: string]: string } = {
    'my-offers': routes.my_offers(),
    chat: routes.chat(),
    notifications: routes.notifications,
    referral: routes.referral,
    settings: routes.settings(),
    analytics: routes.analytics,
};

const ChatTabs = (): ReactElement => {
    const css = useStyles();
    const history = useRouter();

    const handlerClick = (value: string): void => {
        history.push(routesMap[value]);
    };

    return (
        <div className={css.root}>
            <SiteMenu />
            <Tabs tabs={userPrivateTabs()} active="chat" onClick={handlerClick} />
        </div>
    );
};

export default ChatTabs;
