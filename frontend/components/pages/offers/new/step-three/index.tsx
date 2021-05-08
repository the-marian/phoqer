import { UploadedUppyFile } from '@uppy/core';
import { Dashboard } from '@uppy/react';
import { useRouter } from 'next/router';
import React, { FormEvent, ReactElement, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import config from '../../../../../assets/config';
import routes from '../../../../../assets/routes';
import { Theme } from '../../../../../assets/theme';
import useMedia from '../../../../../hooks/media.hook';
import useTheme from '../../../../../hooks/theme.hook';
import useUppy from '../../../../../hooks/uppy.hook';
import types from '../../../../../redux/types';
import notificationsModal from '../../../../common/modal/notifications-modal';
import newOfferTemplate from '../new-offer.style';

const useStyles = createUseStyles((theme: Theme) => newOfferTemplate(theme).step);

const StepThree = (): ReactElement => {
    const css = useStyles();
    const [theme] = useTheme();
    const history = useRouter();
    const dispatch = useDispatch();
    const uppy = useUppy();
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
        history.push(routes.offers.new(2), undefined, { shallow: true });
    };

    const handleClick = (): void => {
        dispatch({
            type: types.POST_OFFER_START,
            payload: null,
            callback() {
                history.push(routes.offers.new(4), undefined, { shallow: true });
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
                    res?.successful?.map<string>(
                        (value: UploadedUppyFile<unknown, { image_url?: string }>) =>
                            config.img + value?.response?.body?.image_url,
                    ) || [],
                callback() {
                    history.push(routes.offers.new(4), undefined, { shallow: true });
                },
            });
        } catch (error) {
            notificationsModal('error');
        }
    };

    return (
        <form className={css.form} onSubmit={handleSubmit}>
            <h4 className={css.title}>Добавьте фото вашего товара</h4>
            <h5 className={css.subtitle}>Не больше 3мб (.png .jpg .jpeg)</h5>

            <Dashboard
                theme={theme.includes('black') ? 'dark' : 'light'}
                uppy={uppy}
                hideUploadButton
                height={media ? 500 : 350}
            />

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
