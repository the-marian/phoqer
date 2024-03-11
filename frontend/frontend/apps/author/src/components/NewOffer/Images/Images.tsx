import { FC, useCallback } from 'react';

import { useNewOffer } from '@author/providers';
import { Steps } from '@author/types';
import { Button, Center, Spinner } from '@chakra-ui/react';
import { useGetOfferById } from 'query';
import { useDropzone } from 'react-dropzone';
import { LuUploadCloud } from 'react-icons/lu';
import { MdArrowForward } from 'react-icons/md';

import { PageShell, FormFooter } from '../Common';

import { DragPlaceholder } from './DragPlaceholder';
import { EmptyState } from './EmptyState';
import { ImagesQueue } from './ImagesQueue';
import { ImagesProvider, useImages } from './Provider';
import { UploadButton } from './UploadButton';

const ImagesContent: FC = () => {
    const { setStep, errorWrapper } = useNewOffer();
    const { images, onAddImage, onUploadImages, isAllImagesUploaded } = useImages();

    const onDrop = useCallback((files: File[]) => {
        files.forEach(file => onAddImage(file));
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] } });

    const goBack = useCallback((): void => {
        errorWrapper(() => {
            setStep(Steps.Parameters);
        });
    }, []);

    const onGoNext = useCallback((): void => {
        errorWrapper(() => {
            setStep(Steps.Done);
        });
    }, []);

    return (
        <PageShell onBack={goBack} end={images?.length ? <UploadButton label="Upload more images" /> : undefined}>
            <Center flex={1} w="100vw" {...getRootProps()} onClick={() => null} position="relative">
                <input {...getInputProps()} />
                {isDragActive && <DragPlaceholder />}
                {images.length ? (
                    <>
                        <ImagesQueue />

                        <FormFooter>
                            {isAllImagesUploaded ? (
                                <Button size="lg" variant="pill" onClick={onGoNext} rightIcon={<MdArrowForward />}>
                                    Save and Continue
                                </Button>
                            ) : (
                                <Button size="lg" variant="pill" onClick={onUploadImages} rightIcon={<LuUploadCloud />}>
                                    Upload
                                </Button>
                            )}
                        </FormFooter>
                    </>
                ) : (
                    <EmptyState />
                )}
            </Center>
        </PageShell>
    );
};

export const Images: FC = () => {
    const { data } = useNewOffer();
    const { data: draftOffer, isLoading } = useGetOfferById(data?.id);

    if (isLoading) {
        return (
            <Center h="100%" flex={1}>
                <Spinner />
            </Center>
        );
    }

    return (
        <ImagesProvider images={draftOffer?.images || []}>
            <ImagesContent />
        </ImagesProvider>
    );
};
