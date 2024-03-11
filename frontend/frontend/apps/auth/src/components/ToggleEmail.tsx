import { FC } from 'react';

import { Icon, IconButton, Stack, Text } from '@chakra-ui/react';
import { MdClose, MdMailOutline } from 'react-icons/md';

interface Props {
    isOpen: boolean;
    onToggle: () => void;
}
export const ToggleEmail: FC<Props> = ({ isOpen, onToggle }) => {
    return (
        <Stack alignItems="center" spacing={4}>
            <Text size="sm" fontWeight={600}>
                Or use your email:
            </Text>
            <IconButton
                size="lg"
                minW="unset"
                variant="icon-ghost"
                boxSize="60px"
                onClick={onToggle}
                aria-label="Use email"
                sx={{ svg: { w: '40%', h: '40%', zIndex: 2 } }}
            >
                {isOpen ? <MdClose /> : <Icon as={MdMailOutline} />}
            </IconButton>
        </Stack>
    );
};
