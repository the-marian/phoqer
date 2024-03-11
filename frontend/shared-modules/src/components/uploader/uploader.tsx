import { Dispatch, FC, SetStateAction, useCallback, useState } from 'react';

import classNames from 'classnames';
import { TableContextProvider, toast } from 'phoqer';
import { DropzoneOptions, useDropzone } from 'react-dropzone';

import { DropzoneEmpty } from './components/dropzone-empty/dropzone-empty';
import { ImagesTable } from './components/images-table/images-table';
import css from './uploader.module.scss';
import type { ImageUploadStatus, Labels } from './uploader.type';
import { defaultLabels, getImageUploadStatus, MAX_FILE_SIZE, MAX_FILES } from './uploader.utils';

interface Props {
    labels?: Labels;
    maxFiles?: number;
    maxSize?: number;
    className?: string;
    uploads: ImageUploadStatus[];
    setUploads: Dispatch<SetStateAction<ImageUploadStatus[]>>;
    onSubmit: (data: FormData) => Promise<string>;
}
export const Uploader: FC<Props> = ({
    uploads,
    setUploads,
    onSubmit,
    className,
    maxFiles = MAX_FILES,
    maxSize = MAX_FILE_SIZE,
    labels = defaultLabels,
}) => {
    const dropzoneOptions: Partial<DropzoneOptions> = {
        maxSize,
        maxFiles,
        multiple: true,
        noClick: true,
        noKeyboard: true,
        accept: {
            'image/*': ['.jpg', '.jpeg', '.jfif', '.pjpeg', '.pjp', '.webp', '.png'],
        },
    };

    const [isLoading, setIsLoading] = useState(false);
    const onDropAccepted = useCallback(
        (file: File[]) => {
            setUploads(prev => {
                const unique = file.reduce<ImageUploadStatus[]>((acc, item) => {
                    if (!prev.find(prevItem => prevItem.file.name === item.name)) {
                        acc.push(getImageUploadStatus(item));
                    }

                    return acc;
                }, []);

                return [...unique, ...prev];
            });
        },
        [setUploads],
    );

    const onDropRejected = useCallback((): void => {
        toast.error({
            id: 'upload-error',
            content: labels?.['Maximum {{max}} images. Maximum image size {{size}}M'],
        });
    }, [labels]);

    const {
        open: onOpen,
        getRootProps,
        getInputProps,
    } = useDropzone({
        ...dropzoneOptions,
        onDropAccepted,
        onDropRejected,
    });

    const handleUploadItem = async (image: File): Promise<void> => {
        try {
            const form = new FormData();
            form.append('image', image);
            const data = await onSubmit(form);

            setUploads(prev => {
                const index = prev.findIndex(item => item.file.name === image.name);

                prev[index].loading = false;
                prev[index].done = true;
                prev[index].url = data;
                return [...prev];
            });
        } catch {
            setUploads(prev => {
                const index = prev.findIndex(item => item.file.name === image.name);

                prev[index].loading = false;
                prev[index].error = true;
                return [...prev];
            });
        }
    };

    const uploadAllImages = async (): Promise<void> => {
        setIsLoading(true);
        setUploads(prev => prev.map(item => (item.done && item.url ? item : { ...item, error: false, loading: true })));

        for await (const image of uploads) {
            if (image.done && image.url) continue;

            await handleUploadItem(image.file);
        }

        setIsLoading(false);
    };

    const reUploadImage = async (image: File): Promise<void> => {
        setIsLoading(true);

        setUploads(prev => {
            const index = prev.findIndex(item => item.file.name === image.name);
            prev[index] = { ...getImageUploadStatus(image), loading: true };
            return [...prev];
        });
        await handleUploadItem(image);
        setIsLoading(false);
    };

    return (
        <div {...getRootProps()} className={classNames(className, css.wrp)}>
            <input {...getInputProps()} />

            <div className={css.upload}>
                {uploads.length ? (
                    <TableContextProvider>
                        <ImagesTable
                            onOpen={onOpen}
                            labels={labels}
                            isLoading={isLoading}
                            uploads={uploads}
                            setUploads={setUploads}
                            onSubmit={uploadAllImages}
                            reUploadImage={reUploadImage}
                        />
                    </TableContextProvider>
                ) : (
                    <DropzoneEmpty labels={labels} onClick={onOpen} />
                )}
            </div>
        </div>
    );
};
