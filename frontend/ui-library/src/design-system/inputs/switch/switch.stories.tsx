import { Grid, GridItem } from 'src/design-system/layout';
import { useIsOpen } from 'src/hooks';
import { Wrapper } from 'src/storybook/wrapper';

import { Switch } from './switch';

export default {
    title: 'Inputs/Switch',
    component: Switch,
};

export const Base = () => {
    const { isOpen, onToggle } = useIsOpen();

    return (
        <Wrapper title="Switch | Base">
            <Grid size={{ base: 1, sm: 2, md: 3 }}>
                <GridItem>
                    <Switch size="sm" checked={isOpen} onChange={onToggle} />
                </GridItem>
                <GridItem>
                    <Switch size="sm" label="With label" checked={isOpen} onChange={onToggle} />
                </GridItem>
                <GridItem>
                    <Switch size="sm" label="Disabled" disabled checked={isOpen} onChange={onToggle} />
                </GridItem>

                <GridItem>
                    <Switch checked={isOpen} onChange={onToggle} />
                </GridItem>
                <GridItem>
                    <Switch label="With label" checked={isOpen} onChange={onToggle} />
                </GridItem>
                <GridItem>
                    <Switch label="Disabled" disabled checked={isOpen} onChange={onToggle} />
                </GridItem>

                <GridItem>
                    <Switch size="lg" checked={isOpen} onChange={onToggle} />
                </GridItem>
                <GridItem>
                    <Switch size="lg" label="With label" checked={isOpen} onChange={onToggle} />
                </GridItem>
                <GridItem>
                    <Switch size="lg" label="Disabled" disabled checked={isOpen} onChange={onToggle} />
                </GridItem>
            </Grid>
        </Wrapper>
    );
};
