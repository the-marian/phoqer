import React, { ReactElement } from 'react';

import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { IOfferCard, IPublicProfile, IState } from '../../../../../interfaces';
import { Theme } from '../../../../../utils/theming/theme';
import ProfileCard from '../../../../common/profile-card';
import Price from '../price';

const useStyles = createUseStyles((theme: Theme) => ({
    aside: {
        position: 'relative',
        width: theme.rem(45),
        marginTop: theme.rem(1),

        ...theme.media(768).max({
            width: '100%',
        }),
    },
    sticky: {
        position: 'sticky',
        top: theme.rem(10),
        left: 0,

        ...theme.media(768).max({
            position: 'static',
        }),
    },
    box: {
        marginTop: theme.rem(3),
        maxHeight: theme.rem(25),
    },
}));

const AsideElement = (): ReactElement => {
    const css = useStyles();
    const profile = useSelector<IState, IPublicProfile | null>(state => state.profiles.public);
    const offer = useSelector<IState, IOfferCard | null>(state => state.offers.single);

    return (
        <aside className={css.aside}>
            <div className={css.sticky}>
                <ProfileCard
                    id={profile?.id}
                    firstName={profile?.first_name}
                    lastName={profile?.last_name}
                    lastActivity={profile?.last_activity}
                    avatar={profile?.profile_img}
                    userLocation={profile?.city}
                    registerDate={profile?.date_joined}
                />
                {offer && <Price offer={offer} withButton={offer.can_rent} />}

                <div className={css.box}>
                    <ins
                        className="adsbygoogle"
                        style={{ display: 'block' }}
                        data-ad-client="ca-pub-2424155820333209"
                        data-ad-slot="2195671586"
                        data-ad-format="auto"
                        data-full-width-responsive="true"
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: '(adsbygoogle = window.adsbygoogle || []).push({});',
                        }}
                    />
                </div>
            </div>
        </aside>
    );
};

export default AsideElement;
