import { FC, useState } from 'react';

import { Stack } from '@chakra-ui/react';
import { DndContext, DragOverlay, DragEndEvent, Active, defaultDropAnimationSideEffects } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { ImagesCard } from './ImagesCard';
import { useImages } from './Provider';

const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
        styles: {
            active: {
                opacity: '0.1',
            },
        },
    }),
};

export const ImagesQueue: FC = () => {
    const [active, setActive] = useState<Active | null>(null);
    const { images, setImages } = useImages();

    const onDragEnd = ({ active, over }: DragEndEvent) => {
        if (over && active.id !== over?.id) {
            const overIndex = images.findIndex(item => item.id === over.id);
            const activeIndex = images.findIndex(item => item.id === active.id);

            setImages(arrayMove(images, activeIndex, overIndex));
        }
    };

    return (
        <DndContext onDragEnd={onDragEnd} onDragStart={({ active }) => setActive(active)}>
            <SortableContext items={images} strategy={verticalListSortingStrategy}>
                <Stack flex={1} maxW="600px" alignItems="center">
                    {images.map(item => (
                        <ImagesCard key={item.id} item={item} />
                    ))}
                </Stack>
            </SortableContext>

            <DragOverlay dropAnimation={dropAnimation}>
                {active ? <ImagesCard item={images.find(item => active.id === item.id)!} /> : null}
            </DragOverlay>
        </DndContext>
    );
};
