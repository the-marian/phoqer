import { faEdit } from '@fortawesome/free-regular-svg-icons/faEdit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import routes from '../../../../../../assets/routes';
import { Theme } from '../../../../../../assets/theme';
import useTrans from '../../../../../../hooks/trans.hook';
import { IPublicProfile, IState } from '../../../../../../interfaces';
import Banner from '../../../../../common/banner';

const useStyles = createUseStyles((theme: Theme) => ({
    box: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginBottom: theme.rem(4),
        padding: theme.rem(3, 4, 4),
        borderRadius: theme.radius,
        border: theme.border(0.1, theme.palette.gray[1]),
        ...theme.media(768).max({
            padding: theme.rem(2, 2, 0),
        }),
    },
    cell: {
        width: '32%',
        minWidth: theme.rem(20),
        marginBottom: theme.rem(4),
        ...theme.media(1060).max({
            marginBottom: theme.rem(2),
        }),
    },
    edit: {
        width: '100%',
        marginBottom: theme.rem(4),
        ...theme.media(1060).max({
            marginBottom: theme.rem(2),
        }),

        '& span': {
            margin: theme.rem(0.2, 0, 0, 1),
        },
    },
    wide: {
        width: '100%',
        marginBottom: theme.rem(4),
        ...theme.media(1060).max({
            marginBottom: theme.rem(2),
        }),
    },
    cellTitle: {
        marginBottom: theme.rem(1),
        fontWeight: theme.text.weight[2],
        fontSize: theme.rem(1.4),
        color: theme.palette.gray[2],
    },
    cellText: {
        color: theme.palette.black[0],
        fontSize: theme.rem(1.6),
    },
    link: {
        display: 'flex',
        alignItems: 'center',
        fontSize: theme.rem(1.6),
        color: theme.palette.black[0],
        ...theme.hover({
            color: theme.palette.primary[0],
            textDecoration: 'underline',
        }),
    },
    banner: {
        padding: theme.rem(14, 8, 10),
        ...theme.media(767).max({
            padding: theme.rem(10, 3),
        }),
    },
}));

const Content = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const user = useSelector<IState, IPublicProfile | null>(state => state.user);

    return (
        <>
            <div className={css.box}>
                <div className={css.edit}>
                    <Link href={routes.profile.private.settings()}>
                        <a className={css.link}>
                            <FontAwesomeIcon icon={faEdit} />
                            <span>{trans('edit')}</span>
                        </a>
                    </Link>
                </div>
                <div className={css.cell}>
                    <h3 className={css.cellTitle}>{trans('first_name')}:</h3>
                    <p className={css.cellText}>{user?.first_name || trans('no_information_available')}</p>
                </div>
                <div className={css.cell}>
                    <h3 className={css.cellTitle}>{trans('last_name')}:</h3>
                    <p className={css.cellText}>{user?.last_name || trans('no_information_available')}</p>
                </div>
                <div className={css.cell}>
                    <h3 className={css.cellTitle}>{trans('email')}:</h3>
                    <p className={css.cellText}>{user?.email || trans('no_information_available')}</p>
                </div>
                <div className={css.wide}>
                    <h3 className={css.cellTitle}>{trans('user_bio')}:</h3>
                    <p className={css.cellText}>{user?.bio || trans('no_information_available')}</p>
                </div>
            </div>

            <div className={css.box}>
                <div className={css.edit}>
                    <Link href={routes.profile.private.settings()}>
                        <a className={css.link}>
                            <FontAwesomeIcon icon={faEdit} />
                            <span>{trans('edit')}</span>
                        </a>
                    </Link>
                </div>
                <div className={css.wide}>
                    <h3 className={css.cellTitle}>{trans('location')}:</h3>
                    <p className={css.cellText}>{user?.location || trans('no_information_available')}</p>
                </div>
            </div>

            <Banner className={css.banner} animation />
        </>
    );
};

export default Content;
