import { Meta } from '@storybook/react';
import { Label, ErrorLabel } from 'src/design-system/foundation';
import { LightIcon, ShareIcon } from 'src/design-system/icons';
import { Grid, GridItem } from 'src/design-system/layout';
import { Wrapper } from 'src/storybook/wrapper';

import { Input } from './input';

const meta: Meta<typeof Input> = {
    title: 'Inputs/Input',
    component: Input,
};

export default meta;

const styles = `<style>
.grid-item {
    min-height: 20rem;
}
</style>`;

export const Small = () => (
    <Wrapper title="Input | Small" styles={styles}>
        <Grid size={{ base: 1, sm: 2, md: 3, lg: 4 }}>
            <GridItem>
                <Input size="sm" placeholder="Start typing ..." />
            </GridItem>
            <GridItem>
                <Input size="sm" placeholder="Start typing ..." isDisabled />
            </GridItem>
            <GridItem>
                <Input size="sm" placeholder="Start typing ..." isLoading />
            </GridItem>
            <GridItem>
                <Input size="sm" placeholder="Start typing ..." isError />
                <ErrorLabel size="sm">Some error here</ErrorLabel>
            </GridItem>

            <GridItem>
                <Label label="Input label" size="sm">
                    <Input size="sm" placeholder="Start typing ..." />
                </Label>
            </GridItem>
            <GridItem>
                <Label label="Input label" size="sm">
                    <Input size="sm" placeholder="Start typing ..." isError />
                    <ErrorLabel isFilled size="sm">
                        Some error here
                    </ErrorLabel>
                </Label>
            </GridItem>
        </Grid>
    </Wrapper>
);

export const Middle = () => (
    <Wrapper title="Input | Middle" styles={styles}>
        <Grid size={{ base: 1, sm: 2, md: 3, lg: 4 }}>
            <GridItem>
                <Input placeholder="Start typing ..." />
            </GridItem>
            <GridItem>
                <Input placeholder="Start typing ..." isDisabled />
            </GridItem>
            <GridItem>
                <Input placeholder="Start typing ..." isLoading />
            </GridItem>
            <GridItem>
                <Input placeholder="Start typing ..." isError />
                <ErrorLabel>Some error here</ErrorLabel>
            </GridItem>

            <GridItem>
                <Label label="Input label">
                    <Input placeholder="Start typing ..." />
                </Label>
            </GridItem>

            <GridItem>
                <Label label="Input label">
                    <Input placeholder="Start typing ..." isError />
                    <ErrorLabel isFilled>Some error here</ErrorLabel>
                </Label>
            </GridItem>
        </Grid>
    </Wrapper>
);

export const Large = () => (
    <Wrapper title="Input | Large" styles={styles}>
        <Grid size={{ base: 1, sm: 2, md: 3, lg: 4 }}>
            <GridItem>
                <Input size="lg" placeholder="Start typing ..." />
            </GridItem>
            <GridItem>
                <Input size="lg" placeholder="Start typing ..." isDisabled />
            </GridItem>
            <GridItem>
                <Input size="lg" placeholder="Start typing ..." isLoading />
            </GridItem>
            <GridItem>
                <Input size="lg" placeholder="Start typing ..." isError />
                <ErrorLabel size="lg">Some error here</ErrorLabel>
            </GridItem>

            <GridItem>
                <Label label="Input label" size="lg">
                    <Input size="lg" placeholder="Start typing ..." />
                </Label>
            </GridItem>

            <GridItem>
                <Label label="Input label" size="lg">
                    <Input size="lg" placeholder="Start typing ..." isError />
                    <ErrorLabel size="lg" isFilled>
                        Some error here
                    </ErrorLabel>
                </Label>
            </GridItem>
        </Grid>
    </Wrapper>
);

export const Icons = () => (
    <Wrapper title="Input | Icons" styles={styles}>
        <Grid size={{ base: 1, sm: 2, md: 3, lg: 4 }}>
            <GridItem>
                <Input placeholder="Start typing ..." leftIcon={<LightIcon />} />
            </GridItem>
            <GridItem>
                <Input placeholder="Start typing ..." leftIcon={<LightIcon />} isDisabled />
            </GridItem>
            <GridItem>
                <Input placeholder="Start typing ..." leftIcon={<LightIcon />} isLoading />
            </GridItem>
            <GridItem>
                <Input placeholder="Start typing ..." leftIcon={<LightIcon />} isError />
            </GridItem>

            <GridItem>
                <Input placeholder="Start typing ..." rightIcon={<LightIcon />} />
            </GridItem>
            <GridItem>
                <Input placeholder="Start typing ..." rightIcon={<LightIcon />} isDisabled />
            </GridItem>
            <GridItem>
                <Input placeholder="Start typing ..." rightIcon={<LightIcon />} isLoading />
            </GridItem>
            <GridItem>
                <Input placeholder="Start typing ..." rightIcon={<LightIcon />} isError />
            </GridItem>

            <GridItem>
                <Input size="sm" placeholder="Start typing ..." leftIcon={<LightIcon />} rightIcon={<ShareIcon />} />
            </GridItem>
            <GridItem>
                <Input size="sm" placeholder="Start typing ..." leftIcon={<LightIcon />} rightIcon={<ShareIcon />} isDisabled />
            </GridItem>
            <GridItem>
                <Input size="sm" placeholder="Start typing ..." leftIcon={<LightIcon />} rightIcon={<ShareIcon />} isLoading />
            </GridItem>
            <GridItem>
                <Input size="sm" placeholder="Start typing ..." leftIcon={<LightIcon />} rightIcon={<ShareIcon />} isError />
            </GridItem>

            <GridItem>
                <Input size="md" placeholder="Start typing ..." leftIcon={<LightIcon />} rightIcon={<ShareIcon />} />
            </GridItem>
            <GridItem>
                <Input size="md" placeholder="Start typing ..." leftIcon={<LightIcon />} rightIcon={<ShareIcon />} isDisabled />
            </GridItem>
            <GridItem>
                <Input size="md" placeholder="Start typing ..." leftIcon={<LightIcon />} rightIcon={<ShareIcon />} isLoading />
            </GridItem>
            <GridItem>
                <Input size="md" placeholder="Start typing ..." leftIcon={<LightIcon />} rightIcon={<ShareIcon />} isError />
            </GridItem>

            <GridItem>
                <Input size="lg" placeholder="Start typing ..." leftIcon={<LightIcon />} rightIcon={<ShareIcon />} />
            </GridItem>
            <GridItem>
                <Input size="lg" placeholder="Start typing ..." leftIcon={<LightIcon />} rightIcon={<ShareIcon />} isDisabled />
            </GridItem>
            <GridItem>
                <Input size="lg" placeholder="Start typing ..." leftIcon={<LightIcon />} rightIcon={<ShareIcon />} isLoading />
            </GridItem>
            <GridItem>
                <Input size="lg" placeholder="Start typing ..." leftIcon={<LightIcon />} rightIcon={<ShareIcon />} isError />
            </GridItem>
        </Grid>
    </Wrapper>
);

