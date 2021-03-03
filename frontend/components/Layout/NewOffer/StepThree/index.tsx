import { UploadedUppyFile } from '@uppy/core';
import { Dashboard } from '@uppy/react';
import { useRouter } from 'next/router';
import React, { FormEvent, ReactElement, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import config from '../../../../assets/config';
import routes from '../../../../assets/routes';
import useMedia from '../../../../hooks/media.hook';
import useTheme from '../../../../hooks/theme.hook';
import useUppy from '../../../../hooks/uppy.hook';
import types from '../../../../redux/types';
import notifications from '../../../Common/Notifications';
import useStyles from './StepThree.styles';

const StepThree = (): ReactElement => {
    // style
    const css = useStyles();
    const [theme] = useTheme();
    // general
    const dispatch = useDispatch();
    const history = useRouter();
    // uppy
    const uppy = useUppy();
    // media
    const media = useMedia(900);

    const [isEmpty, setIsEmpty] = useState<boolean>(true);

    useEffect(() => {
        const handler = (): void => {
            setIsEmpty(!uppy.getFiles()?.length);
        };

        uppy.on('file-removed', handler);
        uppy.on('file-added', handler);
        return () => {
            uppy.off('file-removed', handler);
            uppy.off('file-added', handler);
        };
    }, []);

    const handleBack = () => {
        history.push(routes.new_offer(2));
    };

    const handleClick = (): void => {
        dispatch({
            type: types.POST_OFFER_START,
            payload: null,
            history,
        });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        if (!uppy.getFiles()?.length) return;

        try {
            const res = await uppy.upload();
            if (res.failed.length > 0) throw new Error();

            dispatch({
                history,
                type: types.POST_OFFER_START,
                payload:
                    res?.successful?.map((value: UploadedUppyFile<unknown, { images_url?: [string] }>) => ({
                        url: config.img + value?.response?.body?.images_url?.[0],
                    })) || [],
            });
        } catch (error) {
            notifications('error');
        }
    };

    return (
        <form className={css.form} onSubmit={handleSubmit}>
            <h4 className={css.title}>Добавьте фото вашего товара</h4>
            <p className={css.text}>Не больше 3мб (.png .jpg .jpeg)</p>

            <Dashboard theme={theme === 'white' ? 'light' : 'dark'} uppy={uppy} hideUploadButton height={media ? 500 : 350} />

            <div className={css.btnWrp}>
                <button type="button" className={css.btn} onClick={handleBack}>
                    Назад
                </button>

                {isEmpty ? (
                    <button type="button" className={css.next} onClick={handleClick}>
                        Опубликовать без фото
                    </button>
                ) : (
                    <button type="submit" className={css.next}>
                        Отправить
                    </button>
                )}
            </div>
        </form>
    );
};

export default StepThree;
