import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent, ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';

import { numberValidation } from '../../../../config/helpers';
import { Theme } from '../../../../config/theme';
import CheckTitle from '../../../Common/CheckTitle';

const useStyles = createUseStyles((theme: Theme) => ({
    form: {
        padding: theme.rem(3, 10),
        borderRadius: theme.radius,
        background: theme.palette.soft[5],
        maxWidth: theme.rem(80),
        margin: '0 auto',

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

    const [pledgeInput, setPledgeInput] = useState(true);
    const [minInput, setMinInput] = useState(true);
    const [maxInput, setMaxInput] = useState(true);

    const [pledge, setPledge] = useState('');
    const [min, setMin] = useState('');
    const [max, setMax] = useState('');

    const handlePledge = (event: ChangeEvent<HTMLInputElement>): void => {
        if (!numberValidation(event.target.value)) return;
        setPledge(event.target.value);
    };
    const handleMin = (event: ChangeEvent<HTMLInputElement>): void => {
        if (!numberValidation(event.target.value)) return;
        setMin(event.target.value);
    };
    const handleMax = (event: ChangeEvent<HTMLInputElement>): void => {
        if (!numberValidation(event.target.value)) return;
        setMax(event.target.value);
    };

    const handleBack = () => {
        router.push('/new_offer/1');
    };

    const handleSubmit = (event: FormEvent): void => {
        event.preventDefault();
        router.push('/new_offer/3');
    };

    return (
        <form className={css.form} onSubmit={handleSubmit}>
            <div className={css.inner}>
                <h4 className={css.title}>
                    Описание товара <span className={css.red}>*</span>
                </h4>
                <textarea className={clsx(css.input, css.textarea)} name="description" placeholder="Описание" />
            </div>

            <div className={css.inner}>
                <CheckTitle onChange={setPledgeInput}>Залоговая сума</CheckTitle>
                <div className={clsx(css.inputWrp, pledgeInput || css.inactive)}>
                    <input
                        value={pledge}
                        onChange={handlePledge}
                        className={css.input}
                        name="description"
                        placeholder="Введите число"
                        readOnly={!pledgeInput}
                    />
                </div>
            </div>

            <div className={css.inner}>
                <CheckTitle onChange={setMinInput}>Минимальный срок аренды</CheckTitle>
                <div className={clsx(css.inputWrp, minInput || css.inactive)}>
                    <input
                        value={min}
                        onChange={handleMin}
                        className={css.input}
                        name="description"
                        placeholder="Введите число"
                        readOnly={!minInput}
                    />
                </div>
            </div>

            <div className={css.inner}>
                <CheckTitle onChange={setMaxInput}>Максимальный срок аренды</CheckTitle>
                <div className={clsx(css.inputWrp, maxInput || css.inactive)}>
                    <input
                        value={max}
                        onChange={handleMax}
                        className={css.input}
                        name="description"
                        placeholder="Введите число"
                        readOnly={!maxInput}
                    />
                </div>
            </div>

            <div className={css.inner}>
                <h4 className={css.title}>Дополнительные требования</h4>
                <textarea className={clsx(css.input, css.textarea)} name="description" placeholder="Дополнительно" />
            </div>

            <div className={css.btnWrp}>
                <button type="button" className={css.btn}>
                    Сохранить
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
