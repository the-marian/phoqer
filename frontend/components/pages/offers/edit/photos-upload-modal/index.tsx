import { UploadedUppyFile, UploadResult } from '@uppy/core';
import { Dashboard } from '@uppy/react';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import config from '../../../../../assets/config';
import useMedia from '../../../../../hooks/media.hook';
import useTheme from '../../../../../hooks/theme.hook';
import useUppy from '../../../../../hooks/uppy.hook';
import types from '../../../../../redux/types';
import { modal } from '../../../../common/modal';
import MidModalWrp from '../../../../common/modal/mid-modal-wrp';

const PhotosUploadModal = (): ReactElement => {
    const uppy = useUppy();
    const [theme] = useTheme();
    const media = useMedia(900);
    const dispatch = useDispatch();

    useEffect(() => {
        const handler = (result: UploadResult): void => {
            if (!result?.successful?.length) return;
            dispatch({
                type: types.ADD_SINGLE_OFFER_IMG,
                payload:
                    result?.successful?.map<string>(
                        (value: UploadedUppyFile<unknown, { image_url?: string }>) =>
                            config.img + value?.response?.body?.image_url,
                    ) || [],
            });
            modal.close();
        };
        uppy.on('complete', handler);
        return () => {
            uppy.off('complete', handler);
        };
    }, []);

    return (
        <MidModalWrp>
            <Dashboard theme={theme.includes('black') ? 'dark' : 'light'} width="100%" uppy={uppy} height={media ? 500 : 350} />
        </MidModalWrp>
    );
};

export default PhotosUploadModal;
