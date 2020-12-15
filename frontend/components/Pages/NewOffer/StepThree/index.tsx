import { useRouter } from 'next/router';
import React, { FormEvent, ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { INewOffer, IState } from '../../../../interfaces';
import useStyles from './StepThree.styles';

const StepThree = (): ReactElement => {
    const css = useStyles();
    const router = useRouter();
    const value = useSelector<IState, INewOffer>(state => state.newOffer);

    useEffect(() => {
        if (!value.isDone.one || !value.isDone.two) {
            router.push('/new_offer/1');
        }
    }, [value]);

    const handleBack = () => {
        router.push('/new_offer/2');
    };

    const handleSubmit = (event: FormEvent): void => {
        event.preventDefault();
        // router.push('/new_offer/4');
    };

    return (
        <form className={css.form} onSubmit={handleSubmit}>
            <h4 className={css.title}>Добавьте фото вашего товара</h4>
            <p>Не больше 3мб (.png .jpg .jpeg)</p>

            <div className={css.btnWrp}>
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

export default StepThree;
