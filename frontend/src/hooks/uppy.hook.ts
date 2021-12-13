import { useEffect, useMemo } from 'react';

import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';

import config from '../utils/config';

import useAuth from './auth.hook';

const useUppy = (): Uppy.Uppy<Uppy.StrictTypes> => {
    const { token } = useAuth();
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
            endpoint: config.uploadsUrl(),
            fieldName: 'file',
            headers: {
                Authorization: token.access_token || '',
            },
        });

        return () => {
            uppy.close();
        };
    }, [token.access_token, uppy]);

    return uppy;
};

export default useUppy;
