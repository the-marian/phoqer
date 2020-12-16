import Uppy from '@uppy/core';
import { Dashboard, StatusBar } from '@uppy/react';
import Tus from '@uppy/tus';
import React, { ReactElement } from 'react';

import config from '../../../../../assets/config';

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

const ImgUploader = (): ReactElement => {
    const height = process.browser ? (window.innerWidth < 900 ? 350 : 500) : 500;
    return (
        <div>
            <StatusBar uppy={uppy} hideAfterFinish={false} showProgressDetails />
            <Dashboard uppy={uppy} height={height} />
        </div>
    );
};

export default ImgUploader;
