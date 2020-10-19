import update from 'immutability-helper';
import React, { ReactElement, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../config/theme';

const useStyles = createUseStyles((theme: Theme) => ({
  wrp: {
    display: 'grid',
    gridTemplateColumns: theme.fr(3),
    gridGap: theme.rem(2),
    margin: theme.rem(3, 0),

    '@media (max-width: 670px)': {
      gridTemplateColumns: theme.fr(2),
    },

    '@media (max-width: 355px)': {
      gridTemplateColumns: theme.fr(1),
    },
  },
}));

import ImageElement from './ImageElement';

interface Props {
  images: string[];
  onChange: (value: string[]) => void;
}

const DnDImages = ({ images, onChange }: Props): ReactElement => {
  const css = useStyles();

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = images[dragIndex];
      onChange(
        update(images, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        }),
      );
    },
    [images],
  );

  const handleDelete = (value: string): void => {
    onChange(images.filter(image => image !== value));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={css.wrp}>
        {images.map((image, index) => (
          <ImageElement
            key={image}
            image={image}
            index={index}
            moveCard={moveCard}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default DnDImages;
