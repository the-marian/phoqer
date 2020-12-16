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
    return (
        <div>
            <StatusBar uppy={uppy} hideUploadButton hideAfterFinish={false} showProgressDetails />
            <Dashboard uppy={uppy} />
        </div>
    );
};

export default ImgUploader;
