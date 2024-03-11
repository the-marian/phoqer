export interface ImageUploadStatus {
    loading: boolean;
    error: boolean;
    done: boolean;
    url: string;
    file: File;
}

export interface Labels {
    'Maximum {{max}} images. Maximum image size {{size}}M': string;
    'Drag & drop some files here, or click to select files': string;
    'Select all images': string;
    'Unselect all images': string;
    'Delete selected': string;
    'Add new image': string;
    'Delete all images': string;
    Upload: string;
    Image: string;
    Name: string;
    Size: string;
}
