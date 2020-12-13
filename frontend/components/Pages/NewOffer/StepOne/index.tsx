import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent, ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import * as helpers from '../../../../assets/helpers';
import { numberValidation } from '../../../../assets/helpers';
import { Theme } from '../../../../assets/theme';
import { ICategories, IDropList, IDropValue, INewOffer, IState } from '../../../../interfaces';
import state from '../../../../redux/state';
import types from '../../../../redux/types';
import DropDown from '../../../Common/DropDown';
import Region from './Region';

const useStyles = createUseStyles((theme: Theme) => ({
    form: {
        padding: theme.rem(3, 10),
        borderRadius: theme.radius,
        background: theme.palette.soft[0],
        maxWidth: theme.rem(80),
        margin: '0 auto',

        '& > p': {
            marginTop: theme.rem(4),
            fontSize: theme.rem(1.4),
        },

        '@media (max-width: 580px)': {
            padding: theme.rem(3),
        },
    },
    red: {
        color: theme.palette.red[0],
    },
    inner: {
        margin: theme.rem(3, 0),
    },
    title: {
        marginBottom: theme.rem(1),
        fontSize: theme.rem(1.4),
        fontWeight: theme.text.weight[2],
    },
    input: {
        display: 'flex',
        alignItems: 'center',
        height: theme.rem(6),
        width: '100%',
        padding: theme.rem(1, 2),
        background: theme.palette.white,
        border: 'none',
        borderRadius: theme.radius,
        fontSize: theme.rem(1.3),

        '& span': {
            width: '88%',
            marginLeft: theme.rem(1),
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textAlign: 'left',

            '@media (max-width: 900px)': {
                width: '100%',
            },
        },
    },
    icon: {
        fontSize: theme.rem(0.91),
        marginRight: theme.rem(1.5),
    },
    flex: {
        display: 'flex',
        justifyContent: 'space-between',

        '& > div': {
            flexBasis: '48%',
        },

        '@media (max-width: 500px)': {
            display: 'block',
        },
    },
    wrp: {
        display: 'grid',
        gridTemplateColumns: theme.fr(2),
        gridGap: theme.rem(1),

        '@media (max-width: 500px)': {
            gridTemplateColumns: theme.fr(1),
        },
    },
    btnWrp: {
        display: 'flex',
        justifyContent: 'flex-end',
        margin: theme.rem(6, 0, 4),

        '@media (max-width: 470px)': {
            flexDirection: 'column',
        },
    },
    next: {
        padding: theme.rem(1, 4),
        marginLeft: theme.rem(2),
        background: theme.palette.blue[0],
        fontSize: theme.rem(1.4),
        color: theme.palette.white,
        borderRadius: theme.radius,

        '@media (max-width: 470px)': {
            margin: theme.rem(2, 0, 0),
            padding: theme.rem(2, 4),
        },
    },
    btn: {
        height: theme.rem(6),
        padding: theme.rem(1, 4),
        marginLeft: theme.rem(2),
        background: theme.palette.white,
        fontSize: theme.rem(1.4),
        color: theme.palette.black,
        borderRadius: theme.radius,

        '@media (max-width: 470px)': {
            margin: theme.rem(1.6, 0, 0),
            padding: theme.rem(1.6, 4),
        },
    },
}));

const CURRENCY: IDropList[] = [
    { name: 'uah', slug: 'uah' },
    { name: 'usd', slug: 'usd' },
    { name: 'eur', slug: 'eur' },
];

const StepThree = (): ReactElement => {
    const css = useStyles();
    const router = useRouter();
    const dispatch = useDispatch();

    const init = useSelector<IState, INewOffer>(state => state.newOffer);
    const [value, setValue] = useState<INewOffer>(init);

    const handleTitle = (event: ChangeEvent<HTMLInputElement>): void => {
        setValue({ ...value, title: event.target.value });
    };
    const handlePrice = (event: ChangeEvent<HTMLInputElement>): void => {
        if (numberValidation(event.target.value)) return;
        setValue({ ...value, price: +event.target.value || null });
    };
    const handleCategory = (category: IDropValue): void => {
        setValue({ ...value, category });
    };
    const handleCurrency = (currency: IDropValue): void => {
        setValue({ ...value, currency });
    };

    const data = useSelector<IState, ICategories[]>(state => state.categories);
    const categories = helpers.formatCatList(data);

    const handleSubmit = (event: FormEvent): void => {
        event.preventDefault();
        dispatch({ type: types.NEW_OFFER_FORM, payload: value });
        router.push('/new_offer/2');
    };

    const handleClear = (): void => {
        setValue(state.newOffer);
        dispatch({ type: types.NEW_OFFER_FORM, payload: state.newOffer });
    };

    return (
        <form className={css.form} onSubmit={handleSubmit}>
            <div className={css.inner}>
                <h4 className={css.title}>
                    Придумайте название объявления <span className={css.red}>*</span>
                </h4>
                <input
                    value={value.title}
                    onChange={handleTitle}
                    className={css.input}
                    name="name"
                    type="text"
                    placeholder="Название"
                />
            </div>

            <Region />

            <div className={css.flex}>
                {!!categories?.length && (
                    <div className={css.inner}>
                        <h4 className={css.title}>
                            Выберите категорию товара <span className={css.red}>*</span>
                        </h4>

                        <DropDown white defaultValue={init.category} data={categories} onChange={handleCategory} withSub />
                    </div>
                )}

                <div className={css.inner}>
                    <h4 className={css.title}>
                        Цена (за 1 час) <span className={css.red}>*</span>
                    </h4>
                    <div className={css.wrp}>
                        <input
                            value={value.price || ''}
                            onChange={handlePrice}
                            className={css.input}
                            type="text"
                            placeholder="Цена"
                        />
                        <DropDown white data={CURRENCY} defaultValue={init.currency} onChange={handleCurrency} />
                    </div>
                </div>
            </div>

            <p>
                Вы можете прервать заполнение формы и продолжить в любое удобное время. Вся информация останется на своих местах
            </p>

            <div className={css.btnWrp}>
                <button type="button" className={css.btn} onClick={handleClear}>
                    Очистить
                </button>
                <button type="submit" className={css.next}>
                    Далее
                </button>
            </div>
        </form>
    );
};

export default StepThree;
