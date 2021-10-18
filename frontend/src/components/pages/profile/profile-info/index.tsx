import React, { ReactElement } from 'react';

import clsx from 'clsx';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import useTrans from '../../../../hooks/trans.hook';
import { IPublicProfile, IState } from '../../../../interfaces';
import { cutString } from '../../../../utils/helpers';
import { Theme } from '../../../../utils/theming/theme';
import LikeDislike from '../../../common/like-dislike';
import { modal } from '../../../common/modal';
import StickyModal from '../../../common/modal/sticky-modal';
import Tooltip from '../../../common/tooltip';

const useStyles = createUseStyles((theme: Theme) => ({
    info: {
        display: 'flex',
        flexWrap: 'wrap',
        fontSize: theme.rem(1.6),
        color: theme.palette.black[0],

        ...theme.media(550).max({
            paddingLeft: theme.rem(0),
            width: '100%',
        }),
    },
    flex: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: '100%',

        ...theme.media(1080).max({
            flexDirection: 'column-reverse',
        }),
    },
    items: {
        width: 'calc(100% - 18rem)',
        marginBottom: theme.rem(1),

        ...theme.media(1080).max({
            width: '100%',
        }),
        ...theme.media(800).max({
            flexWrap: 'wrap',
            flexDirection: 'column',
            paddingRight: theme.rem(0),
        }),
    },
    gray: {
        color: theme.palette.gray[2],
    },
    yellow: {
        background: theme.palette.yellow[0],
    },
    green: {
        background: theme.palette.green[0],
    },
    percent: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        minWidth: theme.rem(17),
        padding: theme.rem(1, 1.5),
        borderRadius: theme.radius,
        fontSize: theme.rem(3.5),
        fontWeight: theme.text.weight[4],
        color: theme.palette.trueWhite,

        '& span': {
            display: 'block',
            width: '100%',
        },
        '& small': {
            display: 'block',
            fontSize: theme.rem(1.4),
        },

        ...theme.media(1080).max({
            marginBottom: theme.rem(2),
        }),
    },

    bio: {
        width: '100%',
    },
    title: {
        marginBottom: theme.rem(1),
        fontSize: theme.rem(2),
        fontWeight: theme.text.weight[3],
    },
    link: {
        display: 'inline',
        color: theme.palette.primary[0],
        marginLeft: theme.rem(1),
        fontWeight: theme.text.weight[3],
    },
    modal: {
        fontSize: theme.rem(1.5),
    },
    tooltip: {
        minWidth: theme.rem(25),
    },
}));

const ProfileInfo = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const profile = useSelector<IState, IPublicProfile | null>(state => state.profiles.public);

    const handleReadMore = (): void => {
        modal.open(
            <StickyModal>
                <p className={css.modal} dangerouslySetInnerHTML={{ __html: profile?.bio?.replace(/\n/, '<br>') || '' }} />
            </StickyModal>,
        );
    };

    return (
        <div className={css.info}>
            <div className={css.flex}>
                <div className={css.items}>
                    <div>
                        <span className={css.gray}>{trans('compliance_with_description')}</span> {profile?.description_rate} / 5
                    </div>
                    <div>
                        <span className={css.gray}>{trans('communication')}</span> {profile?.communication_rate} / 5
                    </div>
                    <div>
                        <span className={css.gray}>{trans('response_speed')}</span> {profile?.response_rate} / 5
                    </div>
                </div>
                <div className={clsx(css.percent, profile?.satisfaction_rate || 0 > 25 ? css.green : css.yellow)}>
                    <span>{profile?.satisfaction_rate || 0} %</span>
                    <small>{trans('positive_feedback')}</small>
                </div>
            </div>

            <Tooltip
                className={css.tooltip}
                content="Вы можете оценить этот профиль только после того как арендуете что-то у него"
            >
                <LikeDislike like={profile?.likes || 0} dislike={profile?.dislikes || 0} />
            </Tooltip>

            <div className={css.bio}>
                <h5 className={css.title}>{trans('about_author')}</h5>
                <p>
                    {profile?.bio ? (
                        <>
                            {cutString(profile.bio, 400)}
                            {profile.bio.length > 400 && (
                                <button type="button" onClick={handleReadMore} className={css.link}>
                                    {trans('read_more')}
                                </button>
                            )}
                        </>
                    ) : (
                        trans('no_information_available')
                    )}
                </p>
            </div>
        </div>
    );
};

export default ProfileInfo;
