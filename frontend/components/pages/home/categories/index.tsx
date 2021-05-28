import Link from 'next/link';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import routes from '../../../../assets/routes';
import template from '../../../../assets/template';
import { Theme } from '../../../../assets/theme';
import useTrans from '../../../../hooks/trans.hook';
import { ICategories, IState } from '../../../../interfaces';
import SectionTitle from '../../../common/section-title';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        margin: theme.rem(3, 0),
        ...theme.media(550).max({
            margin: theme.rem(2, 0),
        }),
    },
    wrp: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: '0 -0.25%',

        ...theme.media(980).max({
            margin: '0 -0.3%',
        }),

        ...theme.media(766).max({
            margin: '0 -0.5%',
        }),

        ...theme.media(500).max({
            margin: '0',
        }),
    },
    cat: {
        width: '12%',
        margin: '1rem 0.25%',
        color: theme.palette.black[0],
        cursor: 'pointer',

        ...theme.media(980).max({
            width: '16.05%',
            margin: '1rem 0.3%',
        }),

        ...theme.media(766).max({
            width: '19%',
            margin: '1rem 0.5%',
        }),

        ...theme.media(650).max({
            width: '24%',
        }),

        ...theme.media(500).max({
            width: '48%',
            margin: '1rem 1%',
        }),

        ...theme.hover({
            color: theme.palette.primary[0],
        }),
    },
    img: {
        height: theme.rem(9),
        borderRadius: theme.radius,
        objectFit: 'cover',
        ...template(theme).outline,
    },
    text: {
        marginTop: theme.rem(0.5),
        fontSize: theme.rem(1.4),
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
