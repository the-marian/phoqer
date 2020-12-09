import { useRouter } from 'next/router';
import React, { FormEvent, ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../config/theme';
import ImgInput from '../../../Base/ImgInput';
import DnDImages from './DnDImages';

const useStyles = createUseStyles((theme: Theme) => ({
    form: {
        padding: theme.rem(3, 10),
        borderRadius: theme.radius,
        background: theme.palette.soft[2],
        maxWidth: theme.rem(80),
        margin: '0 auto',

        '@media (max-width: 580px)': {
            padding: theme.rem(3),
        },
    },
    title: {
        margin: theme.rem(3, 0, 1),
        fontSize: theme.rem(1.4),
        fontWeight: theme.text.weight[2],
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

const StepThree = (): ReactElement => {
    const css = useStyles();
    const router = useRouter();
    const [images, setImages] = useState<string[]>([]);

    const handleImgChange = (value: File[]): void => {
        setImages([...images, ...value.map(URL.createObjectURL)]);
    };

    const handleBack = () => {
        router.push('/new_offer/2');
    };

    const handleSubmit = (event: FormEvent): void => {
        event.preventDefault();
        router.push('/new_offer/4');
    };

    return (
        <form className={css.form} onSubmit={handleSubmit}>
            <h4 className={css.title}>Добавьте фото вашего товара</h4>
            <p>Не больше 3мб (.png .jpg .jpeg)</p>

            {!!images.length && <DnDImages images={images} onChange={setImages} />}

            <ImgInput onChange={handleImgChange} />

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

export default StepThree;
