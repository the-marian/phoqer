import { FC } from 'react';

import { Text } from 'phoqer';

import { Labels } from 'src/components/uploader/uploader.type';

import css from './dropzone-empty.module.scss';

interface Props {
    labels: Labels;
    onClick: () => void;
}
export const DropzoneEmpty: FC<Props> = ({ labels, onClick }) => {
    return (
        <button type="button" className={css.empty} onClick={onClick}>
            <Text>{labels['Drag & drop some files here, or click to select files']}</Text>
            <Text as="em" size="sm">
                {labels['Maximum {{max}} images. Maximum image size {{size}}M']}
            </Text>
        </button>
    );
};
