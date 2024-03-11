import { FC } from 'react';

import { Overflow } from '@app/components/Common';
import { Box, Button, Stack, useDisclosure } from '@chakra-ui/react';
import { OfferItem } from 'query';
import sanitizeHtml from 'sanitize-html';

interface Props {
    data: OfferItem;
}
export const Description: FC<Props> = ({ data }) => {
    const { isOpen, onToggle } = useDisclosure();
    return (
        <Stack alignItems="flex-start" spacing={2} bg="gray.100" borderRadius="1rem" p={4} _dark={{ bg: 'gray.800' }}>
            <Overflow
                key={data.id}
                isOpen={isOpen}
                startingHeight={400}
                overlayBg="var(--chakra-colors-gray-100)"
                overlayBgDark="var(--chakra-colors-gray-800)"
                toggler={
                    <Button variant="link" size="sm" onClick={onToggle}>
                        {isOpen ? 'Show less' : 'Show more'}
                    </Button>
                }
            >
                <Box
                    className="description"
                    dangerouslySetInnerHTML={{
                        __html: sanitizeHtml(data.description),
                    }}
                />
            </Overflow>
        </Stack>
    );
};
