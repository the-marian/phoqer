import { UploadedUppyFile, UploadResult } from '@uppy/core';
import { Dashboard } from '@uppy/react';
import React, { ReactElement, useEffect } from 'react';

import useMedia from '../../../../../hooks/media.hook';
import useTheme from '../../../../../hooks/theme.hook';
import useUppy from '../../../../../hooks/uppy.hook';
import config from '../../../../../utils/config';
import { modal } from '../../../../common/modal';
import MidModalWrp from '../../../../common/modal/mid-modal-wrp';

interface IProps {
    onChange: (value: string[]) => void;
}

const ChatUploadsModal = ({ onChange }: IProps): ReactElement => {
    const uppy = useUppy();
    const [theme] = useTheme();
    const media = useMedia(900);

    useEffect(() => {
        document.querySelector<HTMLButtonElement>('.uppy-u-reset.uppy-Dashboard-browse')?.click();
    }, []);

    useEffect(() => {
        const handler = (result: UploadResult): void => {
            if (!result?.successful?.length) return;
            onChange(
                result?.successful?.map<string>(
                    (value: UploadedUppyFile<unknown, { image_url?: string }>) => config.img + value?.response?.body?.image_url,
                ) || [],
            );
            modal.close();
        };
        uppy.on('complete', handler);
        return () => {
            uppy.off('complete', handler);
        };
    }, [uppy, onChange]);

    return (
        <MidModalWrp>
            <Dashboard theme={theme.includes('black') ? 'dark' : 'light'} width="100%" uppy={uppy} height={media ? 500 : 350} />
        </MidModalWrp>
    );
};

export default ChatUploadsModal;
