import { useEffect, useRef, useState, MouseEvent, useCallback, FC } from 'react';

import ReactDOM from 'react-dom';
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from 'src/design-system/icons';
import { Image } from 'src/design-system/media';

import css from './gallery-modal.module.scss';

export interface GalleryModalProps {
    alt?: string;
    media: string[];
    index?: number;
    onClose: () => void;
}
export const GalleryModal: FC<GalleryModalProps> = ({ media, onClose, alt = '', index = 0 }) => {
    const ref = useRef<HTMLDivElement>(null);

    const maxIndex = media.length - 1;
    const [imageIndex, setIndex] = useState(index > maxIndex ? 0 : index);

    const gotToNextImage = useCallback((): void => {
        setIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    }, [maxIndex]);

    const gotToPrevImage = useCallback((): void => {
        setIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
    }, [maxIndex]);

    const handleNext = (event: MouseEvent<HTMLButtonElement>): void => {
        event.stopPropagation();
        gotToNextImage();
    };

    const handlePrev = (event: MouseEvent<HTMLButtonElement>): void => {
        event.stopPropagation();
        gotToPrevImage();
    };

    useEffect(() => {
        const eventMap: { [key: string]: () => void } = {
            Space: gotToNextImage,
            ArrowUp: gotToNextImage,
            ArrowRight: gotToNextImage,
            ArrowLeft: gotToPrevImage,
            ArrowDown: gotToPrevImage,
        };

        const handler = (event: KeyboardEvent): void => {
            event.preventDefault();
            eventMap[event.code]?.();
        };

        if (media.length > 1) {
            window.addEventListener('keydown', handler);
        }
        return () => window.removeEventListener('keydown', handler);
    }, [gotToNextImage, gotToPrevImage, media.length]);

    useEffect(() => {
        const handler = (event: KeyboardEvent): void => {
            if (event.code === 'Escape') {
                event.preventDefault();
                onClose();
            }
        };

        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose]);

    useEffect(() => {
        if (ref.current) ref.current.focus();
    }, []);

    return ReactDOM.createPortal(
        <div ref={ref} className={css.root}>
            <button className={css.close} onClick={onClose} type="button">
                <CloseIcon />
            </button>

            <button type="button" className={css.imgBtn} onClick={onClose}>
                <Image className={css.img} src={media[imageIndex]} alt={alt} />
            </button>

            {maxIndex > 0 && (
                <>
                    <div className={css.nav} onClick={onClose} aria-hidden="true">
                        <button onClick={handlePrev} type="button">
                            <ArrowLeftIcon />
                        </button>
                        <button onClick={handleNext} type="button">
                            <ArrowRightIcon />
                        </button>
                    </div>

                    <p className={css.pages}>
                        {imageIndex + 1} / {media.length}
                    </p>
                </>
            )}
        </div>,
        document.body,
    );
};
