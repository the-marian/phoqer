import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent, ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { numberValidation } from '../../../../assets/helpers';
import { Theme } from '../../../../assets/theme';
import { INewOffer, IState, IStepOne, IStepTwo } from '../../../../interfaces';
import state from '../../../../redux/state';
import types from '../../../../redux/types';
import CheckTitle from '../../../Common/CheckTitle';

const useStyles = createUseStyles((theme: Theme) => ({
    form: {
        padding: theme.rem(3, 10),
        borderRadius: theme.radius,
        background: theme.palette.soft[5],
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
    inner: {
        margin: theme.rem(3, 0),
    },
    red: {
        color: theme.palette.red[0],
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
        fontSize: theme.rem(1.2),
        '& span': {
            marginLeft: theme.rem(1.5),
            fontSize: theme.rem(1.3),
        },
    },
    textarea: {
        height: theme.rem(18),
    },
    wrp: {
        display: 'grid',
        gridTemplateColumns: theme.fr(3),
        gridGap: theme.rem(1),

        '@media (max-width: 500px)': {
            gridTemplateColumns: theme.fr(1),
        },
    },
    inputWrp: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inactive: {
        pointerEvents: 'none',
        opacity: 0.4,
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

const StepTwo = (): ReactElement => {
    const css = useStyles();
    const router = useRouter();
    const dispatch = useDispatch();

    const init = useSelector<IState, INewOffer>(state => state.newOffer);
    const [value, setValue] = useState<INewOffer>(init);

    // OPTIONAL
    const handleDeposit = (deposit_val: boolean): void => {
        setValue({ ...value, optional: { ...value.optional, deposit_val } });
    };
    const handleMin = (min_rent_value: boolean): void => {
        setValue({ ...value, optional: { ...value.optional, min_rent_value } });
    };
    const handleMax = (max_rent_value: boolean): void => {
        setValue({ ...value, optional: { ...value.optional, max_rent_value } });
    };

    // TYPING
    const handleNumber = (event: ChangeEvent<HTMLInputElement>): void => {
        if (numberValidation(event.target.value)) return;
        setValue({ ...value, [event.target.name]: +event.target.value || null });
    };
    const handleText = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        setValue({ ...value, [event.target.name]: event.target.value });
    };

    // SUBMISSION
    const handleBack = () => {
        dispatch({ type: types.NEW_OFFER_FORM, payload: value });
        router.push('/new_offer/1');
    };

    const handleSubmit = (event: FormEvent): void => {
        event.preventDefault();
        dispatch({ type: types.NEW_OFFER_FORM, payload: value });
        router.push('/new_offer/3');
    };

    const handleClear = (): void => {
        setValue(state.newOffer);
        dispatch({ type: types.NEW_OFFER_FORM, payload: state.newOffer });
    };

    return (
        <form className={css.form} onSubmit={handleSubmit}>
            <div className={css.inner}>
                <h4 className={css.title}>
                    Описание товара <span className={css.red}>*</span>
                </h4>
                <textarea
                    value={value.description}
                    onChange={handleText}
                    className={clsx(css.input, css.textarea)}
                    name="description"
                    placeholder="Описание"
                />
            </div>

            <div className={css.inner}>
                <CheckTitle value={value.optional.deposit_val} onChange={handleDeposit}>
                    Залоговая сума
                </CheckTitle>
                <div className={clsx(css.inputWrp, value.optional.deposit_val || css.inactive)}>
                    <input
                        value={value.deposit_val || ''}
                        onChange={handleNumber}
                        className={css.input}
                        name="deposit_val"
                        placeholder="Введите число"
                        readOnly={!value.optional.deposit_val}
                    />
                </div>
            </div>

            <div className={css.inner}>
                <CheckTitle value={value.optional.min_rent_value} onChange={handleMin}>
                    Минимальный срок аренды (часов)
                </CheckTitle>
                <div className={clsx(css.inputWrp, value.optional.min_rent_value || css.inactive)}>
                    <input
                        value={value.min_rent_value || ''}
                        onChange={handleNumber}
                        className={css.input}
                        name="min_rent_value"
                        placeholder="Введите число"
                        readOnly={!value.optional.min_rent_value}
                    />
                </div>
            </div>

            <div className={css.inner}>
                <CheckTitle value={value.optional.max_rent_value} onChange={handleMax}>
                    Максимальный срок аренды (часов)
                </CheckTitle>
                <div className={clsx(css.inputWrp, value.optional.max_rent_value || css.inactive)}>
                    <input
                        value={value.max_rent_value || ''}
                        onChange={handleNumber}
                        className={css.input}
                        name="max_rent_value"
                        placeholder="Введите число"
                        readOnly={!value.optional.max_rent_value}
                    />
                </div>
            </div>

            <div className={css.inner}>
                <h4 className={css.title}>Дополнительные требования</h4>
                <textarea
                    value={value.extra_requirements}
                    onChange={handleText}
                    className={clsx(css.input, css.textarea)}
                    name="extra_requirements"
                    placeholder="Дополнительно"
                />
            </div>

            <p>
                Вы можете прервать заполнение формы и продолжить в любое удобное время. Вся информация останется на своих местах
            </p>

            <div className={css.btnWrp}>
                <button type="button" className={css.btn} onClick={handleClear}>
                    Очистить
                </button>
                <button type="button" className={css.btn} onClick={handleBack}>
                    Назад
                </button>
                <button type="submit" className={css.next}>
                    Далее
                </button>
            </div>
        </form>
    );
};

export default StepTwo;
