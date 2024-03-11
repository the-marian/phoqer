import { ChangeEvent, FC, useRef } from 'react';

import { Button, Icon, Input } from '@chakra-ui/react';
import { ImAttachment } from 'react-icons/im';

import { useImages } from './Provider';

type Props = { label?: string };
export const UploadButton: FC<Props> = ({ label = 'Upload' }) => {
    const { onAddImage } = useImages();
    const ref = useRef<HTMLInputElement>(null);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            Array.from(event.target.files).forEach(file => onAddImage(file));
        }
    };

    return (
        <>
            <Input ref={ref} accept="image/*" type="file" onChange={handleChange} multiple={true} hidden={true} />
            <Button size="md" onClick={() => ref.current?.click()} leftIcon={<Icon as={ImAttachment} boxSize="16px" />}>
                {label}
            </Button>
        </>
    );
};
