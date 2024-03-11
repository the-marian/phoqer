import { FC } from 'react';

import { ChevronLeftIcon } from 'src/design-system/icons';
import { Flex } from 'src/design-system/layout';

import css from './large-modal.module.scss';

interface Props {
    title: string;
    autoFocus?: boolean;
    onClose: () => void;
}
export const LargeModalHeader: FC<Props> = ({ title, onClose, autoFocus = false }) => {
    return (
        <Flex align="center" className={css.header}>
            <button type="button" autoFocus={autoFocus} className={css.back} onClick={onClose}>
                <ChevronLeftIcon />
                {title}
            </button>
        </Flex>
    );
};
