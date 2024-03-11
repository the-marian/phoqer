import { FC, ReactNode } from 'react';

import { Box, IconButton, HStack, Stack, Icon, Text, Button, StackProps, Tooltip } from '@chakra-ui/react';
import { BiSave } from 'react-icons/bi';
import { FiChevronLeft } from 'react-icons/fi';
import { MdOutlineSettingsBackupRestore } from 'react-icons/md';

interface Props extends StackProps {
    onBack: () => void;
    onSave?: () => void;
    onReset?: () => void;
    end?: ReactNode;
}
export const PageShell: FC<Props> = ({ children, onBack, onSave, onReset, end, ...props }) => {
    return (
        <Stack spacing={8} pb="85px" h="calc(100vh - 65px)" {...props}>
            <HStack
                px={4}
                h="60px"
                minH="60px"
                spacing={8}
                borderBottom="1px solid"
                borderColor="gray.400"
                _dark={{ borderColor: 'gray.700' }}
            >
                <HStack as={Button} variant="unstyled" onClick={onBack}>
                    <IconButton as="div" variant="icon" aria-label="Go back" size="md">
                        <Icon as={FiChevronLeft} />
                    </IconButton>
                    <Text size="lg" fontWeight={500}>
                        Back
                    </Text>
                </HStack>

                <HStack flex={1}>
                    {onSave && (
                        <Tooltip label="Save changes">
                            <IconButton variant="icon" aria-label="Save changes" onClick={onSave}>
                                <Icon as={BiSave} />
                            </IconButton>
                        </Tooltip>
                    )}

                    {onReset && (
                        <Tooltip label="Reset values to default">
                            <IconButton variant="icon" aria-label="Reset values to default" onClick={onReset}>
                                <Icon as={MdOutlineSettingsBackupRestore} />
                            </IconButton>
                        </Tooltip>
                    )}
                </HStack>

                <HStack>{end}</HStack>
            </HStack>

            {children}
            <Box minH="85px" />
        </Stack>
    );
};
