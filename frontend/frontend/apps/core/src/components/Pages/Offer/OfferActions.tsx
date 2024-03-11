import { FC } from 'react';

import { HStack, Icon, IconButton, Tooltip } from '@chakra-ui/react';
import { TbBookmarkPlus, TbMessage2Share, TbShare2 } from 'react-icons/tb';

export const OfferActions: FC = () => {
    return (
        <HStack spacing={4}>
            <Tooltip label="Chat with author">
                <IconButton size="lg" variant="icon-ghost" aria-label="Open chat">
                    <Icon as={TbMessage2Share} boxSize="25px !important" />
                </IconButton>
            </Tooltip>

            <Tooltip label="Share">
                <IconButton size="lg" variant="icon-ghost" aria-label="Share">
                    <Icon as={TbShare2} boxSize="25px !important" />
                </IconButton>
            </Tooltip>

            <Tooltip label="Add to favorite">
                <IconButton size="lg" variant="icon-ghost" aria-label="Add to favorite">
                    <Icon as={TbBookmarkPlus} boxSize="25px !important" />
                </IconButton>
            </Tooltip>
        </HStack>
    );
};
