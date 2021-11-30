import React, { ReactElement } from 'react';

import { useRouter } from 'next/router';
import { createUseStyles } from 'react-jss';

import routes from '../../../../utils/routes';
import { Theme } from '../../../../utils/theming/theme';
import Tabs from '../../../common/tabs';
import { userPrivateTabs } from '../../../common/tabs/tabs.config';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        marginBottom: theme.rem(4),
    },
}));

interface IProps {
    active: string;
}

const routesMap: { [key: string]: string } = {
    'my-offers': routes.my_offers(),
    chat: routes.chat.item(),
    notifications: routes.notifications,
    referral: routes.referral,
    settings: routes.settings(),
    analytics: routes.analytics,
};

const ProfileTabs = ({ active }: IProps): ReactElement => {
    const css = useStyles();
    const history = useRouter();

    const handleClick = (value: string): void => {
        history.push(routesMap[value]);
    };

    return (
        <div className={css.root}>
            <Tabs tabs={userPrivateTabs()} active={active} onClick={handleClick} />
        </div>
    );
};

export default ProfileTabs;
