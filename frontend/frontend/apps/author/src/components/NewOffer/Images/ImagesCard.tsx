import { CSSProperties, FC, useMemo } from 'react';

import { Heading, HStack, Icon, IconButton, Image, Spinner } from '@chakra-ui/react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FcApproval } from 'react-icons/fc';
import { MdDragIndicator } from 'react-icons/md';
import { PiWarningFill } from 'react-icons/pi';
import { RiDeleteBin6Line } from 'react-icons/ri';

import { ImageItem, ImageStatus, useImages } from './Provider';

interface Props {
    item: ImageItem;
}
export const ImagesCard: FC<Props> = ({ item }) => {
    const { onDelete } = useImages();

    const { isDragging, attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: item.id,
    });

    const style: CSSProperties = useMemo(
        () => ({
            opacity: isDragging ? 0.4 : undefined,
            transform: CSS.Translate.toString(transform),
            transition,
        }),
        [isDragging, transform, transition],
    );

    const isUploading = item.status === ImageStatus.UPLOADING;

    return (
        <HStack
            py={2}
            px={4}
            w="100%"
            style={style}
            key={item.id}
            ref={setNodeRef}
            border="2px solid"
            borderColor="transparent"
            borderRadius="lg"
            pointerEvents={isUploading ? 'none' : undefined}
            _hover={{ bg: 'gray.50', borderColor: 'primary.main', img: { borderColor: 'primary.main' } }}
        >
            <IconButton cursor="grab" variant="icon" size="sm" aria-label="Drag and Drop" {...attributes} {...listeners}>
                <MdDragIndicator />
            </IconButton>

            <Image
                alt=""
                boxSize="60px"
                border="2px solid"
                borderRadius="lg"
                borderColor="gray.400"
                objectFit="cover"
                src={item.url}
            />

            <Heading pl={2} flex={1} size="sm" noOfLines={2}>
                {item.file?.name ?? item.name}
            </Heading>

            {isUploading && <Spinner />}

            {!isUploading && (
                <>
                    {item.status === ImageStatus.ERROR && <Icon as={PiWarningFill} boxSize="24px" color="orange.400" />}
                    {item.status === ImageStatus.UPLOADED && <Icon mt={1} as={FcApproval} boxSize="24px" color="green.500" />}

                    <IconButton variant="icon" size="sm" aria-label="Delete" onClick={() => onDelete(item.id)}>
                        <RiDeleteBin6Line />
                    </IconButton>
                </>
            )}
        </HStack>
    );
};
