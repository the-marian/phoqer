import {
    FC,
    createContext,
    Dispatch,
    SetStateAction,
    PropsWithChildren,
    useState,
    useContext,
    useCallback,
    useMemo,
    useEffect,
    useRef,
} from 'react';

import { useNewOffer } from '@author/providers';
import { debounce, uniqueId } from 'lodash-es';
import { useUpdateOffer, uploadMediaFetcher, UpdateOfferBody } from 'query';

const TIMEOUT = 300;

export enum ImageStatus {
    IDLE,
    UPLOADING,
    UPLOADED,
    EXISTED,
    ERROR,
}

const DO_NOT_UPLOAD = [ImageStatus.EXISTED, ImageStatus.UPLOADED];

export interface ImageItem {
    id: string;
    file: File | null;
    url: string;
    name?: string;
    status: ImageStatus;
}

interface ImagesContextValue {
    images: ImageItem[];
    setImages: Dispatch<SetStateAction<ImageItem[]>>;
    onAddImage: (file: File) => void;
    onDelete: (id: string) => void;
    onUploadImages: () => void;
    isAllImagesUploaded: boolean;
}

const ImagesContext = createContext<ImagesContextValue>({} as ImagesContextValue);

const override = (param: Partial<ImageItem> & { id: string }) => {
    return (prev: ImageItem[]) =>
        prev.map(item => {
            return item.id === param.id ? { ...item, ...param } : item;
        });
};

interface Props {
    images?: string[];
}

export const ImagesProvider: FC<PropsWithChildren<Props>> = ({ children, images: existedImages = [] }) => {
    const isInit = useRef<boolean>(true);
    const acceptedImages = useRef<Set<string>>(new Set<string>());
    const { mutate: updateOffer } = useUpdateOffer();

    const { data, setData } = useNewOffer();
    const [images, setImages] = useState<ImageItem[]>(() =>
        existedImages.map(item => {
            const name = item.split('?')[0].split('/').at(-1);
            return { id: uniqueId(), file: null, url: item, name, status: ImageStatus.EXISTED };
        }),
    );

    useEffect(() => {
        if (acceptedImages.current.size) return;

        images.forEach(({ id, file, status }) => {
            if (status === ImageStatus.UPLOADING && !acceptedImages.current.has(id)) {
                acceptedImages.current.add(id);

                const formData = new FormData();
                formData.append('image', file!);

                uploadMediaFetcher(formData)
                    .then(url => setImages(override({ id, url, status: url ? ImageStatus.UPLOADED : ImageStatus.ERROR })))
                    .catch(() => setImages(override({ id, status: ImageStatus.ERROR })))
                    .finally(() => acceptedImages.current.delete(id));
            }
        });
    }, [images]);

    const debounceSaveImages = useCallback(
        debounce((images: ImageItem[]) => {
            const urls = images.reduce<string[]>((acc, item) => {
                if (item.url && !item.url.includes('blob')) acc.push(item.url);
                return acc;
            }, []);

            if (urls.length > 0) {
                const body = { ...data, images: urls } as UpdateOfferBody;
                setData(body);
                updateOffer(body);
            }
        }, TIMEOUT),
        [updateOffer, data, setData],
    );

    useEffect(() => {
        if (!isInit.current) {
            debounceSaveImages(images);
        }
        isInit.current = false;
        return () => debounceSaveImages.cancel();
    }, [images]);

    const onAddImage = useCallback((file: File) => {
        setImages(prev => [
            ...prev,
            {
                file,
                id: uniqueId(),
                url: (window.URL || window.webkitURL).createObjectURL(file),
                status: ImageStatus.IDLE,
            },
        ]);
    }, []);

    const onDelete = useCallback((id: string) => {
        setImages(prev => prev.filter(item => item.id !== id));
        // TODO: Delete image from server
    }, []);

    const onUploadImages = useCallback(() => {
        setImages(prev =>
            prev.map(item => (DO_NOT_UPLOAD.includes(item.status) ? item : { ...item, status: ImageStatus.UPLOADING })),
        );
    }, []);

    const isAllImagesUploaded = useMemo(
        () => images.every(item => item.status === ImageStatus.UPLOADED || item.status === ImageStatus.EXISTED),
        [images],
    );

    return (
        <ImagesContext.Provider value={{ images, setImages, onAddImage, onDelete, onUploadImages, isAllImagesUploaded }}>
            {children}
        </ImagesContext.Provider>
    );
};

export const useImages = () => useContext(ImagesContext);
