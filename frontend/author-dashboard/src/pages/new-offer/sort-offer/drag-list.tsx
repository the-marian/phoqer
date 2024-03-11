import React from 'react';

import classNames from 'classnames';
import { Button, DragIcon, Image, DeleteIcon } from 'phoqer';
import { DragDropContext, Draggable, DraggableProvided, Droppable, DroppableProvided, DropResult } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';

import { ImageOrder } from 'src/pages/new-offer/new-offer.types';
import { reorder } from 'src/pages/new-offer/new-offer.utils';

import css from './sort-offer.module.scss';

interface Props {
    images: ImageOrder[];
    setImages: (order: ImageOrder[]) => void;
    className?: string;
    onDelete?: (id: string) => void;
    isLoading?: boolean;
}
const DragList = ({ images, setImages, className, onDelete, isLoading = false }: Props): JSX.Element => {
    const { t } = useTranslation();

    const onDragStart = (): void => {
        if (window.navigator.vibrate) {
            window.navigator.vibrate(100);
        }
    };

    const onDragEnd = (result: DropResult): void => {
        if (result.combine) {
            const newImages: ImageOrder[] = [...images];
            newImages.splice(result.source.index, 1);
            setImages(newImages);
            return;
        }

        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        const newQuotes = reorder<ImageOrder>(images, result.source.index, result.destination.index);

        setImages(newQuotes);
    };

    return (
        <>
            {images.length ? (
                <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(dropProvided: DroppableProvided) => (
                            <div {...dropProvided.droppableProps} ref={dropProvided.innerRef}>
                                {images.map(({ id, name, url }, index) => (
                                    <Draggable key={id} draggableId={id} index={index}>
                                        {(dragProvided: DraggableProvided) => (
                                            <div
                                                className={classNames(css.flex, className, css.dragOption)}
                                                ref={dragProvided.innerRef}
                                                {...dragProvided.draggableProps}
                                                {...dragProvided.dragHandleProps}
                                            >
                                                <div className={css.drag}>
                                                    <DragIcon />
                                                </div>
                                                <Image src={url} className={css.image} alt={t('New offer')} />
                                                <p className={css.name}>{name}</p>
                                                {onDelete && (
                                                    <Button
                                                        onlyIcon
                                                        format="link"
                                                        loading={isLoading}
                                                        className={css.delete}
                                                        onClick={() => onDelete(id)}
                                                    >
                                                        <DeleteIcon />
                                                    </Button>
                                                )}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {dropProvided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            ) : null}
        </>
    );
};

export default DragList;
