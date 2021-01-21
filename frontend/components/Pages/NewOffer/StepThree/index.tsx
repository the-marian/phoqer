import Uppy, { UploadedUppyFile } from '@uppy/core';
import { Dashboard, StatusBar } from '@uppy/react';
import XHRUpload from '@uppy/xhr-upload';
import { useRouter } from 'next/router';
import React, { FormEvent, ReactElement, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import config from '../../../../assets/config';
import routes from '../../../../assets/routes';
import useAuth from '../../../../hooks/auth.hook';
import useMedia from '../../../../hooks/media.hook';
import { INewOffer, IState } from '../../../../interfaces';
import types from '../../../../redux/types';
import notifications from '../../../Common/Notifications';
import useStyles from './StepThree.styles';

const StepThree = (): ReactElement => {
    const css = useStyles();
    const auth = useAuth();
    const dispatch = useDispatch();
    const history = useRouter();

    const media = useMedia(900);
    const height = media ? 500 : 350;

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
        const handleUploaded = (res): void => {
            dispatch({
                type: types.POST_OFFER_START,
                history,
                payload: res?.successful?.map((item: UploadedUppyFile<string, { images_url: [string] }>) => ({
                    url: config.img + item?.response?.body?.images_url?.[0],
                })),
            });
        };

        uppy.on('complete', handleUploaded);
        return () => {
            uppy.off('complete', handleUploaded);
        };
    }, []);

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
        history.push(routes.new_offer(2));
    };

    const handleSubmit = async (event: FormEvent): Promise<void> => {
        event.preventDefault();
        if (!uppy.getFiles()?.length) return;

        try {
            const res = await uppy.upload();
            if (res.failed.length > 0) throw new Error();

            dispatch({
                type: types.POST_OFFER_START,
                history,
                payload: res?.successful?.map((item: UploadedUppyFile<string, { images_url: [string] }>) => ({
                    url: config.img + item?.response?.body?.images_url?.[0],
                })),
            });
        } catch (error) {
            notifications('error');
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
