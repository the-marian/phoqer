import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { Theme } from '../../../../../assets/theme';
import { IPublicProfile, IState } from '../../../../../interfaces';
import LikeDislike from '../../../../Common/LikeDislike';
import { modal } from '../../../../Common/Modal';
import MidModalWrp from '../../../../Common/Modal/MidModalWrp';

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
        textDecoration: 'underline',
    },
    modal: {
        fontSize: theme.rem(2),
    },
}));

const ProfileInfo = (): ReactElement => {
    const css = useStyles();
    const profile = useSelector<IState, IPublicProfile | null>(state => state.profiles.public);

    const handleReadMore = (): void => {
        modal.open(
            <MidModalWrp>
                <p className={css.modal} dangerouslySetInnerHTML={{ __html: profile?.bio?.replace(/\n/, '<br>') || '' }} />
            </MidModalWrp>,
        );
    };

    return (
        <div className={css.info}>
            <div className={css.flex}>
                <div className={css.items}>
                    <div>
                        <span className={css.gray}>Соответствие товара с описанием:</span> {profile?.description_rate} / 5
                    </div>
                    <div>
                        <span className={css.gray}>Коммуникация:</span> {profile?.communication_rate} / 5
                    </div>
                    <div>
                        <span className={css.gray}>Скорость отклика:</span> {profile?.response_rate} / 5
                    </div>
                </div>
                <div className={clsx(css.percent, profile?.satisfaction_rate || 0 > 25 ? css.green : css.yellow)}>
                    <span>{profile?.satisfaction_rate || 0} %</span>
                    <small>Позитивных отзывов</small>
                </div>
            </div>

            <LikeDislike like={profile?.likes || 0} dislike={profile?.dislikes || 0} active="like" onClick={console.log} />

            <div className={css.bio}>
                <h5 className={css.title}>Об Авторе</h5>
                <p>
                    {profile?.bio ? (
                        <>
                            {profile?.bio?.length > 150 ? profile?.bio?.slice(0, 150) + '... ' : profile?.bio}
                            {profile?.bio?.length > 150 && (
                                <button type="button" onClick={handleReadMore} className={css.link}>
                                    read more
                                </button>
                            )}
                        </>
                    ) : (
                        'Информация отсутствует'
                    )}
                </p>
            </div>
        </div>
    );
};

export default ProfileInfo;
