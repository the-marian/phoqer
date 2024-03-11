import { FC, ReactNode } from 'react';

import { Accordion, AccordionItem, AccordionButton, AccordionPanel, Heading, IconButton, Icon } from '@chakra-ui/react';
import { MdOutlineExpandMore } from 'react-icons/md';

import { Categories } from './Categories';
import { General } from './General';
import { PriceFilter } from './PriceFilter';

interface Props {
    title: ReactNode;
    children: ReactNode;
}
const Item: FC<Props> = ({ title, children }) => {
    return (
        <AccordionItem border="none" mb={4}>
            {({ isExpanded }) => (
                <>
                    <AccordionButton border="none" _hover={{ bg: 'transparent' }}>
                        <Heading flex={1} textAlign="left" size="lg">
                            {title}
                        </Heading>
                        <IconButton as="div" aria-label="Colapse" variant="icon" size="md">
                            <Icon
                                as={MdOutlineExpandMore}
                                transition="0.2s ease-in-out"
                                transform={isExpanded ? undefined : 'rotate(-180deg)'}
                            />
                        </IconButton>
                    </AccordionButton>

                    <AccordionPanel pb={4}>{children}</AccordionPanel>
                </>
            )}
        </AccordionItem>
    );
};

export const Filters: FC = () => {
    return (
        <Accordion allowMultiple defaultIndex={[0, 1, 2]}>
            <Item title="Price">
                <PriceFilter />
            </Item>
            <Item title="General">
                <General />
            </Item>
            <Item title="Category">
                <Categories />
            </Item>
        </Accordion>
    );
};
