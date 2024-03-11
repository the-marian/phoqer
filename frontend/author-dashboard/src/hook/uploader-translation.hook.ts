import { Labels } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';

export const useUploaderTransition = (files: number, size: number): Labels => {
    const { t } = useTranslation();

    return {
        Name: t('Name'),
        Size: t('Size'),
        Image: t('Image'),
        Upload: t('Upload'),
        'Add new image': t('Add new image'),
        'Delete selected': t('Delete selected'),
        'Delete all images': t('Delete all images'),
        'Select all images': t('Select all images'),
        'Unselect all images': t('Unselect all images'),
        'Drag & drop some files here, or click to select files': t('Drag & drop some files here, or click to select files'),
        'Maximum {{max}} images. Maximum image size {{size}}M': t('Maximum {{max}} images. Maximum image size {{size}} Mb', {
            max: files,
            size: size / 1_000_000,
        }),
    };
};
