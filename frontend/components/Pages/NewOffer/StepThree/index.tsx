import Uppy from '@uppy/core';
import { Dashboard, StatusBar } from '@uppy/react';
import Tus from '@uppy/tus';
import { useRouter } from 'next/router';
import React, { FormEvent, ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';

import config from '../../../../assets/config';
import { INewOffer, IState } from '../../../../interfaces';
import useStyles from './StepThree.styles';

const uppy = Uppy<Uppy.StrictTypes>({
    id: 'offer_img',
    autoProceed: false,
    allowMultipleUploads: true,
    meta: { type: 'avatar' },
    restrictions: {
        maxFileSize: 3145728, // 3 megabytes in bytes
        allowedFileTypes: ['.jpg', '.jpeg', '.png'],
        maxNumberOfFiles: 20,
    },
});

uppy.use(Tus, { endpoint: config.uploadsUrl });

const StepThree = (): ReactElement => {
    const css = useStyles();
    const router = useRouter();

    const value = useSelector<IState, INewOffer>(state => state.newOffer);
    const height = process.browser ? (window.innerWidth < 900 ? 350 : 500) : 500;

    useEffect(() => {
        if (!value.isDone.one || !value.isDone.two) {
            router.push('/new_offer/1');
        }
    }, [value]);

    const handleBack = () => {
        router.push('/new_offer/2');
    };

    const handleSubmit = async (event: FormEvent): Promise<void> => {
        event.preventDefault();

        if (!uppy.getFiles()?.length) return;

        try {
            const result = await uppy.upload();
            if (result.failed.length > 0) throw new Error('Failed');
            console.log('success');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form className={css.form} onSubmit={handleSubmit}>
            <h4 className={css.title}>Добавьте фото вашего товара</h4>
            <p className={css.text}>Не больше 3мб (.png .jpg .jpeg)</p>

            <StatusBar uppy={uppy} hideAfterFinish={false} showProgressDetails />
            <Dashboard uppy={uppy} height={height} />

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
