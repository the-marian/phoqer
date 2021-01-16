import Uppy, { UploadedUppyFile } from '@uppy/core';
import { Dashboard, StatusBar } from '@uppy/react';
import XHRUpload from '@uppy/xhr-upload';
import { useRouter } from 'next/router';
import React, { FormEvent, ReactElement, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import config from '../../../../assets/config';
import { INewOffer, IState } from '../../../../interfaces';
import types from '../../../../redux/types';
import useStyles from './StepThree.styles';
import useAuth from '../../../../hooks/auth.hook';

const StepThree = (): ReactElement => {
    const css = useStyles();
    const auth = useAuth();
    const dispatch = useDispatch();
    const router = useRouter();

    const value = useSelector<IState, INewOffer>(state => state.newOffer);
    if (!value.isDone.one || !value.isDone.two) router.push('/new_offer/1');

    const uppy = useMemo(
        () =>
            Uppy<Uppy.StrictTypes>({
                id: 'file',
                autoProceed: false,
                allowMultipleUploads: true,
                meta: { type: 'file' },
                restrictions: {
                    maxFileSize: 3145728, // 3 megabytes in bytes
                    allowedFileTypes: ['.jpg', '.jpeg', '.png'],
                    maxNumberOfFiles: 20,
                },
            }),
        [],
    );

    useEffect(() => {
        uppy.use(XHRUpload, {
            endpoint: config.uploadsUrl,
            fieldName: 'file',
            headers: {
                Authorization: `Token ${auth?.auth_token}`,
            },
        });
        return () => uppy.close();
    }, []);

    const handleBack = () => {
        router.push('/new_offer/2');
    };

    const handleSubmit = async (event: FormEvent): Promise<void> => {
        event.preventDefault();
        if (!uppy.getFiles()?.length) return;

        try {
            const result = await uppy.upload();
            if (result.failed.length > 0) throw new Error();

            dispatch({
                type: types.POST_OFFER_START,
                payload: result?.successful?.map(
                    (item: UploadedUppyFile<string, { images_url: [string] }>) => item?.response?.body?.images_url?.[0],
                ),
            });
        } catch (error) {
            console.log(error);
        }
    };

    const height = process.browser ? (window.innerWidth < 900 ? 350 : 500) : 500;

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
