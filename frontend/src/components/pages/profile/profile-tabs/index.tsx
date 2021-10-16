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
    'rented-offers': routes.profile.private.rented_offers(),
    'my-offers': routes.profile.private.my_offers(),
    chat: routes.profile.private.chat(),
    reviews: routes.profile.private.reviews,
    referral: routes.profile.private.referral,
    settings: routes.profile.private.settings(),
    analytics: routes.profile.private.analytics,
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
