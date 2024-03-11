import { useState } from 'react';

import { Meta } from '@storybook/react';
import { Label, ErrorLabel } from 'src/design-system/foundation';
import { Grid, GridItem } from 'src/design-system/layout';
import { Wrapper } from 'src/storybook/wrapper';

import { Textarea } from './textarea';

const meta: Meta<typeof Textarea> = {
    title: 'Inputs/Textarea',
    component: Textarea,
};

export default meta;

const styles = `<style>
.grid-item {
    min-height: 20rem;
}
</style>`;

export const Small = () => (
    <Wrapper title="Textarea | Small" styles={styles}>
        <Grid size={{ base: 1, sm: 2, md: 3 }}>
            <GridItem>
                <Textarea size="sm" placeholder="Start typing ..." />
            </GridItem>
            <GridItem>
                <Textarea size="sm" placeholder="Start typing ..." isDisabled />
            </GridItem>
            <GridItem>
                <Textarea size="sm" placeholder="Start typing ..." isLoading />
            </GridItem>
            <GridItem>
                <Textarea size="sm" placeholder="Start typing ..." isError />
                <ErrorLabel size="sm">Some error here</ErrorLabel>
            </GridItem>

            <GridItem>
                <Label label="Textarea label" size="sm">
                    <Textarea size="sm" placeholder="Start typing ..." />
                </Label>
            </GridItem>
            <GridItem>
                <Label label="Textarea label" size="sm">
                    <Textarea size="sm" placeholder="Start typing ..." isError />
                    <ErrorLabel isFilled size="sm">
                        Some error here
                    </ErrorLabel>
                </Label>
            </GridItem>
        </Grid>
    </Wrapper>
);

export const Middle = () => (
    <Wrapper title="Textarea | Middle" styles={styles}>
        <Grid size={{ base: 1, sm: 2, md: 3 }}>
            <GridItem>
                <Textarea placeholder="Start typing ..." />
            </GridItem>
            <GridItem>
                <Textarea placeholder="Start typing ..." isDisabled />
            </GridItem>
            <GridItem>
                <Textarea placeholder="Start typing ..." isLoading />
            </GridItem>
            <GridItem>
                <Textarea placeholder="Start typing ..." isError />
                <ErrorLabel>Some error here</ErrorLabel>
            </GridItem>

            <GridItem>
                <Label label="Textarea label">
                    <Textarea placeholder="Start typing ..." />
                </Label>
            </GridItem>

            <GridItem>
                <Label label="Textarea label">
                    <Textarea placeholder="Start typing ..." isError />
                    <ErrorLabel isFilled>Some error here</ErrorLabel>
                </Label>
            </GridItem>
        </Grid>
    </Wrapper>
);

export const Large = () => (
    <Wrapper title="Textarea | Large" styles={styles}>
        <Grid size={{ base: 1, sm: 2, md: 3 }}>
            <GridItem>
                <Textarea size="lg" placeholder="Start typing ..." />
            </GridItem>
            <GridItem>
                <Textarea size="lg" placeholder="Start typing ..." isDisabled />
            </GridItem>
            <GridItem>
                <Textarea size="lg" placeholder="Start typing ..." isLoading />
            </GridItem>
            <GridItem>
                <Textarea size="lg" placeholder="Start typing ..." isError />
                <ErrorLabel size="lg">Some error here</ErrorLabel>
            </GridItem>

            <GridItem>
                <Label label="Textarea label" size="lg">
                    <Textarea size="lg" placeholder="Start typing ..." />
                </Label>
            </GridItem>

            <GridItem>
                <Label label="Textarea label" size="lg">
                    <Textarea size="lg" placeholder="Start typing ..." isError />
                    <ErrorLabel size="lg" isFilled>
                        Some error here
                    </ErrorLabel>
                </Label>
            </GridItem>
        </Grid>
    </Wrapper>
);

export const Filled = () => (
    <Wrapper title="Textarea | Filled" styles={styles}>
        <Grid size={{ base: 1, sm: 2, md: 3 }}>
            <GridItem>
                <Textarea placeholder="Start typing ..." isFilled />
            </GridItem>
            <GridItem>
                <Textarea placeholder="Start typing ..." isFilled isDisabled />
            </GridItem>
            <GridItem>
                <Textarea placeholder="Start typing ..." isFilled isLoading />
            </GridItem>
            <GridItem>
                <Textarea placeholder="Start typing ..." isFilled isError />
                <ErrorLabel>Some error here</ErrorLabel>
            </GridItem>

            <GridItem>
                <Label label="Textarea label">
                    <Textarea placeholder="Start typing ..." isFilled />
                </Label>
            </GridItem>

            <GridItem>
                <Label label="Textarea label">
                    <Textarea placeholder="Start typing ..." isFilled isError />
                    <ErrorLabel isFilled>Some error here</ErrorLabel>
                </Label>
            </GridItem>
        </Grid>
    </Wrapper>
);

export const WithLimit = () => {
    const [value, setValue] = useState('');
    return (
        <Wrapper title="Textarea | With Limit" styles={styles}>
            <Grid size={{ base: 1, sm: 2 }}>
                <GridItem>
                    <Textarea
                        maxLength={250}
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder="Start typing ..."
                    />
                </GridItem>
                <GridItem>
                    <Textarea
                        isFilled
                        maxLength={250}
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder="Start typing ..."
                    />
                </GridItem>
            </Grid>
        </Wrapper>
    );
};
