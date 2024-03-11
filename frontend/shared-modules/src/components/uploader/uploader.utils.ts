import { ImageUploadStatus } from './uploader.type';

export const MAX_FILE_SIZE = 20_000_000; // 20 mb
export const MAX_FILES = 20;

export const getImageUploadStatus = (file: File): ImageUploadStatus => ({
    loading: false,
    error: false,
    done: false,
    url: '',
    file,
});

export const defaultLabels = {
    'Maximum {{max}} images. Maximum image size {{size}}M': 'Maximum 20 images. Maximum image size 20M',
    'Drag & drop some files here, or click to select files': 'Drag & drop some files here, or click to select files',
    'Select all images': 'Select all images',
    'Unselect all images': 'Unselect all images',
    'Delete selected': 'Delete selected',
    'Add new image': 'Add new image',
    'Delete all images': 'Delete all images',
    Upload: 'Upload',
    Image: 'Image',
    Name: 'Name',
    Size: 'Size',
};
