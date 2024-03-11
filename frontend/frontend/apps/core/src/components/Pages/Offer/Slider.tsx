import { FC, useState } from 'react';

import {
    Box,
    BoxProps,
    ButtonProps,
    Icon,
    IconButton,
    Image,
    Modal,
    ModalContent,
    useBoolean,
    useColorModeValue,
} from '@chakra-ui/react';
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft, MdClose } from 'react-icons/md';
import { Carousel, CarouselProps } from 'react-responsive-carousel';

const commonArrowProps: ButtonProps = {
    variant: 'icon',
    size: 'lg',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 2,
    bg: 'gray.300',
    _dark: { bg: 'gray.500' },
};

const indicatorProps: BoxProps['sx'] = {
    '.carousel-root, .carousel-slider, .slider-wrapper, .slider': { h: '100%' },
    '.control-dots': {
        p: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        w: 'max-content',
        bg: 'gray.300',
        borderRadius: '1.5rem',
        position: 'absolute',
        bottom: 5,
        left: '50%',
        transform: 'translateX(-50%)',
    },
};

const carouselProps: Partial<CarouselProps> = {
    infiniteLoop: true,
    emulateTouch: true,
    showThumbs: false,
    showStatus: false,
    renderArrowPrev: (onClick, hasPrev) =>
        hasPrev ? (
            <IconButton aria-label="Prev" left={5} {...commonArrowProps} onClick={onClick}>
                <Icon as={MdOutlineKeyboardArrowLeft} color="common.black" />
            </IconButton>
        ) : null,
    renderArrowNext: (onClick, hasNext) =>
        hasNext ? (
            <IconButton aria-label="Next" right={5} {...commonArrowProps} onClick={onClick}>
                <Icon as={MdOutlineKeyboardArrowRight} color="common.black" />
            </IconButton>
        ) : null,
    renderIndicator: (onClick, isSelected) => (
        <Box
            as="button"
            type="button"
            h={2}
            mx={1}
            w={isSelected ? 6 : 2}
            borderRadius="full"
            transition="0.2s ease-in-out"
            bg="gray.600"
            onClick={onClick}
        />
    ),
};

interface Props {
    images: string[];
    title: string;
}
export const Slider: FC<Props> = ({ images, title }) => {
    const [isFullScreen, { on, off }] = useBoolean();
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const onOpenFullScreen = (index: number) => {
        on();
        setSelectedIndex(index);
    };

    const isOneImage = images.length === 1;

    return (
        <>
            <Box
                h="100%"
                maxH="70vh"
                overflow="hidden"
                borderRadius="1rem"
                sx={{ li: { cursor: 'zoom-in' }, ...indicatorProps }}
                bg={useColorModeValue('gray.100', 'gray.800')}
            >
                <Carousel {...carouselProps} showIndicators={!isOneImage} onClickItem={onOpenFullScreen}>
                    {images.map(src => (
                        <Image key={src} src={src} alt={title} h="70vh" minH="400px" objectFit="cover" />
                    ))}
                </Carousel>
            </Box>

            <Modal isOpen={isFullScreen} onClose={off} size="full">
                <ModalContent>
                    <Box
                        overflow="hidden"
                        bg="common.black"
                        position="relative"
                        sx={{ li: { cursor: 'grab' }, ...indicatorProps }}
                    >
                        <IconButton
                            {...commonArrowProps}
                            transform={undefined}
                            aria-label="CLose"
                            position="fixed"
                            top={5}
                            right={5}
                            onClick={off}
                        >
                            <Icon as={MdClose} color="common.black" />
                        </IconButton>

                        <Carousel {...carouselProps} showIndicators={!isOneImage} selectedItem={selectedIndex!}>
                            {images.map(src => (
                                <Image key={src} src={src} alt={title} h="100vh" objectFit="contain" />
                            ))}
                        </Carousel>
                    </Box>
                </ModalContent>
            </Modal>
        </>
    );
};
