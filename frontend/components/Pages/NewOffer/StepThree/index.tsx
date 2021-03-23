import { UploadedUppyFile } from '@uppy/core';
import { Dashboard } from '@uppy/react';
import { useRouter } from 'next/router';
import React, { FormEvent, ReactElement, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import config from '../../../../assets/config';
import routes from '../../../../assets/routes';
import { Theme } from '../../../../assets/theme';
import useMedia from '../../../../hooks/media.hook';
import useTheme from '../../../../hooks/theme.hook';
import useUppy from '../../../../hooks/uppy.hook';
import types from '../../../../redux/types';
import notifications from '../../../Common/Notifications';
import newOfferTemplate from '../index.style';

const useStyles = createUseStyles((theme: Theme) => newOfferTemplate(theme).step);

const StepThree = (): ReactElement => {
    // style
    const css = useStyles();
    const [theme] = useTheme();
    // general
    const history = useRouter();
    const dispatch = useDispatch();
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
        history.push(routes.new_offer(2), undefined, { shallow: true });
    };

    const handleClick = (): void => {
        dispatch({
            type: types.POST_OFFER_START,
            payload: null,
            redirect() {
                history.push(routes.new_offer(4), undefined, { shallow: true });
            },
        });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        if (!uppy.getFiles()?.length) return;

        try {
            const res = await uppy.upload();
            if (res.failed.length > 0) throw new Error();

            dispatch({
                type: types.POST_OFFER_START,
                payload:
                    res?.successful?.map((value: UploadedUppyFile<unknown, { images_url?: [string] }>) => ({
                        url: config.img + value?.response?.body?.images_url?.[0],
                    })) || [],
                redirect() {
                    history.push(routes.new_offer(4), undefined, { shallow: true });
                },
            });
        } catch (error) {
            notifications('error');
        }
    };

    return (
        <form className={css.form} onSubmit={handleSubmit}>
            <h4 className={css.title}>Добавьте фото вашего товара</h4>
            <h5 className={css.subtitle}>Не больше 3мб (.png .jpg .jpeg)</h5>

            <Dashboard theme={theme === 'white' ? 'light' : 'dark'} uppy={uppy} hideUploadButton height={media ? 500 : 350} />

            <div className={css.btnWrp}>
                <button type="button" className={css.btn} onClick={handleBack}>
                    Назад
                </button>

                {isEmpty ? (
                    <button type="button" className={css.next} onClick={handleClick}>
                        Создать объявление
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
