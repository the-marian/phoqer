import { useState } from 'react';

import { Meta } from '@storybook/react';
import { Heading } from 'src/design-system/foundation';
import { Grid, GridItem } from 'src/design-system/layout';
import { Wrapper } from 'src/storybook/wrapper';

import { Select } from './select';
import { SelectOption } from './select-option';

const meta: Meta<typeof Select> = {
    title: 'Inputs/Select',
    component: Select,
};

export default meta;

const styles = `<style>
.divider {
    width: 100%;
    margin: 5px 0;
    border-top: 1px solid var(--gray-200);
}
</style>`;

export const Base = () => {
    const [value, setValue] = useState<unknown>(null);

    return (
        <Wrapper title="Select" styles={styles}>
            <Heading>
                <>Selected value: {value}</>
            </Heading>

            <Grid size={{ base: 1, md: 2, lg: 3 }}>
                <GridItem>
                    <Select value={value} label="Select value" size="sm" onSelect={setValue}>
                        <SelectOption value={1}>Consectetur adipisicing</SelectOption>
                        <SelectOption value={2}>Accusantium aliquam</SelectOption>
                        <div className="divider" />

                        <SelectOption value={3}>Corporis distinctio</SelectOption>
                        <SelectOption value={4}>Reprehenderit sunt</SelectOption>
                        <div className="divider" />

                        <SelectOption value={5}>Consectetur adipisicing</SelectOption>
                        <SelectOption value={6}>Accusantium aliquam</SelectOption>
                        <div className="divider" />

                        <SelectOption value={7}>Corporis distinctio</SelectOption>
                    </Select>
                </GridItem>

                <GridItem>
                    <Select value={value} label="Select value" size="md" onSelect={setValue}>
                        <SelectOption value={1}>Consectetur adipisicing</SelectOption>
                        <SelectOption value={2}>Accusantium aliquam</SelectOption>
                        <SelectOption value={3}>Corporis distinctio</SelectOption>
                        <SelectOption value={4}>Reprehenderit sunt</SelectOption>
                        <SelectOption value={5}>Corporis distinctio</SelectOption>
                    </Select>
                </GridItem>

                <GridItem>
                    <Select value={value} label="Select value" size="lg" onSelect={setValue}>
                        <SelectOption value={1}>Consectetur adipisicing</SelectOption>
                        <SelectOption value={2}>Accusantium aliquam</SelectOption>
                        <SelectOption value={3}>Corporis distinctio</SelectOption>
                        <SelectOption value={4}>Reprehenderit sunt</SelectOption>
                        <SelectOption value={5}>Corporis distinctio</SelectOption>
                    </Select>
                </GridItem>
            </Grid>
        </Wrapper>
    );
};
