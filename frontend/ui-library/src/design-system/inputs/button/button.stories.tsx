import { Meta } from '@storybook/react';
import { ShareIcon, PlusIcon } from 'src/design-system/icons';
import { Grid, GridItem } from 'src/design-system/layout';
import { Wrapper } from 'src/storybook/wrapper';

import { Button } from './button';

const meta: Meta<typeof Button> = {
    title: 'Inputs/Button',
    component: Button,
};

export default meta;

export const Small = () => (
    <Wrapper title="Button | Small">
        <Grid size={{ base: 1, sm: 2, md: 3 }}>
            <GridItem>
                <Button size="sm">Primary</Button>
            </GridItem>
            <GridItem>
                <Button size="sm" isLoading>
                    Primary
                </Button>
            </GridItem>
            <GridItem>
                <Button size="sm" isDisabled>
                    Primary
                </Button>
            </GridItem>

            <GridItem>
                <Button size="sm" variant="secondary">
                    Secondary
                </Button>
            </GridItem>
            <GridItem>
                <Button size="sm" variant="secondary" isLoading>
                    Secondary
                </Button>
            </GridItem>
            <GridItem>
                <Button size="sm" variant="secondary" isDisabled>
                    Secondary
                </Button>
            </GridItem>

            <GridItem>
                <Button size="sm" variant="link">
                    Link
                </Button>
            </GridItem>
            <GridItem>
                <Button size="sm" variant="link" isLoading>
                    Link
                </Button>
            </GridItem>
            <GridItem>
                <Button size="sm" variant="link" isDisabled>
                    Link
                </Button>
            </GridItem>

            <GridItem>
                <Button size="sm" variant="text">
                    Text
                </Button>
            </GridItem>
            <GridItem>
                <Button size="sm" variant="text" isLoading>
                    Text
                </Button>
            </GridItem>
            <GridItem>
                <Button size="sm" variant="text" isDisabled>
                    Text
                </Button>
            </GridItem>

            <GridItem>
                <Button size="sm" variant="ghost">
                    Ghost
                </Button>
            </GridItem>
            <GridItem>
                <Button size="sm" variant="ghost" isLoading>
                    Ghost
                </Button>
            </GridItem>
            <GridItem>
                <Button size="sm" variant="ghost" isDisabled>
                    Ghost
                </Button>
            </GridItem>
        </Grid>
    </Wrapper>
);

export const Middle = () => (
    <Wrapper title="Button | Middle">
        <Grid size={{ base: 1, sm: 2, md: 3 }}>
            <GridItem>
                <Button>Primary</Button>
            </GridItem>
            <GridItem>
                <Button isLoading>Primary</Button>
            </GridItem>
            <GridItem>
                <Button isDisabled>Primary</Button>
            </GridItem>

            <GridItem>
                <Button variant="secondary">Secondary</Button>
            </GridItem>
            <GridItem>
                <Button variant="secondary" isLoading>
                    Secondary
                </Button>
            </GridItem>
            <GridItem>
                <Button variant="secondary" isDisabled>
                    Secondary
                </Button>
            </GridItem>

            <GridItem>
                <Button variant="link">Link</Button>
            </GridItem>
            <GridItem>
                <Button variant="link" isLoading>
                    Link
                </Button>
            </GridItem>
            <GridItem>
                <Button variant="link" isDisabled>
                    Link
                </Button>
            </GridItem>

            <GridItem>
                <Button variant="text">Text</Button>
            </GridItem>
            <GridItem>
                <Button variant="text" isLoading>
                    Text
                </Button>
            </GridItem>
            <GridItem>
                <Button variant="text" isDisabled>
                    Text
                </Button>
            </GridItem>

            <GridItem>
                <Button variant="ghost">Ghost</Button>
            </GridItem>
            <GridItem>
                <Button variant="ghost" isLoading>
                    Ghost
                </Button>
            </GridItem>
            <GridItem>
                <Button variant="ghost" isDisabled>
                    Ghost
                </Button>
            </GridItem>
        </Grid>
    </Wrapper>
);

