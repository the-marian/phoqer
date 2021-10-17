import React, { ReactElement } from 'react';

import { useRouter } from 'next/router';
import { createUseStyles } from 'react-jss';

import useTrans from '../../../../hooks/trans.hook';
import routes from '../../../../utils/routes';
import mixin from '../../../../utils/theming/mixin';
import { Theme } from '../../../../utils/theming/theme';
import Button from '../../../common/button';
import ProfilePrivateCard from '../profile-card';

const useStyles = createUseStyles((theme: Theme) => ({
    flex: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: theme.rem(4),
    },
    btn: {
        ...mixin(theme).btn,
    },
}));

const ProfileHeader = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const history = useRouter();

    const newOffer = (): void => {
        history.push(routes.offers.new(1));
    };

    return (
        <div className={css.flex}>
            <ProfilePrivateCard />
            <Button className={css.btn} primary onClick={newOffer}>
                {trans('Создать обьявления')}
            </Button>
        </div>
    );
};

export default ProfileHeader;
