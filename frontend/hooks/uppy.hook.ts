import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import { useEffect, useMemo } from 'react';

import config from '../assets/config';
import useAuth from './auth.hook';

const useUppy = (): Uppy.Uppy<Uppy.StrictTypes> => {
    const auth = useAuth();
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
                Authorization: `Bearer ${auth?.access_token}`,
            },
        });

        return () => {
            uppy.close();
        };
    }, []);

    return uppy;
};

export default useUppy;