export const Large = () => (
    <Wrapper title="Button | Large">
        <Grid size={{ base: 1, sm: 2, md: 3 }}>
            <GridItem>
                <Button size="lg">Primary</Button>
            </GridItem>
            <GridItem>
                <Button size="lg" isLoading>
                    Primary
                </Button>
            </GridItem>
            <GridItem>
                <Button size="lg" isDisabled>
                    Primary
                </Button>
            </GridItem>

            <GridItem>
                <Button size="lg" variant="secondary">
                    Secondary
                </Button>
            </GridItem>
            <GridItem>
                <Button size="lg" variant="secondary" isLoading>
                    Secondary
                </Button>
            </GridItem>
            <GridItem>
                <Button size="lg" variant="secondary" isDisabled>
                    Secondary
                </Button>
            </GridItem>

            <GridItem>
                <Button size="lg" variant="link">
                    Link
                </Button>
            </GridItem>
            <GridItem>
                <Button size="lg" variant="link" isLoading>
                    Link
                </Button>
            </GridItem>
            <GridItem>
                <Button size="lg" variant="link" isDisabled>
                    Link
                </Button>
            </GridItem>

            <GridItem>
                <Button size="lg" variant="text">
                    Text
                </Button>
            </GridItem>
            <GridItem>
                <Button size="lg" variant="text" isLoading>
                    Text
                </Button>
            </GridItem>
            <GridItem>
                <Button size="lg" variant="text" isDisabled>
                    Text
                </Button>
            </GridItem>

            <GridItem>
                <Button size="lg" variant="ghost">
                    Ghost
                </Button>
            </GridItem>
            <GridItem>
                <Button size="lg" variant="ghost" isLoading>
                    Ghost
                </Button>
            </GridItem>
            <GridItem>
                <Button size="lg" variant="ghost" isDisabled>
                    Ghost
                </Button>
            </GridItem>
        </Grid>
    </Wrapper>
);

export const Icons = () => (
    <Wrapper title="Button | Icons">
        <Grid size={{ base: 1, sm: 2, md: 3 }}>
            <GridItem>
                <Button size="sm" leftIcon={<PlusIcon />}>
                    Primary
                </Button>
            </GridItem>
            <GridItem>
                <Button size="sm" rightIcon={<ShareIcon />}>
                    Primary
                </Button>
            </GridItem>
            <GridItem>
                <Button size="sm" leftIcon={<PlusIcon />} rightIcon={<ShareIcon />}>
                    Primary
                </Button>
            </GridItem>

            <GridItem>
                <Button leftIcon={<PlusIcon />}>Primary</Button>
            </GridItem>
            <GridItem>
                <Button rightIcon={<ShareIcon />}>Primary</Button>
            </GridItem>
            <GridItem>
                <Button leftIcon={<PlusIcon />} rightIcon={<ShareIcon />}>
                    Primary
                </Button>
            </GridItem>

            <GridItem>
                <Button leftIcon={<PlusIcon />} size="lg">
                    Primary
                </Button>
            </GridItem>
            <GridItem>
                <Button rightIcon={<ShareIcon />} size="lg">
                    Primary
                </Button>
            </GridItem>
            <GridItem>
                <Button leftIcon={<PlusIcon />} rightIcon={<ShareIcon />} size="lg">
                    Primary
                </Button>
            </GridItem>

            <GridItem>
                <Button leftIcon={<PlusIcon />} variant="secondary">
                    Secondary
                </Button>
            </GridItem>
            <GridItem>
                <Button rightIcon={<ShareIcon />} variant="secondary">
                    Secondary
                </Button>
            </GridItem>
            <GridItem>
                <Button leftIcon={<PlusIcon />} rightIcon={<ShareIcon />} variant="secondary">
                    Secondary
                </Button>
            </GridItem>

            <GridItem>
                <Button leftIcon={<PlusIcon />} variant="text">
                    Text
                </Button>
            </GridItem>
            <GridItem>
                <Button rightIcon={<ShareIcon />} variant="text">
                    Text
                </Button>
            </GridItem>
            <GridItem>
                <Button leftIcon={<PlusIcon />} rightIcon={<ShareIcon />} variant="text">
                    Text
                </Button>
            </GridItem>

            <GridItem>
                <Button leftIcon={<PlusIcon />} variant="ghost">
                    Ghost
                </Button>
            </GridItem>
            <GridItem>
                <Button rightIcon={<ShareIcon />} variant="ghost">
                    Ghost
                </Button>
            </GridItem>
            <GridItem>
                <Button leftIcon={<PlusIcon />} rightIcon={<ShareIcon />} variant="ghost">
                    Ghost
                </Button>
            </GridItem>
        </Grid>
    </Wrapper>
);
