import Uppy from '@uppy/core';
import { Dashboard, StatusBar } from '@uppy/react';
import XHRUpload from '@uppy/xhr-upload';
import { useRouter } from 'next/router';
import React, { FormEvent, ReactElement, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import config from '../../../../assets/config';
import { IAuth, INewOffer, IState } from '../../../../interfaces';
import useStyles from './StepThree.styles';

const StepThree = (): ReactElement => {
    const css = useStyles();
    const router = useRouter();

    const { auth_token } = useSelector<IState, IAuth>(state => state.auth);
    const value = useSelector<IState, INewOffer>(state => state.newOffer);
    if (!value.isDone.one || !value.isDone.two) router.push('/new_offer/1');

    const uppy = useMemo(
        () =>
            Uppy<Uppy.StrictTypes>({
                id: 'offer_img',
                autoProceed: false,
                allowMultipleUploads: true,
                meta: { type: 'offer_img' },
                restrictions: {
                    maxFileSize: 3145728, // 3 megabytes in bytes
                    allowedFileTypes: ['.jpg', '.jpeg', '.png'],
                    maxNumberOfFiles: 20,
                },
            }),
        [],
    );

    useEffect(() => {
        // const handleFileMeta = (file): void => {
        //     uppy.setFileState(file.id, {
        //         xhrUpload: {
        //             ...file.xhrUpload,
        //             headers: {
        //                 'Access-Control-Allow-Origin': '',
        //                 'Content-Disposition': `attachment; filename="${file.name}"`,
        //                 Authorization: `Token ${auth_token}`,
        //             },
        //         },
        //     });
        // };

        uppy.use(XHRUpload, {
            endpoint: config.uploadsUrl,
            headers: {
                Authorization: `Token ${auth_token}`,
            },
        });
        // uppy.on('file-added', handleFileMeta);

        return () => {
            // uppy.off('file-added', handleFileMeta);
            uppy.close();
        };
    }, []);

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
