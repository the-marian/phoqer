import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { IPublicProfile, IState, ITabs } from '../../../../interfaces';
import config from '../../../../utils/config';
import template from '../../../../utils/theming/template';
import { Theme } from '../../../../utils/theming/theme';
import SmallModalWrp from '../../../common/modal/small-modal-wrp';
import NavTabs from '../../../common/navigation';

const useStyles = createUseStyles((theme: Theme) => ({
    item: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        margin: theme.rem(0.6, 0),
        padding: theme.rem(2),
        borderRadius: theme.radius,
        fontSize: theme.rem(1.6),
        color: theme.palette.black[0],
        background: theme.palette.gray[0],
        ...template(theme).outline,

        ...theme.media(1100).max({
            margin: theme.rem(1, 0),
            padding: theme.rem(1, 2),
            fontSize: theme.rem(1.6),
        }),
    },
    active: {
        background: theme.palette.primary[0],
        color: theme.palette.trueWhite,
    },
    text: {
        marginLeft: theme.rem(1),
    },
}));

const getActiveTab = (route: string): string | undefined => {
    switch (route) {
        case '/profile/private/my-offers/[offerStatus]':
            return 'my-offers';

        case '/profile/public/[profileId]':
            return 'my-profile';

        case '/profile/private/chat':
        case '/profile/private/chat/[chat]':
            return 'messages';

        case '/profile/private/reviews':
            return 'reviews';

        case '/profile/private/referral':
            return 'referral';

        case '/profile/private/settings/[activeTab]':
            return 'settings';

        default:
            return undefined;
    }
};

const MobileNavModal = (): ReactElement => {
    const css = useStyles();
    const { route } = useRouter();
    const user = useSelector<IState, IPublicProfile | null>(state => state.user);
    const profileTabs: ITabs[] = config.userNavLinks(String(user?.id), { messages: 5, reviews: 9 });

    return (
        <SmallModalWrp>
            <NavTabs
                tabs={profileTabs}
                active={getActiveTab(route)}
                activeClass={css.active}
                className={css.item}
                classNameText={css.text}
            />
        </SmallModalWrp>
    );
};

export default MobileNavModal;
