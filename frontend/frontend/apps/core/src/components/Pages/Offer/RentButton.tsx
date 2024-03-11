import { FC } from 'react';

import { DrawerContent } from '@app/components/Common';
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Heading,
    HStack,
    Icon,
    IconButton,
    Input,
    Stack,
    Tag,
    Text,
    Tooltip,
    useBoolean,
} from '@chakra-ui/react';
import { useCurrency } from 'common';
import { OfferItem } from 'query';
import { MdArrowForward } from 'react-icons/md';

interface Props {
    data: OfferItem;
}
export const RentButton: FC<Props> = ({ data }) => {
    const currency = useCurrency();
    const [isRentDrawerOpen, rentDrawer] = useBoolean();

    return (
        <>
            <Button
                py={5}
                px={8}
                h="unset"
                w="100%"
                bg="gray.100"
                textAlign="left"
                borderRadius="xl"
                variant="unstyled"
                onClick={rentDrawer.on}
                _hover={{
                    bg: 'gray.300',
                    _dark: {
                        bg: 'gray.600',
                    },
                }}
                _active={{
                    bg: 'gray.400',
                    _dark: {
                        bg: 'gray.800',
                    },
                }}
                _dark={{
                    bg: 'gray.800',
                }}
            >
                <HStack spacing={1} justifyContent="space-between">
                    <Stack spacing={1}>
                        <HStack spacing={4}>
                            <Heading size="md">{currency.format(data.price)}</Heading>
                            {data.sale && (
                                <Tooltip label={data.sale.description}>
                                    <Tag variant="success">Sale: {data.sale.percentage}%</Tag>
                                </Tooltip>
                            )}
                        </HStack>
                        <Text>Rent now</Text>
                    </Stack>

                    <Icon as={MdArrowForward} boxSize={6} />
                </HStack>
            </Button>

            <Drawer isOpen={isRentDrawerOpen} placement="right" onClose={rentDrawer.off}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader as={HStack} alignItems="center" justifyContent="space-between">
                        <Heading size="lg">Rent</Heading>
                        <IconButton aria-label="Close" size="md" variant="icon" onClick={rentDrawer.off}>
                            <MdArrowForward />
                        </IconButton>
                    </DrawerHeader>

                    <DrawerBody>
                        <Input size="lg" placeholder="Type here..." />
                    </DrawerBody>

                    <DrawerFooter pb={6}>
                        <Button size="lg" w="100%" variant="pill">
                            Save
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};
