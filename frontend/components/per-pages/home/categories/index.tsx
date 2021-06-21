import Link from 'next/link';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import useTrans from '../../../../hooks/trans.hook';
import { ICategories, IState } from '../../../../interfaces';
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
            gridTemplateColumns: theme.fr(5),
        }),
        ...theme.media(640).max({
            gridTemplateColumns: theme.fr(4),
            gridGap: theme.rem(2, 1),
        }),
        ...theme.media(510).max({
            gridTemplateColumns: theme.fr(3),
        }),
        ...theme.media(410).max({
            gridTemplateColumns: theme.fr(2),
        }),
    },
    cat: {
        color: theme.palette.black[0],
        cursor: 'pointer',

        ...theme.hover({
            color: theme.palette.primary[0],
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
        ...theme.media(640).max({
            height: theme.rem(7),
        }),
    },
    text: {
        marginTop: theme.rem(0.5),
        fontSize: theme.rem(1.3),
        ...template(theme).cutString,
    },
}));

const Categories = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const categories = useSelector<IState, ICategories[]>(state => state.categories);

    return (
        <div className={css.root}>
            <SectionTitle>{trans('rent_here_and_now')}</SectionTitle>

            <div className={css.wrp}>
                {categories?.map<ReactElement>(({ image, slug }) => (
                    <Link key={slug} href={routes.offers.single(`?category=${slug}`)}>
                        <div className={css.cat}>
                            <img className={css.img} src={image} alt={trans(slug)} />
                            <p className={css.text}>{trans(slug)}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Categories;
