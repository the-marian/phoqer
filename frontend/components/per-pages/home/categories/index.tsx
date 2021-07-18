import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import useMedia from '../../../../hooks/media.hook';
import useTrans from '../../../../hooks/trans.hook';
import { ICategories, IState } from '../../../../interfaces';
import icons from '../../../../utils/icons-map';
import routes from '../../../../utils/routes';
import template from '../../../../utils/theming/template';
import { Theme } from '../../../../utils/theming/theme';
import SectionTitle from '../../../common/section-title';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        margin: theme.rem(3, 0),
        ...theme.media(550).max({
            margin: theme.rem(2, 0),
        }),
    },
    wrp: {
        display: 'grid',
        gridTemplateColumns: theme.fr(7),
        gridGap: theme.rem(3, 1),

        ...theme.media(1150).max({
            gridTemplateColumns: theme.fr(6),
        }),
        ...theme.media(768).max({
            display: 'black',
            gridTemplateColumns: 'unset',
            gridGap: 'unset',
        }),
    },
    cat: {
        color: theme.palette.black[0],
        cursor: 'pointer',

        ...theme.hover({
            color: theme.palette.primary[0],
        }),

        ...theme.media(768).max({
            display: 'flex',
            alignItems: 'center',
            padding: theme.rem(1, 0),
            fontSize: theme.rem(1.4),
            borderBottom: theme.border(0.1, theme.palette.gray[1]),

            '&:nth-of-type(1)': {
                borderTop: theme.border(0.1, theme.palette.gray[1]),
            },
        }),
    },
    img: {
        height: theme.rem(10),
        borderRadius: theme.radius,
        objectFit: 'cover',
        ...template(theme).outline,

        ...theme.media(1150).max({
            height: theme.rem(8),
        }),
    },
    text: {
        marginTop: theme.rem(0.5),
        fontSize: theme.rem(1.3),
        ...template(theme).cutString,

        ...theme.media(768).max({
            margin: '0 1rem',
            fontSize: theme.rem(1.5),
        }),
    },
}));

const Categories = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const desktop = useMedia(768);
    const categories = useSelector<IState, ICategories[]>(state => state.categories);

    return (
        <div className={css.root}>
            <SectionTitle>{trans('rent_here_and_now')}</SectionTitle>

            <div className={css.wrp}>
                {categories?.map<ReactElement>(({ image, slug, icon_image }) => (
                    <Link key={slug} href={routes.offers.single(`?category=${slug}`)}>
                        <a className={css.cat}>
                            {desktop ? (
                                <img className={css.img} src={image} alt={trans(slug)} />
                            ) : (
                                icons[icon_image] && <FontAwesomeIcon icon={icons[icon_image]} />
                            )}
                            <p className={css.text}>{trans(slug)}</p>
                            {!desktop && <FontAwesomeIcon icon={faChevronRight} />}
                        </a>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Categories;
