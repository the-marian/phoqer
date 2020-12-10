import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { XYCoord } from 'dnd-core';
import React, { ReactElement, useRef } from 'react';
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        position: 'relative',
        borderRadius: theme.radius,
    },
    img: {
        height: theme.rem(15),
        borderRadius: theme.radius,
        objectFit: 'cover',
        cursor: 'grab',
    },
    delete: {
        position: 'absolute',
        top: theme.rem(1),
        left: theme.rem(1),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: theme.rem(4),
        width: theme.rem(4),
        fontWeight: theme.text.weight[4],
        borderRadius: '50%',
        background: theme.palette.white,
        '&:hover': {
            color: theme.palette.red[0],
        },
    },
}));

export interface CardProps {
    index: number;
    image: string;
    moveCard: (dragIndex: number, hoverIndex: number) => void;
    onDelete: (value: string) => void;
}

interface DragItem {
    index: number;
    image: string;
    type: string;
}

const ImageElement = ({ index, image, moveCard, onDelete }: CardProps): ReactElement => {
    const css = useStyles();
    const ref = useRef<HTMLDivElement>(null);

    const [, drop] = useDrop({
        accept: 'image',
        hover(item: DragItem, monitor: DropTargetMonitor) {
            if (!ref.current) return;

            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) return;

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

            moveCard(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        item: { type: 'image', image, index },
        collect: (monitor: { isDragging: () => boolean }) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    return (
        <div className={css.wrp} ref={ref} style={{ opacity }}>
            <img className={css.img} key={image} src={image} alt="" />
            <button
                className={css.delete}
                type="button"
                onClick={(): void => {
                    onDelete(image);
                }}
            >
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </div>
    );
};

export default ImageElement;