export const Password = () => (
    <Wrapper title="Input | Password" styles={styles}>
        <Grid size={{ base: 1, sm: 2, md: 3, lg: 4 }}>
            <GridItem>
                <Input
                    size="sm"
                    type="password"
                    placeholder="Start typing ..."
                    leftIcon={<LightIcon />}
                    rightIcon={<ShareIcon />}
                />
            </GridItem>
            <GridItem>
                <Input
                    size="sm"
                    type="password"
                    placeholder="Start typing ..."
                    leftIcon={<LightIcon />}
                    rightIcon={<ShareIcon />}
                    isDisabled
                />
            </GridItem>
            <GridItem>
                <Input
                    size="sm"
                    type="password"
                    placeholder="Start typing ..."
                    leftIcon={<LightIcon />}
                    rightIcon={<ShareIcon />}
                    isLoading
                />
            </GridItem>
            <GridItem>
                <Input
                    size="sm"
                    type="password"
                    placeholder="Start typing ..."
                    leftIcon={<LightIcon />}
                    rightIcon={<ShareIcon />}
                    isError
                />
            </GridItem>

            <GridItem>
                <Input
                    size="md"
                    type="password"
                    placeholder="Start typing ..."
                    leftIcon={<LightIcon />}
                    rightIcon={<ShareIcon />}
                />
            </GridItem>
            <GridItem>
                <Input
                    size="md"
                    type="password"
                    placeholder="Start typing ..."
                    leftIcon={<LightIcon />}
                    rightIcon={<ShareIcon />}
                    isDisabled
                />
            </GridItem>
            <GridItem>
                <Input
                    size="md"
                    type="password"
                    placeholder="Start typing ..."
                    leftIcon={<LightIcon />}
                    rightIcon={<ShareIcon />}
                    isLoading
                />
            </GridItem>
            <GridItem>
                <Input
                    size="md"
                    type="password"
                    placeholder="Start typing ..."
                    leftIcon={<LightIcon />}
                    rightIcon={<ShareIcon />}
                    isError
                />
            </GridItem>

            <GridItem>
                <Input
                    size="lg"
                    type="password"
                    placeholder="Start typing ..."
                    leftIcon={<LightIcon />}
                    rightIcon={<ShareIcon />}
                />
            </GridItem>
            <GridItem>
                <Input
                    size="lg"
                    type="password"
                    placeholder="Start typing ..."
                    leftIcon={<LightIcon />}
                    rightIcon={<ShareIcon />}
                    isDisabled
                />
            </GridItem>
            <GridItem>
                <Input
                    size="lg"
                    type="password"
                    placeholder="Start typing ..."
                    leftIcon={<LightIcon />}
                    rightIcon={<ShareIcon />}
                    isLoading
                />
            </GridItem>
            <GridItem>
                <Input
                    size="lg"
                    type="password"
                    placeholder="Start typing ..."
                    leftIcon={<LightIcon />}
                    rightIcon={<ShareIcon />}
                    isError
                />
            </GridItem>
        </Grid>
    </Wrapper>
);

export const Filled = () => (
    <Wrapper title="Input | Filled" styles={styles}>
        <Grid size={{ base: 1, sm: 2, md: 3, lg: 4 }}>
            <GridItem>
                <Input placeholder="Start typing ..." isFilled />
            </GridItem>
            <GridItem>
                <Input placeholder="Start typing ..." isFilled isDisabled />
            </GridItem>
            <GridItem>
                <Input placeholder="Start typing ..." isFilled isLoading />
            </GridItem>
            <GridItem>
                <Input placeholder="Start typing ..." isFilled isError />
                <ErrorLabel>Some error here</ErrorLabel>
            </GridItem>

            <GridItem>
                <Label label="Input label">
                    <Input placeholder="Start typing ..." isFilled />
                </Label>
            </GridItem>

            <GridItem>
                <Label label="Input label">
                    <Input placeholder="Start typing ..." isFilled isError />
                    <ErrorLabel isFilled>Some error here</ErrorLabel>
                </Label>
            </GridItem>
        </Grid>
    </Wrapper>
);
